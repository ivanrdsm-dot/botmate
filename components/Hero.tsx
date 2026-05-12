"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Zap, PlayCircle } from "lucide-react";
import { waLink } from "@/lib/site";
import Aurora from "./Aurora";
import RobotArt from "./RobotArt";

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
            Robots que <span className="gradient-text">trabajan por ti.</span>
            <br />
            <span className="text-white/90">Tú, libre para crecer.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-2xl text-lg text-white/70"
          >
            Renta o compra robots Pudu Robotics — BellaBot, KettyBot, SwiftBot, CC1 y más — con instalación, capacitación, refacciones y soporte 24/7 en toda la República Mexicana.
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
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" /> Garantía hasta 4 años</span>
            <span className="inline-flex items-center gap-2"><Zap className="h-4 w-4 text-accent" /> Entrega en 48-72 hrs</span>
            <span className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4 text-accent" /> 89% deducible Plan México</span>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="relative mx-auto aspect-square w-full max-w-md"
          >
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-accent-violet/30 via-transparent to-accent/30 blur-2xl" />
            <div className="relative h-full w-full rounded-[40px] border border-white/10 bg-bg-card/60 p-2 backdrop-blur-xl">
              <div className="relative grid h-full place-items-center overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0B1020] to-[#04060B]">
                <div className="absolute inset-0 grid-bg opacity-50" />
                <svg className="absolute inset-0 h-full w-full opacity-50" viewBox="0 0 400 400">
                  <defs>
                    <radialGradient id="orb1" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="200" cy="200" r="180" fill="url(#orb1)">
                    <animate attributeName="r" dur="6s" repeatCount="indefinite" values="160;180;160" />
                  </circle>
                </svg>
                <RobotArt variant="bella" className="relative z-10 h-[78%] w-[78%] animate-float" />

                <div className="absolute left-4 right-4 top-4 flex items-center justify-between text-[10px] uppercase tracking-widest text-white/40">
                  <span>Pudu Robotics · v2.6</span>
                  <span className="text-emerald-400">● ONLINE</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-white/10 bg-bg/70 p-3 text-xs text-white/80 backdrop-blur">
                  <div>
                    <p className="font-display text-sm font-semibold text-white">BellaBot Pro</p>
                    <p className="text-white/50">Entrega · 40 kg · 4 bandejas</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                    En operación
                  </span>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -left-6 top-12 hidden rounded-2xl border border-white/10 bg-bg-card/80 p-3 text-xs backdrop-blur lg:block">
              <p className="text-white/50">Productividad</p>
              <p className="font-display text-lg font-bold gradient-text">+40%</p>
            </div>
            <div className="pointer-events-none absolute -right-6 bottom-24 hidden rounded-2xl border border-white/10 bg-bg-card/80 p-3 text-xs backdrop-blur lg:block">
              <p className="text-white/50">Ahorro op.</p>
              <p className="font-display text-lg font-bold gradient-text">-20%</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
