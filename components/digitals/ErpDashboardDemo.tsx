"use client";

import { useMemo, useState } from "react";
import { Check, X } from "lucide-react";
import { DemoFrame } from "./DemoFrame";
import { cn } from "@/lib/utils";

const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

const projects = [
  {
    id: "tower",
    name: "Mixed-use Tower (demo)",
    budget: 2_400,
    codes: [
      { code: "01 Prelims", budget: 180, actual: 172 },
      { code: "02 Substructure", budget: 310, actual: 336 },
      { code: "03 Frame", budget: 420, actual: 401 },
      { code: "04 Envelope", budget: 380, actual: 214 },
      { code: "05 M&E", budget: 610, actual: 205 },
      { code: "06 Finishes", budget: 500, actual: 60 },
    ],
    planned: [40, 90, 150, 230, 330, 450, 590, 740, 900, 1060, 1220, 1380],
    actual: [35, 80, 160, 250, 360, 480, 610, 760, 910, 1020, 1190, 1388],
  },
  {
    id: "health",
    name: "Health Centre (demo)",
    budget: 860,
    codes: [
      { code: "01 Prelims", budget: 70, actual: 66 },
      { code: "02 Substructure", budget: 120, actual: 118 },
      { code: "03 Frame", budget: 150, actual: 149 },
      { code: "04 Envelope", budget: 130, actual: 122 },
      { code: "05 M&E", budget: 260, actual: 190 },
      { code: "06 Finishes", budget: 130, actual: 70 },
    ],
    planned: [20, 50, 95, 150, 215, 290, 370, 450, 530, 600, 660, 715],
    actual: [18, 46, 90, 140, 200, 275, 350, 430, 505, 580, 640, 715],
  },
  {
    id: "estate",
    name: "Estate Phase 1 (demo)",
    budget: 1_550,
    codes: [
      { code: "01 Prelims", budget: 120, actual: 131 },
      { code: "02 Substructure", budget: 260, actual: 291 },
      { code: "03 Frame", budget: 300, actual: 318 },
      { code: "04 Envelope", budget: 270, actual: 170 },
      { code: "05 M&E", budget: 350, actual: 98 },
      { code: "06 Finishes", budget: 250, actual: 20 },
    ],
    planned: [30, 75, 130, 200, 280, 370, 470, 580, 690, 800, 900, 1000],
    actual: [32, 82, 145, 220, 310, 410, 520, 640, 760, 860, 960, 1028],
  },
];

const initialApprovals = [
  { id: "PO-1182", what: "Reinforcement steel — 42t", amount: 31.5 },
  { id: "VO-0217", what: "Variation: additional basement waterproofing", amount: 12.8 },
  { id: "IPC-09", what: "Interim payment certificate no. 9", amount: 96.4 },
];

export function ErpDashboardDemo() {
  const [pid, setPid] = useState(projects[0].id);
  const [approvals, setApprovals] = useState(initialApprovals.map((a) => ({ ...a, state: "pending" as "pending" | "approved" | "rejected" })));
  const p = projects.find((x) => x.id === pid) ?? projects[0];

  const k = useMemo(() => {
    const spent = p.codes.reduce((s, c) => s + c.actual, 0);
    const planned = p.planned[p.planned.length - 1];
    const variance = spent - planned;
    const over = p.codes.filter((c) => c.actual > c.budget).length;
    return { spent, planned, variance, over, pct: (spent / p.budget) * 100 };
  }, [p]);

  const W = 320, H = 120;
  const max = Math.max(...p.planned, ...p.actual) * 1.08;
  const line = (arr: number[]) => arr.map((v, i) => `${i === 0 ? "M" : "L"}${(i / 11) * W},${H - (v / max) * H}`).join(" ");
  const maxCode = Math.max(...p.codes.flatMap((c) => [c.budget, c.actual]));

  return (
    <DemoFrame title="erp / project cost control" hint="Switch projects to see live cost position by cost code and cumulative cash flow. Approve or reject pending items — figures are sample data in ₦ millions.">
      <div className="flex gap-1 overflow-x-auto border-b border-white/10 p-2">
        {projects.map((x) => (
          <button key={x.id} type="button" onClick={() => setPid(x.id)} aria-pressed={pid === x.id} className={cn("whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs", pid === x.id ? "bg-white/10 font-semibold text-copper-300" : "text-white/55 hover:text-white")}>{x.name}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-px bg-white/10 md:grid-cols-4">
        {[
          ["Budget", `₦${p.budget.toLocaleString()}m`],
          ["Spent to date", `₦${k.spent.toLocaleString()}m`],
          ["vs plan", `${k.variance >= 0 ? "+" : ""}${k.variance}m`],
          ["Codes over budget", String(k.over)],
        ].map(([l, v], i) => (
          <div key={l} className="bg-[#0d1220] p-4">
            <p className="text-[11px] text-white/45">{l}</p>
            <p className={cn("font-mono mt-1 text-lg font-semibold", (i === 2 && k.variance > 0) || (i === 3 && k.over > 0) ? "text-copper-300" : "text-white")}>{v}</p>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2">
        <div className="border-b border-white/10 p-5 lg:border-b-0 lg:border-r">
          <p className="label-mono text-white/50">Budget vs actual by cost code</p>
          <ul className="mt-4 space-y-3">
            {p.codes.map((c) => (
              <li key={c.code}>
                <div className="flex justify-between text-[11px]"><span className="text-white/70">{c.code}</span><span className={cn("font-mono", c.actual > c.budget ? "text-copper-300" : "text-white/50")}>{c.actual} / {c.budget}</span></div>
                <div className="relative mt-1 h-2 rounded-full bg-white/10">
                  <div className="absolute inset-y-0 left-0 rounded-full bg-white/25" style={{ width: `${(c.budget / maxCode) * 100}%` }} />
                  <div className={cn("absolute inset-y-0 left-0 rounded-full transition-all duration-500", c.actual > c.budget ? "bg-copper-300" : "bg-copper-600")} style={{ width: `${(c.actual / maxCode) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <p className="label-mono text-white/50">Cumulative cash flow</p>
            <span className="flex gap-3 text-[10px] text-white/50"><span className="flex items-center gap-1"><span className="h-0.5 w-3 bg-white/40" />Plan</span><span className="flex items-center gap-1"><span className="h-0.5 w-3 bg-copper-300" />Actual</span></span>
          </div>
          <svg viewBox={`-4 -4 ${W + 8} ${H + 22}`} className="mt-3 w-full">
            {[0.25, 0.5, 0.75].map((g) => <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="rgba(255,255,255,0.06)" />)}
            <path d={line(p.planned)} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="4 3" />
            <path d={line(p.actual)} fill="none" stroke="#F9AD4D" strokeWidth="2" />
            {months.map((m, i) => <text key={i} x={(i / 11) * W} y={H + 14} fill="rgba(255,255,255,0.35)" fontSize="8" textAnchor="middle" fontFamily="monospace">{m}</text>)}
          </svg>
          <p className="label-mono mt-5 text-white/50">Awaiting your approval</p>
          <ul className="mt-2 space-y-1.5">
            {approvals.map((a) => (
              <li key={a.id} className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2 text-xs">
                <span className="font-mono text-copper-300">{a.id}</span>
                <span className="flex-1 truncate text-white/70">{a.what}</span>
                <span className="font-mono">₦{a.amount}m</span>
                {a.state === "pending" ? (
                  <span className="flex gap-1">
                    <button type="button" aria-label={`Approve ${a.id}`} onClick={() => setApprovals((l) => l.map((x) => (x.id === a.id ? { ...x, state: "approved" } : x)))} className="rounded-full bg-copper-500 p-1 text-ink"><Check className="size-3" /></button>
                    <button type="button" aria-label={`Reject ${a.id}`} onClick={() => setApprovals((l) => l.map((x) => (x.id === a.id ? { ...x, state: "rejected" } : x)))} className="rounded-full p-1 ring-1 ring-white/20"><X className="size-3" /></button>
                  </span>
                ) : (
                  <span className={cn("font-mono text-[10px] uppercase", a.state === "approved" ? "text-copper-300" : "text-white/40")}>{a.state}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DemoFrame>
  );
}
