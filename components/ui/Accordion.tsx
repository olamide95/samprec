import { Plus } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Accordion({ items, dark, numbered }: { items: { title: ReactNode; body: ReactNode }[]; dark?: boolean; numbered?: boolean }) {
  return (
    <div className={cn("border-t", dark ? "border-white/10" : "border-hairline")}>
      {items.map((it, i) => (
        <details key={i} className={cn("group border-b", dark ? "border-white/10" : "border-hairline")}>
          <summary className="flex cursor-pointer list-none items-center gap-4 py-5 [&::-webkit-details-marker]:hidden">
            {numbered && <span className={cn("font-mono text-xs", dark ? "text-copper-300" : "text-copper-700")}>{String(i + 1).padStart(2, "0")}</span>}
            <span className={cn("flex-1 font-display text-lg font-semibold tracking-tight", dark && "text-white")}>{it.title}</span>
            <Plus className={cn("size-5 shrink-0 transition-transform duration-300 group-open:rotate-45", dark ? "text-white/60" : "text-slate-400")} />
          </summary>
          <div className={cn("pb-6 text-[15px] leading-relaxed", numbered && "pl-9", dark ? "text-white/65" : "text-slate-600")}>{it.body}</div>
        </details>
      ))}
    </div>
  );
}
