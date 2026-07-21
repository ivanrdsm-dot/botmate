// Vitala — análisis corporal con visión IA (opcional, guardrails estrictos).
// REGLAS INQUEBRANTABLES:
//  · La foto se procesa EN MEMORIA y se descarta. Jamás se guarda.
//  · Cero diagnósticos, cero cifras "exactas" de grasa corporal, cero juicios.
//  · Lenguaje amable y motivador; nunca lenguaje que fomente trastornos
//    alimenticios. Siempre recomienda validación profesional.

import { NextResponse } from "next/server";
import { limitByIp, limitByUser, userFromBearer, RATE_MSG } from "@/lib/ratelimit";

export const runtime = "nodejs";

const MODEL = process.env.VITALA_VISION_MODEL || "claude-haiku-4-5";

const SYSTEM = `Eres un coach de bienestar amable que observa fotos de progreso corporal.

PROHIBIDO ABSOLUTO:
- Diagnosticar condiciones, estimar porcentajes "exactos" de grasa, dar cifras médicas.
- Cualquier lenguaje que avergüence el cuerpo, compare con ideales o fomente restricción extrema.
- Analizar fotos de menores de edad: si parece menor, di que no puedes analizarla.
- Si la foto no es una persona o es inapropiada, dilo respetuosamente y no analices.

TU TRABAJO (tono cálido, español):
- 2-4 observaciones NEUTRAS y motivadoras sobre postura/composición general (confianza baja).
- Sugerir un enfoque de meta compatible: "lose" | "maintain" | "gain" | "unknown".
- 2-3 tips accionables de hábitos (nunca dietas extremas).

Devuelve SOLO JSON válido:
{"observations":[...],"enfoque":"...","tips":[...],"confidence":"baja"|"media","note":"..."}
En "note" recuerda que es orientación educativa con base en una foto (margen de error alto)
y que un profesional de la salud es quien puede evaluar de verdad.`;

export async function POST(req: Request) {
  let body: { base64?: string; mediaType?: string; goal?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  const { base64, mediaType = "image/jpeg", goal } = body;
  if (!base64) return NextResponse.json({ error: "Falta la imagen." }, { status: 400 });

  // Rate limit: 5/h con cuenta, 3/h por IP anónima.
  const userId = await userFromBearer(req);
  const allowed = userId
    ? await limitByUser(userId, "body", 5, 3600)
    : await limitByIp(req, "body", 3, 3600);
  if (!allowed) return NextResponse.json({ error: RATE_MSG }, { status: 429 });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      degraded: true,
      message:
        "El análisis con IA aún no está activado. Tus fotos siguen guardándose solo en tu dispositivo.",
    });
  }

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
        max_tokens: 900,
        system: SYSTEM,
        messages: [
          {
            role: "user",
            content: [
              { type: "image", source: { type: "base64", media_type: mediaType, data: base64 } },
              {
                type: "text",
                text: `Foto de progreso. Meta actual del usuario: ${goal ?? "sin definir"}. Analiza con tus reglas.`,
              },
            ],
          },
        ],
      }),
    });

    if (!res.ok) {
      console.error("Anthropic body error", res.status, await res.text());
      return NextResponse.json({ error: "No se pudo analizar la foto. Intenta de nuevo." }, { status: 502 });
    }

    const data = await res.json();
    const text: string =
      data?.content?.map((b: { text?: string }) => b.text ?? "").join("").trim() || "";
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1) throw new Error("sin JSON");
    const parsed = JSON.parse(text.slice(start, end + 1));
    return NextResponse.json(parsed);
  } catch (e) {
    console.error("analyze-body error", e);
    return NextResponse.json({ error: "No pudimos leer el análisis. Intenta con otra foto." }, { status: 502 });
  }
}
