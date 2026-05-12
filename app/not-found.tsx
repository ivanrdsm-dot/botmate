import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center pt-24">
      <div className="container-x text-center">
        <p className="font-display text-7xl font-bold gradient-text">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold">Ruta no encontrada</h1>
        <p className="mt-2 text-white/60">El robot tomó otro camino. Regresa al inicio.</p>
        <Link href="/" className="btn-primary mt-8 inline-flex">Volver al inicio</Link>
      </div>
    </section>
  );
}
