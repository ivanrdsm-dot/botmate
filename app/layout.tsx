import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { vitala } from "@/lib/brand";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://vitala.app"),
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
  icons: {
    icon: "/vitala/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: vitala.colors.bg,
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const C = vitala.colors;

function LeafLogo() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden>
      <rect width="30" height="30" rx="8" fill={C.bgSoft} />
      <path d="M8 22c0-8 6-15 16-16 0 11-6 16-16 16Z" fill={C.brand} />
      <circle cx="21" cy="9" r="3" fill={C.accent} />
    </svg>
  );
}

const navLinks = [
  { href: "/plan",      label: "Mi plan" },
  { href: "/recetas",  label: "Recetas" },
  { href: "/comunidad",label: "Comunidad", sm: true },
  { href: "/diario",   label: "Diario", sm: true },
  { href: "/progreso", label: "Progreso", sm: true },
  { href: "/coach",    label: "Coach IA", sm: true },
  { href: "/bienestar",label: "Bienestar", sm: true },
];

// SEO: identidad de la organización y de la app (schema.org).
const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Vitala",
      url: "https://vitala.app",
      logo: "https://vitala.app/vitala/icon-512.png",
      slogan: "Un nutriólogo para todos. Una moneda. Para toda la vida.",
    },
    {
      "@type": "WebApplication",
      name: "Vitala",
      url: "https://vitala.app",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web, iOS",
      offers: { "@type": "Offer", price: "1", priceCurrency: "MXN" },
      description:
        "Plan de alimentación personalizado, recetas del mundo, coach IA y hábitos. Acceso de por vida por una moneda.",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${inter.variable} ${jakarta.variable}`}>
      <body style={{ color: C.text }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {/* ── Navbar ──────────────────────────────── */}
        <header
          className="sticky top-0 z-40 border-b backdrop-blur-xl"
          style={{
            borderColor: "rgba(14,122,82,0.14)",
            background: "rgba(250,245,236,0.85)",
          }}
        >
          <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
            {/* Logo + wordmark */}
            <Link href="/" className="flex items-center gap-2.5 group" aria-label="Vitala inicio">
              <LeafLogo />
              <div>
                <span
                  className="block text-base font-bold leading-tight"
                  style={{ color: C.brandLight, fontFamily: "var(--font-display)" }}
                >
                  {vitala.name}
                </span>
                <span className="block text-[10px] leading-tight" style={{ color: C.textMuted }}>
                  Salud accesible
                </span>
              </div>
            </Link>

            {/* Nav links */}
            <nav className="flex items-center gap-1 text-sm">
              {navLinks.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`rounded-full px-3 py-1.5 transition-colors hover:bg-white/5 ${
                    n.sm ? "hidden sm:inline-block" : ""
                  }`}
                  style={{ color: C.textMuted }}
                >
                  {n.label}
                </Link>
              ))}
              <Link
                href="/cuenta"
                className="ml-2 btn-brand text-sm glow"
                style={{ background: C.brandDeep, color: "#FFFFFF" }}
              >
                Mi cuenta
              </Link>
            </nav>
          </div>
        </header>

        {/* ── Main ──────────────────────────────── */}
        <main className="mx-auto max-w-5xl px-5 py-10">{children}</main>

        {/* ── Footer ────────────────────────────── */}
        <footer
          className="mt-16 border-t px-5 py-10 text-center"
          style={{ borderColor: "rgba(14,122,82,0.14)", color: C.textMuted }}
        >
          <div className="mx-auto max-w-xl space-y-3">
            <p className="flex items-center justify-center gap-2 text-sm font-medium" style={{ color: C.brandLight }}>
              <span>🌿</span> {vitala.name} — {vitala.tagline}
            </p>
            <p className="text-xs" style={{ color: C.textMuted }}>
              Orientación educativa de nutrición y bienestar. No diagnostica ni sustituye a profesionales de la salud.
            </p>
            <p className="text-xs">
              <Link href="/legal" className="underline underline-offset-2" style={{ color: C.textMuted }}>
                Aviso de salud y privacidad
              </Link>
              {" · "}
              <Link href="/uno-peso" className="underline underline-offset-2" style={{ color: C.accent }}>
                Acceso de por vida · $1
              </Link>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
