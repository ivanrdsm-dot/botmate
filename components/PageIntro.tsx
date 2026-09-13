import Link from "next/link";
export default function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
}) {
  return (
    <section className="page-intro">
      <div className="container-x">
        <div className="breadcrumb">
          <Link href="/">Inicio</Link>
          <span>/</span>
          <span>{eyebrow}</span>
        </div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="intro-description">{description}</p>
      </div>
    </section>
  );
}
