import Counter from "./Counter";

const stats = [
  { value: 40, suffix: "%", label: "Productividad" },
  { value: 35, suffix: "%", label: "Satisfacción del cliente" },
  { value: 20, suffix: "%", prefix: "-", label: "Costos operativos" },
  { value: 500, suffix: "+", label: "Robots en México" },
];

export default function Metrics() {
  return (
    <section className="relative py-12">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-4 rounded-3xl border border-white/10 bg-bg-card/40 p-6 backdrop-blur sm:grid-cols-4 sm:p-8">
          {stats.map((m) => (
            <div key={m.label} className="text-center">
              <p className="font-display text-3xl font-bold gradient-text sm:text-4xl">
                {m.prefix ?? ""}
                <Counter value={m.value} suffix={m.suffix} />
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-white/60 sm:text-sm">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
