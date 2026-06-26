"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { vitala } from "@/lib/brand";
import { useUser } from "@/lib/useUser";
import {
  deleteAccount,
  loadProfileCloud,
  saveProfileCloud,
  signInWithApple,
  signInWithGoogle,
  signOut,
} from "@/lib/supabase";
import { clearProfile, loadProfile, saveProfile } from "@/lib/store";
import { clearLifetime } from "@/lib/entitlement";

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

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.37 12.78c.02 2.3 2.02 3.06 2.04 3.07-.02.05-.32 1.1-1.06 2.18-.64.94-1.3 1.87-2.35 1.89-1.03.02-1.36-.61-2.54-.61-1.18 0-1.55.59-2.52.63-1.01.04-1.78-1.01-2.42-1.95-1.32-1.9-2.33-5.38-.97-7.73.67-1.16 1.88-1.9 3.19-1.92.99-.02 1.93.67 2.54.67.6 0 1.74-.83 2.94-.71.5.02 1.91.2 2.81 1.53-.07.05-1.68.98-1.66 2.95zM14.43 5.5c.54-.66.9-1.57.8-2.48-.78.03-1.71.52-2.27 1.18-.5.58-.94 1.51-.82 2.4.87.07 1.76-.44 2.29-1.1z"/>
    </svg>
  );
}

export default function Cuenta() {
  const { user, loading, configured } = useUser();
  const [sync, setSync] = useState<string>("");

  // Flujo de borrado de cuenta (App Store 5.1.1(v))
  const [showDelete, setShowDelete] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [delError, setDelError] = useState("");

  async function onDelete() {
    setDeleting(true);
    setDelError("");
    const ok = await deleteAccount();
    if (ok) {
      clearProfile();
      clearLifetime();
      setDeleted(true);
    } else {
      setDelError("No pudimos eliminar la cuenta. Inténtalo de nuevo o contáctanos.");
    }
    setDeleting(false);
  }

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

  // Paso 6 — confirmación de cuenta eliminada
  if (deleted) {
    return (
      <div className="mx-auto max-w-md py-10 text-center">
        <div className="text-5xl">✅</div>
        <h1 className="mt-4 text-2xl font-bold">Tu cuenta fue eliminada</h1>
        <p className="mt-2 text-sm opacity-75">
          Borramos tu identidad y anonimizamos tus datos de forma permanente. No
          hay vuelta atrás. Gracias por haber sido parte de Vitala. 💚
        </p>
        <p className="mt-4 text-xs opacity-60">
          Por obligación legal en México conservamos los registros de facturación
          (sin tu información personal) durante 5 años.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full px-6 py-3 font-semibold text-black"
          style={{ background: C.brand }}
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

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
          <Link href="/onboarding" className="mt-5 inline-block rounded-full px-6 py-3 font-semibold text-black" style={{ background: C.brand }}>
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
          className="mx-auto flex w-full max-w-xs items-center justify-center gap-3 rounded-full bg-white px-6 py-3 font-semibold text-gray-800"
        >
          <GoogleIcon /> Continuar con Google
        </button>
        <button
          onClick={() => signInWithApple()}
          className="mx-auto flex w-full max-w-xs items-center justify-center gap-3 rounded-full bg-black px-6 py-3 font-semibold text-white"
        >
          <AppleIcon /> Continuar con Apple
        </button>
        <p className="text-xs opacity-50">
          Al continuar aceptas el <Link href="/legal" className="underline">aviso de salud y privacidad</Link>.
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
        <Link href="/plan" className="rounded-2xl border p-4 text-sm" style={{ borderColor: "rgba(74,222,128,.18)", background: C.bgSoft }}>
          📋 Ver mi plan
        </Link>
        <Link href="/onboarding" className="rounded-2xl border p-4 text-sm" style={{ borderColor: "rgba(74,222,128,.18)", background: C.bgSoft }}>
          ✏️ Editar mis datos
        </Link>
        <Link href="/coach" className="rounded-2xl border p-4 text-sm" style={{ borderColor: "rgba(74,222,128,.18)", background: C.bgSoft }}>
          🤖 Hablar con el Coach
        </Link>
      </div>

      <button onClick={() => signOut()} className="text-sm underline opacity-60 hover:opacity-100">
        Cerrar sesión
      </button>

      {/* Zona de peligro — Eliminar cuenta (App Store 5.1.1(v)) */}
      <div className="mt-4 rounded-2xl border p-5" style={{ borderColor: "rgba(248,113,113,.35)", background: "rgba(248,113,113,.05)" }}>
        <h2 className="text-sm font-semibold" style={{ color: "#FCA5A5" }}>Zona de peligro</h2>

        {!showDelete ? (
          <>
            <p className="mt-2 text-xs opacity-70">
              Eliminar tu cuenta borra tu identidad y anonimiza tus datos de forma
              permanente. Esta acción no se puede deshacer.
            </p>
            <button
              onClick={() => setShowDelete(true)}
              className="mt-3 rounded-full border px-4 py-2 text-sm font-semibold"
              style={{ borderColor: "#F87171", color: "#FCA5A5" }}
            >
              Eliminar cuenta
            </button>
          </>
        ) : (
          <div className="mt-3 space-y-3">
            <p className="text-xs opacity-80">
              Esto es <strong>permanente e irreversible</strong>. Tu identidad y tus
              datos de salud se eliminan; no podrás recuperarlos.
            </p>
            <p className="text-xs opacity-80">
              ⚠️ Si pagaste por la app, tu <strong>suscripción de Apple no se cancela
              sola</strong>. Cancélala aquí:{" "}
              <a
                href="https://apps.apple.com/account/subscriptions"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: C.brandLight }}
              >
                apps.apple.com/account/subscriptions
              </a>
              .
            </p>
            <label className="block text-xs opacity-70">
              Escribe <strong>ELIMINAR</strong> para confirmar:
            </label>
            <input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="ELIMINAR"
              className="w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none"
              style={{ borderColor: "rgba(248,113,113,.4)" }}
            />
            {delError && <p className="text-xs" style={{ color: "#FCA5A5" }}>{delError}</p>}
            <div className="flex gap-2">
              <button
                onClick={onDelete}
                disabled={confirmText !== "ELIMINAR" || deleting}
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
                style={{ background: "#DC2626" }}
              >
                {deleting ? "Eliminando…" : "Eliminar mi cuenta para siempre"}
              </button>
              <button
                onClick={() => { setShowDelete(false); setConfirmText(""); setDelError(""); }}
                className="rounded-full border px-5 py-2.5 text-sm"
                style={{ borderColor: "rgba(74,222,128,.25)" }}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
