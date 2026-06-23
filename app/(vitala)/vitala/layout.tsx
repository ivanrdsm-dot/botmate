import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { vitala } from "@/lib/vitala/brand";

export const metadata: Metadata = {
  title: {
    default: `${vitala.name} — ${vitala.tagline}`,
    template: `%s | ${vitala.name}`,
  },
  description: vitala.description,
  applicationName: vitala.name,
  manifest: "/vitala/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: vitala.name,
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    title: `${vitala.name} — ${vitala.tagline}`,
    description: vitala.description,
    images: [{ url: "/vitala/og.svg", width: 1200, height: 630, alt: "Vitala" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${vitala.name} — ${vitala.tagline}`,
    description: vitala.description,
    images: ["/vitala/og.svg"],
  },
  icons: {
    icon: "/vitala/icon.svg",
    apple: "/vitala/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: vitala.colors.bg,
};

function Leaf() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 19c0-7 5-13 14-14 0 9-5 14-14 14Z"
        fill={vitala.colors.brandLight}
      />
      <path d="M5 19c3-6 7-9 12-10" stroke={vitala.colors.bg} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function VitalaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{ background: vitala.colors.bg, color: "#E6F4EC", minHeight: "100vh" }}
      className="font-sans"
    >
      <header
        className="sticky top-0 z-40 border-b backdrop-blur"
        style={{ borderColor: "rgba(74,222,128,.15)", background: "rgba(6,18,12,.8)" }}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <Link href="/vitala" className="flex items-center gap-2 font-semibold">
            <Leaf />
            <span style={{ color: vitala.colors.brandLight }}>{vitala.name}</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/vitala/plan" className="opacity-80 hover:opacity-100">
              Mi plan
            </Link>
            <Link href="/vitala/coach" className="opacity-80 hover:opacity-100">
              Coach IA
            </Link>
            <Link href="/vitala/bienestar" className="hidden opacity-80 hover:opacity-100 sm:inline">
              Bienestar
            </Link>
            <Link
              href="/vitala/onboarding"
              className="rounded-full px-4 py-1.5 text-sm font-semibold text-black"
              style={{ background: vitala.colors.brand }}
            >
              Empezar
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-8">{children}</main>
      <footer
        className="border-t px-5 py-8 text-center text-xs"
        style={{ borderColor: "rgba(74,222,128,.12)", color: "#7FB79A" }}
      >
        <p className="mx-auto max-w-2xl">
          {vitala.name} ofrece información educativa de nutrición y bienestar. No
          realiza diagnósticos médicos ni sustituye la consulta con profesionales
          de la salud. Ante síntomas o dudas, acude a tu médico.
        </p>
        <p className="mt-2">
          <Link href="/vitala/legal" className="underline">
            Aviso de salud y privacidad
          </Link>
        </p>
      </footer>
    </div>
  );
}
