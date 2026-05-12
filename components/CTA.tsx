import Link from "next/link";
import { waLink } from "@/lib/site";

export default function CTA({
  title = "¿Listo para automatizar tu operación?",
  subtitle = "Agenda una demo gratuita y descubre qué robot es el ideal para tu negocio.",
}: {
  title?: string;
  subtitle?: string;
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
              <Link href="/contacto" className="btn-primary">Agendar demo</Link>
              <a href={waLink()} target="_blank" rel="noopener" className="btn-ghost">WhatsApp directo</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
