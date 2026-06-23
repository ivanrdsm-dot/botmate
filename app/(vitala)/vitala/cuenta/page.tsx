"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { vitala } from "@/lib/vitala/brand";
import { useUser } from "@/lib/vitala/useUser";
import {
  loadProfileCloud,
  saveProfileCloud,
  signInWithGoogle,
  signOut,
} from "@/lib/vitala/supabase";
import { loadProfile, saveProfile } from "@/lib/vitala/store";

const C = vitala.colors;

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 8.1 29.3 6 24 6 14.1 6 6 14.1 6 24s8.1 18 18 18 18-8.1 18-18c0-1.2-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M8.3 14.7l6.6 4.8C16.7 16 20 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 8.1 29.3 6 24 6 16.3 6 9.7 10.3 8.3 14.7z"/>
      <path fill="#4CAF50" d="M24 42c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.6 2.4-7.2 2.4-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.6 37.6 16.2 42 24 42z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.2 5.2C39.9 36.7 42 31 42 24c0-1.2-.1-2.3-.4-3.5z"/>
    </svg>
  );
}

export default function Cuenta() {
  const { user, loading, configured } = useUser();
  const [sync, setSync] = useState<string>("");

  // Al iniciar sesión: fusiona el perfil local con la nube (cuenta personal).
  useEffect(() => {
    if (!user) return;
    (async () => {
      const local = loadProfile();
      const cloud = await loadProfileCloud(user.id);
      if (cloud && !local) {
        saveProfile(cloud);
        setSync("Cargamos tu perfil desde tu cuenta.");
      } else if (local) {
        await saveProfileCloud(user.id, local);
        setSync("Tu plan quedó guardado en tu cuenta.");
      }
    })();
  }, [user]);

  if (loading) return null;

  // Modo local (Supabase aún no configurado)
  if (!configured) {
    return (
      <div className="mx-auto max-w-md space-y-5 text-center">
        <h1 className="text-2xl font-bold">Tu cuenta</h1>
        <div className="rounded-2xl border p-6 text-sm" style={{ borderColor: "rgba(74,222,128,.2)", background: C.bgSoft }}>
          <p className="opacity-80">
            Estás en <strong>modo local</strong>: tu plan se guarda en este
            dispositivo. Cuando activemos las cuentas, podrás entrar con Google y
            llevar tu plan a cualquier lado, de forma privada.
          </p>
          <Link href="/vitala/onboarding" className="mt-5 inline-block rounded-full px-6 py-3 font-semibold text-black" style={{ background: C.brand }}>
            Crear mi plan
          </Link>
        </div>
      </div>
    );
  }

  // No autenticado → login con Google
  if (!user) {
    return (
      <div className="mx-auto max-w-md space-y-6 text-center">
        <div>
          <h1 className="text-2xl font-bold">Tu cuenta personal</h1>
          <p className="mt-2 text-sm opacity-70">
            Entra con Google para guardar tu plan a medida y acceder desde
            cualquier dispositivo. Tu cuenta es privada y solo tuya.
          </p>
        </div>
        <button
          onClick={() => signInWithGoogle()}
          className="mx-auto flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3 font-semibold text-gray-800"
        >
          <GoogleIcon /> Continuar con Google
        </button>
        <p className="text-xs opacity-50">
          Al continuar aceptas el <Link href="/vitala/legal" className="underline">aviso de salud y privacidad</Link>.
        </p>
      </div>
    );
  }

  // Autenticado
  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="flex items-center gap-4">
        {user.avatar && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.avatar} alt="" className="h-14 w-14 rounded-full" />
        )}
        <div>
          <h1 className="text-xl font-bold">{user.name ?? "Hola 👋"}</h1>
          <p className="text-sm opacity-60">{user.email}</p>
        </div>
      </div>

      {sync && (
        <p className="rounded-xl border p-3 text-sm" style={{ borderColor: "rgba(74,222,128,.25)", color: C.brandLight }}>
          {sync}
        </p>
      )}

      <div className="grid gap-3">
        <Link href="/vitala/plan" className="rounded-2xl border p-4 text-sm" style={{ borderColor: "rgba(74,222,128,.18)", background: C.bgSoft }}>
          📋 Ver mi plan
        </Link>
        <Link href="/vitala/onboarding" className="rounded-2xl border p-4 text-sm" style={{ borderColor: "rgba(74,222,128,.18)", background: C.bgSoft }}>
          ✏️ Editar mis datos
        </Link>
        <Link href="/vitala/coach" className="rounded-2xl border p-4 text-sm" style={{ borderColor: "rgba(74,222,128,.18)", background: C.bgSoft }}>
          🤖 Hablar con el Coach
        </Link>
      </div>

      <button onClick={() => signOut()} className="text-sm underline opacity-60 hover:opacity-100">
        Cerrar sesión
      </button>
    </div>
  );
}
