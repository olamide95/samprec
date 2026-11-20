"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { articles, formatDate, type Article } from "@/data/samprecData";
import { cn } from "@/lib/utils";

const categories: ("All" | Article["category"])[] = ["All", ...Array.from(new Set(articles.map((a) => a.category)))];

export function InsightsList() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return [...articles]
      .sort((a, b) => b.date.localeCompare(a.date))
      .filter((a) => (cat === "All" || a.category === cat) && (!t || `${a.title} ${a.excerpt} ${a.body.flatMap((b) => b.paragraphs).join(" ")}`.toLowerCase().includes(t)));
  }, [cat, q]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-y border-hairline py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button key={c} type="button" onClick={() => setCat(c)} aria-pressed={cat === c} className={cn("rounded-full px-4 py-2 text-sm font-medium", cat === c ? "bg-slate-ink text-white" : "bg-white text-slate-600 ring-1 ring-hairline hover:ring-slate-400")}>
              {c}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search insights…" aria-label="Search insights" className="w-full rounded-full bg-white py-2 pl-10 pr-4 text-sm ring-1 ring-hairline focus:outline-none focus:ring-copper-500 md:w-72" />
        </div>
      </div>

      <ol className="mt-4">
        {list.map((a, i) => (
          <li key={a.slug} className="border-b border-hairline">
            <Link href={`/insights/${a.slug}`} className="group grid gap-4 py-10 md:grid-cols-12 md:items-baseline">
              <span className="font-mono text-sm text-slate-400 md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <div className="md:col-span-7">
                <h2 className="font-display text-2xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-copper-700 md:text-3xl">{a.title}</h2>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-500">{a.excerpt}</p>
              </div>
              <div className="flex gap-6 md:col-span-4 md:flex-col md:items-end md:gap-2">
                <span className="label-mono text-copper-700">{a.category}</span>
                <span className="font-mono text-xs text-slate-400">{formatDate(a.date)} · {a.readMinutes} min read</span>
              </div>
            </Link>
          </li>
        ))}
      </ol>
      {list.length === 0 && <p className="py-16 text-center text-slate-500">No insights match your search.</p>}
    </div>
  );
}
