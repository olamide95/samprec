"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { DemoKind } from "@/data/samprecData";
import { ProcurementSimulator } from "./ProcurementSimulator";
import { BimCostExplorer } from "./BimCostExplorer";
import { ErpDashboardDemo } from "./ErpDashboardDemo";
import { DemoFrame } from "./DemoFrame";
import { cn } from "@/lib/utils";

const PointCloudViewer = dynamic(() => import("./PointCloudViewer").then((m) => m.PointCloudViewer), { ssr: false, loading: () => <div className="aspect-[16/9] animate-pulse bg-white/5" /> });

export function PointCloudDemo() {
  return (
    <DemoFrame title="point cloud / scan_block-A.e57" hint="Drag to orbit, scroll to zoom. Switch between height and intensity colouring, and change point density.">
      <PointCloudViewer className="aspect-[16/10] w-full md:aspect-[16/8]" />
    </DemoFrame>
  );
}

export function Demo({ kind }: { kind: Exclude<DemoKind, "readiness"> }) {
  if (kind === "procurement") return <ProcurementSimulator />;
  if (kind === "bim") return <BimCostExplorer />;
  if (kind === "erp") return <ErpDashboardDemo />;
  return <PointCloudDemo />;
}

const tabs: { id: Exclude<DemoKind, "readiness">; label: string }[] = [
  { id: "procurement", label: "e-Procurement" },
  { id: "bim", label: "BIM 5D cost" },
  { id: "erp", label: "ERP dashboard" },
  { id: "pointcloud", label: "Point cloud" },
];

export function DemoSwitch({ initial = "procurement" }: { initial?: Exclude<DemoKind, "readiness"> }) {
  const [tab, setTab] = useState(initial);
  return (
    <div>
      <div role="tablist" aria-label="Demos" className="mb-5 flex gap-1 overflow-x-auto rounded-full bg-white/5 p-1 ring-1 ring-white/10 sm:inline-flex">
        {tabs.map((t) => (
          <button key={t.id} role="tab" type="button" aria-selected={tab === t.id} onClick={() => setTab(t.id)} className={cn("whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors", tab === t.id ? "bg-copper-500 font-semibold text-ink" : "text-white/65 hover:text-white")}>
            {t.label}
          </button>
        ))}
      </div>
      <Demo kind={tab} />
    </div>
  );
}

export function HeroCloud({ className }: { className?: string }) {
  return (
    <div className={className}>
      <PointCloudViewer className="h-full w-full !bg-transparent" controls={false} initialDensity={30000} />
    </div>
  );
}
