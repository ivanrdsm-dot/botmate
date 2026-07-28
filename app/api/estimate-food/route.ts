// Vitala — estimador de comida por TEXTO.
// El usuario escribe "hoy desayuné 2 quesadillas de maíz con queso y un plátano
// con leche" → devuelve items con kcal y macros para llevar el registro.
// Con ANTHROPIC_API_KEY usa Claude; sin llave, hace una estimación de respaldo
// buscando coincidencias en la base de platillos comunes.

import { NextResponse } from "next/server";
import { COMMON_FOODS } from "@/lib/foods";
import { limitByIp, limitByUser, userFromBearer, RATE_MSG } from "@/lib/ratelimit";

export const runtime = "nodejs";

const MODEL = process.env.VITALA_AI_MODEL || "claude-haiku-4-5";

const SYSTEM = `Eres un estimador nutricional honesto para registro de comidas en español.
El usuario describe en lenguaje natural lo que comió (porciones aproximadas, platillos
de México/LATAM comunes). Devuelve SOLO un objeto JSON válido, sin texto adicional:
{"items":[{"name","grams","kcal","protein","carbs","fat","confidence"}],"notes"}
Reglas:
- Separa cada alimento/platillo en un item; estima porción realista si no la dan.
- confidence ∈ "alta" | "media" | "baja" según qué tan claro fue el texto.
- kcal y macros en gramos, enteros. grams = gramos aproximados de la porción.
- En "notes": breve, en español. Recuerda que es una estimación aproximada.
- Si el texto no describe comida, devuelve items:[] y explícalo en notes.
- NUNCA diagnostiques ni des consejo médico.`;

// Respaldo sin IA: match por palabras clave contra platillos comunes.
function heuristicEstimate(text: string) {
  const t = text.toLowerCase();
  const items: Array<Record<string, unknown>> = [];
  for (const f of COMMON_FOODS) {
    if (f.keywords.some((k) => t.includes(k))) {
      // multiplicador simple si el texto trae un número antes de la palabra
      const m = t.match(new RegExp(`(\\d+)\\s+\\w*\\s*${f.keywords[0]}`));
      const q = m ? Math.min(6, Math.max(1, Number(m[1]))) : 1;
      items.push({
        name: f.name, grams: undefined, kcal: f.kcal * q, protein: f.protein * q,
        carbs: f.carbs * q, fat: f.fat * q, confidence: "baja",
      });
    }
  }
  return items;
}

export async function POST(req: Request) {
  let body: { text?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  const text = (body.text ?? "").trim();
  if (text.length < 3) {
    return NextResponse.json({ error: "Describe lo que comiste." }, { status: 400 });
  }

  // Rate limit: 30/h con cuenta, 12/h por IP.
  const userId = await userFromBearer(req);
  const allowed = userId
    ? await limitByUser(userId, "estimate", 30, 3600)
    : await limitByIp(req, "estimate", 12, 3600);
  if (!allowed) return NextResponse.json({ error: RATE_MSG }, { status: 429 });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    const items = heuristicEstimate(text);
    return NextResponse.json({
      items,
      notes:
        items.length > 0
          ? "Estimación básica sin IA (aproximada). Activa la IA para mayor precisión."
          : "No reconocimos platillos. Puedes agregarlos manualmente.",
      degraded: true,
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
        max_tokens: 1000,
        system: SYSTEM,
        messages: [{ role: "user", content: `Lo que comí: ${text}` }],
      }),
    });
    if (!res.ok) {
      console.error("estimate-food anthropic error", res.status, await res.text());
      const items = heuristicEstimate(text);
      return NextResponse.json({ items, notes: "Estimación de respaldo.", degraded: true });
    }
    const data = await res.json();
    const out: string =
      data?.content?.map((b: { text?: string }) => b.text ?? "").join("").trim() || "";
    const start = out.indexOf("{");
    const end = out.lastIndexOf("}");
    if (start === -1 || end === -1) throw new Error("sin JSON");
    const parsed = JSON.parse(out.slice(start, end + 1));
    return NextResponse.json({ items: Array.isArray(parsed.items) ? parsed.items : [], notes: parsed.notes ?? "" });
  } catch (e) {
    console.error("estimate-food error", e);
    const items = heuristicEstimate(text);
    return NextResponse.json({ items, notes: "Estimación de respaldo.", degraded: true });
  }
}
