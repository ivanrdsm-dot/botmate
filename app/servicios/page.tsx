import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import Process from "@/components/Process";
import CTA from "@/components/CTA";
import { ArrowUpRight } from "lucide-react";
export const metadata: Metadata = {
  title: "Servicios · Implementación, capacitación y soporte",
  description:
    "Conoce los pasos para evaluar e implementar robots con Botmate: diagnóstico, configuración, capacitación y seguimiento según tu propuesta.",
  alternates: { canonical: "/servicios", languages: {"es-MX": "/servicios", en: "/en/services"} },
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="Servicios"
        title={
          <>
            La tecnología funciona
            <br />
            mejor <span>en equipo.</span>
          </>
        }
        description="Integrar un robot implica conocer el espacio, preparar al personal y definir cómo mantener la operación. Revisamos contigo cada etapa."
      />
      <Process />
      <section className="section-space">
        <div className="container-x info-grid">
          {[
            {
              title: "Renta para tu proyecto",
              desc: "Consulta equipos y condiciones para eventos o uso en tu negocio.",
              href: "/renta",
            },
            {
              title: "Compra con visión operativa",
              desc: "Evalúa modelo, accesorios y puesta en marcha dentro de una misma propuesta.",
              href: "/venta",
            },
            {
              title: "Refacciones y mantenimiento",
              desc: "Revisa compatibilidad y opciones de atención para tu equipo actual.",
              href: "/refacciones",
            },
          ].map((c) => (
            <article key={c.href} className="info-card">
              <h2>{c.title}</h2>
              <p>{c.desc}</p>
              <Link className="text-link" href={c.href}>
                Conocer el servicio
                <ArrowUpRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <CTA subtitle="Pide que tu propuesta detalle cobertura, capacitación, mantenimiento y condiciones de soporte." />
    </>
  );
}
