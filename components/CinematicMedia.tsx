"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useSiteMotion } from "./MotionProvider";
export default function CinematicMedia({
  poster,
  src,
  locale = "es",
  alt,
  priority = false,
  className = "",
}: {
  poster: string;
  locale?: "es" | "en";
  src?: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  const box = useRef<HTMLDivElement>(null),
    video = useRef<HTMLVideoElement>(null);
  const { enabled } = useSiteMotion();
  const [visible, setVisible] = useState(false),
    [loaded, setLoaded] = useState(false),
    [paused, setPaused] = useState(false),
    [error, setError] = useState(false),
    [pageVisible, setPageVisible] = useState(true);
  const play = enabled && visible && !paused && pageVisible && !error;
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    if (box.current) observer.observe(box.current);
    const visibility = () => setPageVisible(!document.hidden);
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  useEffect(() => {
    if (play) video.current?.play().catch(() => setPaused(true));
    else video.current?.pause();
  }, [play, loaded]);
  return (
    <div ref={box} className={`cinematic-media ${className}`}>
      <Image
        src={poster}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1000px) 55vw, 100vw"
        className="cinematic-poster"
      />
      {src && enabled && visible && !error && (
        <video
          ref={video}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={alt}
          className={loaded ? "is-ready" : ""}
          onLoadedData={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
      {src && !error && enabled && (
        <button
          type="button"
          className="film-control"
          onClick={() => setPaused(!paused)}
          aria-label={paused ? (locale === "en" ? "Play sequence" : "Reproducir secuencia") : (locale === "en" ? "Pause sequence" : "Pausar secuencia")}
        >
          {paused ? <Play size={16} /> : <Pause size={16} />}
        </button>
      )}
      {error && (
        <span className="film-fallback" role="status">
          {locale === "en" ? "Showing original photograph" : "Mostrando fotografía original"}
        </span>
      )}
    </div>
  );
}
