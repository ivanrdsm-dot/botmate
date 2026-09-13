"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Logo from "./Logo";
import {isEnglish,localPath,spanishPath} from "@/lib/locale";
export default function Navbar() {
  const [openPath, setOpenPath] = useState<string | null>(null);
  const pathname = usePathname();
  const en = isEnglish(pathname), locale = en ? 'en' : 'es';
  const nav = [
    {href:'/robots',label:en?'Robots':'Robots'},
    {href:'/sectores',label:en?'Industries':'Soluciones'},
    {href:'/casos-de-exito',label:en?'Case studies':'Casos'},
    {href:'/refacciones',label:en?'Accessories':'Refacciones'},
    {href:'/blog',label:en?'Insights':'Recursos'},
    {href:'/nosotros',label:'Botmate'},
  ].map(n=>({...n,href:localPath(n.href,locale)}));
  const languageTarget = en ? spanishPath(pathname) : localPath(pathname,'en');
  useEffect(()=>{document.documentElement.lang=en?'en':'es-MX';},[en]);
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
        <Link href={localPath("/",locale)} aria-label={en?"Botmate · Home":"Botmate · Inicio"} className="brand-link">
          <Logo />
        </Link>
        <nav aria-label={en?"Main navigation":"Navegación principal"} className="desktop-nav">
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
        <Link href={localPath("/reservar",locale)} className="btn-primary nav-cta">
          {en?"Book a call":"Reservar llamada"} <ArrowUpRight size={16} />
        </Link>
        <Link className="language-switch" href={languageTarget} hrefLang={en?"es-MX":"en"} aria-label={en?"Cambiar a español":"Switch to English"}>{en?"ES":"EN"}</Link>
        <button
          ref={toggle}
          type="button"
          className="menu-toggle"
          aria-label={open ? (en?"Close menu":"Cerrar menú") : (en?"Open menu":"Abrir menú")}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <nav
        id="mobile-nav"
        aria-label={en?"Mobile navigation":"Navegación móvil"}
        className="mobile-nav"
        hidden={!open}
      >
        {[
          ...nav,
          { href: localPath("/renta",locale), label: en?"Rental":"Renta" },
          { href: localPath("/venta",locale), label: en?"Purchase":"Compra" },
          { href: localPath("/reservar",locale), label: en?"Book a call":"Reservar una llamada" },
          { href: localPath("/contacto",locale), label: en?"Contact":"Contacto" },
          {href:localPath("/recursos",locale),label:en?"Resource library":"Biblioteca oficial"},
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

export function SkipLink(){const en=isEnglish(usePathname());return <a className="skip-link" href="#contenido">{en?"Skip to content":"Saltar al contenido"}</a>;}
