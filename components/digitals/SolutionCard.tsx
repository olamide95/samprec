import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { DigitalSolution } from "@/data/samprecData";

export function SolutionCard({ s }: { s: DigitalSolution }) {
  return (
    <Link href={`/digitals/solutions/${s.slug}`} className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-copper-500/50 hover:bg-white/[0.06]">
      <div className="absolute -right-10 -top-10 size-40 rounded-full bg-copper-500/0 blur-3xl transition-colors duration-500 group-hover:bg-copper-500/20" aria-hidden />
      <div className="flex items-start justify-between">
        <span className="font-mono text-sm text-copper-300">{s.index} /</span>
        <ArrowUpRight className="size-5 text-white/30 transition-all group-hover:rotate-45 group-hover:text-copper-300" />
      </div>
      <h3 className="font-display mt-10 text-2xl font-semibold tracking-tight text-white">{s.title}</h3>
      <p className="mt-2 text-sm text-copper-300/90">{s.tagline}</p>
      <p className="mt-4 flex-1 text-[15px] leading-relaxed text-white/55">{s.summary}</p>
      <p className="mt-6 font-mono text-[11px] uppercase tracking-wider text-white/40">{s.modules.length} modules · {s.demo === "readiness" ? "free assessment" : "live demo"}</p>
    </Link>
  );
}
