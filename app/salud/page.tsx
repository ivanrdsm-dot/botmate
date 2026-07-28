"use client";

// Vitala — Salud: panel de métricas de actividad + peso, todo en un lugar.
// Se conecta a Apple Salud / Health Connect en la app nativa; en web permite
// registro manual. Los datos viven en tu dispositivo.

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import { vitala } from "@/lib/brand";
import { loadProfile } from "@/lib/store";
import { loadWeightLog } from "@/lib/progress";
import {
  isoDay,
  lastSevenDays,
  metricsFor,
  stepGoalFor,
  upsertDay,
  weeklySummary,
  type DayMetrics,
} from "@/lib/health";
import { isNativeHealthAvailable, requestHealthAuthorization, syncFromAppleHealth } from "@/lib/healthkit";

const C = vitala.colors;

function Ring({ value, goal, label, unit, color }: { value: number; goal: number; label: string; unit: string; color: string }) {
  const R = 34;
  const CIRC = 2 * Math.PI * R;
  const f = Math.max(0.02, Math.min(1, goal ? value / goal : 0));
  return (
    <div className="card flex flex-col items-center p-4 text-center">
      <div className="relative h-[86px] w-[86px]">
        <svg width="86" height="86" viewBox="0 0 86 86" className="-rotate-90">
          <circle cx="43" cy="43" r={R} fill="none" stroke="rgba(14,122,82,0.12)" strokeWidth="8" />
          <circle
            cx="43" cy="43" r={R} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
            strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - f)}
            style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.22,1,0.36,1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-base font-bold leading-none" style={{ color: C.brandLight }}>{value.toLocaleString("es-MX")}</span>
          <span className="text-[9px]" style={{ color: C.textMuted }}>{unit}</span>
        </div>
      </div>
      <div className="mt-2 text-xs font-medium" style={{ color: C.textMuted }}>{label}</div>
      {goal > 0 && <div className="text-[10px]" style={{ color: C.textMuted }}>meta {goal.toLocaleString("es-MX")}</div>}
    </div>
  );
}

function ActivityBars({ week, goal }: { week: DayMetrics[]; goal: number }) {
  const max = Math.max(goal, ...week.map((d) => d.steps ?? 0), 1);
  const dayLabel = (iso: string) => ["D", "L", "M", "M", "J", "V", "S"][new Date(iso + "T12:00").getDay()];
  return (
    <div className="card p-5">
      <p className="mb-4 text-sm font-semibold" style={{ color: C.brandLight }}>Pasos · últimos 7 días</p>
      <div className="flex items-end justify-between gap-2" style={{ height: 130 }}>
        {week.map((d) => {
          const v = d.steps ?? 0;
          const h = Math.round((v / max) * 110);
          const hit = goal > 0 && v >= goal;
          return (
            <div key={d.date} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex w-full flex-1 items-end">
                <div
                  className="w-full rounded-t-md"
                  style={{
                    height: Math.max(4, h),
                    background: hit ? C.brandDeep : v > 0 ? C.brand : "rgba(14,122,82,0.14)",
                    transition: "height 0.6s cubic-bezier(0.22,1,0.36,1)",
                  }}
                  title={`${v.toLocaleString("es-MX")} pasos`}
                />
              </div>
              <span className="text-[10px]" style={{ color: C.textMuted }}>{dayLabel(d.date)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function SaludPage() {
  const [today, setToday] = useState<DayMetrics | null>(null);
  const [week, setWeek] = useState<DayMetrics[]>([]);
  const [goal, setGoal] = useState(8000);
  const [weight, setWeight] = useState<{ kg: number; delta: number } | null>(null);
  const [native, setNative] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [notice, setNotice] = useState("");
  const [manualSteps, setManualSteps] = useState("");
  const [manualKcal, setManualKcal] = useState("");
  const [manualWorkout, setManualWorkout] = useState("");

  function refresh() {
    setToday(metricsFor());
    setWeek(lastSevenDays());
  }

  useEffect(() => {
    const p = loadProfile();
    setGoal(stepGoalFor(p?.goal));
    refresh();
    setNative(isNativeHealthAvailable());
    const log = loadWeightLog();
    if (log.length) {
      const last = log[log.length - 1];
      const first = log[0];
      setWeight({ kg: last.kg, delta: Math.round((last.kg - first.kg) * 10) / 10 });
    }
  }, []);

  const summary = useMemo(() => weeklySummary(), [week]);

  async function connect() {
    setSyncing(true);
    setNotice("");
    try {
      const ok = await requestHealthAuthorization();
      if (!ok) { setNotice("No se pudo conectar. Revisa los permisos de Salud."); return; }
      const n = await syncFromAppleHealth(30);
      refresh();
      setNotice(n > 0 ? `Sincronizamos ${n} días desde Apple Salud. 💚` : "Conectado. Aún no hay datos que traer.");
    } finally {
      setSyncing(false);
    }
  }

  function saveManual() {
    const steps = manualSteps ? Number(manualSteps) : undefined;
    const activeKcal = manualKcal ? Number(manualKcal) : undefined;
    const workoutMin = manualWorkout ? Number(manualWorkout) : undefined;
    if (steps === undefined && activeKcal === undefined && workoutMin === undefined) return;
    upsertDay({ date: isoDay(), steps, activeKcal, workoutMin, source: "manual" });
    setManualSteps(""); setManualKcal(""); setManualWorkout("");
    refresh();
    setNotice("Registro de hoy guardado. 💪");
  }

  const steps = today?.steps ?? 0;
  const kcal = today?.activeKcal ?? 0;

  return (
    <div className="space-y-8">
      <Reveal>
        <header>
          <h1 className="text-3xl font-bold">Mi salud</h1>
          <p className="mt-1 text-sm" style={{ color: C.textMuted }}>
            Tu actividad y tu peso en un solo lugar, para ver claro cómo vas hacia tu meta.
          </p>
        </header>
      </Reveal>

      {/* Rings de hoy */}
      <Reveal>
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Ring value={steps} goal={goal} label="Pasos hoy" unit="pasos" color={C.brandDeep} />
          <Ring value={kcal} goal={400} label="Energía activa" unit="kcal" color="#E8A13D" />
          <Ring value={today?.workoutMin ?? 0} goal={30} label="Ejercicio" unit="min" color="#B45309" />
          <div className="card flex flex-col items-center justify-center p-4 text-center">
            <div className="text-2xl font-bold" style={{ color: C.brandLight }}>
              {weight ? `${weight.kg}` : "—"}
              <span className="ml-1 text-xs font-normal" style={{ color: C.textMuted }}>kg</span>
            </div>
            {weight && (
              <div className="text-xs" style={{ color: weight.delta <= 0 ? C.brandDeep : C.accent }}>
                {weight.delta > 0 ? "+" : ""}{weight.delta} kg
              </div>
            )}
            <Link href="/progreso" className="mt-1 text-[11px] underline" style={{ color: C.textMuted }}>ver progreso</Link>
          </div>
        </section>
      </Reveal>

      {/* Resumen semanal */}
      <Reveal>
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 text-center">
          {[
            { v: summary.avgSteps.toLocaleString("es-MX"), l: "pasos/día promedio" },
            { v: summary.totalActiveKcal.toLocaleString("es-MX"), l: "kcal activas (7 días)" },
            { v: `${summary.totalWorkoutMin}`, l: "min de ejercicio (7 días)" },
            { v: `${summary.daysActive}/7`, l: "días activos" },
          ].map((s) => (
            <div key={s.l} className="card p-4">
              <div className="text-xl font-bold" style={{ color: C.brandLight }}>{s.v}</div>
              <div className="mt-1 text-xs" style={{ color: C.textMuted }}>{s.l}</div>
            </div>
          ))}
        </section>
      </Reveal>

      <Reveal><ActivityBars week={week} goal={goal} /></Reveal>

      {/* Conectar wearables */}
      <Reveal>
        <section className="card p-6">
          <h2 className="text-lg font-bold" style={{ color: C.brandLight }}>Conecta tu pulsera o reloj</h2>
          <p className="mt-1 text-sm" style={{ color: C.textMuted }}>
            Apple Watch, Fitbit, Garmin, Oura, Xiaomi y más sincronizan con Apple Salud o Google Health
            Connect. Al conectar el hub, tus pasos y ejercicio llegan solos — sin salir de tu teléfono.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {native ? (
              <button onClick={connect} disabled={syncing} className="btn-brand text-sm disabled:opacity-50">
                {syncing ? "Sincronizando…" : " Conectar Apple Salud"}
              </button>
            ) : (
              <div className="rounded-xl border px-4 py-3 text-sm" style={{ borderColor: "rgba(14,122,82,0.2)", color: C.textMuted }}>
                📱 La conexión con Apple Salud y Health Connect está disponible en la <strong>app</strong> (iOS/Android).
                En web puedes registrar tu actividad manualmente abajo.
              </div>
            )}
          </div>
          {notice && <p className="mt-3 text-sm" style={{ color: C.brandLight }}>{notice}</p>}
        </section>
      </Reveal>

      {/* Registro manual */}
      <Reveal>
        <section className="card p-6">
          <h2 className="text-lg font-bold" style={{ color: C.brandLight }}>Registrar actividad de hoy</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <input value={manualSteps} onChange={(e) => setManualSteps(e.target.value)} type="number" min="0" placeholder="Pasos"
              className="w-32 rounded-xl border bg-transparent px-3 py-2 text-sm outline-none" style={{ borderColor: "rgba(14,122,82,0.25)" }} />
            <input value={manualKcal} onChange={(e) => setManualKcal(e.target.value)} type="number" min="0" placeholder="Kcal activas"
              className="w-36 rounded-xl border bg-transparent px-3 py-2 text-sm outline-none" style={{ borderColor: "rgba(14,122,82,0.25)" }} />
            <input value={manualWorkout} onChange={(e) => setManualWorkout(e.target.value)} type="number" min="0" placeholder="Min ejercicio"
              className="w-36 rounded-xl border bg-transparent px-3 py-2 text-sm outline-none" style={{ borderColor: "rgba(14,122,82,0.25)" }} />
            <button onClick={saveManual} className="btn-brand text-sm">Guardar</button>
          </div>
          <p className="mt-3 text-xs" style={{ color: C.textMuted }}>
            Tus métricas se guardan solo en este dispositivo. Cuando conectes una cuenta, se sincronizan de forma privada.
          </p>
        </section>
      </Reveal>
    </div>
  );
}
