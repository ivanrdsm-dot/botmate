import { CalendarDays, MessageCircle, Mail, ArrowRight } from "lucide-react";
import SectionTitle from "./SectionTitle";
import MagneticButton from "./MagneticButton";
import { site, waLink } from "@/lib/site";

/**
 * Agenda de demostraciones. Si NEXT_PUBLIC_BOOKING_URL está configurada
 * (horario de citas de Google Calendar o evento de Calendly), embebe el
 * calendario oficial: el cliente elige fecha/hora y confirma sin salir del
 * sitio, con correo de confirmación automático. Sin URL, muestra un flujo
 * elegante por WhatsApp, correo y teléfono.
 */
function buildEmbed(url: string): string {
  // Google Calendar appointment schedule → necesita ?gv=true para embeber
  if (url.includes("calendar.google.com") || url.includes("calendar.app.google")) {
    return `${url}${url.includes("?") ? "&" : "?"}gv=true`;
  }
  // Calendly → tema oscuro de marca
  if (url.includes("calendly.com")) {
    return `${url}${url.includes("?") ? "&" : "?"}hide_gdpr_banner=1&background_color=070a14&text_color=ffffff&primary_color=3d5afe`;
  }
  return url;
}

export default function DemoScheduler() {
  const booking = process.env.NEXT_PUBLIC_BOOKING_URL ?? process.env.NEXT_PUBLIC_CALENDLY_URL;
  const embed = booking ? buildEmbed(booking) : null;
  const isGoogle = !!booking && (booking.includes("calendar.google") || booking.includes("calendar.app.google"));

  return (
    <section className="py-24" id="demo">
      <div className="container-x">
        <SectionTitle
          eyebrow="Agenda una demo"
          title={<>Ve un robot BotMate <span className="gradient-text">en vivo</span></>}
          description="30 minutos, sin costo y sin compromiso. Un asesor lleva la demostración a tu operación o te la muestra en línea."
        />

        {embed ? (
          <div
            className={`mt-12 overflow-hidden rounded-3xl border border-white/10 ${
              isGoogle ? "bg-white" : "bg-bg-card/60"
            }`}
          >
            <iframe
              src={embed}
              title="Agenda tu demostración BotMate"
              className="h-[720px] w-full"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              {
                icon: MessageCircle,
                title: "Por WhatsApp",
                desc: "La vía más rápida: cuéntanos tu giro y horario ideal, confirmamos tu demo el mismo día.",
                href: waLink("Hola BotMate, quiero agendar una demostración en vivo. Mi giro es: ___ y mi horario ideal es: ___"),
                cta: "Agendar por WhatsApp",
                external: true,
                featured: true,
              },
              {
                icon: Mail,
                title: "Por correo",
                desc: `Escríbenos a ${site.email} con tu disponibilidad y te proponemos horarios.`,
                href: `mailto:${site.email}?subject=${encodeURIComponent("Agendar demostración BotMate")}&body=${encodeURIComponent("Hola, me gustaría agendar una demo. Mi disponibilidad es: ")}`,
                cta: "Enviar correo",
                external: false,
                featured: false,
              },
              {
                icon: CalendarDays,
                title: "Con un asesor",
                desc: `Llámanos al ${site.phoneDisplay} y coordinamos fecha, sede y robot a demostrar.`,
                href: `tel:${site.phone}`,
                cta: "Llamar ahora",
                external: false,
                featured: false,
              },
            ].map((c) => (
              <div
                key={c.title}
                className={`card-tech flex h-full flex-col ${c.featured ? "ring-1 ring-brand-500/40" : ""}`}
              >
                <span className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-brand-500/15 text-brand-300">
                  <c.icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-xl font-semibold">{c.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/65">{c.desc}</p>
                <MagneticButton className="mt-6">
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener" } : {})}
                    className={c.featured ? "btn-primary" : "btn-ghost"}
                  >
                    {c.cta} <ArrowRight className="h-4 w-4" />
                  </a>
                </MagneticButton>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
