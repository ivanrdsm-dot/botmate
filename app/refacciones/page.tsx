import type { Metadata } from "next";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import CTA from "@/components/CTA";
import { Wrench, Package, Clock, ShieldCheck, Cpu, Battery } from "lucide-react";

export const metadata: Metadata = {
  title: "Refacciones y mantenimiento de robots Pudu Robotics en México",
  description:
    "Refacciones originales y servicio técnico certificado para robots Pudu Robotics en México. Baterías, sensores LiDAR, cámaras 3D, ruedas y kits de mantenimiento para BellaBot, KettyBot, SwiftBot, FlashBot y CC1.",
  alternates: { canonical: "/refacciones" },
  keywords: [
    "refacciones Pudu Robotics",
    "mantenimiento BellaBot",
    "servicio técnico robot México",
    "batería robot Pudu",
    "sensor LiDAR Pudu",
    "kit limpieza CC1",
    "póliza mantenimiento robot",
  ],
};

const parts = [
  { icon: Battery, t: "Baterías de litio originales", d: "Reposición con garantía de fábrica." },
  { icon: Cpu, t: "Tarjetas y módulos electrónicos", d: "Sensores LiDAR, cámaras 3D y controladores." },
  { icon: Package, t: "Componentes mecánicos", d: "Bandejas, ruedas, motores, carcasas y más." },
  { icon: Wrench, t: "Kits de mantenimiento", d: "Cepillos, escobillas, mopas y filtros para CC1." },
];

const services = [
  { icon: Clock, t: "Mantenimiento preventivo", d: "Diagnóstico, actualización de firmware, calibración SLAM, limpieza interna y reporte ejecutivo." },
  { icon: Wrench, t: "Mantenimiento correctivo", d: "Reparación en sitio o en laboratorio con técnicos certificados Pudu y refacciones originales." },
  { icon: ShieldCheck, t: "Pólizas de servicio", d: "Pólizas anuales con visitas programadas, SLA garantizado y refacciones consumibles incluidas." },
];

export default function RefaccionesPage() {
  return (
    <>
      <section className="pt-32">
        <div className="container-x">
          <SectionTitle
            eyebrow="Refacciones y servicio"
            title={<>Mantén tus robots <span className="gradient-text">siempre operando</span></>}
            description="Stock de refacciones originales Pudu Robotics y servicio técnico certificado en todo México. Ya seas cliente de BotMate o de otro distribuidor, te apoyamos."
          />
        </div>
      </section>

      <section className="py-12">
        <div className="container-x">
          <h2 className="font-display text-2xl font-semibold">Refacciones disponibles</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {parts.map((p) => (
              <div key={p.t} className="card-tech">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-violet/20 ring-1 ring-white/10">
                  <p.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-display text-base font-semibold">{p.t}</h3>
                <p className="mt-1 text-sm text-white/60">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-x">
          <h2 className="font-display text-2xl font-semibold">Servicios de mantenimiento</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {services.map((s) => (
              <div key={s.t} className="card-tech">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-violet/20 ring-1 ring-white/10">
                  <s.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-white/60">{s.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/contacto" className="btn-primary">Cotizar refacciones</Link>
            <Link href="/contacto" className="btn-ghost">Agendar mantenimiento</Link>
          </div>
        </div>
      </section>

      <CTA title="¿Tu robot necesita servicio?" subtitle="Atendemos equipos Pudu Robotics de cualquier distribuidor con técnicos certificados." />
    </>
  );
}
