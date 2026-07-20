import Link from "next/link";
import Reveal from "@/components/Reveal";
import VitalaAurora from "@/components/VitalaAurora";
import { vitala } from "@/lib/brand";

const C = vitala.colors;

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="card p-5 text-center">
      <div className="text-2xl font-bold" style={{ color: C.brandLight }}>{value}</div>
      <div className="mt-1 text-xs" style={{ color: C.textMuted }}>{label}</div>
    </div>
  );
}

function Pillar({ emoji, title, text }: { emoji: string; title: string; text: string }) {
  return (
    <div className="card group p-5">
      <div className="text-2xl transition-transform duration-300 group-hover:scale-110">{emoji}</div>
      <h3 className="mt-2 font-semibold" style={{ color: C.brandLight }}>{title}</h3>
      <p className="mt-1 text-sm" style={{ color: C.textMuted }}>{text}</p>
    </div>
  );
}

export default function VitalaHome() {
  return (
    <div className="space-y-20">
      {/* ── Hero ──────────────────────────────────── */}
      <section className="relative pt-6 text-center">
        <VitalaAurora />
        <Reveal>
          <span className="badge-amber">{vitala.lifetimePriceLabel}</span>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
            Todo el mundo necesita{" "}
            <span
              style={{
                background: `linear-gradient(120deg, ${C.brandLight}, ${C.brand} 60%, ${C.accent})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              acceso a la salud.
            </span>
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg" style={{ color: C.textMuted }}>
            Un plan de alimentación hecho para ti, con las mejores recetas del mundo,
            tus alergias respetadas y un coach que te acompaña todos los días.
            Sin mensualidades. Sin letras chiquitas. Una moneda, una vez, para siempre.
          </p>
        </Reveal>
        <Reveal delay={3}>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/onboarding" className="btn-brand glow">
              Crear mi plan gratis 🌱
            </Link>
            <Link
              href="/uno-peso"
              className="rounded-full border px-6 py-2.5 font-semibold transition-transform hover:scale-105"
              style={{ borderColor: C.accent, color: C.accent }}
            >
              Acceso de por vida · $1
            </Link>
          </div>
          <p className="mt-4 text-xs" style={{ color: C.textMuted }}>
            Sin tarjeta para empezar. Tus datos se quedan en tu dispositivo.
          </p>
        </Reveal>
      </section>

      {/* ── Stats ─────────────────────────────────── */}
      <Reveal>
        <section className="grid gap-4 sm:grid-cols-3">
          <Stat value="1 moneda" label="Pago único, acceso de por vida" />
          <Stat value="33 recetas del mundo" label="De México a Japón, con preparación paso a paso" />
          <Stat value="100% tuyo" label="Privacidad por diseño: tus datos contigo" />
        </section>
      </Reveal>

      {/* ── Manifiesto ─────────────────────────────── */}
      <Reveal>
        <section
          className="relative overflow-hidden rounded-3xl border p-8 text-center sm:p-12"
          style={{ borderColor: "rgba(52,211,153,0.20)", background: C.bgSoft }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: C.accent }}>
            Nuestro porqué
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-bold leading-snug sm:text-3xl">
            La salud nunca debió ser un privilegio.
          </h2>
          <div className="mx-auto mt-5 max-w-2xl space-y-4 text-sm leading-relaxed sm:text-base" style={{ color: C.textMuted }}>
            <p>
              En algún lugar del mundo, ahora mismo, hay una mamá que quiere alimentar
              mejor a sus hijos pero no puede pagar un nutriólogo. Un joven que quiere
              cambiar su vida pero cada app le pide una mensualidad que no tiene. Un
              abuelo que solo necesita que alguien le explique, con cariño y en su idioma,
              qué poner en su plato.
            </p>
            <p>
              <strong style={{ color: C.brandLight }}>Vitala existe para ellos. Para ti.</strong>{" "}
              Nutrición de primer mundo — fórmulas clínicas, recetas de todas las cocinas
              del planeta, hábitos con evidencia — al precio de una sola moneda de tu país.
              Un peso, un sol, un quetzal, un dólar. Una vez. Para toda la vida.
            </p>
            <p style={{ color: C.brandLight }}>
              Porque todo el mundo necesita acceso a la salud. Y todo el mundo eres tú. 💚
            </p>
          </div>
        </section>
      </Reveal>

      {/* ── Pilares ───────────────────────────────── */}
      <section>
        <Reveal>
          <h2 className="text-center text-3xl font-bold">Un ecosistema, no una app</h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm" style={{ color: C.textMuted }}>
            Cuidamos la salud de forma integral, con prácticas de evidencia y un
            lenguaje que cualquier persona entiende.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { emoji: "🥗", title: "Nutrición personalizada", text: "Plan semanal según tus datos, metas y alergias. Calorías y macros con fórmulas clínicas." },
            { emoji: "🌎", title: "Recetas del mundo", text: "De los tacos de nopal al salmón teriyaki: platillos saludables con preparación paso a paso." },
            { emoji: "🔁", title: "Hábitos atómicos", text: "Pequeños cambios sostenibles con anclajes y seguimiento, no dietas imposibles." },
            { emoji: "🧘", title: "Bienestar emocional", text: "Micro-prácticas de respiración, gratitud y manejo del estrés." },
            { emoji: "📚", title: "Educación en salud", text: "Mitos vs. evidencia en lenguaje claro para decidir mejor." },
            { emoji: "✨", title: "Motivación diaria", text: "Un acompañamiento que celebra el progreso real, no la perfección." },
          ].map((p, i) => (
            <Reveal key={p.title} delay={i % 3}>
              <Pillar {...p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Una moneda ─────────────────────────────── */}
      <Reveal>
        <section
          className="relative overflow-hidden rounded-3xl border p-8 text-center"
          style={{ borderColor: "rgba(180,83,9,0.22)", background: "rgba(247,178,78,0.12)" }}
        >
          <h2 className="text-3xl font-bold">Por qué una sola moneda</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm" style={{ color: C.textMuted }}>
            Creemos que el acceso a la salud no debe depender de tu nivel económico.
            Por eso el acceso de por vida cuesta el símbolo de{" "}
            <strong style={{ color: C.accent }}>una moneda de tu país</strong>. La
            sostenibilidad llega de servicios premium opcionales y alianzas, nunca
            de excluir a quien menos tiene.
          </p>
          <Link
            href="/uno-peso"
            className="mt-6 inline-block rounded-full px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
            style={{ background: C.accent, boxShadow: "0 6px 18px -6px rgba(180,83,9,0.45)" }}
          >
            Por un peso, empieza hoy
          </Link>
        </section>
      </Reveal>

      {/* ── Seguridad ──────────────────────────────── */}
      <Reveal>
        <section className="card p-6 text-sm" style={{ color: C.textMuted }}>
          <h3 className="font-semibold" style={{ color: C.brandLight }}>Seguridad primero 🛡️</h3>
          <p className="mt-2">
            Antes de sugerir cualquier plan te preguntamos por tus alergias,
            condiciones médicas, medicamentos y etapa de vida. Si detectamos un
            riesgo, te pedimos consultar a un profesional. Nunca recomendamos
            déficits calóricos peligrosos, y nunca diagnosticamos.
          </p>
        </section>
      </Reveal>
    </div>
  );
}
