import type { Metadata } from "next";
import { SolutionCard } from "@/components/digitals/SolutionCard";
import { digitalSolutions } from "@/data/samprecData";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Solutions — Samprec Digitals", description: digitalSolutions.map((s) => s.title).join(", "), path: "/digitals/solutions" });

export default function SolutionsPage() {
  return (
    <div className="text-white">
      <section className="container-grid py-16 md:py-24">
        <p className="label-mono text-copper-300">Digitals / Solutions</p>
        <h1 className="font-display mt-5 text-4xl font-semibold tracking-tight md:text-6xl">Solutions</h1>
        <p className="mt-4 max-w-2xl text-lg text-white/60">Each solution can be delivered on its own or combined — they share one data backbone.</p>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {digitalSolutions.map((s) => <SolutionCard key={s.slug} s={s} />)}
        </div>
      </section>
    </div>
  );
}
