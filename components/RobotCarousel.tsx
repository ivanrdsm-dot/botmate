"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { robots as allRobots, categoryLabel } from "@/lib/robots";

const robots = allRobots.filter((r) => r.image);

export default function RobotCarousel() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovering, setHovering] = useState(false);
  const n = robots.length;

  const go = useCallback((dir: number) => setActive((p) => (p + dir + n) % n), [n]);
  const jump = useCallback((i: number) => setActive(((i % n) + n) % n), [n]);

  // responsive geometry
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const spacing = compact ? 150 : 240;
  const depth = compact ? 150 : 220;

  // autoplay
  useEffect(() => {
    if (!playing || hovering) return;
    const id = setInterval(() => setActive((p) => (p + 1) % n), 3400);
    return () => clearInterval(id);
  }, [playing, hovering, n]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // pointer drag (parallax of the whole stage)
  const dragX = useMotionValue(0);
  const tilt = useSpring(useTransform(dragX, [-300, 300], [10, -10]), { stiffness: 120, damping: 18 });

  const r = robots[active];

  return (
    <section className="relative overflow-hidden py-24">
      {/* ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[140px]" />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      <div className="container-x">
        <div className="flex flex-col items-center text-center">
          <span className="chip"><span className="h-1.5 w-1.5 rounded-full bg-brand-400" /> Catálogo interactivo</span>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-tight">
            Explora la <span className="gradient-text">flota BotMate</span>
          </h2>
          <p className="mt-3 max-w-xl text-white/60">
            Arrastra, desliza o usa las flechas. Cada robot Pudu, listo para tu marca.
          </p>
        </div>

        {/* 3D STAGE */}
        <div
          className="relative mt-14 select-none"
          style={{ perspective: "1800px" }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <motion.div
            className="relative mx-auto h-[440px] w-full max-w-5xl cursor-grab active:cursor-grabbing sm:h-[520px]"
            style={{ transformStyle: "preserve-3d", rotateY: tilt }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDrag={(_, info) => dragX.set(info.offset.x)}
            onDragEnd={(_, info) => {
              dragX.set(0);
              if (info.offset.x < -60 || info.velocity.x < -350) go(1);
              else if (info.offset.x > 60 || info.velocity.x > 350) go(-1);
            }}
          >
            {robots.map((robot, i) => {
              // signed shortest distance on the ring
              let d = i - active;
              if (d > n / 2) d -= n;
              if (d < -n / 2) d += n;
              const abs = Math.abs(d);
              const visible = abs <= 3;
              return (
                <motion.div
                  key={robot.slug}
                  className="absolute left-1/2 top-1/2"
                  initial={false}
                  animate={{
                    x: `calc(-50% + ${d * spacing}px)`,
                    y: "-50%",
                    rotateY: d * (compact ? -26 : -34),
                    scale: d === 0 ? 1 : 0.78 - Math.min(abs - 1, 2) * 0.06,
                    z: -abs * depth,
                    opacity: visible ? (d === 0 ? 1 : abs === 1 ? 0.5 : 0.32) : 0,
                    filter: d === 0 ? "blur(0px)" : "blur(2px)",
                  }}
                  transition={{ type: "spring", stiffness: 110, damping: 20 }}
                  style={{ transformStyle: "preserve-3d", zIndex: 50 - abs, pointerEvents: visible ? "auto" : "none" }}
                  onClick={() => d !== 0 && jump(i)}
                >
                  <CarouselCard robot={robot} active={d === 0} />
                </motion.div>
              );
            })}
          </motion.div>

          {/* arrows */}
          <button
            aria-label="Anterior"
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 z-[60] grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-bg/70 text-white backdrop-blur transition hover:border-brand-400/60 hover:bg-brand-500/20 sm:left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Siguiente"
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 z-[60] grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-bg/70 text-white backdrop-blur transition hover:border-brand-400/60 hover:bg-brand-500/20 sm:right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* active meta */}
        <div className="mx-auto mt-10 max-w-2xl text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={r.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-xs uppercase tracking-[0.25em] text-brand-300">{categoryLabel[r.category]}</p>
              <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{r.name}</h3>
              <p className="mx-auto mt-2 max-w-lg text-sm text-white/60">{r.tagline}</p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <Link href={`/robots/${r.slug}`} className="btn-primary">
                  Ver ficha técnica <ArrowUpRight className="h-4 w-4" />
                </Link>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {r.useCases.slice(0, 3).map((u) => (
                    <span key={u} className="chip">{u}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* controls row: dots + play */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            aria-label={playing ? "Pausar" : "Reproducir"}
            onClick={() => setPlaying((p) => !p)}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-bg/60 text-white/80 transition hover:border-brand-400/60 hover:text-white"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <div className="flex items-center gap-2">
            {robots.map((robot, i) => (
              <button
                key={robot.slug}
                aria-label={`Ir a ${robot.name}`}
                onClick={() => jump(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-7 bg-gradient-to-r from-brand-500 to-brand-300" : "w-1.5 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CarouselCard({ robot, active }: { robot: (typeof robots)[number]; active: boolean }) {
  return (
    <Link
      href={active ? `/robots/${robot.slug}` : "#"}
      onClick={(e) => !active && e.preventDefault()}
      tabIndex={active ? 0 : -1}
      className="group relative block h-[330px] w-[232px] overflow-hidden rounded-[24px] border border-white/12 bg-gradient-to-br from-[#10162E] to-[#070A14] shadow-2xl sm:h-[460px] sm:w-[340px] sm:rounded-[28px]"
      draggable={false}
    >
      <Image
        src={robot.image!}
        alt={robot.name}
        fill
        sizes="340px"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        draggable={false}
        priority={active}
      />
      {/* sheen sweep on active */}
      {active && (
        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[sheen_1.1s_ease]" />
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#070A14] via-[#070A14]/60 to-transparent" />
      {robot.badge && (
        <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-brand-500 to-brand-400 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-lg">
          {robot.badge}
        </span>
      )}
      <div className="absolute inset-x-4 bottom-4 flex items-end justify-between">
        <div>
          <p className="font-display text-lg font-semibold text-white">{robot.name}</p>
          <p className="text-[11px] text-white/55">{robot.model ?? robot.brand}</p>
        </div>
        <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur transition group-hover:border-brand-400/60 group-hover:bg-brand-500/25 group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      {active && <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-brand-400/40" />}
    </Link>
  );
}
