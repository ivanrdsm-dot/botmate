import SectionTitle from "./SectionTitle";
import { Search, ClipboardCheck, Truck, Headset } from "lucide-react";

const steps = [
  { icon: Search, title: "Diagnóstico", desc: "Visitamos tu sitio o analizamos planos para recomendar el robot ideal." },
  { icon: ClipboardCheck, title: "Propuesta", desc: "Cotización transparente con planes de renta, venta o leasing." },
  { icon: Truck, title: "Instalación", desc: "Mapeo SLAM, configuración, capacitación y go-live en 48-72 hrs." },
  { icon: Headset, title: "Soporte 24/7", desc: "Mantenimiento, refacciones y monitoreo remoto continuo." },
];

export default function Process() {
  return (
    <section className="py-20">
      <div className="container-x">
        <SectionTitle
          eyebrow="Proceso"
          title={<>De la idea a la operación en <span className="gradient-text">72 horas</span></>}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="card-tech">
              <div className="flex items-center justify-between">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-violet/20 ring-1 ring-white/10">
                  <s.icon className="h-5 w-5 text-accent" />
                </div>
                <span className="font-display text-3xl font-bold text-white/10">0{i + 1}</span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-white/60">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
