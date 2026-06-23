// Vitala — cliente de Supabase (auth con Google + perfil personal en la nube).
// Degrada con elegancia: si no hay credenciales, la app sigue en "modo local"
// (los datos viven en el dispositivo). Cuando configuras Supabase, cada persona
// tiene su cuenta y su plan sincronizado y privado (RLS por usuario).

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Profile } from "./types";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

let _client: SupabaseClient | null = null;

/** Devuelve el cliente de navegador (singleton) o null si no está configurado. */
export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (_client) return _client;
  _client = createClient(url!, anonKey!, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: "pkce",
    },
  });
  return _client;
}

/** Inicia sesión con Google (redirige y vuelve a /vitala/cuenta). */
export async function signInWithGoogle(): Promise<void> {
  const sb = getSupabase();
  if (!sb) return;
  await sb.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${window.location.origin}/vitala/cuenta` },
  });
}

export async function signOut(): Promise<void> {
  await getSupabase()?.auth.signOut();
}

/** Guarda el perfil del usuario autenticado en la nube (tabla profiles). */
export async function saveProfileCloud(userId: string, profile: Profile): Promise<void> {
  const sb = getSupabase();
  if (!sb) return;
  await sb.from("profiles").upsert(
    { id: userId, data: profile, updated_at: new Date().toISOString() },
    { onConflict: "id" }
  );
}

/** Lee el perfil del usuario autenticado desde la nube. */
export async function loadProfileCloud(userId: string): Promise<Profile | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb
    .from("profiles")
    .select("data")
    .eq("id", userId)
    .maybeSingle();
  if (error || !data) return null;
  return (data.data as Profile) ?? null;
}
