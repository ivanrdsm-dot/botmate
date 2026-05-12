import type { Metadata } from "next";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import CTA from "@/components/CTA";
import { Check, BadgePercent, Truck, ShieldCheck, Banknote } from "lucide-react";

export const metadata: Metadata = {
  title: "Venta de robots Pudu Robotics en México — Compra y financiamiento · BotMate",
  description:
    "Compra robots Pudu Robotics en México con BotMate, distribuidor autorizado. Leasing, garantía hasta 4 años, refacciones originales y hasta 89% deducible bajo el Plan México. Entrega inmediata en CDMX, GDL, MTY.",
  alternates: { canonical: "/venta" },
  keywords: [
    "venta de robots México",
    "comprar BellaBot México",
    "comprar KettyBot",
    "distribuidor Pudu México",
    "leasing robots",
    "Plan México deducción 89%",
    "comprar robot mesero",
    "venta robots limpieza CC1",
  ],
};

const benefits = [
  { icon: BadgePercent, t: "Hasta 89% deducible", d: "Aprovecha los incentivos fiscales del Plan México." },
  { icon: Truck, t: "Entrega inmediata", d: "Stock en México listo para envío en 48-72 hrs." },
  { icon: ShieldCheck, t: "Garantía extendida 4 años", d: "Cobertura total y refacciones originales." },
  { icon: Banknote, t: "Financiamiento", d: "Leasing y arrendamiento puro con tasa preferencial." },
];

export default function VentaPage() {
  return (
    <>
      <section className="pt-32">
        <div className="container-x">
          <SectionTitle
            eyebrow="Venta directa"
            title={<>Adquiere robots con <span className="gradient-text">los mejores beneficios</span></>}
            description="Distribuidor autorizado Pudu Robotics. Compra directa con asesoría técnica, instalación profesional y soporte por toda la vida útil del equipo."
          />
        </div>
      </section>

      <section className="py-16">
        <div className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.t} className="card-tech">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-violet/20 ring-1 ring-white/10">
                <b.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-display text-lg font-semibold">{b.t}</h3>
              <p className="mt-1 text-sm text-white/60">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="container-x">
          <div className="grid items-center gap-10 rounded-3xl border border-white/10 bg-bg-card/60 p-8 lg:grid-cols-2 lg:p-12">
            <div>
              <span className="chip">Plan México · Estímulo Fiscal</span>
              <h3 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
                Deduce <span className="gradient-text">hasta 89%</span> de la inversión
              </h3>
              <p className="mt-4 text-white/70">
                Los robots de servicio califican dentro del paquete de estímulos fiscales del Plan México para empresas que invierten en innovación, automatización y tecnologías limpias.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-white/80">
                {[
                  "Deducción inmediata acelerada",
                  "Aplicable a renta y compra",
                  "Asesoría fiscal complementaria",
                  "Documentación de respaldo incluida",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-accent" /> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contacto" className="btn-primary">Solicitar cotización</Link>
                <Link href="/robots" className="btn-ghost">Ver catálogo</Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-accent/20 to-accent-violet/20 blur-2xl" />
              <div className="grid aspect-video place-items-center rounded-3xl border border-white/10 bg-bg p-8 text-center">
                <div>
                  <p className="font-display text-6xl font-bold gradient-text">89%</p>
                  <p className="mt-2 text-sm uppercase tracking-widest text-white/60">Deducción Plan México</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
