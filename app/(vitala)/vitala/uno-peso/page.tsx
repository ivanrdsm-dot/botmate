"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import { vitala } from "@/lib/vitala/brand";
import { grantLifetime, hasLifetime } from "@/lib/vitala/entitlement";

const C = vitala.colors;

const INCLUDES = [
  "Planes de dieta a medida ilimitados",
  "Coach IA de nutrición y hábitos",
  "Bienestar emocional y educación en salud",
  "Tu cuenta personal sincronizada y privada",
  "Todas las mejoras futuras, sin volver a pagar",
];

function UnoPesoInner() {
  const router = useRouter();
  const params = useSearchParams();
  const [owned, setOwned] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Al volver de un pago exitoso, concede el acceso.
    if (params.get("status") === "ok") grantLifetime();
    setOwned(hasLifetime());
  }, [params]);

  async function buy() {
    setLoading(true);
    try {
      const res = await fetch("/api/vitala/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Stripe real
      } else {
        // Modo demo: concede acceso y refresca.
        grantLifetime();
        setOwned(true);
        router.replace("/vitala/uno-peso?status=ok");
      }
    } finally {
      setLoading(false);
    }
  }

  if (owned) {
    return (
      <div className="mx-auto max-w-md py-10 text-center">
        <div className="text-5xl">💚</div>
        <h1 className="mt-4 text-2xl font-bold">¡Bienvenido de por vida!</h1>
        <p className="mt-2 text-sm opacity-75">
          Tu acceso a Vitala está activo para siempre. Una moneda cambió tu salud.
        </p>
        <Link href="/vitala/plan" className="mt-6 inline-block rounded-full px-6 py-3 font-semibold text-black" style={{ background: C.brand }}>
          Ver mi plan
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg py-6">
      <Reveal>
        <div className="text-center">
          <span className="inline-block rounded-full px-3 py-1 text-xs font-medium" style={{ background: "rgba(245,158,11,.12)", color: C.accent }}>
            Pago único · sin suscripciones
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight">
            Por un solo peso,
            <br />
            <span style={{ color: C.brandLight }}>cambia tu vida.</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm opacity-75">
            Una sola moneda de tu país. Para siempre. Sin letras chiquitas, sin
            cobros mensuales. Creemos que la salud no debería tener barrera de
            precio.
          </p>
        </div>
      </Reveal>

      <Reveal delay={1}>
        <div className="mt-8 rounded-3xl border p-7" style={{ borderColor: "rgba(74,222,128,.25)", background: C.bgSoft }}>
          <div className="flex items-end justify-center gap-1">
            <span className="text-2xl font-semibold opacity-70">$</span>
            <span className="text-6xl font-bold" style={{ color: C.brandLight }}>1</span>
            <span className="mb-2 text-sm opacity-60">una vez · de por vida</span>
          </div>
          <ul className="mt-6 space-y-2 text-sm">
            {INCLUDES.map((i) => (
              <li key={i} className="flex items-start gap-2">
                <span style={{ color: C.brand }}>✓</span>
                <span className="opacity-85">{i}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={buy}
            disabled={loading}
            className="mt-7 w-full rounded-full px-6 py-4 font-semibold text-black disabled:opacity-60"
            style={{ background: C.accent }}
          >
            {loading ? "Abriendo pago seguro…" : "Obtener acceso de por vida"}
          </button>
          <p className="mt-3 text-center text-xs opacity-50">
            Pago seguro. Tu salud, tu cuenta, tu control.
          </p>
        </div>
      </Reveal>

      <p className="mx-auto mt-6 max-w-md text-center text-xs opacity-50">
        Vitala ofrece orientación educativa; no realiza diagnósticos ni
        sustituye a un profesional de la salud.
      </p>
    </div>
  );
}

export default function UnoPeso() {
  return (
    <Suspense fallback={null}>
      <UnoPesoInner />
    </Suspense>
  );
}
