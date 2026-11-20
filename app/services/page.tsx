import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceTabs } from "@/components/services/ServiceTabs";
import { clientTypes } from "@/data/samprecData";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services — Quantity Surveying, Project Management, M&E & PPP",
  description:
    "Quantity surveying and cost management, project and programme management, M&E cost management, design management, infrastructure finance and PPP advisory, procurement and facility management.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        index="02"
        eyebrow="Core consultancy"
        title={<>Comprehensive consultancy, <span className="text-copper-gradient">discipline by discipline.</span></>}
        intro="Samprec offers comprehensive consultancy services in traditional quantity surveying, project and programme management, architectural and civil/structural design management, M&E cost management, infrastructure and real estate finance, construction and procurement management, facility management and environmental management consultancy."
        aside={
          <div className="rounded-2xl border border-hairline bg-alabaster p-6">
            <p className="label-mono text-slate-400">For</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{clientTypes.join(" · ")}</p>
          </div>
        }
      />
      <section className="bg-alabaster py-16 md:py-24">
        <div className="container-grid">
          <ServiceTabs />
        </div>
      </section>
    </>
  );
}
