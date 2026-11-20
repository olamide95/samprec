"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CornerDownLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { search, searchIndex } from "@/lib/searchIndex";
import { cn } from "@/lib/utils";

const quick = searchIndex.filter((i) => ["/contact#proposal", "/academy#finder", "/digitals/demos", "/digitals/assessment", "/academy/enrol"].includes(i.href));

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => (q.trim() ? search(q) : quick), [q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-search", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-search", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setIdx(0);
      setTimeout(() => inputRef.current?.focus(), 30);
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "";
  }, [open]);

  useEffect(() => setIdx(0), [q]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(results.length - 1, i + 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(0, i - 1)); }
    if (e.key === "Enter" && results[idx]) go(results[idx].href);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" aria-label="Close search" className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <motion.div role="dialog" aria-modal="true" aria-label="Search site" initial={{ y: -12, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: -12, scale: 0.98 }} transition={{ duration: 0.2 }} className="relative w-full max-w-2xl overflow-hidden rounded-[24px] bg-white shadow-2xl">
            <div className="flex items-center gap-3 border-b border-hairline px-5">
              <Search className="size-5 text-slate-400" aria-hidden />
              <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onInputKey} placeholder="Search services, projects, courses, solutions…" aria-label="Search" className="h-16 flex-1 bg-transparent text-[16px] focus:outline-none" />
              <kbd className="rounded-md bg-alabaster px-2 py-1 font-mono text-[10px] text-slate-500 ring-1 ring-hairline">ESC</kbd>
            </div>
            <div className="max-h-[55vh] overflow-y-auto p-2">
              {!q.trim() && <p className="label-mono px-3 pb-1 pt-2 text-slate-400">Quick actions</p>}
              {results.length === 0 ? (
                <p className="px-3 py-10 text-center text-sm text-slate-500">No results for “{q}”.</p>
              ) : (
                <ul role="listbox">
                  {results.map((r, i) => (
                    <li key={r.href + r.title} role="option" aria-selected={i === idx}>
                      <button type="button" onMouseEnter={() => setIdx(i)} onClick={() => go(r.href)} className={cn("flex w-full items-center gap-4 rounded-xl px-3 py-3 text-left", i === idx ? "bg-alabaster" : "")}>
                        <span className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-wider text-copper-700">{r.group}</span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[15px] font-semibold">{r.title}</span>
                          {r.sub && <span className="block truncate text-xs text-slate-500">{r.sub}</span>}
                        </span>
                        {i === idx && <CornerDownLeft className="size-4 text-slate-400" />}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex gap-4 border-t border-hairline px-5 py-2.5 font-mono text-[10px] text-slate-400"><span>↑↓ navigate</span><span>↵ open</span><span>⌘K / Ctrl K toggle</span></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function SearchButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("open-search"))} aria-label="Search site (Ctrl K)" className={cn("inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-slate-500 ring-1 ring-hairline transition-colors hover:text-slate-ink hover:ring-slate-400", className)}>
      <Search className="size-4" />
      <span className="hidden xl:inline">Search</span>
      <kbd className="hidden rounded bg-alabaster px-1.5 font-mono text-[10px] xl:inline">⌘K</kbd>
    </button>
  );
}
