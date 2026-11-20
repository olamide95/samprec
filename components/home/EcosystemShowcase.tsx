"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Blueprint, type BlueprintVariant } from "@/components/ui/Blueprint";
import { courses, digitalSolutions, services } from "@/data/samprecData";
import { cn } from "@/lib/utils";

const pillarsDetail: { id: string; index: string; name: string; href: string; lead: string; items: string[]; art: BlueprintVariant }[] = [
  {
    id: "corporate",
    index: "A",
    name: "Samprec Consultants",
    href: "/services",
    lead: "Cost, project, design and finance consultancy across the full construction lifecycle.",
    items: services.map((s) => s.short),
    art: "section",
  },
  {
    id: "digitals",
    index: "B",
    name: "Samprec Digitals",
    href: "/digitals",
    lead: "Technology for construction and public procurement — from BIM to bespoke ERP.",
    items: digitalSolutions.map((d) => d.title),
    art: "network",
  },
  {
    id: "academy",
    index: "C",
    name: "Samprec Academy",
    href: "/academy",
    lead: "Professional training that turns practitioners into certified leaders.",
    items: courses.slice(0, 6).map((c) => c.title),
    art: "grid",
  },
];

export function EcosystemShowcase() {
  const [active, setActive] = useState(0);
  const p = pillarsDetail[active];

  return (
    <section className="bg-alabaster py-20 md:py-28">
      <div className="container-grid">
        <SectionHeading index="01" eyebrow="Ecosystem" title={<>Three pillars. <span className="text-slate-400">One standard of practice.</span></>} />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <div className="flex flex-col lg:col-span-5" role="tablist" aria-label="Samprec pillars">
            {pillarsDetail.map((item, i) => (
              <button
                key={item.id}
                role="tab"
                aria-selected={active === i}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={cn(
                  "group flex items-start gap-6 border-t border-hairline py-7 text-left transition-colors last:border-b",
                  active === i ? "text-slate-ink" : "text-slate-400 hover:text-slate-600",
                )}
              >
                <span className={cn("label-mono mt-2", active === i && "text-copper-700")}>{item.index}</span>
                <span className="flex-1">
                  <span className="font-display block text-2xl font-semibold tracking-tight md:text-3xl">{item.name}</span>
                  <span className={cn("mt-2 block max-w-md text-[15px] leading-relaxed transition-opacity", active === i ? "opacity-100 text-slate-600" : "opacity-0 h-0 lg:h-auto")}>
                    {item.lead}
                  </span>
                </span>
                <span className={cn("mt-2 h-px w-10 transition-all", active === i ? "w-16 bg-copper-500" : "bg-transparent")} aria-hidden />
              </button>
            ))}
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-[28px] border border-hairline bg-white"
              >
                <Blueprint variant={p.art} className="aspect-[16/8]" label={`Pillar ${p.index} — ${p.name}`} />
                <div className="grid gap-6 p-8 md:grid-cols-2">
                  <ul className="space-y-2">
                    {p.items.map((it, i) => (
                      <li key={it} className="flex items-baseline gap-3 text-[15px]">
                        <span className="font-mono text-xs text-copper-700">{String(i + 1).padStart(2, "0")}</span>
                        {it}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-end md:justify-end">
                    <Link href={p.href} className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-ink">
                      Explore {p.name}
                      <span className="flex size-9 items-center justify-center rounded-full bg-slate-ink text-white transition-transform group-hover:rotate-45">
                        <ArrowUpRight className="size-4" />
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
