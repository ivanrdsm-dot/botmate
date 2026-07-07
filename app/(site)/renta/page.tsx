import type { Metadata } from "next";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import { Check, Calendar, Wrench, GraduationCap, Headphones, BadgeDollarSign } from "lucide-react";

export const metadata: Metadata = {
  title: "Renta de robots en México — Planes flexibles desde 1 mes · BotMate",
  description:
    "Renta robots meseros, de limpieza y de carga en México con planes mensuales, semestrales o anuales. Instalación, capacitación, mantenimiento, refacciones y soporte 24/7 incluidos. BellaBot, KettyBot, CC1, FlashBot.",
  alternates: { canonical: "/renta" },
  keywords: [
    "renta de robots México",
    "renta robot mesero",
    "renta BellaBot",
    "renta KettyBot",
    "renta CC1 limpieza",
    "plan renta robot Pudu",
    "leasing robots México",
    "robot mesero precio renta",
  ],
};

const plans = [
  {
    name: "Mensual",
    eyebrow: "Sin compromiso",
    desc: "Prueba el impacto del robot en tu operación con un plan flexible mes a mes.",
    features: [
      "Instalación y capacitación incluidas",
      "Mantenimiento preventivo",
      "Soporte técnico remoto",
      "Reemplazo en 24 hrs por falla mayor",
    ],
  },
  {
    name: "Semestral",
    eyebrow: "Más popular",
    desc: "El equilibrio ideal entre flexibilidad y tarifa preferencial. Incluye mantenimiento ampliado.",
    features: [
      "Hasta 20% de descuento vs mensual",
      "Mantenimiento preventivo y correctivo",
      "Refacciones consumibles incluidas",
      "Soporte prioritario 24/7",
      "Capacitación continua de personal",
    ],
    highlight: true,
  },
  {
    name: "Anual + Opción a compra",
    eyebrow: "Máximo ahorro",
    desc: "Plan anual con la mejor tarifa y opción a comprar el equipo al final del contrato.",
    features: [
      "Hasta 35% de descuento vs mensual",
      "Garantía extendida total",
      "Renovación o compra al cierre",
      "Hasta 89% deducible Plan México",
      "Cuenta dedicada de éxito",
    ],
  },
];

const includes = [
  { icon: Wrench, t: "Mantenimiento", d: "Preventivo y correctivo con técnicos certificados." },
  { icon: GraduationCap, t: "Capacitación", d: "Onboarding y refreshers para tu equipo." },
  { icon: Headphones, t: "Soporte 24/7", d: "Atención remota inmediata y SLA garantizado." },
  { icon: Calendar, t: "Flexibilidad", d: "Cambia de modelo, escala flota o pausa la renta." },
  { icon: BadgeDollarSign, t: "Sin inversión inicial", d: "CapEx convertido en OpEx 100% deducible." },
];

export default function RentaPage() {
  return (
    <>
      <section className="pt-32">
        <div className="container-x">
          <SectionTitle
            eyebrow="Renta de robots"
            title={<>Automatiza sin <span className="gradient-text">inversión inicial</span></>}
            description="Accede a la flota más avanzada de robots de servicio, limpieza y carga con planes desde 1 mes. Todo incluido: instalación, mantenimiento, refacciones y soporte."
          />
        </div>
      </section>

      <section className="py-16">
        <div className="container-x grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`card-tech flex flex-col ${
                p.highlight ? "ring-2 ring-accent shadow-[0_0_60px_-10px_rgba(34,211,238,0.4)]" : ""
              }`}
            >
              <span className="chip w-fit">{p.eyebrow}</span>
              <h3 className="mt-4 font-display text-2xl font-bold">{p.name}</h3>
              <p className="mt-2 text-sm text-white/60">{p.desc}</p>
              <ul className="mt-6 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-white/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Link href="/contacto" className={p.highlight ? "btn-primary w-full" : "btn-ghost w-full"}>
                  Solicitar cotización
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="container-x">
          <SectionTitle
            eyebrow="Todo incluido"
            title={<>Qué incluye tu <span className="gradient-text">renta</span></>}
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {includes.map((i) => (
              <div key={i.t} className="card-tech">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-violet/20 ring-1 ring-white/10">
                  <i.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold">{i.t}</h3>
                <p className="mt-1 text-sm text-white/60">{i.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ />
      <CTA title="Cotiza tu renta hoy" subtitle="Recibe propuesta en menos de 24 horas con el plan que más conviene a tu operación." />
    </>
  );
}
