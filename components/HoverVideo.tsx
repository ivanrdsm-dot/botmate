"use client";

import { useRef } from "react";

/**
 * Imagen que se convierte en video al pasar el cursor (hover-play).
 * En touch, el video se reproduce en loop silencioso directamente.
 * El video solo se descarga cuando existe (preload=metadata).
 */
export default function HoverVideo({
  src,
  poster,
  alt,
  className,
}: {
  src: string;
  poster?: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={alt}
      onMouseEnter={() => ref.current?.play().catch(() => {})}
      onMouseLeave={() => {
        ref.current?.pause();
        if (ref.current) ref.current.currentTime = 0;
      }}
    />
  );
}
