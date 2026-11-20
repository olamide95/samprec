"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Lock, RotateCcw, Trophy, Unlock } from "lucide-react";
import { useMemo, useState } from "react";
import { DemoFrame } from "./DemoFrame";
import { cn } from "@/lib/utils";

const stages = [
  { id: "plan", title: "Procurement plan", actor: "Procurement Officer", log: "Procurement plan approved for 'Construction of Health Centre (Demo)'" },
  { id: "advert", title: "Tender advertised", actor: "Procurement Officer", log: "Invitation to tender published to vendor portal" },
  { id: "register", title: "Vendor registration", actor: "System", log: "5 prequalified vendors registered interest" },
  { id: "submit", title: "Sealed bids received", actor: "System", log: "5 bids received and sealed (encrypted until opening)" },
  { id: "open", title: "Public bid opening", actor: "Tender Board", log: "Bids unsealed at scheduled opening time; prices read out" },
  { id: "evaluate", title: "Evaluation", actor: "Evaluation Committee", log: "Technical and financial evaluation completed" },
  { id: "award", title: "Award", actor: "Accounting Officer", log: "Contract awarded to highest-ranked responsive bidder" },
] as const;

const bidders = [
  { id: "B-01", tech: 86, price: 412_500_000 },
  { id: "B-02", tech: 78, price: 389_000_000 },
  { id: "B-03", tech: 91, price: 446_200_000 },
  { id: "B-04", tech: 64, price: 352_800_000 },
  { id: "B-05", tech: 82, price: 401_900_000 },
];

const naira = (n: number) => `₦${(n / 1_000_000).toFixed(1)}m`;

export function ProcurementSimulator() {
  const [stage, setStage] = useState(0);
  const [techWeight, setTechWeight] = useState(70);
  const [log, setLog] = useState<{ t: string; actor: string; text: string }[]>([
    { t: "09:00:00", actor: stages[0].actor, text: stages[0].log },
  ]);

  const ranked = useMemo(() => {
    const lowest = Math.min(...bidders.map((b) => b.price));
    return bidders
      .map((b) => {
        const fin = (lowest / b.price) * 100;
        const passed = b.tech >= 70;
        const total = passed ? (b.tech * techWeight + fin * (100 - techWeight)) / 100 : 0;
        return { ...b, fin, passed, total };
      })
      .sort((a, b) => b.total - a.total);
  }, [techWeight]);

  const advance = () => {
    if (stage >= stages.length - 1) return;
    const next = stage + 1;
    const d = new Date(2026, 0, 1, 9, next * 7, next * 13);
    setLog((l) => [{ t: d.toTimeString().slice(0, 8), actor: stages[next].actor, text: stages[next].id === "award" ? `${stages[next].log}: ${ranked[0].id}` : stages[next].log }, ...l]);
    setStage(next);
  };
  const reset = () => {
    setStage(0);
    setLog([{ t: "09:00:00", actor: stages[0].actor, text: stages[0].log }]);
  };

  const opened = stage >= 4;
  const evaluated = stage >= 5;

  return (
    <DemoFrame title="e-procurement / tender TDR-2026-014" hint="Advance the tender through each stage. Adjust the technical/financial weighting at evaluation and watch the ranking recompute. Bids below 70 technical points are non-responsive.">
      <div className="grid lg:grid-cols-12">
        <ol className="border-b border-white/10 p-5 lg:col-span-4 lg:border-b-0 lg:border-r">
          {stages.map((s, i) => (
            <li key={s.id} className="flex items-center gap-3 py-2">
              <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-full font-mono text-[11px]", i < stage ? "bg-copper-500 text-ink" : i === stage ? "ring-2 ring-copper-300 text-copper-300" : "ring-1 ring-white/15 text-white/30")}>
                {i < stage ? <Check className="size-3.5" /> : i + 1}
              </span>
              <span className={cn("text-sm", i <= stage ? "text-white" : "text-white/35")}>{s.title}</span>
            </li>
          ))}
          <div className="mt-5 flex gap-2">
            <button type="button" onClick={advance} disabled={stage === stages.length - 1} className="flex-1 rounded-full bg-copper-500 px-4 py-2.5 text-sm font-semibold text-ink disabled:opacity-40">
              {stage === stages.length - 1 ? "Awarded" : `Advance → ${stages[stage + 1].title}`}
            </button>
            <button type="button" onClick={reset} aria-label="Reset" className="rounded-full px-3 ring-1 ring-white/20"><RotateCcw className="size-4" /></button>
          </div>
        </ol>

        <div className="p-5 lg:col-span-8">
          <div className="flex items-center justify-between">
            <p className="label-mono text-white/50">Bid register</p>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-white/60">{opened ? <Unlock className="size-3.5 text-copper-300" /> : <Lock className="size-3.5" />} {opened ? "Unsealed" : stage >= 3 ? "Sealed" : "Awaiting bids"}</span>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="text-[11px] uppercase tracking-wider text-white/40">
                <tr><th className="py-2 font-medium">Bidder</th><th className="font-medium">Price</th><th className="font-medium">Tech</th><th className="font-medium">Fin</th><th className="text-right font-medium">Score</th></tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {stage >= 3 &&
                    (evaluated ? ranked : bidders.map((b) => ({ ...b, fin: 0, passed: true, total: 0 }))).map((b, i) => (
                      <motion.tr key={b.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn("border-t border-white/5", evaluated && i === 0 && "bg-copper-500/10")}>
                        <td className="py-2.5 font-mono">{b.id} {evaluated && i === 0 && stage === 6 && <Trophy className="ml-1 inline size-3.5 text-copper-300" />}</td>
                        <td className="font-mono">{opened ? naira(b.price) : "••••••"}</td>
                        <td className="font-mono">{evaluated ? <span className={b.passed ? "" : "text-red-400"}>{b.tech}</span> : "—"}</td>
                        <td className="font-mono">{evaluated ? b.fin.toFixed(1) : "—"}</td>
                        <td className="text-right font-mono font-semibold">{evaluated ? (b.passed ? b.total.toFixed(1) : "NR") : "—"}</td>
                      </motion.tr>
                    ))}
                </AnimatePresence>
              </tbody>
            </table>
            {stage < 3 && <p className="py-8 text-center text-sm text-white/40">No bids yet — advance the tender.</p>}
          </div>

          {evaluated && (
            <label className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl bg-white/5 p-3 text-sm">
              <span className="text-white/60">Weighting</span>
              <span className="font-mono text-copper-300">Tech {techWeight}%</span>
              <input type="range" min={40} max={90} step={5} value={techWeight} onChange={(e) => setTechWeight(Number(e.target.value))} className="flex-1 accent-[#E29432]" />
              <span className="font-mono text-white/70">Fin {100 - techWeight}%</span>
            </label>
          )}

          <p className="label-mono mt-6 text-white/50">Audit trail</p>
          <ul className="mt-2 max-h-36 space-y-1 overflow-y-auto font-mono text-[11px]">
            {log.map((l, i) => (
              <li key={i} className="flex gap-3 text-white/60"><span className="text-copper-300">{l.t}</span><span className="text-white/40">{l.actor}</span><span>{l.text}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </DemoFrame>
  );
}
