// Vitala — rate limiting server-side (BLUEPRINT bloque 3).
// Ventana fija en Postgres vía check_rate_limit() (security definer, solo service_role).
// Sin servicios externos. Fail-open: si la DB no responde, se permite y se registra.
// Privacidad: las IPs jamás se guardan crudas — solo hash SHA-256 con sal.

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const RATE_MSG =
  "Has alcanzado el límite de uso por ahora. Espera un poco e inténtalo de nuevo. 💚";

async function sha256Hex(input: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd ? fwd.split(",")[0].trim() : "unknown";
}

/** true = permitido; false = límite excedido. */
async function checkLimit(key: string, windowSecs: number, max: number): Promise<boolean> {
  if (!url || !serviceKey) return true; // sin DB configurada → no bloquear
  try {
    const admin = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await admin.rpc("check_rate_limit", {
      p_key: key,
      p_window_secs: windowSecs,
      p_max: max,
    });
    if (error) {
      console.warn("rate limit rpc error:", error.message);
      return true;
    }
    return data === true;
  } catch (e) {
    console.warn("rate limit unavailable:", e);
    return true;
  }
}

export async function limitByIp(
  req: Request,
  route: string,
  max: number,
  windowSecs: number
): Promise<boolean> {
  const salt = process.env.RATELIMIT_IP_SALT || "vitala-default-salt";
  const hash = await sha256Hex(clientIp(req) + salt);
  return checkLimit(`${route}:ip:${hash.slice(0, 32)}`, windowSecs, max);
}

export async function limitByUser(
  userId: string,
  route: string,
  max: number,
  windowSecs: number
): Promise<boolean> {
  return checkLimit(`${route}:user:${userId}`, windowSecs, max);
}

/** Verifica un Bearer token de Supabase y devuelve el user id, o null. */
export async function userFromBearer(req: Request): Promise<string | null> {
  const auth = req.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token || !url || !anonKey) return null;
  try {
    const sb = createClient(url, anonKey);
    const { data, error } = await sb.auth.getUser(token);
    if (error) return null;
    return data.user?.id ?? null;
  } catch {
    return null;
  }
}
