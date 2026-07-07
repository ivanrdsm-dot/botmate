import Link from "next/link";
export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <div className="text-5xl">🌿</div>
      <h1 className="text-2xl font-bold">Página no encontrada</h1>
      <Link href="/" className="rounded-full px-6 py-2 font-semibold text-black" style={{ background: "#4ADE80" }}>
        Volver al inicio
      </Link>
    </div>
  );
}
