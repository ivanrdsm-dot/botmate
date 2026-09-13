import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import CTA from "@/components/CTA";
import { ArrowUpRight } from "lucide-react";
export const metadata: Metadata = {
  title: "Refacciones y mantenimiento en México",
  description:
    "Comparte el modelo, la versión y la necesidad de servicio para revisar compatibilidad, disponibilidad y opciones de atención.",
  alternates: { canonical: "/refacciones" },
};
const cards = [
  {
    tag: "01 / IDENTIFICAR",
    title: "Empecemos por el modelo",
    desc: "Una fotografía del equipo y su número de serie ayudan al asesor a identificar la versión correcta.",
    items: [
      "Modelo y año aproximado",
      "Síntoma o mensaje de error",
      "Ubicación del equipo",
    ],
  },
  {
    tag: "02 / REVISAR",
    title: "Consumibles y componentes",
    desc: "Consulta compatibilidad antes de comprar o instalar una pieza. La disponibilidad se confirma en la cotización.",
    items: [
      "Cepillos, filtros y consumibles",
      "Bandejas y componentes mecánicos",
      "Batería y módulos según diagnóstico",
    ],
  },
  {
    tag: "03 / COTIZAR",
    title: "Atención según diagnóstico",
    desc: "El alcance del mantenimiento depende del estado del robot y las condiciones de operación.",
    items: [
      "Revisión de la incidencia",
      "Propuesta de atención",
      "Recomendaciones de cuidado",
    ],
  },
];
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="Refacciones y mantenimiento"
        title="Cuida el equipo que ya trabaja contigo."
        description="Comparte el modelo, la versión y la necesidad de servicio para revisar compatibilidad, disponibilidad y opciones de atención."
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
              <Link href="/contacto?interes=Soporte" className="text-link">
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
        primaryHref="/contacto?interes=Soporte"
      />
    </>
  );
}
