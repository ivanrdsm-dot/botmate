// Vitala — checkout del acceso de por vida ("1 peso").
// Si STRIPE_SECRET_KEY está configurada, crea una sesión de pago única real.
// Si no, responde en modo demo para que el flujo se pueda probar end-to-end.

import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Precio simbólico en la unidad mínima de la moneda (centavos). 1.00 por defecto.
// Nota: algunas pasarelas tienen un mínimo (p. ej. Stripe ~$10 MXN). Ajusta según tu país.
const PRICE_CENTS = Number(process.env.VITALA_PRICE_CENTS || "100");
const CURRENCY = (process.env.VITALA_CURRENCY || "mxn").toLowerCase();

export async function POST(req: Request) {
  const origin = new URL(req.url).origin;
  const secret = process.env.STRIPE_SECRET_KEY;

  // Modo demo: sin llave de Stripe, el flujo concede el acceso simbólicamente.
  if (!secret) {
    return NextResponse.json({ demo: true });
  }

  // Stripe Checkout (pago único) vía API REST, sin SDK.
  const body = new URLSearchParams();
  body.set("mode", "payment");
  body.set("success_url", `${origin}/vitala/uno-peso?status=ok`);
  body.set("cancel_url", `${origin}/vitala/uno-peso?status=cancel`);
  body.set("line_items[0][quantity]", "1");
  body.set("line_items[0][price_data][currency]", CURRENCY);
  body.set("line_items[0][price_data][unit_amount]", String(PRICE_CENTS));
  body.set("line_items[0][price_data][product_data][name]", "Vitala — Acceso de por vida");

  try {
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
      return NextResponse.json({ error: "No se pudo iniciar el pago." }, { status: 502 });
    }
    const data = await res.json();
    return NextResponse.json({ url: data.url });
  } catch (e) {
    console.error("Checkout error", e);
    return NextResponse.json({ error: "Error de conexión con el pago." }, { status: 502 });
  }
}
