import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageIntro from "@/components/PageIntro";
import CTA from "@/components/CTA";
import { robots } from "@/lib/robots";
export const metadata: Metadata = {
  title: "Soluciones de robótica por industria en México",
  description:
    "Explora aplicaciones para restaurantes, hoteles, retail, oficinas, logística y áreas de servicio. Evalúa tu espacio y proyecto con Botmate.",
  alternates: { canonical: "/sectores" },
};
const sectors = [
  {
    id: "restaurantes",
    title: "Restaurantes y hospitalidad",
    desc: "Apoya el traslado de alimentos, bebidas y vajilla en recorridos repetitivos. Tu equipo conserva la carga, descarga y atención al comensal.",
    evaluate:
      "Revisar pasillos con sillas ocupadas, cruces, acceso a cocina y volumen de servicio.",
    models: [0, 1, 4],
  },
  {
    id: "hoteles",
    title: "Hoteles y edificios",
    desc: "Evalúa la entrega de artículos y amenidades entre áreas. Las rutas entre pisos necesitan una revisión específica del edificio.",
    evaluate:
      "Confirmar compatibilidad de elevadores, puertas y configuración de compartimentos.",
    models: [3, 2],
  },
  {
    id: "retail",
    title: "Retail, marcas y eventos",
    desc: "Combina recepción y contenido en pantalla con la presencia del robot en el recorrido del visitante.",
    evaluate:
      "Definir contenido autorizado, puntos de interacción, aforo y condiciones del recinto.",
    models: [1, 0],
  },
  {
    id: "oficinas",
    title: "Oficinas y espacios comerciales",
    desc: "Incorpora equipos para el cuidado de pisos y organiza la limpieza según las necesidades de cada área.",
    evaluate:
      "Distinguir limpieza autónoma con CC1 de limpieza con operador mediante SH1.",
    models: [5, 6],
  },
  {
    id: "logistica",
    title: "Manufactura y logística",
    desc: "Evalúa el traslado de materiales entre estaciones, almacenes y áreas de producción.",
    evaluate:
      "Verificar carga, dimensiones, rutas, superficies y compatibilidad de accesorios.",
    models: [8, 9, 7],
  },
  {
    id: "salud",
    title: "Áreas de servicio en salud",
    desc: "Explora tareas de logística general y cuidado de pisos en áreas autorizadas por la institución.",
    evaluate:
      "La institución debe validar protocolos, zonas y materiales. No se atribuyen capacidades de desinfección o esterilización a estos equipos.",
    models: [7, 5],
  },
];
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="Soluciones por industria"
        title={
          <>
            Tu industria.
            <br />
            Sus retos. <span>Tu solución.</span>
          </>
        }
        description="Los robots pueden apoyar distintas tareas. Selecciona un contexto para explorar aplicaciones y los puntos que conviene evaluar."
      />
      <section className="section-space section-compact">
        <div className="container-x sector-list">
          {sectors.map((s, i) => (
            <article id={s.id} className="sector-row" key={s.id}>
              <span className="sector-number">0{i + 1}</span>
              <div>
                <h2>{s.title}</h2>
                <p>{s.desc}</p>
                <Link href="/contacto?interes=Demo" className="text-link">
                  Evaluar mi espacio
                  <ArrowUpRight size={17} />
                </Link>
              </div>
              <div>
                <div className="sector-models">
                  {s.models.map((n) => (
                    <Link key={n} href={`/robots/${robots[n].slug}`}>
                      {robots[n].name}
                    </Link>
                  ))}
                </div>
                <p>{s.evaluate}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
