"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import MacroRing from "@/components/MacroRing";
import Confetti from "@/components/Confetti";
import { vitala } from "@/lib/brand";
import { generatePlan, poolForSlot, plannedFromMeal } from "@/lib/planner";
import { loadProfile } from "@/lib/store";
import { DEFAULT_TIMES, loadMealTimes, loadSwaps, saveMealTime, setSwap } from "@/lib/planPrefs";
import type { MealSlot, PlannedMeal, Profile, WeekPlan } from "@/lib/types";

const C = vitala.colors;
const SLOT_ORDER: MealSlot[] = ["desayuno", "comida", "cena", "snack"];

export default function PlanPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [ready, setReady] = useState(false);
  const [party, setParty] = useState(false);
  const [times, setTimes] = useState<Record<MealSlot, string>>(DEFAULT_TIMES);
  const [tick, setTick] = useState(0); // fuerza recomputo tras un cambio de platillo

  useEffect(() => {
    const p = loadProfile();
    setProfile(p);
    setTimes(loadMealTimes());
    setReady(true);
    if (p && !window.localStorage.getItem("vitala.plan.celebrated")) {
      window.localStorage.setItem("vitala.plan.celebrated", "1");
      setParty(true);
    }
  }, []);

  // Plan base + preferencias (horarios y cambios de platillo) aplicadas encima.
  const plan = useMemo<WeekPlan | null>(() => {
    if (!profile) return null;
    const base = generatePlan(profile);
    const swaps = loadSwaps();
    base.days = base.days.map((d) => {
      const meals = d.meals.map((m) => {
        const chosenId = swaps[`${d.day}:${m.slot}`];
        if (!chosenId) return m;
        const meal = poolForSlot(m.slot, profile).find((x) => x.id === chosenId);
        return meal ? plannedFromMeal(profile, meal) : m;
      });
      const totals = meals.reduce(
        (a, m) => ({ kcal: a.kcal + m.kcal, protein: a.protein + m.macros.protein, carbs: a.carbs + m.macros.carbs, fat: a.fat + m.macros.fat }),
        { kcal: 0, protein: 0, carbs: 0, fat: 0 }
      );
      return { ...d, meals, totals };
    });
    return base;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, tick]);

  function changeTime(slot: MealSlot, time: string) {
    saveMealTime(slot, time);
    setTimes((t) => ({ ...t, [slot]: time }));
  }

  // Cambia el platillo por el siguiente compatible del banco.
  function swapMeal(day: string, current: PlannedMeal) {
    if (!profile) return;
    const pool = poolForSlot(current.slot, profile);
    if (pool.length < 2) return;
    const idx = pool.findIndex((m) => m.name === current.name);
    const next = pool[(idx + 1) % pool.length];
    setSwap(day, current.slot, next.id);
    setTick((n) => n + 1);
  }

  if (!ready) return null;

  if (!profile || !plan) {
    return (
      <div className="card mx-auto max-w-md p-8 text-center">
        <h1 className="text-xl font-bold">Aún no tienes un plan</h1>
        <p className="mt-2 text-sm" style={{ color: C.textMuted }}>Crea tu perfil para generar tu plan personalizado.</p>
        <Link href="/onboarding" className="btn-brand mt-5 inline-flex">
          Crear mi plan
        </Link>
      </div>
    );
  }

  const t = plan.targets;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Hola, {profile.name} 👋</h1>
          <p className="mt-1 text-sm" style={{ color: C.textMuted }}>Tu plan personalizado para esta semana.</p>
        </div>
        <Link href="/onboarding" className="rounded-full border px-4 py-2 text-sm" style={{ borderColor: C.brandDeep, color: C.brandDeep }}>
          Editar datos
        </Link>
      </div>

      {party && <Confetti />}

      {plan.flags.length > 0 && (
        <div className="space-y-2 rounded-2xl border p-4 text-sm" style={{ borderColor: "rgba(180,83,9,.30)", background: "rgba(247,178,78,.14)", color: C.text }}>
          <strong style={{ color: C.accent }}>Importante:</strong>
          {plan.flags.map((f) => (
            <p key={f}>• {f}</p>
          ))}
        </div>
      )}

      <Reveal>
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <MacroRing label="Calorías / día" value={t.calories} unit="kcal"
            fraction={t.calories / Math.max(t.tdee, 1)} color={C.brandDeep} />
          <MacroRing label="Proteína" value={t.macros.protein} unit="g"
            fraction={(t.macros.protein * 4) / Math.max(t.calories, 1)} color="#4CC38A" delay={0.1} />
          <MacroRing label="Carbohidratos" value={t.macros.carbs} unit="g"
            fraction={(t.macros.carbs * 4) / Math.max(t.calories, 1)} color="#E8A13D" delay={0.2} />
          <MacroRing label="Grasas" value={t.macros.fat} unit="g"
            fraction={(t.macros.fat * 9) / Math.max(t.calories, 1)} color="#B45309" delay={0.3} />
        </section>
      </Reveal>
      <p className="text-xs opacity-60">
        Metabolismo basal {t.bmr} kcal · gasto total estimado {t.tdee} kcal · agua sugerida {t.waterMl} ml/día.
      </p>

      {/* Horarios de comida (editables, aplican a toda la semana) */}
      <Reveal>
        <section className="card p-5">
          <h2 className="text-sm font-semibold" style={{ color: C.brandLight }}>🕑 Tus horarios de comida</h2>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {SLOT_ORDER.map((slot) => (
              <label key={slot} className="text-xs" style={{ color: C.textMuted }}>
                <span className="capitalize">{slot}</span>
                <input
                  type="time"
                  value={times[slot]}
                  onChange={(e) => changeTime(slot, e.target.value)}
                  className="mt-1 w-full rounded-xl border bg-transparent px-3 py-2 text-sm outline-none"
                  style={{ borderColor: "rgba(14,122,82,.25)", color: C.text }}
                />
              </label>
            ))}
          </div>
        </section>
      </Reveal>

      <section className="space-y-4">
        {plan.days.map((d) => (
          <details key={d.day} className="card overflow-hidden" open={d.day === "Lunes"}>
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4">
              <span className="font-semibold" style={{ color: C.brandLight }}>{d.day}</span>
              <span className="text-xs" style={{ color: C.textMuted }}>{d.totals.kcal} kcal · P{d.totals.protein} C{d.totals.carbs} G{d.totals.fat}</span>
            </summary>
            <div className="space-y-4 border-t px-5 py-4" style={{ borderColor: "rgba(14,122,82,.12)" }}>
              {d.meals.map((m) => (
                <div key={m.slot} className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs" style={{ color: C.textMuted }}>
                      <span className="rounded-full px-2 py-0.5 font-semibold" style={{ background: C.bgSoft, color: C.brandLight }}>{times[m.slot]}</span>
                      <span className="uppercase tracking-wide">{m.slot}</span>
                    </div>
                    <div className="mt-1 font-medium">{m.name}</div>
                    <div className="mt-0.5 text-xs" style={{ color: C.textMuted }}>{m.items.join(" · ")}</div>
                    <button onClick={() => swapMeal(d.day, m)} className="mt-1.5 text-xs font-semibold underline" style={{ color: C.brandDeep }}>
                      🔄 Cambiar platillo
                    </button>
                  </div>
                  <div className="shrink-0 text-right text-xs" style={{ color: C.textMuted }}>
                    <div className="font-semibold" style={{ color: C.brandLight }}>{m.kcal} kcal</div>
                    <div>⏱ {m.prepMin} min</div>
                  </div>
                </div>
              ))}
            </div>
          </details>
        ))}
      </section>

      <div className="card p-5 text-center text-sm">
        <p style={{ color: C.textMuted }}>¿Quieres acompañamiento de hábitos y bienestar emocional?</p>
        <Link href="/bienestar" className="btn-brand mt-3 inline-flex">
          Ir a Bienestar
        </Link>
      </div>
    </div>
  );
}
