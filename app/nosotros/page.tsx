import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import CTA from "@/components/CTA";
import { ArrowUpRight } from "lucide-react";
export const metadata: Metadata = {
  title: "Acerca de Botmate · Robótica para negocios en México",
  description:
    "Botmate acerca soluciones de robótica de servicio a negocios en México. Conoce nuestro enfoque para evaluar tareas, equipos y aplicaciones.",
  alternates: { canonical: "/nosotros" },
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="Acerca de Botmate"
        title={
          <>
            La robótica tiene
            <br />
            <span>un lado humano.</span>
          </>
        }
        description="Creemos en la tecnología que deja más espacio para atender, crear y conectar. Acercamos robots de servicio a las necesidades del negocio mexicano."
      />
      <section className="section-space section-compact">
        <div className="container-x editorial-grid">
          <figure className="editorial-image">
            <Image
              src="/media/booth-field.webp"
              alt="Exhibición de equipos y banner de Botmate en un espacio interior"
              fill
              sizes="(min-width: 900px) 45vw, 100vw"
              className="object-cover"
            />
          </figure>
          <div className="editorial-copy">
            <p className="eyebrow">Botmate · México</p>
            <h2>
              Entender tu negocio
              <br />
              es el punto de partida.
            </h2>
            <p>
              La selección de un robot comienza por una pregunta concreta: ¿qué
              tarea quieres mejorar? A partir de ahí, revisamos las
              posibilidades de entrega, publicidad y limpieza.
            </p>
            <p>
              Botmate acompaña la evaluación comercial de soluciones de Pudu
              Robotics en México. El fabricante desarrolla los equipos; contigo
              definimos qué modelo y configuración tiene sentido para tu
              proyecto.
            </p>
            <Link href="/contacto" className="btn-primary">
              Conversemos
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section-space soft-section">
        <div className="container-x info-grid">
          {[
            {
              title: "Claridad para decidir",
              desc: "Aplicaciones concretas y condiciones de la propuesta por escrito.",
            },
            {
              title: "Personas al centro",
              desc: "La tecnología como apoyo para las tareas del equipo y la experiencia de tus clientes.",
            },
            {
              title: "Atención al contexto",
              desc: "Cada espacio, recorrido y ritmo de trabajo merece una evaluación propia.",
            },
          ].map((v) => (
            <div className="info-card" key={v.title}>
              <h2>{v.title}</h2>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
