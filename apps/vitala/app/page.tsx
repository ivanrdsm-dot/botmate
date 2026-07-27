import Link from "next/link";
import Reveal from "@/components/Reveal";
import VitalaAurora from "@/components/VitalaAurora";
import { vitala } from "@/lib/brand";

const C = vitala.colors;

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border p-5 text-center" style={{ borderColor: "rgba(74,222,128,.18)", background: C.bgSoft }}>
      <div className="text-2xl font-bold" style={{ color: C.brandLight }}>{value}</div>
      <div className="mt-1 text-xs opacity-70">{label}</div>
    </div>
  );
}

function Pillar({ emoji, title, text }: { emoji: string; title: string; text: string }) {
  return (
    <div className="group rounded-2xl border p-5 transition-transform duration-300 hover:-translate-y-1" style={{ borderColor: "rgba(74,222,128,.15)", background: C.bgSoft }}>
      <div className="text-2xl transition-transform duration-300 group-hover:scale-110">{emoji}</div>
      <h3 className="mt-2 font-semibold" style={{ color: C.brandLight }}>{title}</h3>
      <p className="mt-1 text-sm opacity-75">{text}</p>
    </div>
  );
}

export default function VitalaHome() {
  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="relative pt-6 text-center">
        <VitalaAurora />
        <Reveal>
          <span
            className="inline-block rounded-full px-3 py-1 text-xs font-medium"
            style={{ background: "rgba(245,158,11,.12)", color: C.accent }}
          >
            {vitala.lifetimePriceLabel}
          </span>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
            Nutrición de primer mundo,{" "}
            <span
              style={{
                background: `linear-gradient(120deg, ${C.brandLight}, ${C.brand} 60%, ${C.accent})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              al alcance de toda la humanidad.
            </span>
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="mx-auto mt-5 max-w-2xl text-base opacity-80 sm:text-lg">
            {vitala.description} Cuéntanos tus datos, tus alergias y tu meta:
            armamos tu plan en segundos y te acompañamos a construir hábitos para
            toda la vida.
          </p>
        </Reveal>
        <Reveal delay={3}>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/onboarding" className="rounded-full px-6 py-3 font-semibold text-black transition-transform hover:scale-105" style={{ background: C.brand }}>
              Crear mi plan gratis
            </Link>
            <Link href="/uno-peso" className="rounded-full border px-6 py-3 font-semibold transition-transform hover:scale-105" style={{ borderColor: C.accent, color: C.accent }}>
              Acceso de por vida · $1
            </Link>
          </div>
          <p className="mt-4 text-xs opacity-60">Sin tarjeta para empezar. Tus datos se quedan en tu dispositivo.</p>
        </Reveal>
      </section>

      {/* Misión */}
      <Reveal>
        <section className="grid gap-4 sm:grid-cols-3">
          <Stat value="1 moneda" label="Pago único, acceso de por vida" />
          <Stat value="0 diagnósticos" label="Solo orientación con base científica" />
          <Stat value="100% tuyo" label="Privacidad por diseño: tus datos contigo" />
        </section>
      </Reveal>

      {/* Pilares del ecosistema */}
      <section>
        <Reveal>
          <h2 className="text-center text-3xl font-bold">Un ecosistema, no una app</h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm opacity-70">
            Cuidamos la salud de forma integral, con prácticas de evidencia y un
            lenguaje que cualquier persona entiende.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { emoji: "🥗", title: "Nutrición personalizada", text: "Plan de comidas según tus datos, metas y alergias. Calorías y macros con fórmulas clínicas." },
            { emoji: "🔁", title: "Hábitos atómicos", text: "Pequeños cambios sostenibles con anclajes y seguimiento, no dietas imposibles." },
            { emoji: "🧘", title: "Bienestar emocional", text: "Micro-prácticas de respiración, gratitud y manejo del estrés." },
            { emoji: "📚", title: "Educación en salud", text: "Mitos vs. evidencia en lenguaje claro para decidir mejor." },
            { emoji: "💧", title: "Prevención diaria", text: "Hidratación, sueño y movimiento como base de una vida larga." },
            { emoji: "✨", title: "Motivación", text: "Un acompañamiento que celebra el progreso real, no la perfección." },
          ].map((p, i) => (
            <Reveal key={p.title} delay={i % 3}>
              <Pillar {...p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Modelo 1 peso */}
      <Reveal>
        <section
          className="relative overflow-hidden rounded-3xl border p-8 text-center"
          style={{ borderColor: "rgba(245,158,11,.25)", background: "rgba(245,158,11,.06)" }}
        >
          <h2 className="text-3xl font-bold">Por qué una sola moneda</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm opacity-80">
            Creemos que el acceso a la salud no debe depender de tu nivel económico.
            Por eso el acceso de por vida cuesta el símbolo de{" "}
            <strong style={{ color: C.accent }}>una moneda de tu país</strong>. La
            sostenibilidad llega de servicios premium opcionales y alianzas, nunca
            de excluir a quien menos tiene.
          </p>
          <Link href="/uno-peso" className="mt-6 inline-block rounded-full px-6 py-3 font-semibold text-black transition-transform hover:scale-105" style={{ background: C.accent }}>
            Por un peso, empieza hoy
          </Link>
        </section>
      </Reveal>

      {/* Seguridad */}
      <Reveal>
        <section className="rounded-2xl border p-6 text-sm opacity-80" style={{ borderColor: "rgba(74,222,128,.15)" }}>
          <h3 className="font-semibold" style={{ color: C.brandLight }}>Seguridad primero</h3>
          <p className="mt-2">
            Antes de sugerir cualquier plan te preguntamos por tus alergias,
            condiciones médicas, medicamentos y etapa de vida. Si detectamos un
            riesgo, te pedimos consultar a un profesional. Nunca recomendamos
            déficits calóricos peligrosos.
          </p>
        </section>
      </Reveal>
    </div>
  );
}
