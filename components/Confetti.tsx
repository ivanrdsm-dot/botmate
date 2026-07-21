"use client";

// Confetti de celebración — sin dependencias extra (framer-motion ya instalado).
// Se renderiza una vez, cae 2.4s y se desmonta solo.

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const COLORS = ["#4CC38A", "#0E7A52", "#F7B24E", "#B45309", "#FBD9A0", "#8FD8B2"];

export default function Confetti({ pieces = 28 }: { pieces?: number }) {
  const [alive, setAlive] = useState(true);
  const items = useMemo(
    () =>
      Array.from({ length: pieces }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        size: 6 + Math.random() * 7,
        color: COLORS[i % COLORS.length],
        spin: (Math.random() - 0.5) * 720,
        drift: (Math.random() - 0.5) * 24,
        round: Math.random() > 0.5,
      })),
    [pieces]
  );

  useEffect(() => {
    const t = setTimeout(() => setAlive(false), 3200);
    return () => clearTimeout(t);
  }, []);

  if (!alive) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {items.map((p) => (
        <motion.span
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: -20,
            width: p.size,
            height: p.size * (p.round ? 1 : 0.55),
            background: p.color,
            borderRadius: p.round ? "50%" : 2,
          }}
          initial={{ y: -30, opacity: 1, rotate: 0 }}
          animate={{
            y: "105vh",
            x: [0, p.drift, -p.drift, p.drift / 2],
            rotate: p.spin,
            opacity: [1, 1, 0.9, 0.6],
          }}
          transition={{ duration: 2.2 + Math.random(), delay: p.delay, ease: "easeIn" }}
        />
      ))}
    </div>
  );
}
