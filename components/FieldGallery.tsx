import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import SectionTitle from "./SectionTitle";
export const fieldPhotos = [
  {
    src: "/media/service-field.webp",
    alt: "Robot con bandejas de bebidas frente a asistentes en un evento interior",
    title: "El servicio se mueve.",
    tag: "Servicio y eventos",
  },
  {
    src: "/media/display-field.webp",
    alt: "Robot con pantalla publicitaria junto a un área verde",
    title: "Tu mensaje, presente.",
    tag: "Publicidad",
  },
  {
    src: "/media/fleet-field.webp",
    alt: "Equipos de entrega, pantalla y limpieza reunidos en un recinto",
    title: "Distintas tareas. Un equipo.",
    tag: "Soluciones en campo",
  },
];
export default function FieldGallery() {
  return (
    <section className="section-space field-section">
      <div className="container-x">
        <div className="section-heading-row">
          <SectionTitle
            eyebrow="Tecnología fuera del catálogo"
            title={
              <>
                Robots en espacios
                <br />
                como el tuyo.
              </>
            }
            description="Una mirada al archivo de campo de Botmate: servicio, comunicación y equipos de limpieza."
          />
          <Link href="/casos-de-exito" className="text-link">
            Explorar la galería
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="field-grid">
          {fieldPhotos.map((p, i) => (
            <figure key={p.src} className={`field-photo field-photo-${i}`}>
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 900px) 33vw, 100vw"
                className="object-cover"
              />
              <figcaption>
                <span>{p.tag}</span>
                <h3>{p.title}</h3>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
