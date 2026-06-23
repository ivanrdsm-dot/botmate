"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { vitala } from "@/lib/vitala/brand";
import { generatePlan } from "@/lib/vitala/planner";
import { loadProfile } from "@/lib/vitala/store";
import type { Profile, WeekPlan } from "@/lib/vitala/types";

const C = vitala.colors;

function Ring({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div className="rounded-2xl border p-4 text-center" style={{ borderColor: "rgba(74,222,128,.18)", background: C.bgSoft }}>
      <div className="text-xl font-bold" style={{ color: C.brandLight }}>
        {value}
        <span className="ml-1 text-xs font-normal opacity-60">{unit}</span>
      </div>
      <div className="mt-1 text-xs opacity-70">{label}</div>
    </div>
  );
}

export default function PlanPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
    setReady(true);
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
        <Link href="/vitala/onboarding" className="mt-5 inline-block rounded-full px-6 py-3 font-semibold text-black" style={{ background: C.brand }}>
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
        <Link href="/vitala/onboarding" className="rounded-full border px-4 py-2 text-sm" style={{ borderColor: C.brand, color: C.brandLight }}>
          Editar datos
        </Link>
      </div>

      {/* Banderas de seguridad */}
      {plan.flags.length > 0 && (
        <div className="space-y-2 rounded-2xl border p-4 text-sm" style={{ borderColor: "rgba(245,158,11,.35)", background: "rgba(245,158,11,.07)", color: "#FCD9A0" }}>
          <strong style={{ color: C.accent }}>Importante:</strong>
          {plan.flags.map((f) => (
            <p key={f}>• {f}</p>
          ))}
        </div>
      )}

      {/* Objetivos */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Ring label="Calorías / día" value={t.calories} unit="kcal" />
        <Ring label="Proteína" value={t.macros.protein} unit="g" />
        <Ring label="Carbohidratos" value={t.macros.carbs} unit="g" />
        <Ring label="Grasas" value={t.macros.fat} unit="g" />
      </section>
      <p className="text-xs opacity-60">
        Metabolismo basal {t.bmr} kcal · gasto total estimado {t.tdee} kcal · agua sugerida {t.waterMl} ml/día.
      </p>

      {/* Plan semanal */}
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
        <Link href="/vitala/bienestar" className="mt-3 inline-block rounded-full px-6 py-3 font-semibold text-black" style={{ background: C.brand }}>
          Ir a Bienestar
        </Link>
      </div>
    </div>
  );
}
