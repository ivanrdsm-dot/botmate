import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { waLink } from "@/lib/site";
export default function CTA({
  title = "Tu siguiente paso empieza con una conversación.",
  subtitle = "Cuéntanos qué necesitas resolver. Evaluemos juntos cómo integrar un robot a tu operación.",
  primaryHref = "/reservar",
  primaryLabel = "Reservar una llamada",
  waMessage = "Hola Botmate, quiero información para mi operación.",
}: {
  title?: string;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
  waMessage?: string;
}) {
  return (
    <section className="section-space">
      <div className="container-x">
        <div className="cta-panel">
          <div>
            <p className="eyebrow">HAGAMOS EQUIPO</p>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>
          <div className="cta-actions">
            <Link className="btn-primary" href={primaryHref}>
              {primaryLabel}
              <ArrowUpRight size={18} />
            </Link>
            <a
              className="text-link"
              href={waLink(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablar por WhatsApp <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
