import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import RobotCatalog from "@/components/RobotCatalog";
import CTA from "@/components/CTA";
import { robots } from "@/lib/robots";
import { itemListLd } from "@/lib/seo";
export const metadata: Metadata = {
  title: "Catálogo de robots Pudu Robotics en México",
  description:
    "Compara aplicaciones de robots de entrega, publicidad, limpieza y transporte. Consulta configuración y disponibilidad con Botmate.",
  alternates: { canonical: "/robots" },
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="Robots"
        title={
          <>
            El robot adecuado.
            <br />
            <span>Para tu día a día.</span>
          </>
        }
        description="Explora modelos de referencia por la tarea que necesitas resolver. Botmate te ayuda a evaluar su configuración y disponibilidad para tu proyecto."
      />
      <section className="section-space section-compact">
        <div className="container-x">
          <RobotCatalog />
        </div>
      </section>
      <CTA />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            itemListLd(
              robots.map((r) => ({ name: r.name, url: `/robots/${r.slug}` })),
            ),
          ),
        }}
      />
    </>
  );
}
