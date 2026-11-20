import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { Demo } from "@/components/digitals/DemoSwitch";
import { DigitalBrief } from "@/components/digitals/DigitalBrief";
import { SolutionCard } from "@/components/digitals/SolutionCard";
import { Accordion } from "@/components/ui/Accordion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { digitalProcess, digitalSolutions, getSolution } from "@/data/samprecData";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return digitalSolutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) return { title: "Solution not found" };
  return pageMetadata({ title: `${s.title} — Samprec Digitals`, description: s.summary, path: `/digitals/solutions/${s.slug}` });
}

export default async function SolutionPage({ params }: Params) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) notFound();
  const others = digitalSolutions.filter((x) => x.slug !== s.slug).slice(0, 3);

  return (
    <div className="text-white">
      <section className="relative overflow-hidden">
        <div className="grid-lines-dark pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
        <div className="container-grid relative py-14 md:py-20">
          <Link href="/digitals/solutions" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white"><ArrowLeft className="size-4" /> All solutions</Link>
          <p className="label-mono mt-10 text-copper-300">Solution {s.index} / 05</p>
          <h1 className="font-display mt-5 max-w-4xl text-5xl font-semibold leading-[1] tracking-tight md:text-7xl">{s.title}</h1>
          <p className="mt-5 text-2xl text-copper-300/90">{s.tagline}</p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">{s.summary}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <MagneticButton href={`/digitals/start?solution=${s.slug}`}>Discuss your project</MagneticButton>
            <MagneticButton href="#demo" variant="ghost-light">{s.demo === "readiness" ? "Take the assessment" : "Try the demo"}</MagneticButton>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="container-grid grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label-mono text-copper-300">The problem</p>
            <p className="font-display mt-4 text-2xl font-medium leading-snug">{s.problem}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {s.features.map((f, i) => (
              <div key={f.title} className="rounded-[20px] border border-white/10 bg-white/[0.03] p-6">
                <p className="font-mono text-xs text-copper-300">{String(i + 1).padStart(2, "0")}</p>
                <p className="font-display mt-4 text-xl font-semibold">{f.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="demo" className="border-t border-white/10 py-16 md:py-24">
        <div className="container-grid">
          <p className="label-mono text-copper-300">{s.demo === "readiness" ? "Start here" : "Live demo"}</p>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight md:text-4xl">{s.demo === "readiness" ? "Measure where you are today." : "See it working."}</h2>
          <div className="mt-8">
            {s.demo === "readiness" ? (
              <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-10 text-center">
                <p className="mx-auto max-w-xl text-white/60">Our free digital readiness assessment scores your organisation across five dimensions and recommends priority actions.</p>
                <div className="mt-6"><MagneticButton href="/digitals/assessment">Take the assessment</MagneticButton></div>
              </div>
            ) : (
              <Demo kind={s.demo} />
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="container-grid grid gap-10 lg:grid-cols-3">
          <div>
            <p className="label-mono text-copper-300">Modules</p>
            <ul className="mt-5 space-y-2.5">{s.modules.map((m) => <li key={m} className="flex gap-3 text-[15px] text-white/80"><Check className="mt-0.5 size-4 shrink-0 text-copper-300" />{m}</li>)}</ul>
          </div>
          <div>
            <p className="label-mono text-copper-300">You receive</p>
            <ol className="mt-5 space-y-2.5">{s.deliverables.map((d, i) => <li key={d} className="flex gap-3 text-[15px] text-white/80"><span className="font-mono text-xs text-white/40">{String(i + 1).padStart(2, "0")}</span>{d}</li>)}</ol>
          </div>
          <div>
            <p className="label-mono text-copper-300">Built for</p>
            <div className="mt-5 flex flex-wrap gap-2">{s.forWho.map((w) => <span key={w} className="rounded-full px-3 py-1.5 text-sm ring-1 ring-white/15">{w}</span>)}</div>
            <p className="label-mono mt-8 text-copper-300">Delivery</p>
            <p className="mt-3 text-sm text-white/60">{digitalProcess.map((p) => p.title).join(" → ")}</p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="container-grid grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label-mono text-copper-300">FAQ</p>
            <div className="mt-4"><Accordion dark items={s.faq.map((f) => ({ title: f.q, body: f.a }))} /></div>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8 lg:col-span-7">
            <p className="label-mono text-copper-300">Start a project</p>
            <h2 className="font-display mt-3 text-2xl font-semibold">Tell us about your requirement</h2>
            <div className="mt-6"><DigitalBrief preselect={s.slug} /></div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-16">
        <div className="container-grid">
          <p className="label-mono text-white/40">Other solutions</p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">{others.map((o) => <SolutionCard key={o.slug} s={o} />)}</div>
        </div>
      </section>
    </div>
  );
}
