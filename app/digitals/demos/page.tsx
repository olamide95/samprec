import type { Metadata } from "next";
import { Demo } from "@/components/digitals/DemoSwitch";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Live Demos — Samprec Digitals", description: "Try working demos of e-procurement, BIM 5D cost planning, ERP project dashboards and point cloud viewing.", path: "/digitals/demos" });

const demos = [
  { kind: "procurement" as const, title: "e-Procurement tender", text: "Run a tender from plan to award: sealed bids, public opening, weighted evaluation and an immutable audit trail.", href: "/digitals/solutions/mda-e-procurement" },
  { kind: "bim" as const, title: "BIM 5D cost plan", text: "Click elements in the model to see their cost. Change budget, storeys and specification.", href: "/digitals/solutions/bim-workflows" },
  { kind: "erp" as const, title: "ERP project dashboard", text: "Cost position by cost code, cash flow against plan, and an approvals queue.", href: "/digitals/solutions/bespoke-erp" },
  { kind: "pointcloud" as const, title: "Point cloud viewer", text: "Orbit a laser-scanned building. Change colouring and point density.", href: "/digitals/solutions/point-cloud-surveying" },
];

export default function DemosPage() {
  return (
    <div className="text-white">
      <section className="container-grid py-16 md:py-20">
        <p className="label-mono text-copper-300">Digitals / Demos</p>
        <h1 className="font-display mt-5 text-4xl font-semibold tracking-tight md:text-6xl">Live demos</h1>
        <p className="mt-4 max-w-2xl text-lg text-white/60">Working prototypes with sample data. Your production system is designed around your processes and data.</p>
      </section>
      {demos.map((d, i) => (
        <section key={d.kind} id={d.kind} className="border-t border-white/10 py-16">
          <div className="container-grid grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="font-mono text-sm text-copper-300">{String(i + 1).padStart(2, "0")} /</p>
              <h2 className="font-display mt-4 text-2xl font-semibold tracking-tight">{d.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{d.text}</p>
              <div className="mt-6"><MagneticButton href={d.href} variant="ghost-light">About this solution</MagneticButton></div>
            </div>
            <div className="lg:col-span-9"><Demo kind={d.kind} /></div>
          </div>
        </section>
      ))}
    </div>
  );
}
