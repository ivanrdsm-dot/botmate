import SectionTitle from "./SectionTitle";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export const steps = [
  {
    title: "Entendemos tu operación",
    desc: "Partimos de la tarea, el espacio y las necesidades de tu equipo.",
  },
  {
    title: "Evaluamos la solución",
    desc: "Revisamos el modelo, las rutas y las condiciones de implementación.",
  },
  {
    title: "Preparamos a tu equipo",
    desc: "Definimos la puesta en marcha y el alcance de la capacitación.",
  },
  {
    title: "Damos seguimiento",
    desc: "Acordamos los canales de soporte y el plan de mantenimiento.",
  },
];
export default function Process() {
  return (
    <section className="section-space process-section">
      <div className="container-x">
        <div className="section-heading-row">
          <SectionTitle
            eyebrow="El valor de hacerlo con Botmate"
            title={
              <>
                Un robot. Todo un
                <br />
                proceso a tu lado.
              </>
            }
          />
          <Link href="/servicios" className="text-link">
            Conoce el acompañamiento
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="process-grid">
          {steps.map((s, i) => (
            <div key={s.title}>
              <span className="step-number">0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
