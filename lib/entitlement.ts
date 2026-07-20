// Vitala — acceso "de por vida".
// Dos estados distintos (BLUEPRINT bloque 2):
//  · LOCAL (este archivo, localStorage): estado del dispositivo / modo demo.
//  · NUBE (tabla memberships): la membresía VERIFICADA. Solo la escribe el
//    servidor (webhook de pago → grant_lifetime_membership). El cliente
//    únicamente la LEE — RLS bloquea cualquier escritura desde aquí.

import { getSupabase } from "./supabase";

const KEY = "vitala.lifetime.v1";

export function hasLifetime(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(KEY) === "true";
}

/** Desbloqueo LOCAL (estado de dispositivo). No otorga membresía en la nube. */
export function grantLifetime(): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, "true");
}

export function clearLifetime(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}

/**
 * Lee la membresía verificada desde la nube (solo lectura, protegida por RLS).
 * Si existe, la refleja en el estado local. Devuelve el estado efectivo.
 */
export async function syncLifetimeFromCloud(): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return hasLifetime();
  try {
    const { data: u } = await sb.auth.getUser();
    if (!u.user) return hasLifetime();
    const { data } = await sb
      .from("memberships")
      .select("lifetime")
      .eq("user_id", u.user.id)
      .maybeSingle();
    if (data?.lifetime) {
      grantLifetime();
      return true;
    }
  } catch {
    /* sin red: se queda el estado local */
  }
  return hasLifetime();
}
