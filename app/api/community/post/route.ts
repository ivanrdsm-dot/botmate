// Vitala — publicar en la comunidad (muro de logros).
// Requiere cuenta. El cliente NUNCA inserta directo: este endpoint modera texto
// y FOTO (reglas + IA) y solo entonces inserta con service_role.
// Fotos: moderación visual OBLIGATORIA (fail-closed: sin llave de IA, no hay
// fotos). Se suben al bucket 'community' SOLO tras aprobarse.

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { limitByUser, RATE_MSG } from "@/lib/ratelimit";

export const runtime = "nodejs";

// Contenido que se rechaza en seco (ventas, enlaces, datos de contacto).
const BLOCKED = [
  /https?:\/\//i,
  /www\./i,
  /\b\d{10}\b/, // teléfonos
  /whatsapp|telegram/i,
];

// Señales de crisis → respuesta de apoyo, no publicación.
const CRISIS = /suicid|quitarme la vida|autolesi|hacerme da[ñn]o|no quiero vivir/i;

const CRISIS_REPLY =
  "Gracias por confiar en la comunidad. Lo que escribes suena a que estás pasando un momento muy duro; esto merece apoyo de verdad, no un muro. Por favor habla ahora con una línea de ayuda de tu país (en México: 800 911 2000) o con alguien de confianza. No estás solo. 💚";

const MAX_IMAGE_BYTES = 1_500_000; // ~1.5 MB ya reducida por el cliente

async function aiTextOk(message: string): Promise<boolean> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return true; // texto: fail-open (las reglas básicas ya filtraron)
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.VITALA_AI_MODEL || "claude-haiku-4-5",
        max_tokens: 10,
        system:
          'Moderas un muro de logros de salud. Responde SOLO "SI" si el mensaje es apropiado (logro, ánimo, experiencia personal respetuosa) o "NO" si contiene odio, acoso, spam, contenido sexual, consejos médicos peligrosos, promoción de trastornos alimenticios o venta de productos.',
        messages: [{ role: "user", content: message }],
      }),
    });
    if (!res.ok) return true;
    const data = await res.json();
    return (data?.content?.[0]?.text?.trim().toUpperCase() ?? "SI").startsWith("SI");
  } catch {
    return true;
  }
}

// Moderación VISUAL: fail-closed. Sin llave o sin veredicto claro → se rechaza.
async function aiImageOk(base64: string, mediaType: string): Promise<boolean> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return false;
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.VITALA_VISION_MODEL || "claude-haiku-4-5",
        max_tokens: 10,
        system:
          'Moderas fotos de un muro público de logros de salud y nutrición. Responde SOLO "SI" si la foto es apropiada: progreso físico con ropa deportiva/casual, comida saludable, ejercicio, celebración personal. Responde "NO" si hay: desnudez o contenido sexual, personas que parezcan menores de edad, violencia o sangre, texto/spam/anuncios/capturas de pantalla, documentos o datos personales, o cualquier cosa no relacionada con salud y bienestar.',
        messages: [
          {
            role: "user",
            content: [
              { type: "image", source: { type: "base64", media_type: mediaType, data: base64 } },
              { type: "text", text: "¿Apropiada para el muro? SI o NO." },
            ],
          },
        ],
      }),
    });
    if (!res.ok) return false;
    const data = await res.json();
    return (data?.content?.[0]?.text?.trim().toUpperCase() ?? "NO").startsWith("SI");
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anon || !serviceRole) {
    return NextResponse.json({ error: "La comunidad aún no está configurada." }, { status: 500 });
  }

  // Publicar requiere cuenta (identidad + rendición de cuentas).
  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) return NextResponse.json({ error: "Inicia sesión para publicar." }, { status: 401 });
  const userClient = createClient(url, anon);
  const { data: userData, error: userErr } = await userClient.auth.getUser(token);
  if (userErr || !userData.user) {
    return NextResponse.json({ error: "Sesión inválida." }, { status: 401 });
  }
  const user = userData.user;

  if (!(await limitByUser(user.id, "community", 5, 86400))) {
    return NextResponse.json({ error: RATE_MSG }, { status: 429 });
  }

  let body: {
    message?: string;
    displayName?: string;
    stats?: { kgLost?: number; streakDays?: number };
    imageBase64?: string;
    imageType?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const message = (body.message ?? "").trim();
  const displayName = (body.displayName ?? "").trim().slice(0, 40) || "Alguien de Vitala";
  if (message.length < 3 || message.length > 500) {
    return NextResponse.json({ error: "Escribe un mensaje de 3 a 500 caracteres." }, { status: 400 });
  }

  if (CRISIS.test(message)) {
    return NextResponse.json({ crisis: true, reply: CRISIS_REPLY });
  }
  if (BLOCKED.some((re) => re.test(message))) {
    return NextResponse.json(
      { error: "Para cuidar la comunidad no se permiten enlaces, teléfonos ni promociones." },
      { status: 400 }
    );
  }
  if (!(await aiTextOk(message))) {
    return NextResponse.json(
      { error: "Tu mensaje no pasó la moderación. Comparte tu experiencia con respeto y sin promociones." },
      { status: 400 }
    );
  }

  const admin = createClient(url, serviceRole, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Foto opcional: moderación visual OBLIGATORIA antes de tocar el storage.
  let imageUrl: string | null = null;
  if (body.imageBase64) {
    const imageType = body.imageType === "image/png" ? "image/png" : "image/jpeg";
    const buffer = Buffer.from(body.imageBase64, "base64");
    if (buffer.byteLength > MAX_IMAGE_BYTES) {
      return NextResponse.json({ error: "La foto es demasiado grande." }, { status: 400 });
    }
    const approved = await aiImageOk(body.imageBase64, imageType);
    if (!approved) {
      return NextResponse.json(
        {
          error:
            "Tu foto no pasó la moderación. Solo se permiten fotos de progreso (con ropa), comida o ejercicio, sin menores ni contenido ajeno a la salud.",
        },
        { status: 400 }
      );
    }
    const ext = imageType === "image/png" ? "png" : "jpg";
    const path = `${user.id}/${Date.now()}.${ext}`;
    const { error: upErr } = await admin.storage
      .from("community")
      .upload(path, buffer, { contentType: imageType, upsert: false });
    if (upErr) {
      console.error("storage upload error", upErr);
      return NextResponse.json({ error: "No se pudo subir la foto." }, { status: 500 });
    }
    imageUrl = admin.storage.from("community").getPublicUrl(path).data.publicUrl;
  }

  const stats: Record<string, number> = {};
  const kg = Number(body.stats?.kgLost);
  const streak = Number(body.stats?.streakDays);
  if (Number.isFinite(kg) && kg > 0 && kg < 200) stats.kgLost = Math.round(kg * 10) / 10;
  if (Number.isFinite(streak) && streak > 0 && streak < 3000) stats.streakDays = Math.round(streak);

  const { data: post, error: insErr } = await admin
    .from("community_posts")
    .insert({ user_id: user.id, display_name: displayName, message, stats, image_url: imageUrl })
    .select("id, display_name, message, stats, image_url, created_at")
    .single();
  if (insErr) {
    console.error("community insert error", insErr);
    return NextResponse.json({ error: "No se pudo publicar. Intenta de nuevo." }, { status: 500 });
  }

  return NextResponse.json({ post });
}
