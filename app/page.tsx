import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { EcosystemShowcase } from "@/components/home/EcosystemShowcase";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { CredentialsBar } from "@/components/home/CredentialsBar";
import { InsightsPreview } from "@/components/home/InsightsPreview";
import { ProjectArchive } from "@/components/projects/ProjectArchive";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { clientTypes, company } from "@/data/samprecData";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Quantity Surveying, Project Management & PPP Advisory in Abuja",
    description: `${company.intro} Consultancy, Samprec Digitals and Samprec Academy.`,
    path: "/",
  }),
  title: { absolute: `${company.name} — Quantity Surveying, Project Management & PPP Advisory` },
};

export default function HomePage() {
  return (
    <>
      <Hero />

      <div className="border-b border-hairline bg-white">
        <div className="container-grid flex flex-wrap items-center gap-x-8 gap-y-3 py-5">
          <span className="label-mono text-slate-400">We serve</span>
          {clientTypes.map((c) => (
            <span key={c} className="font-display text-sm font-medium text-slate-600">{c}</span>
          ))}
        </div>
      </div>

      <EcosystemShowcase />
      <ServicesGrid />

      <section className="bg-alabaster py-20 md:py-28">
        <div className="container-grid">
          <SectionHeading
            index="03"
            eyebrow="Flagship projects"
            title="Healthcare, hospitality and public infrastructure."
            action={<MagneticButton href="/projects" variant="outline">Project archive</MagneticButton>}
          />
          <div className="mt-12">
            <ProjectArchive showSearch={false} featuredOnly />
          </div>
        </div>
      </section>

      <CredentialsBar />
      <InsightsPreview />

      <section className="relative overflow-hidden bg-alabaster py-20 md:py-28">
        <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden />
        <div className="container-grid relative grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="label-mono text-copper-700">06 / Engage</p>
            <h2 className="font-display mt-6 text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Have a capital project on the drawing board?
            </h2>
            <p className="mt-6 max-w-xl text-lg text-slate-600">Tell us about it. We&apos;ll come back with a scope, a team and a plan.</p>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
            <MagneticButton href="/contact#proposal">Start a brief</MagneticButton>
            <MagneticButton href="/contact" variant="outline">Contact us</MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
