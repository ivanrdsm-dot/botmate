"use client";

// Links del navbar con estado activo (píldora resaltada en la ruta actual).

import Link from "next/link";
import { usePathname } from "next/navigation";
import { vitala } from "@/lib/brand";

const C = vitala.colors;

const LINKS = [
  { href: "/plan",      label: "Mi plan" },
  { href: "/recetas",   label: "Recetas" },
  { href: "/salud",     label: "Salud", sm: true },
  { href: "/comunidad", label: "Comunidad", sm: true },
  { href: "/diario",    label: "Diario", sm: true },
  { href: "/progreso",  label: "Progreso", sm: true },
  { href: "/coach",     label: "Coach IA", sm: true },
  { href: "/bienestar", label: "Bienestar", sm: true },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {LINKS.map((n) => {
        const active = pathname === n.href || pathname.startsWith(n.href + "/");
        return (
          <Link
            key={n.href}
            href={n.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-3 py-1.5 transition-colors ${
              n.sm ? "hidden sm:inline-block" : ""
            } ${active ? "font-semibold" : "hover:bg-black/5"}`}
            style={active ? { background: C.bgSoft, color: C.brandLight } : { color: C.textMuted }}
          >
            {n.label}
          </Link>
        );
      })}
    </>
  );
}
