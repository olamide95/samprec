"use client";

import { useMemo, useState } from "react";
import { DemoFrame } from "./DemoFrame";
import { cn } from "@/lib/utils";

type ElementId = "sub" | "frame" | "floors" | "roof" | "envelope" | "finishes" | "mep" | "external";
type Spec = "Standard" | "Premium";

const elements: { id: ElementId; label: string; share: Record<Spec, number> }[] = [
  { id: "sub", label: "Substructure", share: { Standard: 12, Premium: 10 } },
  { id: "frame", label: "Frame", share: { Standard: 15, Premium: 13 } },
  { id: "floors", label: "Upper floors", share: { Standard: 8, Premium: 7 } },
  { id: "roof", label: "Roof", share: { Standard: 5, Premium: 5 } },
  { id: "envelope", label: "External walls & windows", share: { Standard: 14, Premium: 15 } },
  { id: "finishes", label: "Internal finishes", share: { Standard: 14, Premium: 18 } },
  { id: "mep", label: "M&E services", share: { Standard: 25, Premium: 28 } },
  { id: "external", label: "External works", share: { Standard: 7, Premium: 4 } },
];

const fmt = (n: number) => `₦${n >= 1e9 ? (n / 1e9).toFixed(2) + "bn" : (n / 1e6).toFixed(1) + "m"}`;

export function BimCostExplorer() {
  const [budget, setBudget] = useState(1_500_000_000);
  const [spec, setSpec] = useState<Spec>("Standard");
  const [active, setActive] = useState<ElementId>("mep");
  const [floors, setFloors] = useState(5);

  const rows = useMemo(() => elements.map((e) => ({ ...e, pct: e.share[spec], amount: (budget * e.share[spec]) / 100 })), [budget, spec]);
  const sel = rows.find((r) => r.id === active) ?? rows[0];

  const on = (id: ElementId) => active === id;
  const stroke = (id: ElementId) => (on(id) ? "#F9AD4D" : "rgba(255,255,255,0.45)");
  const fill = (id: ElementId) => (on(id) ? "rgba(226,148,50,0.28)" : "transparent");
  const hit = (id: ElementId) => ({ onMouseEnter: () => setActive(id), onClick: () => setActive(id), className: "cursor-pointer", role: "button" as const, "aria-label": elements.find((e) => e.id === id)?.label, tabIndex: 0, onFocus: () => setActive(id) });

  const top = 60, ground = 250, fh = (ground - top - 20) / floors;

  return (
    <DemoFrame title="5D model / elemental cost plan" hint="Hover or tap an element in the model to see its share of the budget. Change budget, storeys and specification to see the cost plan update. Elemental shares are illustrative only.">
      <div className="grid lg:grid-cols-12">
        <div className="border-b border-white/10 p-4 lg:col-span-7 lg:border-b-0 lg:border-r">
          <svg viewBox="0 0 420 300" className="w-full">
            <g {...hit("external")}>
              <path d="M10 250 H410 L400 270 H20 Z" fill={fill("external")} stroke={stroke("external")} />
              {[40, 70, 350, 380].map((x) => <circle key={x} cx={x} cy={238} r={10} fill={fill("external")} stroke={stroke("external")} />)}
            </g>
            <g {...hit("sub")}>
              <rect x="95" y={ground} width="230" height="34" fill={fill("sub")} stroke={stroke("sub")} strokeDasharray="4 3" />
              {[110, 170, 250, 310].map((x) => <rect key={x} x={x - 6} y={ground + 34} width="12" height="10" fill={fill("sub")} stroke={stroke("sub")} />)}
            </g>
            <g {...hit("envelope")}>
              <rect x="100" y={top + 20} width="220" height={ground - top - 20} fill={fill("envelope")} stroke={stroke("envelope")} />
              {Array.from({ length: floors }).map((_, f) =>
                [0, 1, 2, 3, 4].map((c) => <rect key={`${f}-${c}`} x={112 + c * 42} y={top + 28 + f * fh} width="28" height={fh * 0.55} fill="none" stroke={stroke("envelope")} strokeOpacity={0.6} />),
              )}
            </g>
            <g {...hit("floors")}>
              {Array.from({ length: floors - 1 }).map((_, f) => (
                <rect key={f} x="96" y={top + 20 + (f + 1) * fh - 2} width="228" height="4" fill={on("floors") ? "#E29432" : "rgba(255,255,255,0.25)"} />
              ))}
            </g>
            <g {...hit("frame")}>
              {[100, 173, 247, 320].map((x) => <rect key={x} x={x - 3} y={top + 20} width="6" height={ground - top - 20} fill={on("frame") ? "#E29432" : "rgba(255,255,255,0.3)"} />)}
            </g>
            <g {...hit("finishes")}>
              <rect x="120" y={ground - fh + 8} width="70" height={fh - 12} fill={fill("finishes")} stroke={stroke("finishes")} strokeDasharray="2 2" />
              <rect x="230" y={ground - fh + 8} width="70" height={fh - 12} fill={fill("finishes")} stroke={stroke("finishes")} strokeDasharray="2 2" />
            </g>
            <g {...hit("mep")}>
              <path d={`M300 ${top + 4} V${ground - 6}`} stroke={stroke("mep")} strokeWidth={on("mep") ? 4 : 2} strokeDasharray="6 4" />
              <path d={`M110 ${top + 26} H300`} stroke={stroke("mep")} strokeWidth={on("mep") ? 3 : 1.5} strokeDasharray="6 4" />
              <rect x="270" y={top - 16} width="40" height="20" fill={fill("mep")} stroke={stroke("mep")} />
            </g>
            <g {...hit("roof")}>
              <path d={`M90 ${top + 20} L210 ${top - 10} L330 ${top + 20} Z`} fill={fill("roof")} stroke={stroke("roof")} />
            </g>
            <text x="12" y="292" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">{floors} STOREYS · {spec.toUpperCase()} SPEC</text>
          </svg>
          <div className="mt-2 grid gap-3 sm:grid-cols-3">
            <label className="text-xs text-white/60">
              Budget
              <input type="range" min={300_000_000} max={6_000_000_000} step={50_000_000} value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="mt-1 w-full accent-[#E29432]" />
              <span className="font-mono text-white">{fmt(budget)}</span>
            </label>
            <label className="text-xs text-white/60">
              Storeys
              <input type="range" min={2} max={8} value={floors} onChange={(e) => setFloors(Number(e.target.value))} className="mt-1 w-full accent-[#E29432]" />
              <span className="font-mono text-white">{floors}</span>
            </label>
            <div className="text-xs text-white/60">
              Specification
              <div className="mt-1 flex rounded-full bg-white/10 p-0.5">
                {(["Standard", "Premium"] as Spec[]).map((s) => (
                  <button key={s} type="button" onClick={() => setSpec(s)} aria-pressed={spec === s} className={cn("flex-1 rounded-full py-1", spec === s ? "bg-copper-500 font-semibold text-ink" : "text-white/70")}>{s}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 lg:col-span-5">
          <p className="label-mono text-white/50">Selected element</p>
          <p className="font-display mt-2 text-2xl font-semibold">{sel.label}</p>
          <p className="font-mono mt-1 text-3xl font-semibold text-copper-300">{fmt(sel.amount)}</p>
          <p className="text-sm text-white/50">{sel.pct}% of construction budget</p>
          <ul className="mt-6 space-y-2">
            {rows.map((r) => (
              <li key={r.id}>
                <button type="button" onClick={() => setActive(r.id)} className="w-full text-left">
                  <div className="flex justify-between text-xs"><span className={on(r.id) ? "text-white" : "text-white/55"}>{r.label}</span><span className="font-mono text-white/70">{fmt(r.amount)}</span></div>
                  <div className="mt-1 h-1.5 rounded-full bg-white/10"><div className={cn("h-full rounded-full transition-all duration-500", on(r.id) ? "bg-copper-300" : "bg-white/35")} style={{ width: `${(r.pct / 30) * 100}%` }} /></div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DemoFrame>
  );
}
