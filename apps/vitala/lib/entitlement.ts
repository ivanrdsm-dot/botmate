// Vitala — acceso de por vida ("1 peso, para siempre").
// Guarda la membresía localmente y, si hay sesión, también en la nube.

import { getSupabase } from "./supabase";

const KEY = "vitala.lifetime.v1";

export function hasLifetime(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(KEY) === "true";
}

export function grantLifetime(): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, "true");
  // Si el usuario tiene cuenta, marca la membresía en su perfil de la nube.
  getSupabase()
    ?.auth.getUser()
    .then(({ data }) => {
      if (!data.user) return;
      getSupabase()
        ?.from("memberships")
        .upsert(
          { user_id: data.user.id, lifetime: true, granted_at: new Date().toISOString() },
          { onConflict: "user_id" }
        );
    });
}

/** Limpia la membresía local (al borrar la cuenta). */
export function clearLifetime(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}
