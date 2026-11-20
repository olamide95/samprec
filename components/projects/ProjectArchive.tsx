"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { projects, type ProjectSector } from "@/data/samprecData";
import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/utils";

const sectors: ("All" | ProjectSector)[] = ["All", ...Array.from(new Set(projects.map((p) => p.sector)))];
const cities = ["All", ...Array.from(new Set(projects.map((p) => p.city)))] as const;

export function ProjectArchive({ showSearch = true, featuredOnly = false }: { showSearch?: boolean; featuredOnly?: boolean }) {
  const [sector, setSector] = useState<(typeof sectors)[number]>("All");
  const [city, setCity] = useState<string>("All");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return projects.filter(
      (p) =>
        (!featuredOnly || p.featured) &&
        (sector === "All" || p.sector === sector) &&
        (city === "All" || p.city === city) &&
        (!term || [p.title, p.location, p.client, p.summary, ...p.disciplines].join(" ").toLowerCase().includes(term)),
    );
  }, [sector, city, q, featuredOnly]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-y border-hairline py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by sector">
          {sectors.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSector(s)}
              aria-pressed={sector === s}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                sector === s ? "bg-slate-ink text-white" : "bg-white text-slate-600 ring-1 ring-hairline hover:ring-slate-400",
              )}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="sr-only" htmlFor="city-filter">City</label>
          <select
            id="city-filter"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="rounded-full bg-white px-4 py-2 text-sm ring-1 ring-hairline focus:outline-none focus:ring-copper-500"
          >
            {cities.map((c) => (
              <option key={c} value={c}>{c === "All" ? "All cities" : c}</option>
            ))}
          </select>
          {showSearch && (
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search projects, clients…"
                aria-label="Search projects"
                className="w-64 rounded-full bg-white py-2 pl-10 pr-4 text-sm ring-1 ring-hairline focus:outline-none focus:ring-copper-500"
              />
            </div>
          )}
          <span className="font-mono text-xs text-slate-400">{String(list.length).padStart(2, "0")} results</span>
        </div>
      </div>

      <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={p} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {list.length === 0 && (
        <p className="py-16 text-center text-slate-500">
          No projects match these filters.{" "}
          <button type="button" className="font-semibold text-copper-700 underline" onClick={() => { setSector("All"); setCity("All"); setQ(""); }}>
            Reset filters
          </button>
        </p>
      )}
    </div>
  );
}
