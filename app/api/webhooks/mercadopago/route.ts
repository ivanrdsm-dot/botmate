// Vitala — webhook de Mercado Pago (BLUEPRINT bloque 2).
// MP notifica un id de pago; NUNCA confiamos en el body: re-consultamos el pago
// a la API de MP con nuestro access token. Si está aprobado, registramos el
// evento (idempotente) y otorgamos la membresía vía grant_lifetime_membership.

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(req: Request) {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!token || !serviceKey || !url) {
    return NextResponse.json({ error: "Webhook no configurado." }, { status: 500 });
  }

  // MP manda el id por query (?type=payment&data.id=X | ?topic=payment&id=X) o en el body.
  const q = new URL(req.url).searchParams;
  let body: { type?: string; action?: string; data?: { id?: string | number } } = {};
  try {
    body = await req.json();
  } catch {
    /* algunas notificaciones llegan sin body JSON */
  }
  const kind = q.get("type") ?? q.get("topic") ?? body.type ?? body.action ?? "";
  const paymentId = q.get("data.id") ?? q.get("id") ?? String(body.data?.id ?? "");

  if (!kind.includes("payment") || !paymentId) {
    return NextResponse.json({ received: true, ignored: kind || "sin tipo" });
  }

  // 1) Re-consulta a la fuente de la verdad: la API de Mercado Pago.
  const payRes = await fetch(
    `https://api.mercadopago.com/v1/payments/${encodeURIComponent(paymentId)}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!payRes.ok) {
    console.error("MP payment lookup failed", payRes.status);
    // 200 para evitar reintentos infinitos por ids de prueba/inexistentes.
    return NextResponse.json({ received: true, lookup: payRes.status });
  }
  const payment = (await payRes.json()) as {
    id?: number | string;
    status?: string;
    external_reference?: string | null;
  };

  if (payment.status !== "approved") {
    return NextResponse.json({ received: true, status: payment.status });
  }

  const ref = payment.external_reference ?? "";
  const userId = UUID_RE.test(ref) ? ref : null;

  const admin = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // 2) Idempotencia por unique(provider, external_id).
  const { error: insErr } = await admin.from("payment_events").insert({
    provider: "mercadopago",
    external_id: String(payment.id ?? paymentId),
    user_id: userId,
    status: "approved",
    raw_status: payment.status,
  });
  if (insErr) {
    if (insErr.code === "23505") return NextResponse.json({ received: true, duplicate: true });
    console.error("payment_events insert error", insErr);
    return NextResponse.json({ error: "No se pudo registrar el evento." }, { status: 500 });
  }

  // 3) Otorgar membresía si el pago está ligado a un usuario.
  if (userId) {
    const { error: grantErr } = await admin.rpc("grant_lifetime_membership", {
      p_user_id: userId,
    });
    if (grantErr) console.error("grant_lifetime_membership error", grantErr);
  }

  return NextResponse.json({ received: true, granted: Boolean(userId) });
}
