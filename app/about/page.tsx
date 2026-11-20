import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Blueprint } from "@/components/ui/Blueprint";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LifecycleTimeline } from "@/components/about/LifecycleTimeline";
import { clientTypes, company, differentiators, leader } from "@/data/samprecData";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";

export const metadata: Metadata = pageMetadata({
  title: "About Us — Indigenous Consultancy & Project Lifecycle",
  description: `${company.ownership} ${company.vision}`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        index="01"
        eyebrow="About Samprec"
        title={<>An indigenous firm, built for <span className="text-copper-gradient">the whole lifecycle.</span></>}
        intro={company.intro}
        aside={
          <div className="rounded-2xl border border-hairline bg-alabaster p-6">
            <p className="label-mono text-slate-400">Registration</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{company.ownership}</p>
          </div>
        }
      />

      <section className="bg-white py-20 md:py-28">
        <div className="container-grid">
          <SectionHeading index="01" eyebrow="Philosophy" title="Environmentally responsive. Economic. Professionally accountable." intro={company.about} />
          <div className="mt-14 grid gap-6 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <div className="h-full rounded-[28px] bg-slate-ink p-10 text-white">
                <p className="label-mono text-copper-300">Our vision</p>
                <p className="font-display mt-6 text-3xl font-medium leading-snug tracking-tight md:text-4xl">“{company.vision}”</p>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="md:col-span-5">
              <div className="h-full rounded-[28px] border border-hairline p-10">
                <p className="label-mono text-copper-700">Who we serve</p>
                <ol className="mt-6 divide-y divide-hairline">
                  {clientTypes.map((c, i) => (
                    <li key={c} className="flex items-baseline gap-4 py-3">
                      <span className="font-mono text-xs text-slate-400">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-display text-lg font-medium">{c}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>

          <div className="mt-6 grid border-l border-t border-hairline sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((d, i) => (
              <Reveal key={d.title} delay={(i % 3) * 0.05} className="border-b border-r border-hairline p-8">
                <p className="font-mono text-xs text-copper-700">{String(i + 1).padStart(2, "0")} /</p>
                <p className="font-display mt-6 text-xl font-semibold tracking-tight">{d.title}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-500">{d.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="lifecycle" className="relative overflow-hidden bg-ink py-20 md:py-28">
        <div className="grid-lines-dark pointer-events-none absolute inset-0" aria-hidden />
        <div className="container-grid relative">
          <SectionHeading dark index="02" eyebrow="Project lifecycle" title="Six stages. One accountable consultant." intro="Samprec can lead or support any stage — or carry a project end-to-end from feasibility to handover." />
          <div className="mt-16">
            <LifecycleTimeline />
          </div>
        </div>
      </section>

      <section id="leadership" className="bg-white py-20 md:py-28">
        <div className="container-grid">
          <SectionHeading index="03" eyebrow="Leadership" title="Led by a chartered, certified practitioner." />
          <div className="mt-14 grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <div className="relative overflow-hidden rounded-[28px] border border-hairline">
                {leader.image ? (
                  <div className="relative aspect-[4/5]">
                    <Image src={leader.image} alt={leader.name} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
                  </div>
                ) : (
                  <div className="relative">
                    <Blueprint variant="section" className="aspect-[4/5]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-8xl font-semibold text-white/90">AF</span>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
            <Reveal delay={0.08} className="md:col-span-7">
              <p className="label-mono text-copper-700">{leader.title}</p>
              <h3 className="font-display mt-3 text-4xl font-semibold tracking-tight md:text-5xl">{leader.name}</h3>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-slate-600">
                {leader.bio.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2">
                {leader.credentials.map((c) => (
                  <li key={c.code} className="bg-white p-5">
                    <p className="font-mono text-lg font-semibold text-copper-700">{c.code}</p>
                    <p className="mt-1 text-sm text-slate-500">{c.label}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <MagneticButton href="/contact#proposal">Book a consultation</MagneticButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
