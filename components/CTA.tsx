import Link from "next/link";
import { waLink } from "@/lib/site";
import MagneticButton from "./MagneticButton";

export default function CTA({
  title = "¿Listo para automatizar tu operación?",
  subtitle = "Agenda una demo gratuita y descubre qué robot es el ideal para tu negocio.",
  waMessage = "Hola BotMate, quiero agendar una demostración gratuita.",
  primaryHref = "/contacto",
  primaryLabel = "Agendar demo",
}: {
  title?: string;
  subtitle?: string;
  waMessage?: string;
  primaryHref?: string;
  primaryLabel?: string;
}) {
  return (
    <section className="py-20">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-bg-card/60 p-8 sm:p-12">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent-violet/30 blur-3xl" />
          <div className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
          <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="font-display text-3xl font-bold sm:text-4xl">{title}</h2>
              <p className="mt-3 max-w-xl text-white/70">{subtitle}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <MagneticButton>
                <Link href={primaryHref} className="btn-primary">{primaryLabel}</Link>
              </MagneticButton>
              <MagneticButton>
                <a href={waLink(waMessage)} target="_blank" rel="noopener" className="btn-ghost">
                  WhatsApp directo
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
