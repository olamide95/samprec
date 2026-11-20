import type { Metadata } from "next";
import { ReadinessAssessment } from "@/components/digitals/ReadinessAssessment";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Digital Readiness Assessment — Samprec Digitals", description: "Free 3-minute digital maturity assessment for construction and public-sector organisations.", path: "/digitals/assessment" });

export default function AssessmentPage() {
  return (
    <div className="text-white">
      <section className="container-grid py-16 md:py-20">
        <div className="max-w-3xl">
          <p className="label-mono text-copper-300">Digitals / Assessment</p>
          <h1 className="font-display mt-5 text-4xl font-semibold tracking-tight md:text-6xl">Digital readiness assessment</h1>
          <p className="mt-4 text-lg text-white/60">Ten questions across strategy, processes, data, technology and people. Your answers stay in your browser unless you choose to send them.</p>
        </div>
        <div className="mt-12"><ReadinessAssessment /></div>
      </section>
    </div>
  );
}
