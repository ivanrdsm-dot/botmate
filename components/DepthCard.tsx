"use client";
import { useRef } from "react";
import { useSiteMotion } from "./MotionProvider";
export default function DepthCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { enabled } = useSiteMotion();
  return (
    <div
      ref={ref}
      className={`depth-card ${className}`}
      onPointerMove={(e) => {
        if (!enabled || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        ref.current.style.setProperty(
          "--tilt-x",
          `${-((e.clientY - r.top) / r.height - 0.5) * 5}deg`,
        );
        ref.current.style.setProperty(
          "--tilt-y",
          `${((e.clientX - r.left) / r.width - 0.5) * 5}deg`,
        );
      }}
      onPointerLeave={() => {
        ref.current?.style.setProperty("--tilt-x", "0deg");
        ref.current?.style.setProperty("--tilt-y", "0deg");
      }}
    >
      {children}
    </div>
  );
}
