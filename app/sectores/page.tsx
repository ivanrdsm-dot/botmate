import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import CTA from "@/components/CTA";
import {
  UtensilsCrossed,
  BedDouble,
  Hospital,
  ShoppingBag,
  Factory,
  Building2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sectores que atendemos — Restaurantes, Hoteles, Hospitales, Retail y Logística",
  description:
    "Soluciones de robots Pudu Robotics para restaurantes, hoteles, hospitales, plazas comerciales, manufactura y corporativos en México. Implementación, capacitación y soporte 24/7.",
  alternates: { canonical: "/sectores" },
  keywords: [
    "robot para restaurante México",
    "robot hotel México",
    "robot hospital",
    "robot centro comercial",
    "robot manufactura CEDIS",
    "robot corporativo oficina",
    "automatización sector hospitalario",
  ],
};

const sectors = [
  {
    icon: UtensilsCrossed,
    name: "Restaurantes",
    desc: "BellaBot, KettyBot y HolaBot reducen el tiempo de servicio y aumentan la propina.",
    kpis: ["+40% productividad", "-60% pasos de mesero", "+35% experiencia"],
    robots: ["BellaBot Pro", "KettyBot Pro", "HolaBot"],
  },
  {
    icon: BedDouble,
    name: "Hoteles",
    desc: "FlashBot entrega amenidades multi-piso 24/7 y SwiftBot eleva el room service.",
    kpis: ["Entrega 24/7", "Integración PMS", "Experiencia premium"],
    robots: ["FlashBot", "SwiftBot", "BellaBot Pro"],
  },
  {
    icon: Hospital,
    name: "Hospitales y clínicas",
    desc: "Distribución de medicamentos, muestras y limpieza autónoma de áreas críticas.",
    kpis: ["Cero contacto", "Trazabilidad", "Higiene continua"],
    robots: ["FlashBot", "PuduBot 2", "CC1"],
  },
  {
    icon: ShoppingBag,
    name: "Retail y centros comerciales",
    desc: "KettyBot publicita marcas mientras CC1 mantiene los pisos impecables.",
    kpis: ["Marketing 360°", "Limpieza 4 en 1", "+ tráfico convertido"],
    robots: ["KettyBot Pro", "CC1", "SH1"],
  },
  {
    icon: Factory,
    name: "Manufactura y logística",
    desc: "AMR T300 y T600 transportan piezas, tarimas y materia prima entre estaciones.",
    kpis: ["-60% tiempo picking", "Carga 600 kg", "Integración WMS/MES"],
    robots: ["T300", "T600", "PuduBot 2"],
  },
  {
    icon: Building2,
    name: "Corporativos",
    desc: "Recepción inteligente, room service interno y limpieza nocturna automatizada.",
    kpis: ["Empleados felices", "Limpieza off-peak", "Ahorro operativo"],
    robots: ["KettyBot Pro", "CC1", "SwiftBot"],
  },
];

export default function SectoresPage() {
  return (
    <>
      <section className="pt-32">
        <div className="container-x">
          <SectionTitle
            eyebrow="Industrias"
            title={<>Soluciones por <span className="gradient-text">sector</span></>}
            description="Cada industria tiene retos distintos. Adaptamos la flota, la integración y el soporte a tu operación."
          />
        </div>
      </section>

      <section className="py-12">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {sectors.map((s) => (
            <div key={s.name} className="card-tech">
              <div className="flex items-start justify-between">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-violet/20 ring-1 ring-white/10">
                  <s.icon className="h-5 w-5 text-accent" />
                </div>
                <div className="flex flex-wrap justify-end gap-1.5">
                  {s.robots.map((r) => (
                    <span key={r} className="chip">{r}</span>
                  ))}
                </div>
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold">{s.name}</h3>
              <p className="mt-2 text-white/70">{s.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {s.kpis.map((k) => (
                  <span key={k} className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">{k}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
