import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { site } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Renta y venta de robots de servicio en México · Pudu Robotics`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "robots en renta México",
    "renta de robots",
    "venta de robots México",
    "robot mesero",
    "robot para restaurante",
    "BellaBot México",
    "BellaBot Pro",
    "KettyBot México",
    "KettyBot Pro",
    "SwiftBot",
    "FlashBot",
    "HolaBot",
    "robot limpieza autónoma",
    "CC1 PuduScrub",
    "Pudu Robotics México",
    "distribuidor Pudu México",
    "robots de servicio",
    "robot hotelero",
    "robot hospital",
    "robot logística",
    "AMR T300",
    "AMR T600",
    "renta de robots CDMX",
    "renta de robots Guadalajara",
    "renta de robots Monterrey",
    "refacciones robots Pudu",
    "mantenimiento robots",
    "automatización restaurantes",
    "Plan México deducción",
    "estímulo fiscal robótica",
  ],
  alternates: {
    canonical: "/",
    languages: { "es-MX": "/", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Renta y venta de robots de servicio en México`,
    description: site.description,
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "BotMate — Robots de servicio en México" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Robots de servicio en México`,
    description: site.description,
    images: ["/og.svg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "Robótica · Automatización · México",
  other: {
    "geo.region": "MX",
    "geo.placename": "Ciudad de México",
    "geo.position": "19.3673;-99.1872",
    ICBM: "19.3673, -99.1872",
  },
};

export const viewport: Viewport = {
  themeColor: "#04060B",
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#org`,
        name: site.name,
        url: site.url,
        logo: `${site.url}/logo.svg`,
        sameAs: Object.values(site.social),
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: site.phone,
            email: site.email,
            contactType: "sales",
            areaServed: "MX",
            availableLanguage: ["Spanish", "English"],
          },
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": `${site.url}/#business`,
        name: site.name,
        image: `${site.url}/og.svg`,
        url: site.url,
        telephone: site.phone,
        email: site.email,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.locality,
          addressRegion: site.address.region,
          postalCode: site.address.postal,
          addressCountry: site.address.country,
        },
        areaServed: { "@type": "Country", name: "México" },
        geo: { "@type": "GeoCoordinates", latitude: 19.3673, longitude: -99.1872 },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { "@id": `${site.url}/#org` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${site.url}/buscar?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <WhatsAppFab />
      <Script
        id="ld-json"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </>
  );
}
