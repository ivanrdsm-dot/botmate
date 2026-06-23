import Link from "next/link";
import { vitala } from "@/lib/vitala/brand";

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
    <div className="rounded-2xl border p-5" style={{ borderColor: "rgba(74,222,128,.15)", background: C.bgSoft }}>
      <div className="text-2xl">{emoji}</div>
      <h3 className="mt-2 font-semibold" style={{ color: C.brandLight }}>{title}</h3>
      <p className="mt-1 text-sm opacity-75">{text}</p>
    </div>
  );
}

export default function VitalaHome() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="pt-6 text-center">
        <span
          className="inline-block rounded-full px-3 py-1 text-xs font-medium"
          style={{ background: "rgba(245,158,11,.12)", color: C.accent }}
        >
          {vitala.lifetimePriceLabel}
        </span>
        <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
          Nutrición de primer mundo,{" "}
          <span style={{ color: C.brandLight }}>al alcance de toda la humanidad.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base opacity-80 sm:text-lg">
          {vitala.description} Cuéntanos tus datos, tus alergias y tu meta:
          armamos tu plan en segundos y te acompañamos a construir hábitos para
          toda la vida.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/vitala/onboarding"
            className="rounded-full px-6 py-3 font-semibold text-black"
            style={{ background: C.brand }}
          >
            Crear mi plan gratis
          </Link>
          <Link
            href="/vitala/bienestar"
            className="rounded-full border px-6 py-3 font-semibold"
            style={{ borderColor: C.brand, color: C.brandLight }}
          >
            Explorar bienestar
          </Link>
        </div>
        <p className="mt-4 text-xs opacity-60">
          Sin tarjeta. Tus datos se quedan en tu dispositivo.
        </p>
      </section>

      {/* Misión */}
      <section className="grid gap-4 sm:grid-cols-3">
        <Stat value="1 moneda" label="Pago único, acceso de por vida" />
        <Stat value="0 diagnósticos" label="Solo orientación con base científica" />
        <Stat value="100% tuyo" label="Privacidad por diseño: tus datos contigo" />
      </section>

      {/* Pilares del ecosistema */}
      <section>
        <h2 className="text-center text-2xl font-bold">Un ecosistema, no una app</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm opacity-70">
          Cuidamos la salud de forma integral, con prácticas de evidencia y un
          lenguaje que cualquier persona entiende.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Pillar emoji="🥗" title="Nutrición personalizada" text="Plan de comidas según tus datos, metas y alergias. Calorías y macros calculados con fórmulas clínicas." />
          <Pillar emoji="🔁" title="Hábitos atómicos" text="Pequeños cambios sostenibles con anclajes y seguimiento, no dietas imposibles." />
          <Pillar emoji="🧘" title="Bienestar emocional" text="Micro-prácticas de respiración, gratitud y manejo del estrés." />
          <Pillar emoji="📚" title="Educación en salud" text="Mitos vs. evidencia en lenguaje claro para decidir mejor." />
          <Pillar emoji="💧" title="Prevención diaria" text="Hidratación, sueño y movimiento como base de una vida larga." />
          <Pillar emoji="✨" title="Motivación" text="Un acompañamiento que celebra el progreso real, no la perfección." />
        </div>
      </section>

      {/* Modelo */}
      <section
        className="rounded-3xl border p-8 text-center"
        style={{ borderColor: "rgba(245,158,11,.25)", background: "rgba(245,158,11,.06)" }}
      >
        <h2 className="text-2xl font-bold">Por qué una sola moneda</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm opacity-80">
          Creemos que el acceso a la salud no debe depender de tu nivel económico.
          Por eso el acceso de por vida cuesta el símbolo de{" "}
          <strong style={{ color: C.accent }}>una moneda de tu país</strong>. La
          sostenibilidad llega de servicios premium opcionales y alianzas, nunca
          de excluir a quien menos tiene.
        </p>
        <Link
          href="/vitala/onboarding"
          className="mt-6 inline-block rounded-full px-6 py-3 font-semibold text-black"
          style={{ background: C.accent }}
        >
          Unirme al movimiento
        </Link>
      </section>

      {/* Seguridad */}
      <section className="rounded-2xl border p-6 text-sm opacity-80" style={{ borderColor: "rgba(74,222,128,.15)" }}>
        <h3 className="font-semibold" style={{ color: C.brandLight }}>Seguridad primero</h3>
        <p className="mt-2">
          Antes de sugerir cualquier plan te preguntamos por tus alergias,
          condiciones médicas, medicamentos y etapa de vida. Si detectamos un
          riesgo, te pedimos consultar a un profesional. Nunca recomendamos
          déficits calóricos peligrosos.
        </p>
      </section>
    </div>
  );
}
