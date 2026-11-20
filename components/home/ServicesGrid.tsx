import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { services } from "@/data/samprecData";

export function ServicesGrid() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-grid">
        <SectionHeading
          index="02"
          eyebrow="Core services"
          title="Comprehensive consultancy for every sector of construction."
          intro="Traditional quantity surveying, project and programme management, design management, M&E cost management, infrastructure finance, procurement and facility management."
          action={<MagneticButton href="/services" variant="outline">All services</MagneticButton>}
        />
        <div className="mt-14 grid border-l border-t border-hairline sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 0.06} className="border-b border-r border-hairline">
              <Link href={`/services?tab=${s.id}`} className="group relative flex h-full min-h-[300px] flex-col justify-between p-8 transition-colors hover:bg-slate-ink">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-sm text-copper-700 group-hover:text-copper-300">{s.index} /</span>
                  <ArrowUpRight className="size-5 text-slate-300 transition-all group-hover:rotate-45 group-hover:text-copper-300" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-slate-ink group-hover:text-white">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate-500 group-hover:text-white/65">{s.summary}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
