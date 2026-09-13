"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Logo from "./Logo";
const nav = [
  { href: "/robots", label: "Robots" },
  { href: "/sectores", label: "Soluciones" },
  { href: "/servicios", label: "Servicios" },
  { href: "/nosotros", label: "Botmate" },
];
export default function Navbar() {
  const [openPath, setOpenPath] = useState<string | null>(null);
  const pathname = usePathname();
  const open = openPath === pathname;
  const setOpen = (value: boolean) => setOpenPath(value ? pathname : null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpenPath(null);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="container-x nav-inner">
        <Link href="/" aria-label="Botmate · Inicio" className="brand-link">
          <Logo />
        </Link>
        <nav aria-label="Navegación principal" className="desktop-nav">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={pathname.startsWith(n.href) ? "page" : undefined}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link href="/reservar" className="btn-primary nav-cta">
          Reservar una llamada <ArrowUpRight size={16} />
        </Link>
        <button
          ref={toggle}
          type="button"
          className="menu-toggle"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <nav
        id="mobile-nav"
        aria-label="Navegación móvil"
        className="mobile-nav"
        hidden={!open}
      >
        {[
          ...nav,
          { href: "/renta", label: "Renta" },
          { href: "/venta", label: "Compra" },
          { href: "/reservar", label: "Reservar una llamada" },
          { href: "/contacto", label: "Contacto" },
        ].map((n) => (
          <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>
            {n.label}
            <ArrowUpRight size={17} />
          </Link>
        ))}
      </nav>
    </header>
  );
}
