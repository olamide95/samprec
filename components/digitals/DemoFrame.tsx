import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function DemoFrame({ title, hint, children, className }: { title: string; hint: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-[28px] border border-white/10 bg-[#0d1220] text-white", className)}>
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-copper-500" />
          </span>
          <span className="font-mono text-xs text-white/70">{title}</span>
        </div>
        <span className="label-mono hidden rounded-full bg-copper-500/15 px-2.5 py-1 text-copper-300 sm:inline">Interactive demo · sample data</span>
      </div>
      <div>{children}</div>
      <p className="border-t border-white/10 px-5 py-2.5 text-[11px] text-white/40">{hint}</p>
    </div>
  );
}
