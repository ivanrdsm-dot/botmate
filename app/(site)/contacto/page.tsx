import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import ContactForm from "@/components/ContactForm";
import { site, waLink } from "@/lib/site";
import { Mail, MessageCircle, MapPin, Phone, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto BotMate — Cotiza robots y agenda demo gratis en México",
  description:
    "Cotiza renta o venta de robots Pudu Robotics, agenda demo gratuita o solicita servicio técnico. Respuesta en menos de 24 horas. WhatsApp +52 55 3149 1986 · contacto@botmate.mx · CDMX y toda la República.",
  alternates: { canonical: "/contacto" },
  keywords: [
    "cotizar robot México",
    "agendar demo robot",
    "contacto BotMate",
    "WhatsApp robots Pudu",
    "soporte técnico robot México",
  ],
};

export default function ContactoPage() {
  return (
    <>
      <section className="pt-32">
        <div className="container-x">
          <SectionTitle
            eyebrow="Contacto"
            title={<>Hablemos de tu <span className="gradient-text">próximo robot</span></>}
            description="Te respondemos en menos de 24 horas hábiles. Si prefieres atención inmediata, escríbenos por WhatsApp."
          />
        </div>
      </section>

      <section className="py-12">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <ContactInfo
              icon={Phone}
              title="WhatsApp & Teléfono"
              value={site.whatsappDisplay}
              href={`tel:${site.phone}`}
            />
            <ContactInfo
              icon={MessageCircle}
              title="Chat directo"
              value="Abrir conversación"
              href={waLink()}
              external
            />
            <ContactInfo
              icon={Mail}
              title="Correo"
              value={site.email}
              href={`mailto:${site.email}`}
            />
            <ContactInfo
              icon={MapPin}
              title="Oficina CDMX"
              value={`${site.address.street}, ${site.address.locality}`}
            />
            <ContactInfo
              icon={Clock}
              title="Horario"
              value="Lun a Vie · 9:00 – 18:00 · Soporte 24/7"
            />
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactInfo({
  icon: Icon,
  title,
  value,
  href,
  external,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <div className="card-tech flex items-start gap-4">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-violet/20 ring-1 ring-white/10">
        <Icon className="h-5 w-5 text-accent" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-white/50">{title}</p>
        <p className="mt-0.5 text-white">{value}</p>
      </div>
    </div>
  );
  if (!href) return inner;
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener" : undefined} className="block">
      {inner}
    </a>
  );
}
