"use client";

// Anillo de macro animado: barrido del arco + conteo del número al entrar.
// fraction = qué parte del total diario representa (0..1).

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { vitala } from "@/lib/brand";

const C = vitala.colors;
const R = 30;
const CIRC = 2 * Math.PI * R;

export default function MacroRing({
  label,
  value,
  unit,
  fraction,
  color,
  delay = 0,
}: {
  label: string;
  value: number;
  unit: string;
  fraction: number;
  color: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);
  const f = Math.max(0.04, Math.min(1, fraction));

  // Conteo del número sincronizado con el barrido del arco.
  useEffect(() => {
    if (!inView) return;
    const t0 = performance.now() + delay * 1000;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.max(0, Math.min(1, (now - t0) / 900));
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, delay]);

  return (
    <div ref={ref} className="card flex flex-col items-center p-4 text-center">
      <div className="relative h-[76px] w-[76px]">
        <svg width="76" height="76" viewBox="0 0 76 76" className="-rotate-90">
          <circle cx="38" cy="38" r={R} fill="none" stroke="rgba(14,122,82,0.12)" strokeWidth="7" />
          <motion.circle
            cx="38" cy="38" r={R} fill="none"
            stroke={color} strokeWidth="7" strokeLinecap="round"
            strokeDasharray={CIRC}
            initial={{ strokeDashoffset: CIRC }}
            animate={inView ? { strokeDashoffset: CIRC * (1 - f) } : {}}
            transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-bold leading-none" style={{ color: C.brandLight }}>{display}</span>
          <span className="text-[9px]" style={{ color: C.textMuted }}>{unit}</span>
        </div>
      </div>
      <div className="mt-2 text-xs font-medium" style={{ color: C.textMuted }}>{label}</div>
    </div>
  );
}
