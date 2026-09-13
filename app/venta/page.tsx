import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import CTA from "@/components/CTA";
import { ArrowUpRight } from "lucide-react";
export const metadata: Metadata = {
  title: "Compra de robots en México",
  description:
    "Evalúa una inversión en robótica a partir de tu operación real. Consulta el equipo, los accesorios y los servicios necesarios para ponerlo a trabajar.",
  alternates: { canonical: "/venta", languages: {"es-MX": "/venta", en: "/en/purchase"} },
};
const cards = [
  {
    tag: "01 / ELEGIR",
    title: "Parte del proceso",
    desc: "Identifica el recorrido o tarea que quieres mejorar, su frecuencia y las condiciones del espacio.",
    items: [
      "Carga y dimensiones",
      "Tipo de piso y pendientes",
      "Flujo de personas",
    ],
  },
  {
    tag: "02 / CONFIGURAR",
    title: "Define la solución completa",
    desc: "La versión del modelo importa. Incluye desde el inicio los accesorios y las integraciones que necesita tu proyecto.",
    items: [
      "Modelo y versión",
      "Estación de carga y consumibles",
      "Integraciones sujetas a evaluación",
    ],
  },
  {
    tag: "03 / IMPLEMENTAR",
    title: "Planea el ciclo de uso",
    desc: "Considera el mantenimiento y la formación del personal además del equipo.",
    items: [
      "Alcance de instalación",
      "Capacitación del personal",
      "Garantía y mantenimiento por cotizar",
    ],
  },
];
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="Compra de robots"
        title="Tecnología para tu siguiente etapa."
        description="Evalúa una inversión en robótica a partir de tu operación real. Consulta el equipo, los accesorios y los servicios necesarios para ponerlo a trabajar."
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
              <Link href="/contacto?interes=Compra" className="text-link">
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
        primaryHref="/contacto?interes=Compra"
      />
    </>
  );
}
