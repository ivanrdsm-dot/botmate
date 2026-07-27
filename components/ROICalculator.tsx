"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, TrendingUp, Clock, PiggyBank, ArrowRight } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { waLink } from "@/lib/site";

/** Renta mensual promedio todo incluido (dato BotMate). */
const RENT_PER_ROBOT = 11400;
/** Un robot cubre las tareas repetitivas de ~2 puestos operativos. */
const STAFF_PER_ROBOT = 2;

const fmt = (n: number) =>
  n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });

function Slider({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm text-white/65">{label}</span>
        <span className="font-display text-lg font-semibold tabular">
          {value.toLocaleString("es-MX")}
          {suffix && <span className="ml-1 text-xs font-normal text-white/50">{suffix}</span>}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="roi-range mt-3 w-full"
        style={{
          background: `linear-gradient(90deg, rgba(61,90,254,0.9) ${pct}%, rgba(255,255,255,0.12) ${pct}%)`,
        }}
      />
    </label>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  highlight,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        highlight
          ? "border-brand-500/40 bg-gradient-to-br from-brand-500/15 to-transparent"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <div className="flex items-center gap-2 text-white/55">
        <Icon className="h-4 w-4 text-brand-300" />
        <span className="text-[11px] uppercase tracking-wider">{label}</span>
      </div>
      <AnimatePresence mode="popLayout">
        <motion.p
          key={value}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className={`mt-2 font-display text-2xl font-bold tabular sm:text-3xl ${
            highlight ? "gradient-text" : "text-white"
          }`}
        >
          {value}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export default function ROICalculator() {
  const [staff, setStaff] = useState(4);
  const [salary, setSalary] = useState(12000);
  const [hours, setHours] = useState(12);
  const [days, setDays] = useState(6);

  const r = useMemo(() => {
    const robots = Math.max(1, Math.ceil(staff / STAFF_PER_ROBOT));
    const humanMonthly = staff * salary;
    const robotMonthly = robots * RENT_PER_ROBOT;
    const savingMonthly = Math.max(0, humanMonthly - robotMonthly);
    const savingYearly = savingMonthly * 12;
    const savingPct = humanMonthly > 0 ? Math.round((savingMonthly / humanMonthly) * 100) : 0;
    const robotHoursYear = robots * Math.min(hours, 22) * days * 52;
    return { robots, humanMonthly, robotMonthly, savingMonthly, savingYearly, savingPct, robotHoursYear };
  }, [staff, salary, hours, days]);

  const waMsg = `Hola BotMate, usé su calculadora de ROI. Mi operación: ${staff} puestos operativos, sueldo promedio ${fmt(
    salary
  )}, ${hours} h/día, ${days} días/semana. Estimación: ${r.robots} robot(s), ahorro anual ${fmt(
    r.savingYearly
  )}. Quiero un análisis personalizado.`;

  return (
    <section className="py-24" id="roi">
      <div className="container-x">
        <SectionTitle
          eyebrow="Calculadora de ROI"
          title={<>¿Cuánto puede <span className="gradient-text">ahorrar</span> tu operación?</>}
          description="Mueve los controles y descubre el impacto real de integrar robots BotMate a tu equipo."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Controls */}
          <div className="card-tech space-y-8">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-500/15 text-brand-300">
                <Calculator className="h-5 w-5" />
              </span>
              <p className="font-display text-lg font-semibold">Tu operación actual</p>
            </div>
            <Slider label="Puestos en tareas repetitivas" value={staff} min={1} max={20} step={1} onChange={setStaff} />
            <Slider label="Sueldo mensual promedio (con carga social)" value={salary} min={8000} max={30000} step={500} suffix="MXN" onChange={setSalary} />
            <Slider label="Horas de operación al día" value={hours} min={8} max={24} step={1} suffix="h" onChange={setHours} />
            <Slider label="Días por semana" value={days} min={5} max={7} step={1} onChange={setDays} />
            <p className="text-xs leading-relaxed text-white/40">
              Estimación basada en renta promedio de {fmt(RENT_PER_ROBOT)}/mes por robot (todo incluido) y en
              implementaciones reales BotMate. Cada operación se cotiza a la medida.
            </p>
          </div>

          {/* Results */}
          <div className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Stat icon={PiggyBank} label="Ahorro mensual" value={fmt(r.savingMonthly)} highlight />
              <Stat icon={TrendingUp} label="Ahorro anual" value={fmt(r.savingYearly)} highlight />
              <Stat icon={Calculator} label="Robots sugeridos" value={`${r.robots}`} />
              <Stat icon={Clock} label="Horas robot / año" value={r.robotHoursYear.toLocaleString("es-MX")} />
            </div>

            <div className="card-tech">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-white/60">Reducción estimada del costo operativo</p>
                  <p className="mt-1 font-display text-4xl font-bold gradient-text tabular">{r.savingPct}%</p>
                </div>
                <div className="h-20 w-20">
                  <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
                    <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                    <motion.circle
                      cx="40"
                      cy="40"
                      r="34"
                      fill="none"
                      stroke="url(#roiGrad)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 34}
                      animate={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - r.savingPct / 100) }}
                      transition={{ type: "spring", stiffness: 60, damping: 15 }}
                    />
                    <defs>
                      <linearGradient id="roiGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#3D5AFE" />
                        <stop offset="100%" stopColor="#5B73FB" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <a
                href={waLink(waMsg)}
                target="_blank"
                rel="noopener"
                className="btn-primary mt-6 w-full justify-center"
              >
                Recibir análisis personalizado <ArrowRight className="h-4 w-4" />
              </a>
              <p className="mt-3 text-center text-[11px] text-white/40">
                Enviamos tu escenario a un asesor — respuesta en menos de 24 h.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
