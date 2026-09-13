import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  UtensilsCrossed,
  MonitorPlay,
  Sparkles,
} from "lucide-react";
import Hero from "@/components/Hero";
import GoogleReviews from "@/components/GoogleReviews";
import RobotCard from "@/components/RobotCard";
import SectionTitle from "@/components/SectionTitle";
import FieldGallery from "@/components/FieldGallery";
import FilmGallery from "@/components/FilmGallery";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import { robots } from "@/lib/robots";
export const metadata: Metadata = {
  title: "Robots en México · Renta, venta y soluciones Botmate",
  description:
    "Robots de servicio para entrega, publicidad y limpieza. Explora soluciones Pudu Robotics y consulta una demostración con Botmate en México.",
  alternates: { canonical: "/" },
};
const solutions = [
  {
    icon: UtensilsCrossed,
    title: "Servicio que acompaña.",
    desc: "Apoya el traslado de alimentos y artículos para que tu equipo se concentre en atender.",
    tag: "ENTREGA Y HOSPITALIDAD",
    href: "/sectores#restaurantes",
  },
  {
    icon: MonitorPlay,
    title: "Marcas que conectan.",
    desc: "Lleva tu contenido al recorrido de los visitantes con pantallas y experiencias de recepción.",
    tag: "PUBLICIDAD Y EVENTOS",
    href: "/sectores#retail",
  },
  {
    icon: Sparkles,
    title: "Espacios que se cuidan.",
    desc: "Encuentra equipos para el cuidado de pisos, de la limpieza autónoma al trabajo con operador.",
    tag: "LIMPIEZA COMERCIAL",
    href: "/sectores#oficinas",
  },
];
export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="technology-ribbon" aria-label="Soluciones Botmate"><span>ENTREGA</span><i/><span>PUBLICIDAD</span><i/><span>LIMPIEZA</span><i/><span>EXPERIENCIA HUMANA</span></div>
      <section id="soluciones" className="section-space solutions-section">
        <div className="container-x">
          <div className="section-heading-row">
            <SectionTitle
              eyebrow="Una tarea. Una solución."
              title={
                <>
                  Haz espacio para
                  <br />
                  una mejor operación.
                </>
              }
            />
            <p className="section-side-copy">
              La robótica tiene sentido cuando resuelve
              <br className="desktop-break" /> algo concreto en tu día a día.
            </p>
          </div>
          <div className="solution-grid">
            {solutions.map((s, i) => (
              <Link key={s.tag} href={s.href} className="solution-card">
                <div className="solution-card-top">
                  <s.icon size={26} strokeWidth={1.4} />
                  <span>0{i + 1}</span>
                </div>
                <p className="tiny-label">{s.tag}</p>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="text-link">
                  Descubrir solución
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section-space catalog-section">
        <div className="container-x">
          <div className="section-heading-row">
            <SectionTitle
              eyebrow="Conoce las posibilidades"
              title={
                <>
                  Cada robot tiene
                  <br />
                  su especialidad.
                </>
              }
            />
            <Link href="/robots" className="text-link">
              Explorar el catálogo
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="catalog-grid">
            {[robots[0], robots[1], robots[5]].map((r) => (
              <RobotCard key={r.slug} robot={r} />
            ))}
          </div>
          <p className="catalog-note">
            La selección del modelo, su configuración y disponibilidad se
            confirman con tu asesor.
          </p>
        </div>
      </section>
      <FilmGallery />
      <FieldGallery />
      <Process />
      <GoogleReviews />
      <FAQ />
      <CTA />
    </>
  );
}
