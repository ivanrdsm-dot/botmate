"use client";

// Aura verde animada para el fondo de Vitala. Decorativa, sin interacción.
export default function VitalaAurora({ intensity = 1 }: { intensity?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-48 left-1/2 h-[760px] w-[1100px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(22,163,74,0.40), transparent 70%), radial-gradient(closest-side, rgba(245,158,11,0.18), transparent 60%)",
          opacity: 0.6 * intensity,
          filter: "blur(90px)",
        }}
      />
      <div
        className="absolute right-[-10%] top-1/3 h-[420px] w-[520px]"
        style={{
          background: "radial-gradient(closest-side, rgba(74,222,128,0.22), transparent 70%)",
          filter: "blur(80px)",
        }}
      />
    </div>
  );
}
