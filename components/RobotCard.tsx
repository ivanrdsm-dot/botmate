import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Robot } from "@/lib/robots";
import { categoryLabel } from "@/lib/robots";
import TiltCard from "./TiltCard";
import RobotArt, { robotVariantFromSlug } from "./RobotArt";

export default function RobotCard({ robot }: { robot: Robot }) {
  return (
    <TiltCard className="rounded-3xl">
      <Link href={`/robots/${robot.slug}`} className="card-tech group flex h-full flex-col">
        <div className="relative mb-5 grid aspect-[4/3] place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B1020] to-[#070A14]">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <RobotArt variant={robotVariantFromSlug(robot.slug)} className="h-[78%] w-[78%] transition-transform duration-500 group-hover:scale-105" />
          {robot.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-accent to-accent-violet px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
              {robot.badge}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-accent">{categoryLabel[robot.category]}</span>
          <span className="text-white/40">{robot.brand}</span>
        </div>

        <h3 className="mt-2 flex items-center justify-between font-display text-xl font-semibold">
          {robot.name}
          <ArrowUpRight className="h-5 w-5 text-white/40 transition group-hover:rotate-12 group-hover:text-accent" />
        </h3>
        <p className="mt-1 text-sm text-white/60">{robot.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {robot.useCases.slice(0, 3).map((u) => (
            <span key={u} className="chip">{u}</span>
          ))}
        </div>
      </Link>
    </TiltCard>
  );
}
