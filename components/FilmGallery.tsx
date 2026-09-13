"use client";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import CinematicMedia from "./CinematicMedia";
import { films, studioFilm } from "@/lib/films";
export default function FilmGallery() {
  const rail = useRef<HTMLDivElement>(null);
  return (
    <section className="film-section section-space" id="en-movimiento">
      <div className="container-x">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">BOTMATE EN ACCIÓN</p>
            <h2>
              Lo real también
              <br />
              <span className="text-brand">puede sorprender.</span>
            </h2>
          </div>
          <div className="film-intro">
            <p>
              Conoce los robots desde nuestro archivo de activaciones. Cada
              entorno, una nueva posibilidad para tu negocio.
            </p>
            <div className="carousel-arrows">
              <button
                type="button"
                aria-label="Videos anteriores"
                onClick={() =>
                  rail.current?.scrollBy({
                    left: -rail.current.clientWidth,
                    behavior:
                      document.documentElement.dataset.motion === "on"
                        ? "smooth"
                        : "instant",
                  })
                }
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                aria-label="Videos siguientes"
                onClick={() =>
                  rail.current?.scrollBy({
                    left: rail.current.clientWidth,
                    behavior:
                      document.documentElement.dataset.motion === "on"
                        ? "smooth"
                        : "instant",
                  })
                }
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
        <div
          className="film-rail"
          ref={rail}
          tabIndex={0}
          role="region"
          aria-label="Secuencias y fotografías de Botmate"
        >
          {[...films, studioFilm].map((film, i) => (
            <article className="film-card" key={film.id}>
              <CinematicMedia
                poster={film.poster}
                src={film.src}
                alt={film.alt}
              />
              <div className="film-card-copy">
                <span>
                  0{i + 1} / {film.label}
                </span>
                <p className="film-credit">{film.credit}</p>
                <h3>{film.title}</h3>
                <Link href={film.href} className="text-link">
                  Explorar aplicación
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p className="film-disclosure">
          Fotografías reales de Botmate. Las animaciones se realizaron con
          Higgsfield. El fondo de estudio es ilustrativo; estas piezas no
          representan nuevas instalaciones ni resultados de clientes.
        </p>
      </div>
    </section>
  );
}
