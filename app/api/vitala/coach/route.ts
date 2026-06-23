// Vitala — Coach IA con guardrails de seguridad clínica.
// Usa la API de Anthropic (Claude) si ANTHROPIC_API_KEY está configurada.
// Si no hay llave, degrada a una respuesta segura basada en reglas.
// NUNCA diagnostica; ante señales de emergencia deriva a servicios de salud.

import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Modelo configurable; por costo/escala usamos Haiku por defecto.
const MODEL = process.env.VITALA_AI_MODEL || "claude-haiku-4-5-20251001";

const SYSTEM_PROMPT = `Eres "Vitala", un coach de nutrición y bienestar enfocado en hacer accesible la salud a cualquier persona. Hablas claro, cálido y motivador, en el idioma del usuario (por defecto español).

REGLAS INQUEBRANTABLES:
- NUNCA das diagnósticos médicos ni interpretas síntomas como una enfermedad.
- NUNCA prescribes medicamentos, dosis ni tratamientos.
- NO reemplazas a un profesional de la salud; cuando haya dudas clínicas, recomienda consultar a un médico o nutriólogo.
- Antes de recomendar alimentos, considera alergias, condiciones y medicamentos que el usuario haya mencionado. Si no los conoces y son relevantes, pregúntalos primero.
- Basas tus consejos en evidencia y lineamientos generales (OMS, guías de nutrición). Evitas modas sin respaldo.
- No prometes curas ni resultados garantizados. Promueves hábitos sostenibles, no dietas extremas.
- Si el usuario describe una emergencia (dolor de pecho, ideas de autolesión, desmayo, sangrado, etc.), NO das consejos: indícale contactar de inmediato a servicios de emergencia locales o líneas de ayuda.

ESTILO: respuestas breves y accionables, con pasos concretos. Incluye un recordatorio suave de que es orientación educativa cuando sea pertinente.`;

// Señales de emergencia → respuesta de seguridad sin llamar al modelo.
const EMERGENCY_PATTERNS = [
  /dolor (de )?pecho/i,
  /no puedo respirar|dificultad para respirar/i,
  /suicid|quitarme la vida|autolesi|hacerme da[ñn]o/i,
  /desmay|inconscien/i,
  /sangrado (abundante|fuerte)|vomito sangre|sangre en/i,
  /convulsi/i,
  /entumecimiento.*(cara|brazo)|no siento (el|la) (brazo|cara)/i,
];

const EMERGENCY_REPLY =
  "Lo que describes puede ser una urgencia médica. Por favor contacta de inmediato a los servicios de emergencia de tu país (en México, 911) o acude al hospital más cercano. Si tienes pensamientos de hacerte daño, busca apoyo ahora mismo con una línea de ayuda local. No estás solo. 💚";

function fallbackReply(message: string): string {
  return `Gracias por escribir. En este momento el asistente con IA aún no está activado (falta configurar la llave del servicio), pero puedo orientarte con lo esencial:

• Llena tu perfil en /vitala/onboarding para recibir un plan personalizado según tus datos y alergias.
• Prioriza verdura en dos comidas, proteína suficiente, agua y sueño constante.
• Recuerda: esto es orientación educativa y no sustituye a un profesional de la salud.

Tu mensaje: "${message.slice(0, 200)}"`;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: Request) {
  let body: { messages?: ChatMessage[]; profileSummary?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  const last = messages[messages.length - 1]?.content ?? "";

  // 1) Guardrail de emergencia (antes de cualquier modelo).
  if (EMERGENCY_PATTERNS.some((re) => re.test(last))) {
    return NextResponse.json({ reply: EMERGENCY_REPLY, safety: "emergency" });
  }

  // 2) Sin llave → respuesta segura por reglas.
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ reply: fallbackReply(last), degraded: true });
  }

  // 3) Llamada a Claude con system prompt de seguridad.
  const system = body.profileSummary
    ? `${SYSTEM_PROMPT}\n\nCONTEXTO DEL USUARIO (de su perfil): ${body.profileSummary}`
    : SYSTEM_PROMPT;

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
        max_tokens: 700,
        system,
        messages: messages.slice(-10).map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Anthropic error", res.status, detail);
      return NextResponse.json({ reply: fallbackReply(last), degraded: true });
    }

    const data = await res.json();
    const reply =
      data?.content?.map((b: { text?: string }) => b.text ?? "").join("").trim() ||
      fallbackReply(last);
    return NextResponse.json({ reply });
  } catch (e) {
    console.error("Coach route error", e);
    return NextResponse.json({ reply: fallbackReply(last), degraded: true });
  }
}
