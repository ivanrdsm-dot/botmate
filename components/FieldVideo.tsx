"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { useSiteMotion } from "./MotionProvider";
export default function FieldVideo() {
  const [started, setStarted] = useState(false);
  const [error, setError] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  const {enabled} = useSiteMotion();
  useEffect(() => {if (!enabled) ref.current?.pause();}, [enabled]);
  useEffect(() => {
    if (!started) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stop = () => ref.current?.pause();
    const visibility = () => {
      if (document.hidden) stop();
    };
    query.addEventListener("change", stop);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      query.removeEventListener("change", stop);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [started]);
  return (
    <div className="video-frame">
      {started ? (
        <video
          ref={ref}
          src="/videos/robot-service.mp4"
          poster="/videos/robot-service-poster.jpg"
          controls
          playsInline
          muted
          preload="metadata"
          onLoadedData={() => ref.current?.play().catch(() => {})}
          onError={() => setError(true)}
          aria-label="Robot trasladando productos por el pasillo de una tienda, sin narración"
        />
      ) : (
        <>
          <Image
            src="/videos/robot-service-poster.jpg"
            alt="Robot con bandejas de productos en un pasillo de tienda"
            fill
            sizes="(min-width: 900px) 40vw, 100vw"
          />
          <button
            type="button"
            className="video-launch"
            onClick={() => setStarted(true)}
          >
            <span>
              <Play size={18} />
              Ver recorrido · 7 segundos
            </span>
          </button>
        </>
      )}
      {error && (
        <div className="video-error">
          <p>
            No se pudo cargar el video. Puedes consultar las fotografías de esta
            galería.
          </p>
          <button
            className="btn-ghost"
            onClick={() => {
              setStarted(false);
              setError(false);
            }}
          >
            Volver a la imagen
          </button>
        </div>
      )}
    </div>
  );
}
