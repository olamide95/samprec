"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Blueprint } from "@/components/ui/Blueprint";
import { company, lifecycle } from "@/data/samprecData";

export function Hero() {
  const reduce = useReducedMotion();
  const rise = (d: number) => ({
    initial: reduce ? false : { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="relative overflow-hidden border-b border-hairline bg-white">
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden />
      <div className="container-grid relative grid gap-12 pb-16 pt-14 md:pt-20 lg:grid-cols-12 lg:gap-8 lg:pb-24">
        <div className="lg:col-span-7">
          <motion.p {...rise(0)} className="label-mono text-copper-700">
            00 / Samprec Consultants Limited · Abuja
          </motion.p>
          <motion.h1 {...rise(0.08)} className="font-display mt-8 text-[44px] font-semibold leading-[0.98] tracking-[-0.03em] text-slate-ink sm:text-6xl lg:text-[84px]">
            Every naira
            <br />
            measured. <span className="text-copper-gradient">Every stage</span>
            <br />
            delivered.
          </motion.h1>
          <motion.p {...rise(0.18)} className="mt-8 max-w-xl text-lg leading-relaxed text-slate-600">
            {company.intro} One firm for cost, programme, design and finance — backed by Samprec Digitals and Samprec Academy.
          </motion.p>
          <motion.div {...rise(0.28)} className="mt-10 flex flex-wrap gap-3">
            <MagneticButton href="/contact#proposal">Request a Proposal</MagneticButton>
            <MagneticButton href="/projects" variant="outline">View Projects</MagneticButton>
          </motion.div>
        </div>

        <motion.div {...rise(0.2)} className="relative lg:col-span-5 lg:mt-10">
          <div className="relative overflow-hidden rounded-[28px] border border-hairline">
            <Blueprint variant="tower" className="aspect-[4/5] w-full" label="Fig. 01 — Vertical delivery" />
            <div className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 backdrop-blur">
              <span className="label-mono text-white/80">Lifecycle 01 → 06</span>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-4 hidden w-64 rounded-2xl border border-hairline bg-white p-5 shadow-xl sm:block lg:-left-12">
            <p className="label-mono text-slate-400">End-to-end</p>
            <ol className="mt-3 space-y-1.5">
              {lifecycle.map((s) => (
                <li key={s.index} className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-ink">{s.title}</span>
                  <span className="font-mono text-xs text-copper-700">{s.index}</span>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
