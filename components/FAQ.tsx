"use client";

import { useState } from "react";
import Script from "next/script";
import { ChevronDown } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { faqs } from "@/lib/faqs";
import { faqLd } from "@/lib/seo";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20">
      <div className="container-x">
        <SectionTitle
          eyebrow="FAQ"
          title={<>Preguntas <span className="gradient-text">frecuentes</span></>}
        />
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-white/10 rounded-3xl border border-white/10 bg-bg-card/40">
          {faqs.map((f, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
              >
                <span className="font-medium">{f.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-white/50 transition ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`grid overflow-hidden transition-all ${
                  open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 text-sm text-white/70">{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(faqs)) }} />
    </section>
  );
}
