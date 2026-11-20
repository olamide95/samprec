"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { lifecycle, services } from "@/data/samprecData";
import { cn } from "@/lib/utils";

export function LifecycleTimeline() {
  const [active, setActive] = useState(0);
  const stage = lifecycle[active];
  const related = services.filter((s) => s.lifecycleStages.includes(active));
  const progress = (active / (lifecycle.length - 1)) * 100;

  return (
    <div>
      <div className="relative">
        <div className="absolute left-0 right-0 top-[22px] h-px bg-white/15" aria-hidden />
        <motion.div className="absolute left-0 top-[22px] h-px bg-copper-500" animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} aria-hidden />
        <ol className="relative grid grid-cols-6 gap-2" role="tablist" aria-label="Project lifecycle stages">
          {lifecycle.map((s, i) => (
            <li key={s.index}>
              <button
                type="button"
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className="group flex w-full flex-col items-start text-left"
              >
                <span
                  className={cn(
                    "flex size-11 items-center justify-center rounded-full border font-mono text-xs transition-all",
                    i <= active ? "border-copper-500 bg-copper-500 text-ink" : "border-white/25 bg-ink text-white/60 group-hover:border-white/60",
                  )}
                >
                  {s.index}
                </span>
                <span className={cn("font-display mt-4 hidden text-sm font-semibold md:block", i === active ? "text-white" : "text-white/50")}>{s.title}</span>
                <span className="mt-1 hidden text-xs text-white/40 lg:block">{s.short}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={stage.index}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.35 }}
          className="mt-14 grid gap-10 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 md:grid-cols-12 md:p-12"
        >
          <div className="md:col-span-5">
            <p className="label-mono text-copper-300">Stage {stage.index} / 06</p>
            <h3 className="font-display mt-4 text-4xl font-semibold tracking-tight text-white">{stage.title}</h3>
            <p className="mt-4 text-lg leading-relaxed text-white/65">{stage.description}</p>
            <div className="mt-8 flex gap-2">
              <button type="button" onClick={() => setActive((a) => Math.max(0, a - 1))} disabled={active === 0} className="flex size-11 items-center justify-center rounded-full border border-white/20 text-white disabled:opacity-30" aria-label="Previous stage">
                <ChevronLeft className="size-5" />
              </button>
              <button type="button" onClick={() => setActive((a) => Math.min(lifecycle.length - 1, a + 1))} disabled={active === lifecycle.length - 1} className="flex size-11 items-center justify-center rounded-full border border-white/20 text-white disabled:opacity-30" aria-label="Next stage">
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
          <div className="md:col-span-4">
            <p className="label-mono text-white/40">Key activities</p>
            <ul className="mt-4 space-y-3">
              {stage.activities.map((a) => (
                <li key={a} className="flex gap-3 text-white/80">
                  <span className="mt-2.5 h-px w-4 shrink-0 bg-copper-500" aria-hidden />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="label-mono text-white/40">Services engaged</p>
            <ul className="mt-4 space-y-2">
              {related.map((s) => (
                <li key={s.id} className="rounded-xl border border-white/10 px-3 py-2 text-sm text-white/80">
                  <span className="font-mono text-xs text-copper-300">{s.index}</span> {s.short}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
