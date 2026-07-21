"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import MacroRing from "@/components/MacroRing";
import Confetti from "@/components/Confetti";
import { vitala } from "@/lib/brand";
import { generatePlan } from "@/lib/planner";
import { loadProfile } from "@/lib/store";
import type { Profile, WeekPlan } from "@/lib/types";

const C = vitala.colors;

export default function PlanPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [ready, setReady] = useState(false);
  const [party, setParty] = useState(false);

  useEffect(() => {
    const p = loadProfile();
    setProfile(p);
    setReady(true);
    // Celebra la PRIMERA vez que la persona ve su plan. Un momento, una vez.
    if (p && !window.localStorage.getItem("vitala.plan.celebrated")) {
      window.localStorage.setItem("vitala.plan.celebrated", "1");
      setParty(true);
    }
  }, []);

  const plan = useMemo<WeekPlan | null>(
    () => (profile ? generatePlan(profile) : null),
    [profile]
  );

  if (!ready) return null;

  if (!profile || !plan) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border p-8 text-center" style={{ borderColor: "rgba(74,222,128,.2)" }}>
        <h1 className="text-xl font-bold">Aún no tienes un plan</h1>
        <p className="mt-2 text-sm opacity-70">Crea tu perfil para generar tu plan personalizado.</p>
        <Link href="/onboarding" className="mt-5 inline-block rounded-full px-6 py-3 font-semibold text-black" style={{ background: C.brand }}>
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
          <p className="mt-1 text-sm opacity-70">Tu plan personalizado para esta semana.</p>
        </div>
        <Link href="/onboarding" className="rounded-full border px-4 py-2 text-sm" style={{ borderColor: C.brand, color: C.brandLight }}>
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

      <section className="space-y-4">
        {plan.days.map((d) => (
          <details key={d.day} className="rounded-2xl border" style={{ borderColor: "rgba(74,222,128,.18)", background: C.bgSoft }} open={d.day === "Lunes"}>
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4">
              <span className="font-semibold" style={{ color: C.brandLight }}>{d.day}</span>
              <span className="text-xs opacity-70">{d.totals.kcal} kcal · P{d.totals.protein} C{d.totals.carbs} G{d.totals.fat}</span>
            </summary>
            <div className="space-y-3 border-t px-5 py-4" style={{ borderColor: "rgba(74,222,128,.12)" }}>
              {d.meals.map((m) => (
                <div key={m.slot} className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-wide opacity-50">{m.slot}</div>
                    <div className="font-medium">{m.name}</div>
                    <div className="mt-0.5 text-xs opacity-60">{m.items.join(" · ")}</div>
                  </div>
                  <div className="shrink-0 text-right text-xs opacity-70">
                    <div className="font-semibold" style={{ color: C.brandLight }}>{m.kcal} kcal</div>
                    <div>⏱ {m.prepMin} min</div>
                  </div>
                </div>
              ))}
            </div>
          </details>
        ))}
      </section>

      <div className="rounded-2xl border p-5 text-center text-sm" style={{ borderColor: "rgba(74,222,128,.18)" }}>
        <p className="opacity-80">¿Quieres acompañamiento de hábitos y bienestar emocional?</p>
        <Link href="/bienestar" className="mt-3 inline-block rounded-full px-6 py-3 font-semibold text-black" style={{ background: C.brand }}>
          Ir a Bienestar
        </Link>
      </div>
    </div>
  );
}
