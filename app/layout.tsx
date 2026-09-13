import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { site } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import MotionProvider from "@/components/MotionProvider";
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Botmate · Robots de servicio en México",
    template: "%s | Botmate",
  },
  description: site.description,
  applicationName: site.name,
  verification: { google: "-VmDBYxlipsg1I6kHsexB9DDvfEG8y6qoFe_z5_nSYQ" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: site.name,
    title: "Botmate · Robótica que trabaja contigo",
    description: site.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Botmate · Robótica que trabaja contigo",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#org`,
        name: site.name,
        url: site.url,
        logo: `${site.url}/media/botmate-wordmark.png`,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: site.phone,
          email: site.email,
          contactType: "sales",
          availableLanguage: "Spanish",
        },
      },
      {
        "@type": "WebSite",
        name: site.name,
        url: site.url,
        publisher: { "@id": `${site.url}/#org` },
      },
    ],
  };
  return (
    <html
      lang="es-MX"
      className={manrope.variable}
      data-scroll-behavior="smooth"
    >
      <body>
        <MotionProvider>
          <a className="skip-link" href="#contenido">
            Saltar al contenido
          </a>
          <Navbar />
          <main id="contenido" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <WhatsAppFab />
        </MotionProvider>
        <script
          nonce={nonce}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      </body>
    </html>
  );
}
