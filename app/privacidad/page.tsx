import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import { site } from "@/lib/site";
export const metadata: Metadata = {
  title: "Privacidad y uso de datos",
  description:
    "Cómo funciona la preparación de consultas de Botmate y qué sucede al continuar a WhatsApp.",
  alternates: { canonical: "/privacidad", languages: {"es-MX": "/privacidad", en: "/en/privacy"} },
  robots: { index: false, follow: true },
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="Privacidad"
        title="Tus datos, con claridad."
        description="Información sobre el funcionamiento de esta versión del sitio y sus canales de contacto."
      />
      <section className="section-space section-compact">
        <div className="container-x legal-content">
          <div className="notice">
            Versión para revisión. El aviso de privacidad integral debe
            completarse con los datos y condiciones del responsable antes de
            publicar el sitio.
          </div>
          <h2>Al preparar una consulta</h2>
          <p>
            El formulario construye el mensaje en tu navegador con el nombre,
            empresa, ciudad, modelo y descripción que decidas proporcionar. Esta
            versión no envía esos campos a un servidor de Botmate ni los
            almacena en una base de datos.
          </p>
          <h2>Al continuar a WhatsApp</h2>
          <p>
            El botón abre un enlace de WhatsApp que incluye el texto de tu
            consulta para prepararlo allí. WhatsApp recibe ese texto al abrir el
            enlace y aplica sus propias condiciones. Debes pulsar enviar dentro
            de WhatsApp para contactar a Botmate.
          </p>
          <h2>Al reservar una videollamada</h2>
          <p>La agenda de Google Calendar se carga únicamente al pulsar «Ver horarios y reservar». Google recibe la conexión y los datos que proporciones en su agenda y gestiona la reserva y sus confirmaciones bajo sus condiciones de privacidad. Botmate recibe los datos de la cita como organizador.</p>
          <h2>Al usar correo o teléfono</h2>
          <p>
            Se abrirá la aplicación que tengas configurada para el canal
            elegido. El sitio no confirma entregas de correo, llamadas ni citas.
          </p>
          <h2>Medición y almacenamiento</h2>
          <p>
            El control de movimiento guarda únicamente tu preferencia en sessionStorage durante la sesión. Esta versión no incorpora Google Analytics, Meta Pixel ni una
            suscripción a boletines. Los datos escritos en el formulario se
            mantienen únicamente en el estado de la página mientras está
            abierta. El alojamiento puede generar registros técnicos de las
            visitas; ese tratamiento debe detallarse en el aviso integral del
            responsable.
          </p>
          <h2>Contacto sobre datos</h2>
          <p>
            Puedes escribir a <a href={`mailto:${site.email}`}>{site.email}</a>{" "}
            para solicitar información sobre el tratamiento de los datos
            compartidos con el equipo. Antes de publicar se deben confirmar la
            razón social y domicilio del responsable, finalidades,
            procedimientos para ejercer derechos, transferencias y mecanismo
            para comunicar cambios.
          </p>
        </div>
      </section>
    </>
  );
}
