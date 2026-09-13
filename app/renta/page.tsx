import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import CTA from "@/components/CTA";
import { ArrowUpRight } from "lucide-react";
export const metadata: Metadata = {
  title: "Renta de robots en México",
  description:
    "Consulta un robot para tu operación o evento. El modelo, la duración, la logística y el alcance del servicio se definen en una propuesta a tu medida.",
  alternates: { canonical: "/renta" },
};
const cards = [
  {
    tag: "01 / TU NECESIDAD",
    title: "Un evento o activación",
    desc: "Comparte la fecha, la sede y la experiencia que quieres crear. Así podemos revisar opciones de servicio y publicidad.",
    items: [
      "Tipo de audiencia y evento",
      "Duración y horario de operación",
      "Acceso y condiciones del recinto",
    ],
  },
  {
    tag: "02 / TU OPERACIÓN",
    title: "Uso en tu negocio",
    desc: "Evalúa cómo encaja el robot en los recorridos habituales de tu equipo antes de definir un plazo.",
    items: [
      "Tarea y volumen de trabajo",
      "Superficies y rutas",
      "Disponibilidad del equipo",
    ],
  },
  {
    tag: "03 / LA PROPUESTA",
    title: "El alcance por escrito",
    desc: "Una buena cotización deja claros los equipos, accesorios, servicios y responsabilidades.",
    items: [
      "Entrega y puesta en marcha",
      "Capacitación y mantenimiento",
      "Garantía y condiciones de renta",
    ],
  },
];
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="Renta de robots"
        title="Prueba una nueva forma de operar."
        description="Consulta un robot para tu operación o evento. El modelo, la duración, la logística y el alcance del servicio se definen en una propuesta a tu medida."
      />
      <section className="section-space section-compact">
        <div className="container-x info-grid">
          {cards.map((c) => (
            <article className="info-card" key={c.tag}>
              <p className="eyebrow">{c.tag}</p>
              <h2>{c.title}</h2>
              <p>{c.desc}</p>
              <ul>
                {c.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <Link href="/contacto?interes=Renta" className="text-link">
                Consultar opciones
                <ArrowUpRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <CTA
        title="Una propuesta que considere cada detalle."
        subtitle="Precios, disponibilidad, plazos y condiciones se confirman directamente con Botmate para tu proyecto."
        primaryLabel="Solicitar una cotización"
        primaryHref="/contacto?interes=Renta"
      />
    </>
  );
}
