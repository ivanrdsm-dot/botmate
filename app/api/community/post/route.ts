// Vitala — publicar en la comunidad (muro de logros).
// Requiere cuenta. El cliente NUNCA inserta directo: este endpoint modera el
// texto (reglas + IA si hay llave) y solo entonces inserta con service_role.
// Sin fotos por ahora: llegarán cuando exista pipeline de moderación visual.

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

async function aiModerationOk(message: string): Promise<boolean> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return true; // sin llave: pasan las reglas básicas
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
    if (!res.ok) return true; // fail-open: las reglas básicas ya filtraron
    const data = await res.json();
    const verdict = data?.content?.[0]?.text?.trim().toUpperCase() ?? "SI";
    return verdict.startsWith("SI");
  } catch {
    return true;
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

  let body: { message?: string; displayName?: string; stats?: { kgLost?: number; streakDays?: number } };
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
  if (!(await aiModerationOk(message))) {
    return NextResponse.json(
      { error: "Tu mensaje no pasó la moderación. Comparte tu experiencia con respeto y sin promociones." },
      { status: 400 }
    );
  }

  const stats: Record<string, number> = {};
  const kg = Number(body.stats?.kgLost);
  const streak = Number(body.stats?.streakDays);
  if (Number.isFinite(kg) && kg > 0 && kg < 200) stats.kgLost = Math.round(kg * 10) / 10;
  if (Number.isFinite(streak) && streak > 0 && streak < 3000) stats.streakDays = Math.round(streak);

  const admin = createClient(url, serviceRole, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: post, error: insErr } = await admin
    .from("community_posts")
    .insert({ user_id: user.id, display_name: displayName, message, stats })
    .select("id, display_name, message, stats, created_at")
    .single();
  if (insErr) {
    console.error("community insert error", insErr);
    return NextResponse.json({ error: "No se pudo publicar. Intenta de nuevo." }, { status: 500 });
  }

  return NextResponse.json({ post });
}
