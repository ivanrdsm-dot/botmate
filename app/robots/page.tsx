import type { Metadata } from "next";
import Script from "next/script";
import RobotCard from "@/components/RobotCard";
import SectionTitle from "@/components/SectionTitle";
import CTA from "@/components/CTA";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { robots, categoryLabel, type RobotCategory } from "@/lib/robots";
import { site } from "@/lib/site";
import { itemListLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Catálogo de robots Pudu Robotics en México — BellaBot, KettyBot, SwiftBot, CC1",
  description:
    "Catálogo completo de robots Pudu Robotics en México: BellaBot Pro, KettyBot Pro, SwiftBot, FlashBot, HolaBot, CC1, SH1, PuduBot 2, T300 y T600. Disponibles en renta o venta con stock inmediato.",
  alternates: { canonical: "/robots" },
  keywords: [
    "catálogo robots Pudu México",
    "robot mesero México",
    "BellaBot Pro precio",
    "KettyBot Pro renta",
    "SwiftBot México",
    "CC1 PuduScrub",
    "robots de limpieza autónoma",
    "AMR T600",
  ],
};

const categories: RobotCategory[] = ["delivery", "guidance", "cleaning", "logistics"];

export default function RobotsPage() {
  const itemList = itemListLd(
    robots.map((r) => ({ name: r.name, url: `/robots/${r.slug}` }))
  );
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Inicio", url: "/" }, { name: "Robots", url: "/robots" }]} />
      <Script id="ld-robots-list" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <section className="pt-32">
        <div className="container-x">
          <SectionTitle
            eyebrow="Catálogo completo"
            title={<>Encuentra el <span className="gradient-text">robot perfecto</span></>}
            description="Más de 10 modelos para entrega, hospitalidad, limpieza autónoma y logística pesada. Disponibilidad inmediata en México."
          />
        </div>
      </section>

      {categories.map((cat) => {
        const list = robots.filter((r) => r.category === cat);
        if (!list.length) return null;
        return (
          <section key={cat} className="py-12">
            <div className="container-x">
              <div className="mb-8 flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
                <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-white/70">
                  {categoryLabel[cat]}
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-accent-violet/50 to-transparent" />
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((r) => (
                  <RobotCard key={r.slug} robot={r} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <CTA />
    </>
  );
}
