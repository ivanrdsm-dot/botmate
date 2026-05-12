"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Zap, PlayCircle } from "lucide-react";
import { waLink } from "@/lib/site";
import Aurora from "./Aurora";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32">
      <Aurora />
      <div className="absolute inset-0 -z-10 grid-bg" />

      <div className="container-x relative grid items-center gap-12 pb-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="chip"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Distribuidor autorizado Pudu Robotics · México
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display text-[clamp(2.5rem,7vw,5.25rem)] font-bold leading-[1.02] tracking-tight"
          >
            El compañero <span className="gradient-text">robot ideal</span>
            <br />
            <span className="text-white/90">para tu marca.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-2xl text-lg text-white/70"
          >
            Robots para publicidad interactiva, navegación en eventos, exposiciones, ferias y limpieza autónoma. Renta, venta y servicio en toda la República con instalación, capacitación y soporte 24/7.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link href="/robots" className="btn-primary">
              Ver catálogo <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={waLink()} target="_blank" rel="noopener" className="btn-ghost">
              <PlayCircle className="h-4 w-4" /> Cotizar por WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/60"
          >
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brand-400" /> Garantía hasta 4 años</span>
            <span className="inline-flex items-center gap-2"><Zap className="h-4 w-4 text-brand-400" /> Entrega 48-72 hrs</span>
            <span className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4 text-brand-400" /> 89% deducible Plan México</span>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="relative mx-auto aspect-[3/4] w-full max-w-md"
          >
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-brand-500/40 via-brand-700/20 to-transparent blur-2xl" />
            <div className="relative h-full w-full rounded-[40px] border border-white/10 bg-bg-card/60 p-2 backdrop-blur-xl">
              <div className="relative grid h-full place-items-center overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0B1226] to-[#05070F]">
                <video
                  className="absolute inset-0 h-full w-full object-cover opacity-90"
                  src="/videos/robot-service.mp4"
                  poster="/videos/robot-service-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />

                <div className="absolute left-4 right-4 top-4 flex items-center justify-between text-[10px] uppercase tracking-widest text-white/70">
                  <span className="rounded-full bg-black/40 px-2 py-1 backdrop-blur">BotMate · LIVE</span>
                  <span className="rounded-full bg-emerald-500/30 px-2 py-1 text-emerald-200 backdrop-blur">● ONLINE</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-white/15 bg-black/45 p-3 text-xs text-white backdrop-blur">
                  <div>
                    <p className="font-display text-sm font-semibold">El compañero robot ideal</p>
                    <p className="text-white/65">Publicidad · Eventos · Limpieza</p>
                  </div>
                  <span className="rounded-full bg-brand-500/30 px-2.5 py-1 text-[10px] font-semibold text-brand-100">
                    Pudu Robotics
                  </span>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -left-6 top-12 hidden rounded-2xl border border-white/10 bg-bg-card/85 p-3 text-xs backdrop-blur lg:block">
              <p className="text-white/50">Atención</p>
              <p className="font-display text-lg font-bold gradient-text">+35%</p>
            </div>
            <div className="pointer-events-none absolute -right-6 bottom-24 hidden rounded-2xl border border-white/10 bg-bg-card/85 p-3 text-xs backdrop-blur lg:block">
              <p className="text-white/50">Costos</p>
              <p className="font-display text-lg font-bold gradient-text">-20%</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
