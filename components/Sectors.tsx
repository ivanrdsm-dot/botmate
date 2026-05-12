import { UtensilsCrossed, BedDouble, Hospital, ShoppingBag, Factory, Building2 } from "lucide-react";
import SectionTitle from "./SectionTitle";

const sectors = [
  { icon: UtensilsCrossed, name: "Restaurantes", desc: "Robots meseros y bussers que aceleran el servicio." },
  { icon: BedDouble, name: "Hoteles", desc: "Entregas multi-piso y experiencias premium para huéspedes." },
  { icon: Hospital, name: "Hospitales", desc: "Distribución de medicamentos y limpieza autónoma." },
  { icon: ShoppingBag, name: "Retail & Plazas", desc: "Marketing interactivo y limpieza 4 en 1." },
  { icon: Factory, name: "Manufactura", desc: "AMR de hasta 600 kg para líneas de producción." },
  { icon: Building2, name: "Corporativos", desc: "Café, paquetería y limpieza nocturna automatizada." },
];

export default function Sectors() {
  return (
    <section id="sectores" className="py-20">
      <div className="container-x">
        <SectionTitle
          eyebrow="Sectores"
          title={<>Una solución para <span className="gradient-text">cada industria</span></>}
          description="Diseñamos despliegues de robótica de servicio a la medida. Implementación, capacitación y soporte 24/7."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map(({ icon: Icon, name, desc }) => (
            <div key={name} className="card-tech">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-violet/20 ring-1 ring-white/10">
                <Icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-display text-lg font-semibold">{name}</h3>
              <p className="mt-1 text-sm text-white/60">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
