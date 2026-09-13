import Link from "next/link";
import Logo from "./Logo";
import { site } from "@/lib/site";
import { ArrowUpRight } from "lucide-react";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-x">
        <div className="footer-grid">
          <div>
            <Link href="/" aria-label="Botmate · Inicio">
              <Logo />
            </Link>
            <p className="footer-description">
              Robótica que trabaja contigo.
              <br />
              Soluciones de servicio para México.
            </p>
            <a className="text-link" href={`mailto:${site.email}`}>
              {site.email}
              <ArrowUpRight size={16} />
            </a>
          </div>
          <div>
            <h2>Explorar</h2>
            <Link href="/robots">Robots</Link>
            <Link href="/sectores">Soluciones por industria</Link>
            <Link href="/renta">Renta de robots</Link>
            <Link href="/venta">Compra de robots</Link>
          </div>
          <div>
            <h2>Acompañamiento</h2>
            <Link href="/servicios">Implementación y soporte</Link>
            <Link href="/refacciones">Refacciones</Link>
            <Link href="/blog">Guías y recursos</Link>
            <Link href="/casos-de-exito">Galería de aplicaciones</Link>
          </div>
          <div>
            <h2>Conversemos</h2>
            <Link href="/nosotros">Acerca de Botmate</Link>
            <Link href="/reservar">Reservar una llamada</Link>
            <Link href="/contacto">Contacto</Link>
            <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Botmate · México</span>
          <Link href="/privacidad">Privacidad y datos</Link>
          <span>Pudu Robotics es marca de su titular.</span>
        </div>
      </div>
    </footer>
  );
}
