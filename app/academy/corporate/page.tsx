import type { Metadata } from "next";
import { Building2, ClipboardList, GraduationCap, LineChart } from "lucide-react";
import { CorporateForm } from "@/components/academy/InterestForms";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Corporate & In-house Training — Samprec Academy", description: "Tailored in-house training for contractors, consultancies and public institutions: PMP, Primavera P6, BIM, AI and more.", path: "/academy/corporate" });

const process = [
  { icon: ClipboardList, title: "Needs analysis", text: "We assess your team's skills against your projects and goals." },
  { icon: Building2, title: "Tailored programme", text: "Content, examples and exercises built around your work." },
  { icon: GraduationCap, title: "Delivery", text: "At your premises, at our Jabi centre, virtually or blended." },
  { icon: LineChart, title: "Evaluation", text: "Assessment and a report on progress and next steps." },
];

const formats = [
  ["On-site", "We train at your offices or project site, scheduled around operations."],
  ["Jabi centre", "Dedicated sessions for your team at Samprec Academy."],
  ["Virtual", "Live, instructor-led sessions for distributed teams."],
  ["Blended", "Virtual theory with in-person practical workshops."],
];

export default function CorporatePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="grid-lines-dark pointer-events-none absolute inset-0" aria-hidden />
        <div className="container-grid relative py-16 md:py-24">
          <p className="label-mono text-copper-300">Academy / Corporate</p>
          <h1 className="font-display mt-6 max-w-4xl text-5xl font-semibold leading-[1] tracking-tight md:text-7xl">Capability, built <span className="text-copper-gradient">into your team.</span></h1>
          <p className="mt-6 max-w-2xl text-lg text-white/60">Tailored programmes for contractors, consultancies, developers and public institutions — designed around your projects, delivered where your people are.</p>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="container-grid">
          <SectionHeading index="01" eyebrow="How it works" title="From skills gap to measurable capability." />
          <ol className="mt-12 grid border-l border-t border-hairline md:grid-cols-4">
            {process.map((p, i) => (
              <li key={p.title} className="border-b border-r border-hairline p-8">
                <p className="font-mono text-xs text-copper-700">{String(i + 1).padStart(2, "0")} /</p>
                <p.icon className="mt-6 size-7 text-slate-ink" aria-hidden />
                <p className="font-display mt-4 text-xl font-semibold">{p.title}</p>
                <p className="mt-2 text-sm text-slate-500">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-alabaster py-20 md:py-28">
        <div className="container-grid grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label-mono text-copper-700">02 / Formats</p>
            <h2 className="font-display mt-5 text-4xl font-semibold tracking-tight">Delivered your way.</h2>
            <dl className="mt-8 divide-y divide-hairline border-y border-hairline">
              {formats.map(([k, v]) => (
                <div key={k} className="py-5">
                  <dt className="font-semibold">{k}</dt>
                  <dd className="mt-1 text-sm text-slate-500">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div id="request" className="rounded-[28px] bg-white p-8 ring-1 ring-hairline md:p-10 lg:col-span-7">
            <p className="label-mono text-copper-700">03 / Request a proposal</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight">Tell us about your team</h2>
            <div className="mt-8"><CorporateForm /></div>
          </div>
        </div>
      </section>
    </>
  );
}
