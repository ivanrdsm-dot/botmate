import { vitala } from "@/lib/vitala/brand";
import { HABITS, LESSONS, PRACTICES, motivationOfDay } from "@/lib/vitala/wellness";

const C = vitala.colors;

const PILLAR_EMOJI: Record<string, string> = {
  nutricion: "🥗",
  movimiento: "🚶",
  sueno: "😴",
  mente: "🧠",
  hidratacion: "💧",
};

export const metadata = { title: "Bienestar" };

export default function Bienestar() {
  return (
    <div className="space-y-12">
      {/* Motivación del día */}
      <section
        className="rounded-3xl border p-6 text-center"
        style={{ borderColor: "rgba(245,158,11,.25)", background: "rgba(245,158,11,.06)" }}
      >
        <div className="text-xs uppercase tracking-wide opacity-60">Motivación de hoy</div>
        <p className="mt-2 text-lg font-semibold" style={{ color: C.accent }}>
          “{motivationOfDay()}”
        </p>
      </section>

      {/* Hábitos */}
      <section>
        <h2 className="text-2xl font-bold">Hábitos para construir</h2>
        <p className="mt-1 text-sm opacity-70">Pequeños cambios sostenibles, con un anclaje claro.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {HABITS.map((h) => (
            <div key={h.id} className="rounded-2xl border p-5" style={{ borderColor: "rgba(74,222,128,.15)", background: C.bgSoft }}>
              <div className="flex items-center gap-2">
                <span className="text-xl">{PILLAR_EMOJI[h.pillar]}</span>
                <h3 className="font-semibold" style={{ color: C.brandLight }}>{h.title}</h3>
              </div>
              <p className="mt-2 text-sm opacity-75">{h.why}</p>
              <p className="mt-2 text-xs opacity-60">⏰ Anclaje: {h.cue}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bienestar emocional */}
      <section>
        <h2 className="text-2xl font-bold">Bienestar emocional</h2>
        <p className="mt-1 text-sm opacity-70">Micro-prácticas para regular el estrés. No sustituyen acompañamiento psicológico.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {PRACTICES.map((pr) => (
            <div key={pr.id} className="rounded-2xl border p-5" style={{ borderColor: "rgba(74,222,128,.15)", background: C.bgSoft }}>
              <h3 className="font-semibold" style={{ color: C.brandLight }}>{pr.title}</h3>
              <div className="mt-1 text-xs opacity-60">⏱ {pr.durationMin} min</div>
              <ol className="mt-3 space-y-1 text-sm opacity-80">
                {pr.steps.map((s, i) => (
                  <li key={i}>{i + 1}. {s}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* Educación */}
      <section>
        <h2 className="text-2xl font-bold">Educación en salud</h2>
        <p className="mt-1 text-sm opacity-70">Mitos frecuentes vs. lo que dice la evidencia.</p>
        <div className="mt-5 space-y-3">
          {LESSONS.map((l) => (
            <div key={l.id} className="rounded-2xl border p-5" style={{ borderColor: "rgba(74,222,128,.15)", background: C.bgSoft }}>
              <div className="text-xs uppercase tracking-wide opacity-50">{l.topic}</div>
              <p className="mt-1 text-sm" style={{ color: "#FCA5A5" }}>❌ Mito: {l.myth}</p>
              <p className="mt-1 text-sm" style={{ color: C.brandLight }}>✅ Evidencia: {l.fact}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="rounded-2xl border p-4 text-center text-xs opacity-60" style={{ borderColor: "rgba(74,222,128,.15)" }}>
        Este contenido es educativo y general. Si atraviesas una crisis emocional o
        síntomas de salud, contacta a un profesional o a los servicios de
        emergencia de tu país.
      </p>
    </div>
  );
}
