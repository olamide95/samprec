import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { articles, formatDate } from "@/data/samprecData";

export function InsightsPreview() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-grid">
        <SectionHeading
          index="05"
          eyebrow="Insights"
          title="Perspectives from the cost desk."
          action={<MagneticButton href="/insights" variant="outline">All insights</MagneticButton>}
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-hairline bg-hairline md:grid-cols-3">
          {articles.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.06} className="bg-white">
              <Link href={`/insights/${a.slug}`} className="group flex h-full flex-col p-8 transition-colors hover:bg-alabaster">
                <div className="flex items-center justify-between">
                  <span className="label-mono text-copper-700">{a.category}</span>
                  <span className="font-mono text-xs text-slate-400">{a.readMinutes} min</span>
                </div>
                <h3 className="font-display mt-10 text-2xl font-semibold leading-snug tracking-tight group-hover:text-copper-700">{a.title}</h3>
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-slate-500">{a.excerpt}</p>
                <p className="mt-8 font-mono text-xs text-slate-400">{formatDate(a.date)}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
