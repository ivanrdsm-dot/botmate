import type { Metadata } from "next";
import { CalendarDays, Video, MapPin } from "lucide-react";
import BookingCalendar from "@/components/BookingCalendar";
import PageIntro from "@/components/PageIntro";
export const metadata: Metadata = {
  title: "Reserva una llamada sobre robots para tu empresa",
  description:
    "Reserva una videollamada de 30 minutos con Botmate en Google Calendar. Conoce robots de entrega, publicidad y limpieza para tu empresa en México.",
  alternates: { canonical: "/reservar", languages: {"es-MX": "/reservar", en: "/en/book"} },
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="CONOCE. PREGUNTA. DECIDE."
        title={
          <>
            Tu siguiente paso,
            <br />
            una conversación.
          </>
        }
        description="Veamos qué puede aportar la robótica a tu operación. Comenzamos por tus tareas, tu espacio y tus objetivos."
      />
      <section className="section-space section-compact">
        <div className="container-x booking-grid">
          <aside>
            <p className="eyebrow">UNA CONVERSACIÓN CON PROPÓSITO</p>
            <h2>
              Descubre cómo
              <br />
              encaja contigo.
            </h2>
            <ol className="booking-benefits">
              <li>
                <Video size={22} />
                <div>
                  <h3>Conoce las posibilidades</h3>
                  <p>
                    Comienza con una conversación sobre las tareas que quieres
                    resolver.
                  </p>
                </div>
              </li>
              <li>
                <MapPin size={22} />
                <div>
                  <h3>Revisamos tu operación</h3>
                  <p>
                    Ubicación, accesos, superficies y modelo para una
                    demostración útil.
                  </p>
                </div>
              </li>
              <li>
                <CalendarDays size={22} />
                <div>
                  <h3>Coordinamos el siguiente paso</h3>
                  <p>
                    Reserva tu videollamada. Si necesitas una demo presencial,
                    coordinamos después ubicación y modelo.
                  </p>
                </div>
              </li>
            </ol>
          </aside>
          <BookingCalendar />
        </div>
      </section>
    </>
  );
}
