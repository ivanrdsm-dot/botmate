import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { type Robot, categoryLabel } from "@/lib/robots";
export default function RobotCard({ robot }: { robot: Robot }) {
  return (
    <article className="robot-card">
      <Link
        href={`/robots/${robot.slug}`}
        className="robot-image-link"
        aria-label={`Ver ${robot.name}`}
      >
        <div className="robot-image">
          {robot.image ? (
            <Image
              src={robot.image}
              alt={`${robot.name}: imagen de referencia del catálogo`}
              fill
              sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
              className="object-contain"
            />
          ) : (
            <div className="photo-placeholder">
              <FileText size={40} />
              <span>Consulta la ficha del fabricante</span>
            </div>
          )}
          <span className="product-tag">{categoryLabel[robot.category]}</span>
        </div>
      </Link>
      <div className="robot-card-copy">
        <p className="tiny-label">PUDU ROBOTICS</p>
        <h3>
          <Link href={`/robots/${robot.slug}`}>
            {robot.name}
            <ArrowUpRight size={21} />
          </Link>
        </h3>
        <p>{robot.tagline}</p>
        <div className="robot-card-bottom">
          <span>{robot.useCases.slice(0, 2).join(" · ")}</span>
          <span>Consultar disponibilidad</span>
        </div>
      </div>
    </article>
  );
}
