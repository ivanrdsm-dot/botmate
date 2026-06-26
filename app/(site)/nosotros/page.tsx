import type { Metadata } from "next";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import { Award, Globe2, HeartHandshake, Rocket, Target, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Nosotros — BotMate, distribuidor autorizado Pudu Robotics en México",
  description:
    "BotMate es la empresa mexicana líder en robótica de servicio y distribuidor autorizado de Pudu Robotics. Misión, valores, equipo y compromiso con la automatización inteligente del negocio mexicano.",
  alternates: { canonical: "/nosotros" },
  keywords: [
    "BotMate empresa",
    "distribuidor autorizado Pudu Robotics México",
    "líderes robótica servicio México",
    "empresa robots CDMX",
  ],
};

const values = [
  { icon: Target, t: "Resultados medibles", d: "Cada implementación tiene KPIs claros desde el día 1. Si no movemos la aguja, no cumplimos." },
  { icon: HeartHandshake, t: "Cliente primero", d: "Soporte 24/7 en español, sin call centers offshore. Nuestro número lo contesta un humano." },
  { icon: Rocket, t: "Velocidad", d: "Del primer contacto al go-live en menos de 30 días promedio. La burocracia mata la innovación." },
  { icon: Award, t: "Excelencia técnica", d: "Equipo certificado por Pudu Robotics con horas reales de implementación, no solo teoría." },
];

const stats = [
  { value: 500, suffix: "+", label: "Robots desplegados" },
  { value: 80, suffix: "+", label: "Clientes activos" },
  { value: 24, suffix: "/7", label: "Soporte técnico" },
  { value: 99, suffix: ".7%", label: "Uptime promedio", decimals: 1 },
];

export default function NosotrosPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-32">
        <div className="absolute inset-0 -z-10 grid-bg opacity-50" />
        <div className="absolute -top-32 left-1/2 -z-10 h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
        <div className="container-x">
          <SectionTitle
            eyebrow="Sobre BotMate"
            title={<>Hacemos que la <span className="gradient-text">robótica</span> trabaje para el negocio mexicano</>}
            description="Somos una empresa mexicana fundada para acercar la mejor tecnología de robótica de servicio del mundo a las operaciones reales de restaurantes, hoteles, hospitales, plazas y fábricas en toda la República."
          />
        </div>
      </section>

      <section className="py-16">
        <div className="container-x">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <Reveal key={s.label}>
                <div className="card-tech text-center">
                  <p className="font-display text-4xl font-bold gradient-text">
                    <Counter value={s.value} suffix={s.suffix} decimals={(s as any).decimals} />
                  </p>
                  <p className="mt-2 text-sm uppercase tracking-wider text-white/60">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="chip"><Globe2 className="h-3.5 w-3.5 text-accent" /> Distribuidor autorizado</span>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
              Pudu Robotics, líder mundial.<br />
              <span className="gradient-text">BotMate</span>, su brazo en México.
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              Pudu Robotics es el fabricante #1 de robots de servicio comercial del mundo, con más de 80,000 unidades operando en 60 países. BotMate es su distribuidor autorizado para México, con acceso directo a roadmap, ingeniería y refacciones originales.
            </p>
            <p className="mt-4 text-white/70 leading-relaxed">
              Combinamos esa tecnología de clase mundial con un servicio profundamente local: hablamos tu idioma, conocemos al SAT, tenemos refacciones en bodegas en CDMX, GDL y MTY, y entendemos cómo funciona realmente un restaurante o un hospital mexicano.
            </p>
          </Reveal>
          <Reveal delay={1}>
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-accent/20 to-accent-violet/20 blur-2xl" />
              <div className="card-tech">
                <Users className="h-8 w-8 text-accent" />
                <h3 className="mt-4 font-display text-2xl font-semibold">Equipo BotMate</h3>
                <p className="mt-2 text-white/60">Ingenieros, fiscalistas, hosteleros y operadores. Un equipo multidisciplinario que entiende tu negocio desde el primer email.</p>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {["IO", "MC", "RS", "PN", "AC", "LR"].map((i) => (
                    <div key={i} className="grid aspect-square place-items-center rounded-xl border border-white/10 bg-white/[0.03] font-display text-sm font-semibold">
                      {i}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x">
          <SectionTitle
            eyebrow="Nuestros valores"
            title={<>Cómo <span className="gradient-text">trabajamos</span></>}
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <Reveal key={v.t}>
                <div className="card-tech h-full">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-violet/20 ring-1 ring-white/10">
                    <v.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{v.t}</h3>
                  <p className="mt-1 text-sm text-white/60">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <h2 className="font-display text-3xl font-bold sm:text-4xl">Nuestra misión</h2>
              <p className="mt-4 text-white/75 leading-relaxed">
                Hacer la robótica de servicio accesible, rentable y operativa para cualquier empresa mexicana —desde el restaurante familiar de barrio hasta la cadena hotelera global— para que su gente humana se dedique a lo único que las máquinas no pueden hacer: crear experiencias humanas memorables.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contacto" className="btn-primary">Habla con nosotros</Link>
                <Link href="/casos-de-exito" className="btn-ghost">Ver casos de éxito</Link>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="card-tech">
                <h3 className="font-display text-xl font-semibold">Compromiso BotMate</h3>
                <ul className="mt-4 space-y-3 text-sm text-white/75">
                  <li>· Respuesta a cotizaciones en menos de 24 hrs hábiles</li>
                  <li>· Soporte técnico 24/7 con SLA garantizado</li>
                  <li>· Refacciones originales con stock en México</li>
                  <li>· Capacitación continua durante toda la renta</li>
                  <li>· Documentación fiscal Plan México lista para tu contador</li>
                  <li>· Mejora continua de rutas y métricas operativas</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
