import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import FieldGallery from "@/components/FieldGallery";
import FieldVideo from "@/components/FieldVideo";
import CTA from "@/components/CTA";
export const metadata: Metadata = {
  title: "Galería · Robots en espacios de servicio y eventos",
  description:
    "Explora el archivo de campo de Botmate con fotografías y un recorrido en video. Conoce aplicaciones sin atribuir resultados comerciales no documentados.",
  alternates: { canonical: "/casos-de-exito" },
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="Galería de aplicaciones"
        title={
          <>
            La tecnología
            <br />
            <span>sale al mundo.</span>
          </>
        }
        description="Fotografías del archivo de Botmate en espacios de servicio y eventos. Una referencia visual para imaginar las posibilidades de tu proyecto."
      />
      <FieldGallery />
      <section className="section-space soft-section">
        <div className="container-x video-panel">
          <FieldVideo />
          <div className="video-copy">
            <p className="eyebrow">Un recorrido en video</p>
            <h2>
              Una tarea cotidiana.
              <br />
              Otra forma de hacerla.
            </h2>
            <p>
              Observa un robot con bandejas de productos recorriendo el pasillo
              de una tienda. El video se carga cuando decides reproducirlo.
            </p>
            <p>
              Descripción del clip: un robot avanza con productos acomodados en
              sus bandejas; la cámara lo acompaña por un pasillo interior. Sin
              narración.
            </p>
            <p>
              Estas imágenes muestran aplicaciones; no representan una medición
              de resultados ni una recomendación de las marcas visibles.
            </p>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
