import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { vitala } from "@/lib/brand";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });

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
  twitter: {
    card: "summary_large_image",
    title: `${vitala.name} — ${vitala.tagline}`,
    description: vitala.description,
    images: ["/vitala/og.svg"],
  },
  icons: {
    icon: "/vitala/icon.svg",
    apple: "/vitala/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: vitala.colors.bg,
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

function Leaf() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 19c0-7 5-13 14-14 0 9-5 14-14 14Z" fill={vitala.colors.brandLight} />
      <path d="M5 19c3-6 7-9 12-10" stroke={vitala.colors.bg} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${inter.variable} ${grotesk.variable}`}>
      <body style={{ background: vitala.colors.bg, color: "#E6F4EC" }} className="font-sans">
        <header
          className="sticky top-0 z-40 border-b backdrop-blur"
          style={{ borderColor: "rgba(74,222,128,.15)", background: "rgba(6,18,12,.8)" }}
        >
          <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Leaf />
              <span style={{ color: vitala.colors.brandLight }}>{vitala.name}</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/plan" className="opacity-80 hover:opacity-100">Mi plan</Link>
              <Link href="/coach" className="opacity-80 hover:opacity-100">Coach IA</Link>
              <Link href="/bienestar" className="hidden opacity-80 hover:opacity-100 sm:inline">Bienestar</Link>
              <Link
                href="/cuenta"
                className="rounded-full px-4 py-1.5 text-sm font-semibold text-black"
                style={{ background: vitala.colors.brand }}
              >
                Mi cuenta
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
            {vitala.name} ofrece información educativa de nutrición y bienestar. No realiza
            diagnósticos médicos ni sustituye la consulta con profesionales de la salud.
          </p>
          <p className="mt-2">
            <Link href="/legal" className="underline">Aviso de salud y privacidad</Link>
          </p>
        </footer>
      </body>
    </html>
  );
}
