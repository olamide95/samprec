import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { InsightsList } from "@/components/insights/InsightsList";
import { Newsletter } from "@/components/forms/Newsletter";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Insights & Publications",
  description: "Samprec perspectives on Nigerian construction economics, PPP success and failure factors, and regulatory approvals.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero
        index="07"
        eyebrow="Insights"
        title={<>Notes from <span className="text-copper-gradient">the cost desk.</span></>}
        intro="Perspectives on construction economics, infrastructure finance and regulatory approvals in Nigeria."
        aside={
          <div className="rounded-2xl border border-hairline bg-alabaster p-6">
            <p className="label-mono text-slate-500">Get new insights by email</p>
            <div className="mt-4"><Newsletter /></div>
          </div>
        }
      />
      <section className="bg-alabaster py-12 md:py-20">
        <div className="container-grid">
          <InsightsList />
        </div>
      </section>
    </>
  );
}
