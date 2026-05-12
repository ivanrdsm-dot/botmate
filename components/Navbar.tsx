"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Bot, Phone } from "lucide-react";
import { waLink } from "@/lib/site";

const nav = [
  { href: "/robots", label: "Robots" },
  { href: "/renta", label: "Renta" },
  { href: "/venta", label: "Venta" },
  { href: "/refacciones", label: "Refacciones" },
  { href: "/casos-de-exito", label: "Casos" },
  { href: "/blog", label: "Blog" },
  { href: "/nosotros", label: "Nosotros" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled
          ? "border-b border-white/10 bg-bg/75 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-violet shadow-lg shadow-accent-violet/30 transition group-hover:rotate-12">
            <Bot className="h-5 w-5 text-white" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Bot<span className="gradient-text">Mate</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-full px-3 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/contacto" className="rounded-full px-3 py-2 text-sm text-white/70 hover:text-white">
            Contacto
          </Link>
          <a href={waLink()} target="_blank" rel="noopener" className="btn-primary">
            <Phone className="h-4 w-4" /> Cotizar
          </a>
        </div>

        <button
          aria-label="Abrir menú"
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden">
          <div className="container-x pb-6 pt-2">
            <div className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-bg-soft/90 p-2 backdrop-blur-xl">
              {[...nav, { href: "/contacto", label: "Contacto" }].map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm text-white/80 hover:bg-white/5"
                >
                  {n.label}
                </Link>
              ))}
              <a href={waLink()} target="_blank" rel="noopener" className="btn-primary mt-2 w-full">
                Cotizar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
