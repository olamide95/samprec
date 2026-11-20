"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { lifecycle, services } from "@/data/samprecData";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

function TabSync({ onTab }: { onTab: (id: string) => void }) {
  const params = useSearchParams();
  const tab = params.get("tab");
  useEffect(() => {
    if (tab && services.some((s) => s.id === tab)) onTab(tab);
  }, [tab, onTab]);
  return null;
}

export function ServiceTabs() {
  const [activeId, setActiveId] = useState(services[0].id);
  const s = services.find((x) => x.id === activeId) ?? services[0];

  const select = (id: string) => {
    setActiveId(id);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", id);
    window.history.replaceState(null, "", url.toString());
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <Suspense fallback={null}>
        <TabSync onTab={setActiveId} />
      </Suspense>

      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-32" role="tablist" aria-label="Services" aria-orientation="vertical">
          {services.map((x) => (
            <button
              key={x.id}
              role="tab"
              type="button"
              id={`tab-${x.id}`}
              aria-selected={x.id === activeId}
              aria-controls="service-panel"
              onClick={() => select(x.id)}
              className={cn(
                "flex w-full items-baseline gap-4 border-t border-hairline py-5 text-left transition-colors last:border-b",
                x.id === activeId ? "text-slate-ink" : "text-slate-400 hover:text-slate-700",
              )}
            >
              <span className={cn("font-mono text-xs", x.id === activeId && "text-copper-700")}>{x.index}</span>
              <span className="font-display text-lg font-semibold leading-snug">{x.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={s.id}
            id="service-panel"
            role="tabpanel"
            aria-labelledby={`tab-${s.id}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[28px] border border-hairline bg-white p-8 md:p-12"
          >
            <p className="label-mono text-copper-700">Service {s.index} / 06</p>
            <h2 className="font-display mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">{s.title}</h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">{s.summary}</p>

            <div className="mt-10 grid gap-10 md:grid-cols-2">
              <div>
                <p className="label-mono text-slate-400">What we deliver</p>
                <ul className="mt-5 space-y-3">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex gap-3">
                      <Check className="mt-0.5 size-4 shrink-0 text-copper-600" aria-hidden />
                      <span className="text-[15px]">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="label-mono text-slate-400">Lifecycle coverage</p>
                <div className="mt-5 grid grid-cols-6 gap-1.5">
                  {lifecycle.map((st, i) => {
                    const on = s.lifecycleStages.includes(i);
                    return (
                      <div key={st.index} className="text-center" title={st.title}>
                        <div className={cn("h-16 rounded-md", on ? "copper-gradient" : "bg-slate-100")} />
                        <p className={cn("mt-2 font-mono text-[10px]", on ? "text-slate-ink" : "text-slate-300")}>{st.index}</p>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-3 text-xs text-slate-500">{s.lifecycleStages.map((i) => lifecycle[i].title).join(" · ")}</p>

                <p className="label-mono mt-10 text-slate-400">Client outcomes</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.outcomes.map((o) => (
                    <span key={o} className="rounded-full bg-alabaster px-3 py-1.5 text-sm ring-1 ring-hairline">{o}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-3 border-t border-hairline pt-8">
              <MagneticButton href={`/contact?service=${s.id}#proposal`}>Request this service</MagneticButton>
              <MagneticButton href="/projects" variant="outline">See related projects</MagneticButton>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
