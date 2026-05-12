import Link from "next/link";
import { Bot, Mail, Phone, MapPin, Instagram, Linkedin } from "lucide-react";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-bg-soft">
      <div className="absolute inset-x-0 -top-px mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-violet">
                <Bot className="h-5 w-5 text-white" />
              </span>
              <span className="font-display text-lg font-bold">
                Bot<span className="gradient-text">Mate</span>
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm text-white/60">
              Líderes en renta y venta de robots de servicio en México. Distribuidor
              autorizado Pudu Robotics con soporte técnico, refacciones y mantenimiento certificado en todo el país.
            </p>
            <div className="mt-6 flex gap-3">
              <a href={site.social.instagram} aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={site.social.linkedin} aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white/50">Soluciones</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/robots" className="text-white/70 hover:text-white">Catálogo</Link></li>
              <li><Link href="/renta" className="text-white/70 hover:text-white">Renta</Link></li>
              <li><Link href="/venta" className="text-white/70 hover:text-white">Venta</Link></li>
              <li><Link href="/refacciones" className="text-white/70 hover:text-white">Refacciones</Link></li>
              <li><Link href="/sectores" className="text-white/70 hover:text-white">Sectores</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white/50">Empresa</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/nosotros" className="text-white/70 hover:text-white">Nosotros</Link></li>
              <li><Link href="/casos-de-exito" className="text-white/70 hover:text-white">Casos de éxito</Link></li>
              <li><Link href="/blog" className="text-white/70 hover:text-white">Blog</Link></li>
              <li><Link href="/contacto" className="text-white/70 hover:text-white">Contacto</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white/50">Contacto</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2 text-white/70">
                <Phone className="mt-0.5 h-4 w-4 text-accent" />
                <a href={`tel:${site.phone}`}>{site.whatsappDisplay}</a>
              </li>
              <li className="flex items-start gap-2 text-white/70">
                <Mail className="mt-0.5 h-4 w-4 text-accent" />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li className="flex items-start gap-2 text-white/70">
                <MapPin className="mt-0.5 h-4 w-4 text-accent" />
                <span>{site.address.street}, {site.address.locality}, {site.address.region}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {site.legalName}. Todos los derechos reservados.</p>
          <p>Distribuidor autorizado · Hecho en México con tecnología Pudu Robotics</p>
        </div>
      </div>
    </footer>
  );
}
