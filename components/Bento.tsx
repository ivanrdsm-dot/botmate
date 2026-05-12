"use client";

import Link from "next/link";
import { ArrowRight, Cpu, Globe, Zap, ShieldCheck, Headphones, BadgePercent } from "lucide-react";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import Counter from "./Counter";

export default function Bento() {
  return (
    <section className="py-24">
      <div className="container-x">
        <SectionTitle
          eyebrow="Por qué BotMate"
          title={<>La plataforma <span className="gradient-text">end-to-end</span> de robótica de servicio</>}
          description="No solo vendemos hardware. Diseñamos, instalamos, capacitamos, integramos, mantenemos y escalamos contigo. Una sola empresa, una sola responsabilidad, un solo número que marcar."
        />

        <div className="mt-14 grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <BentoTile className="lg:col-span-2 lg:row-span-2" gradient="from-accent/30 via-transparent to-accent-violet/30">
            <div className="flex h-full flex-col justify-between">
              <div>
                <Cpu className="h-7 w-7 text-accent" />
                <h3 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
                  Tecnología <span className="gradient-text">Pudu Robotics</span> certificada
                </h3>
                <p className="mt-3 max-w-md text-sm text-white/65">
                  Distribuidor autorizado con acceso directo a roadmap, firmware temprano y soporte de ingeniería desde Shenzhen. Tus robots siempre están a la última.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <BentoStat value={10} suffix="+" label="Modelos disponibles" />
                <BentoStat value={500} suffix="+" label="Robots operando MX" />
                <BentoStat value={99} suffix=".7%" label="Uptime promedio" decimals={1} />
              </div>
            </div>
          </BentoTile>

          <BentoTile gradient="from-emerald-400/20 to-transparent">
            <ShieldCheck className="h-6 w-6 text-emerald-300" />
            <h3 className="mt-3 font-display text-lg font-semibold">Garantía 4 años</h3>
            <p className="mt-1 text-sm text-white/60">Cobertura extendida con refacciones originales y sustitución en sitio.</p>
          </BentoTile>

          <BentoTile gradient="from-amber-400/20 to-transparent">
            <BadgePercent className="h-6 w-6 text-amber-300" />
            <h3 className="mt-3 font-display text-lg font-semibold">89% deducible</h3>
            <p className="mt-1 text-sm text-white/60">Aprovecha el estímulo fiscal del Plan México en renta y compra.</p>
          </BentoTile>

          <BentoTile gradient="from-accent-violet/30 to-transparent">
            <Zap className="h-6 w-6 text-accent" />
            <h3 className="mt-3 font-display text-lg font-semibold">Go-live en 72 hrs</h3>
            <p className="mt-1 text-sm text-white/60">Mapeo SLAM, capacitación y operación lista en menos de tres días.</p>
          </BentoTile>

          <BentoTile gradient="from-accent/30 to-transparent">
            <Headphones className="h-6 w-6 text-accent" />
            <h3 className="mt-3 font-display text-lg font-semibold">Soporte 24/7</h3>
            <p className="mt-1 text-sm text-white/60">SLA garantizado, monitoreo remoto y atención técnica en español.</p>
          </BentoTile>

          <BentoTile className="lg:col-span-2" gradient="from-accent-violet/25 via-transparent to-accent/25">
            <div className="flex h-full items-center justify-between gap-6">
              <div className="flex-1">
                <Globe className="h-6 w-6 text-accent" />
                <h3 className="mt-3 font-display text-xl font-semibold">Cobertura nacional</h3>
                <p className="mt-1 text-sm text-white/60">
                  CDMX, GDL, MTY, QRO, PUE, MID, TIJ y CUN. Despachamos a toda la República en 48-72 horas.
                </p>
              </div>
              <Link href="/contacto" className="btn-ghost shrink-0">
                Cotizar <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </BentoTile>
        </div>
      </div>
    </section>
  );
}

function BentoTile({
  children,
  className = "",
  gradient = "from-white/5 to-transparent",
}: {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}) {
  return (
    <Reveal className={`relative h-full overflow-hidden rounded-3xl border border-white/10 bg-bg-card/60 p-6 backdrop-blur transition hover:border-accent/40 ${className}`}>
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${gradient} opacity-70`} />
      <div className="relative h-full">{children}</div>
    </Reveal>
  );
}

function BentoStat({ value, label, suffix = "", decimals = 0 }: { value: number; label: string; suffix?: string; decimals?: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
      <p className="font-display text-2xl font-bold gradient-text">
        <Counter value={value} suffix={suffix} decimals={decimals} />
      </p>
      <p className="mt-1 text-[10px] uppercase tracking-wider text-white/50">{label}</p>
    </div>
  );
}
