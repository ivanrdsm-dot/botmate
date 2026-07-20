// Vitala — checkout del acceso de por vida ("1 peso").
// Prioridad de pasarela: Mercado Pago (LATAM) → Stripe → modo demo.
// BLOQUE 2: si el usuario tiene sesión, su user_id viaja como referencia
// (external_reference / client_reference_id) para que el WEBHOOK — y solo él —
// otorgue la membresía tras verificar el pago.
// BLOQUE 3: rate limit por IP (5/hora).

import { NextResponse } from "next/server";
import { limitByIp, userFromBearer, RATE_MSG } from "@/lib/ratelimit";

export const runtime = "nodejs";

// Precio simbólico en la unidad mínima de la moneda (centavos). 1.00 por defecto.
// Nota: algunas pasarelas tienen un mínimo (p. ej. Stripe ~$10 MXN). Ajusta según tu país.
const PRICE_CENTS = Number(process.env.VITALA_PRICE_CENTS || "100");
const CURRENCY = (process.env.VITALA_CURRENCY || "mxn").toLowerCase();

async function mercadoPagoCheckout(origin: string, token: string, userId: string | null) {
  const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          title: "Vitala — Acceso de por vida",
          description: "Pago único simbólico: una moneda, para toda la vida.",
          quantity: 1,
          currency_id: CURRENCY.toUpperCase(),
          unit_price: PRICE_CENTS / 100,
        },
      ],
      external_reference: userId ?? undefined,
      back_urls: {
        success: `${origin}/uno-peso?status=ok`,
        failure: `${origin}/uno-peso?status=cancel`,
        pending: `${origin}/uno-peso?status=pending`,
      },
      auto_return: "approved",
      statement_descriptor: "VITALA",
    }),
  });
  if (!res.ok) {
    console.error("Mercado Pago error", res.status, await res.text());
    return null;
  }
  const data = await res.json();
  return (data.init_point as string) ?? null;
}

async function stripeCheckout(origin: string, secret: string, userId: string | null) {
  const body = new URLSearchParams();
  body.set("mode", "payment");
  body.set("success_url", `${origin}/uno-peso?status=ok`);
  body.set("cancel_url", `${origin}/uno-peso?status=cancel`);
  body.set("line_items[0][quantity]", "1");
  body.set("line_items[0][price_data][currency]", CURRENCY);
  body.set("line_items[0][price_data][unit_amount]", String(PRICE_CENTS));
  body.set("line_items[0][price_data][product_data][name]", "Vitala — Acceso de por vida");
  if (userId) body.set("client_reference_id", userId);

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  if (!res.ok) {
    console.error("Stripe error", res.status, await res.text());
    return null;
  }
  const data = await res.json();
  return (data.url as string) ?? null;
}

export async function POST(req: Request) {
  if (!(await limitByIp(req, "checkout", 5, 3600))) {
    return NextResponse.json({ error: RATE_MSG }, { status: 429 });
  }

  const origin = new URL(req.url).origin;
  const mpToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const userId = await userFromBearer(req); // null si compra anónima

  try {
    if (mpToken) {
      const url = await mercadoPagoCheckout(origin, mpToken, userId);
      if (url) return NextResponse.json({ url, provider: "mercadopago" });
      return NextResponse.json({ error: "No se pudo iniciar el pago." }, { status: 502 });
    }

    if (stripeSecret) {
      const url = await stripeCheckout(origin, stripeSecret, userId);
      if (url) return NextResponse.json({ url, provider: "stripe" });
      return NextResponse.json({ error: "No se pudo iniciar el pago." }, { status: 502 });
    }

    // Modo demo (solo desarrollo, sin llaves): desbloqueo local simbólico.
    return NextResponse.json({ demo: true });
  } catch (e) {
    console.error("Checkout error", e);
    return NextResponse.json({ error: "Error de conexión con el pago." }, { status: 502 });
  }
}
