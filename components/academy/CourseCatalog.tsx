"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { courseCategories, courses, type CourseCategory, type Level } from "@/data/samprecData";
import { CourseCard } from "./CourseCard";
import { cn } from "@/lib/utils";

const levels: Level[] = ["Foundation", "Intermediate", "Advanced"];

export function CourseCatalog() {
  const router = useRouter();
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const cat = (params.get("category") as CourseCategory | null) ?? null;
  const level = (params.get("level") as Level | null) ?? null;

  const update = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`/academy/courses${next.toString() ? `?${next}` : ""}`, { scroll: false });
  };

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return courses.filter(
      (c) =>
        (!cat || c.category === cat) &&
        (!level || c.level === level) &&
        (!t || [c.code, c.title, c.summary, c.description, c.audience, ...c.modules.flatMap((m) => [m.title, ...m.points])].join(" ").toLowerCase().includes(t)),
    );
  }, [q, cat, level]);

  const active = Boolean(q || cat || level);

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <aside className="lg:col-span-3">
        <div className="space-y-8 lg:sticky lg:top-[200px]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
            <input
              type="search"
              defaultValue={q}
              onChange={(e) => update("q", e.target.value || null)}
              placeholder="Search P6, BIM, RICS…"
              aria-label="Search courses"
              className="w-full rounded-full bg-white py-2.5 pl-10 pr-4 text-sm ring-1 ring-hairline focus:outline-none focus:ring-2 focus:ring-copper-500"
            />
          </div>
          <fieldset>
            <legend className="label-mono text-slate-400">Track</legend>
            <div className="mt-3 space-y-1">
              {courseCategories.map((c) => {
                const n = courses.filter((x) => x.category === c).length;
                return (
                  <button key={c} type="button" onClick={() => update("category", cat === c ? null : c)} aria-pressed={cat === c} className={cn("flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors", cat === c ? "bg-slate-ink text-white" : "hover:bg-white")}>
                    {c} <span className="font-mono text-xs opacity-60">{n}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>
          <fieldset>
            <legend className="label-mono text-slate-400">Level</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {levels.map((l) => (
                <button key={l} type="button" onClick={() => update("level", level === l ? null : l)} aria-pressed={level === l} className={cn("rounded-full px-3 py-1.5 text-sm ring-1", level === l ? "bg-copper-500 font-semibold text-ink ring-copper-500" : "bg-white ring-hairline hover:ring-slate-400")}>
                  {l}
                </button>
              ))}
            </div>
          </fieldset>
          {active && (
            <button type="button" onClick={() => router.replace("/academy/courses", { scroll: false })} className="inline-flex items-center gap-1.5 text-sm font-semibold text-copper-700">
              <X className="size-4" /> Clear filters
            </button>
          )}
        </div>
      </aside>

      <div className="lg:col-span-9">
        <p className="font-mono text-xs text-slate-500">{list.length} of {courses.length} programmes</p>
        <motion.div layout className="mt-4 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((c) => (
              <motion.div key={c.slug} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.3 }}>
                <CourseCard course={c} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {list.length === 0 && (
          <div className="rounded-[24px] border border-dashed border-hairline p-12 text-center">
            <p className="font-display text-xl font-semibold">No courses match.</p>
            <p className="mt-2 text-slate-500">Try another keyword, or ask about a custom corporate programme.</p>
          </div>
        )}
      </div>
    </div>
  );
}
