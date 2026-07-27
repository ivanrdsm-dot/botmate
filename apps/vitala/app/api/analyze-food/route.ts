// Vitala — análisis de comida por foto (visión de Claude).
// Recibe una imagen, identifica alimentos y estima porción/kcal/macros.
// Marca incertidumbre y avisa de posibles alérgenos del usuario.
// NO diagnostica. Degrada con elegancia si no hay ANTHROPIC_API_KEY.

import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Modelo con visión. Haiku por costo a escala; sube a sonnet para más precisión.
const MODEL = process.env.VITALA_VISION_MODEL || "claude-haiku-4-5";

const SYSTEM = `Eres un analizador nutricional con visión, riguroso y honesto.
Identifica los alimentos visibles en la foto y estima, por alimento: porción en
gramos (grams), calorías (kcal) y macros en gramos (protein, carbs, fat).
- Si no estás seguro de un alimento o su porción, usa confidence "baja" o "media".
- Devuelve SIEMPRE y SOLO un objeto JSON válido, sin texto adicional, con la forma:
  {"items":[{"name","grams","kcal","protein","carbs","fat","confidence"}],"notes"}
- confidence ∈ "alta" | "media" | "baja".
- En "notes": escribe en español, breve. Si la foto no es comida, di items:[] y
  explica en notes. NUNCA diagnostiques ni des consejo médico.`;

interface Body {
  base64?: string;
  mediaType?: string;
  allergies?: string[];
}

function extractJson(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = fenced ? fenced[1] : text;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("sin JSON");
  return JSON.parse(raw.slice(start, end + 1));
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { base64, mediaType = "image/jpeg", allergies = [] } = body;
  if (!base64) return NextResponse.json({ error: "Falta la imagen." }, { status: 400 });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      degraded: true,
      message:
        "El análisis con IA aún no está activado (falta configurar la llave). Puedes registrar tu comida manualmente.",
    });
  }

  const allergyNote = allergies.length
    ? `El usuario es alérgico a: ${allergies.join(", ")}. Si algún alimento podría contenerlos, AVÍSALO claramente en notes.`
    : "El usuario no declaró alergias.";

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1200,
        system: SYSTEM,
        messages: [
          {
            role: "user",
            content: [
              { type: "image", source: { type: "base64", media_type: mediaType, data: base64 } },
              { type: "text", text: `Analiza esta comida. ${allergyNote}` },
            ],
          },
        ],
      }),
    });

    if (!res.ok) {
      console.error("Anthropic vision error", res.status, await res.text());
      return NextResponse.json(
        { error: "No se pudo analizar la imagen. Intenta de nuevo." },
        { status: 502 }
      );
    }

    const data = await res.json();
    const text: string =
      data?.content?.map((b: { text?: string }) => b.text ?? "").join("").trim() || "";

    const parsed = extractJson(text) as {
      items?: unknown[];
      notes?: string;
    };
    const items = Array.isArray(parsed.items) ? parsed.items : [];
    return NextResponse.json({ items, notes: parsed.notes ?? "" });
  } catch (e) {
    console.error("analyze-food error", e);
    return NextResponse.json(
      { error: "No pudimos leer el análisis. Intenta con otra foto." },
      { status: 502 }
    );
  }
}
