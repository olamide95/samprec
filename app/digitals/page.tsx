import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroCloud, DemoSwitch } from "@/components/digitals/DemoSwitch";
import { SolutionCard } from "@/components/digitals/SolutionCard";
import { DigitalBrief } from "@/components/digitals/DigitalBrief";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { company, digitalProcess, digitalSectors, digitalSolutions } from "@/data/samprecData";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Samprec Digitals — ERP, e-Procurement, BIM & Point Cloud for Construction",
  description: "Samprec Digitals builds bespoke ERP systems, MDA e-procurement platforms, BIM workflows, point cloud surveys and digital transformation programmes. Try the live demos.",
  path: "/digitals",
});

export default function DigitalsPage() {
  return (
    <div className="text-white">
      <section className="relative overflow-hidden">
        <HeroCloud className="absolute inset-y-0 right-0 w-full opacity-80 lg:w-[65%] [mask-image:linear-gradient(to_left,black_45%,transparent_95%)]" />
        <div className="container-grid pointer-events-none relative grid min-h-[640px] items-center py-20 lg:grid-cols-12">
          <div className="pointer-events-auto lg:col-span-7">
            <p className="label-mono text-copper-300">B / Samprec Digitals</p>
            <h1 className="font-display mt-6 text-5xl font-semibold leading-[0.98] tracking-[-0.03em] md:text-7xl lg:text-[88px]">
              Construction,<br /><span className="text-copper-gradient">computed.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/65">
              Software, BIM and reality capture built by people who understand cost codes, BOQs and procurement from the inside — because we deliver projects too.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <MagneticButton href="/digitals/demos">Try the live demos</MagneticButton>
              <MagneticButton href="/digitals/assessment" variant="ghost-light">Free readiness score</MagneticButton>
            </div>
            <p className="mt-10 font-mono text-xs text-white/40">↗ Drag the point cloud — it&apos;s live.</p>
          </div>
        </div>
      </section>

      <section id="solutions" className="border-t border-white/10 py-20 md:py-28">
        <div className="container-grid">
          <SectionHeading dark index="01" eyebrow="Solutions" title="Five practices on one data backbone." action={<MagneticButton href="/digitals/solutions" variant="ghost-light">All solutions</MagneticButton>} />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {digitalSolutions.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.05}><SolutionCard s={s} /></Reveal>
            ))}
            <Reveal delay={0.1}>
              <Link href="/digitals/start" className="group flex h-full min-h-[280px] flex-col justify-between rounded-[24px] bg-copper-500 p-7 text-ink">
                <span className="label-mono">Custom build</span>
                <div>
                  <p className="font-display text-3xl font-semibold leading-tight tracking-tight">Something else in mind?</p>
                  <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold">Tell us the problem <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></p>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="container-grid">
          <SectionHeading dark index="02" eyebrow="Live demos" title="Don't take our word for it. Use it." intro="Working prototypes of what we build — tender a contract, cost a building from its model, run a project dashboard, or orbit a laser scan." />
          <div className="mt-12"><DemoSwitch /></div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="container-grid">
          <SectionHeading dark index="03" eyebrow="How we deliver" title="From discovery to support, in the open." />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-[24px] bg-white/10 md:grid-cols-5">
            {digitalProcess.map((p) => (
              <li key={p.index} className="bg-ink p-7">
                <p className="font-mono text-3xl font-semibold text-copper-300">{p.index}</p>
                <p className="font-display mt-6 text-xl font-semibold">{p.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{p.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6 grid gap-5 md:grid-cols-4">
            {digitalSectors.map((s) => (
              <div key={s.title} className="rounded-[20px] border border-white/10 p-6">
                <p className="font-semibold">{s.title}</p>
                <p className="mt-1 text-sm text-white/50">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="container-grid">
          <div className="grid gap-10 overflow-hidden rounded-[32px] bg-gradient-to-br from-copper-600 to-copper-300 p-10 text-ink md:p-14 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="label-mono">04 / Readiness assessment</p>
              <h2 className="font-display mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">How digitally ready is your organisation?</h2>
              <p className="mt-4 max-w-xl text-ink/75">Ten questions, three minutes. Get a maturity score across strategy, processes, data, technology and people — with priority actions.</p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <MagneticButton href="/digitals/assessment" variant="ink">Take the assessment</MagneticButton>
            </div>
          </div>
        </div>
      </section>

      <section id="brief" className="border-t border-white/10 py-20 md:py-28">
        <div className="container-grid grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label-mono text-copper-300">05 / Start a project</p>
            <h2 className="font-display mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">Tell us what&apos;s slowing you down.</h2>
            <p className="mt-5 text-white/60">We&apos;ll arrange a discovery call, and a live demo if you want one. Prefer to talk? Call {company.primaryPhone}.</p>
            <Link href={company.subdomains.digitals} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block text-sm font-semibold text-copper-300 hover:underline">digitals.samprecconsultants.com ↗</Link>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8 lg:col-span-7"><DigitalBrief /></div>
        </div>
      </section>
    </div>
  );
}
