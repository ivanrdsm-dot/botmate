// Vitala — webhook de Stripe (BLUEPRINT bloque 2).
// Verifica la firma HMAC-SHA256 del header stripe-signature (tolerancia 5 min).
// En checkout.session.completed: registra el evento (idempotente) y otorga la
// membresía de por vida vía grant_lifetime_membership (solo service_role).
// NUNCA se confía en el body sin firma válida.

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

async function hmacSha256Hex(secret: string, payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!secret || !serviceKey || !url) {
    return NextResponse.json({ error: "Webhook no configurado." }, { status: 500 });
  }

  const raw = await req.text();

  // 1) Verificación de firma: stripe-signature = "t=<ts>,v1=<hmac>,..."
  const sigHeader = req.headers.get("stripe-signature") ?? "";
  const parts = Object.fromEntries(
    sigHeader.split(",").map((p) => p.split("=") as [string, string])
  );
  const ts = Number(parts.t);
  const v1 = parts.v1 ?? "";
  if (!ts || !v1) return NextResponse.json({ error: "Firma ausente." }, { status: 401 });
  if (Math.abs(Date.now() / 1000 - ts) > 300) {
    return NextResponse.json({ error: "Firma expirada." }, { status: 401 });
  }
  const expected = await hmacSha256Hex(secret, `${ts}.${raw}`);
  if (!timingSafeEqual(expected, v1)) {
    return NextResponse.json({ error: "Firma inválida." }, { status: 401 });
  }

  // 2) Procesamiento del evento
  let event: { type?: string; data?: { object?: Record<string, unknown> } };
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true, ignored: event.type });
  }

  const session = (event.data?.object ?? {}) as {
    id?: string;
    client_reference_id?: string | null;
    payment_status?: string;
  };
  if (!session.id) return NextResponse.json({ received: true, ignored: "sin id" });
  if (session.payment_status && session.payment_status !== "paid") {
    return NextResponse.json({ received: true, ignored: session.payment_status });
  }

  const admin = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const userId = session.client_reference_id ?? null;

  // 3) Idempotencia: unique(provider, external_id) — reintento del mismo evento = no-op.
  const { error: insErr } = await admin.from("payment_events").insert({
    provider: "stripe",
    external_id: session.id,
    user_id: userId,
    status: "approved",
    raw_status: session.payment_status ?? "paid",
  });
  if (insErr) {
    if (insErr.code === "23505") return NextResponse.json({ received: true, duplicate: true });
    console.error("payment_events insert error", insErr);
    return NextResponse.json({ error: "No se pudo registrar el evento." }, { status: 500 });
  }

  // 4) Otorgar membresía (solo si el pago trae usuario asociado).
  if (userId) {
    const { error: grantErr } = await admin.rpc("grant_lifetime_membership", {
      p_user_id: userId,
    });
    if (grantErr) console.error("grant_lifetime_membership error", grantErr);
  }

  return NextResponse.json({ received: true, granted: Boolean(userId) });
}
