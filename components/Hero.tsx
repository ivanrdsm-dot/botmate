"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MoveDown,
  Layers3,
} from "lucide-react";
import DepthCard from "./DepthCard";
import CinematicMedia from "./CinematicMedia";
import { heroFilms as films } from "@/lib/films";
export default function Hero() {
  const [index, setIndex] = useState(0);
  const film = films[index];
  return (
    <section className="immersive-hero">
      <div className="hero-ambient" aria-hidden="true">
        <i />
        <i />
        <div className="technical-grid" />
      </div>
      <div className="container-x immersive-grid">
        <div className="immersive-copy">
          <p className="eyebrow">
            <span className="status-dot" /> BOTMATE · ROBÓTICA PARA NEGOCIOS
          </p>
          <h1>
            El futuro
            <br />
            ya <span>trabaja</span>
            <br />
            contigo<span className="hero-period">.</span>
          </h1>
          <p className="immersive-description">
            Robots reales. Nuevas posibilidades.
            <br />
            Servicio, publicidad y limpieza para
            <br className="desktop-break" /> empresas en México.
          </p>
          <div className="hero-actions">
            <Link href="/reservar" className="btn-primary">
              Reservar una llamada
              <ArrowUpRight size={18} />
            </Link>
            <Link href="/robots" className="text-link">
              Conoce los robots
              <ArrowRight size={17} />
            </Link>
          </div>
          <div className="hero-signature">
            <span className="signature-line" />
            <span>
              TECNOLOGÍA PUDU ROBOTICS
              <br />
              <b>EXPERIENCIA BOTMATE</b>
            </span>
          </div>
        </div>
        <div
          className="showcase-space"
          aria-roledescription="carrusel"
          aria-label="Aplicaciones de robótica"
        >
          <div className="showcase-orbit orbit-a" aria-hidden="true" />
          <div className="showcase-orbit orbit-b" aria-hidden="true" />
          <span className="stage-coordinate" aria-hidden="true">
            B / M — 01.03
          </span>
          <DepthCard className="showcase-depth">
            <div className="showcase-film" key={film.id}>
              <CinematicMedia
                poster={film.poster}
                src={film.src}
                alt={film.alt}
                priority={index === 0}
              />
              <div className="showcase-label">
                <span className="status-dot" /> {film.credit}
              </div>
            </div>
            <div className="showcase-caption" aria-live="polite">
              <div>
                <span>{film.label}</span>
                <h2>{film.title}</h2>
              </div>
              <Link href={film.href} aria-label={`Explorar ${film.label}`}>
                <ArrowUpRight size={24} />
              </Link>
            </div>
          </DepthCard>
          <div className="floating-spec spec-one">
            <Layers3 size={19} />
            <div>
              <strong>Personas + tecnología</strong>
              <span>Diseñados para colaborar.</span>
            </div>
          </div>
          <div className="showcase-controls">
            <div
              className="slide-steps"
              role="group"
              aria-label="Elegir aplicación"
            >
              {films.map((f, i) => (
                <button
                  key={f.id}
                  type="button"
                  aria-label={`Mostrar ${f.label}`}
                  aria-pressed={index === i}
                  onClick={() => setIndex(i)}
                >
                  <span>0{i + 1}</span>
                  <i />
                </button>
              ))}
            </div>
            <div className="carousel-arrows">
              <button
                type="button"
                aria-label="Aplicación anterior"
                onClick={() =>
                  setIndex((index + films.length - 1) % films.length)
                }
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Aplicación siguiente"
                onClick={() => setIndex((index + 1) % films.length)}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container-x hero-foundation">
        <a href="#soluciones">
          <MoveDown size={15} /> EXPLORA LO QUE SIGUE
        </a>
        <span>
          Robótica con un propósito.
          <br />
          <b>El tuyo.</b>
        </span>
      </div>
    </section>
  );
}
