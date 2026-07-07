"use client";

import { useEffect, useRef, useState } from "react";
import { vitala } from "@/lib/brand";
import { loadProfile } from "@/lib/store";
import type { Profile } from "@/lib/types";

const C = vitala.colors;

interface Msg {
  role: "user" | "assistant";
  content: string;
}

function profileSummary(p: Profile | null): string {
  if (!p) return "";
  const allergies = p.allergies.length ? p.allergies.join(", ") : "ninguna declarada";
  const flags = [
    p.pregnantOrLactating && "embarazo/lactancia",
    p.hasMedicalCondition && `condición médica (${p.conditionNotes || "no especificada"})`,
    p.takesMedication && "toma medicamentos",
  ].filter(Boolean).join("; ");
  return `Nombre: ${p.name}. Edad: ${p.age}. Sexo: ${p.sex}. Meta: ${p.goal}. Preferencia: ${p.preference}. Alergias: ${allergies}. Banderas: ${flags || "ninguna"}.`;
}

const SUGGESTIONS = [
  "¿Qué desayuno saludable puedo hacer en 10 minutos?",
  "Dame ideas de snacks bajos en calorías",
  "¿Cómo empiezo a tener mejores hábitos?",
  "Tips para dormir mejor",
];

export default function Coach() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "¡Hola! Soy tu coach de Vitala 💚 Te oriento con nutrición, hábitos y bienestar. No doy diagnósticos: ante temas médicos te invito a consultar a un profesional. ¿En qué te ayudo hoy?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => setProfile(loadProfile()), []);
  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, loading]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next, profileSummary: profileSummary(profile) }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply ?? "…" }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Tuve un problema de conexión. Intenta de nuevo en un momento." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-13rem)] max-w-2xl flex-col">
      <div className="mb-3">
        <h1 className="text-2xl font-bold">Coach Vitala</h1>
        <p className="text-xs opacity-60">
          Orientación educativa. No realiza diagnósticos ni reemplaza a un profesional de la salud.
        </p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className="max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm"
              style={
                m.role === "user"
                  ? { background: C.brand, color: "#000" }
                  : { background: C.bgSoft, border: "1px solid rgba(74,222,128,.15)" }
              }
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl px-4 py-3 text-sm" style={{ background: C.bgSoft }}>
              <span className="opacity-60">Escribiendo…</span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {messages.length <= 1 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button key={s} onClick={() => send(s)}
              className="rounded-full border px-3 py-1.5 text-xs"
              style={{ borderColor: "rgba(74,222,128,.25)" }}>
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => { e.preventDefault(); send(input); }}
        className="mt-3 flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu pregunta…"
          className="flex-1 rounded-full border bg-transparent px-4 py-3 text-sm outline-none"
          style={{ borderColor: "rgba(74,222,128,.25)" }}
        />
        <button type="submit" disabled={loading}
          className="rounded-full px-5 py-3 text-sm font-semibold text-black disabled:opacity-50"
          style={{ background: C.brand }}>
          Enviar
        </button>
      </form>
    </div>
  );
}
