import SectionTitle from "./SectionTitle";
import { faqs } from "@/lib/faqs";
import { faqLd } from "@/lib/seo";
import { Plus } from "lucide-react";
import JsonLd from "./JsonLd";
export default function FAQ() {
  return (
    <section className="section-space" id="preguntas">
      <div className="container-x faq-layout">
        <SectionTitle
          eyebrow="Resolvemos tus dudas"
          title={
            <>
              Antes de dar
              <br />
              el siguiente paso.
            </>
          }
          description="La mejor decisión empieza con información clara."
        />
        <div className="faq-list">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>
                {f.q}
                <Plus size={19} />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      <JsonLd data={faqLd(faqs)} />
    </section>
  );
}
