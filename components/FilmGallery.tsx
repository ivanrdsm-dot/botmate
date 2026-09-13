"use client";
import {localPath,type Locale} from "@/lib/locale";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import CinematicMedia from "./CinematicMedia";
import { films, studioFilm } from "@/lib/films";
export default function FilmGallery({locale="es"}:{locale?:Locale}) {
  const en = locale === 'en';
  const english = [
    {title:'Your brand, in motion.',label:'Advertising & reception',credit:'Real photograph · camera animation',alt:'Botmate advertising robot shown complete from screen to base'},
    {title:'Experience comes first.',label:'Service & events',credit:'AI animation · real Botmate photograph',alt:'Real robot carrying drinks during a Botmate activation'},
    {title:'Technology that works together.',label:'Delivery, advertising & cleaning',credit:'AI animation · real Botmate photograph',alt:'Botmate delivery, cleaning and advertising robots'},
    {title:'A new setting for your brand.',label:'Advertising & reception',credit:'Real robot · generated studio background',alt:'Original Botmate robot photograph on an illustrative generated studio background'},
  ];
  const gallery = [...films,studioFilm].map((f,i)=>({...f,...(en?english[i]:{})}));
  const rail = useRef<HTMLDivElement>(null);
  return (
    <section className="film-section section-space" id="en-movimiento">
      <div className="container-x">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">{en?"BOTMATE IN ACTION":"BOTMATE EN ACCIÓN"}</p>
            <h2>
              {en?"Real moments.":"Lo real también"}<br/>
              <span className="text-brand">{en?"New perspectives.":"puede sorprender."}</span>
            </h2>
          </div>
          <div className="film-intro">
            <p>
              {en?"Discover robots from our activation archive. Every setting suggests new possibilities for your business.":"Conoce los robots desde nuestro archivo de activaciones. Cada entorno, una nueva posibilidad para tu negocio."}
            </p>
            <div className="carousel-arrows">
              <button
                type="button"
                aria-label={en?"Previous videos":"Videos anteriores"}
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
                aria-label={en?"Next videos":"Videos siguientes"}
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
          aria-label={en?"Botmate sequences and photographs":"Secuencias y fotografías de Botmate"}
        >
          {gallery.map((film, i) => (
            <article className="film-card" key={film.id}>
              <CinematicMedia
                locale={locale}
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
                <Link href={localPath(film.href.replace("/sectores#retail","/sectores/retail").replace("/sectores#restaurantes","/sectores/food-and-beverage"),locale)} className="text-link">
                  {en?"Explore application":"Explorar aplicación"}
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p className="film-disclosure">
          {en?"Real Botmate photographs, animated with Higgsfield. The studio background is illustrative; these pieces do not represent new installations or customer results.":"Fotografías reales de Botmate. Las animaciones se realizaron con Higgsfield. El fondo de estudio es ilustrativo; estas piezas no representan nuevas instalaciones ni resultados de clientes."}
        </p>
      </div>
    </section>
  );
}
