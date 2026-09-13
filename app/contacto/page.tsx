import type { Metadata } from "next";
import { Mail, Phone, MessageCircle } from "lucide-react";
import PageIntro from "@/components/PageIntro";
import ContactForm from "@/components/ContactForm";
import { site, waLink } from "@/lib/site";
export const metadata: Metadata = {
  title: "Contacto · Demostraciones y cotizaciones de robots",
  description:
    "Comparte tu proyecto con Botmate y consulta renta, compra o soporte. Prepara tu solicitud para continuar por WhatsApp, correo o teléfono.",
  alternates: { canonical: "/contacto", languages: {"es-MX": "/contacto", en: "/en/contact"} },
};
export default async function Page(
  props: {
    searchParams: Promise<{ interes?: string | string[]; robot?: string | string[] }>;
  }
) {
  const searchParams = await props.searchParams;
  const intent =
    typeof searchParams.interes === "string" &&
    ["Demo", "Cotizacion", "Renta", "Compra", "Soporte"].includes(
      searchParams.interes,
    )
      ? searchParams.interes
      : "Demo";
  const robot =
    typeof searchParams.robot === "string"
      ? searchParams.robot.slice(0, 100)
      : "";
  return (
    <>
      <PageIntro
        eyebrow="Contacto"
        title={
          <>
            Hablemos de lo
            <br />
            que <span>quieres mejorar.</span>
          </>
        }
        description="Cuéntanos cómo funciona tu negocio y qué tarea te gustaría automatizar. Ese es el primer paso para encontrar la solución adecuada."
      />
      <section className="section-space section-compact">
        <div className="container-x contact-layout">
          <aside className="contact-aside">
            <h2>Conversemos a tu manera.</h2>
            <div className="contact-options">
              <a href={waLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={22} />
                <div>
                  <strong>WhatsApp</strong>
                  <span>{site.whatsappDisplay}</span>
                </div>
              </a>
              <a href={`mailto:${site.email}`}>
                <Mail size={22} />
                <div>
                  <strong>Correo electrónico</strong>
                  <span>{site.email}</span>
                </div>
              </a>
              <a href={`tel:${site.phone}`}>
                <Phone size={22} />
                <div>
                  <strong>Por teléfono</strong>
                  <span>{site.phoneDisplay}</span>
                </div>
              </a>
            </div>
            <p className="eyebrow">Para preparar tu demostración</p>
            <p>
              Ten a la mano tu ubicación, el tipo de espacio y la tarea que
              quieres resolver. Coordinaremos contigo el modelo, la modalidad y
              las condiciones de la visita.
            </p>
            <p>
              La fecha y disponibilidad se confirman directamente con el equipo
              comercial.
            </p>
          </aside>
          <ContactForm key={`${intent}-${robot}`} initialInterest={intent} initialRobot={robot} />
        </div>
      </section>
    </>
  );
}
