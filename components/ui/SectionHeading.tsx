import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  index: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
  className?: string;
  action?: ReactNode;
}

export function SectionHeading({ index, eyebrow, title, intro, dark, className, action }: Props) {
  return (
    <div className={cn("grid gap-6 border-t pt-6 md:grid-cols-12", dark ? "border-white/15" : "border-hairline", className)}>
      <div className="md:col-span-3">
        <p className={cn("label-mono", dark ? "text-copper-300" : "text-copper-700")}>
          {index} / {eyebrow}
        </p>
      </div>
      <div className="md:col-span-9">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className={cn("font-display max-w-3xl text-3xl font-semibold leading-[1.08] tracking-tight md:text-5xl", dark ? "text-white" : "text-slate-ink")}>
            {title}
          </h2>
          {action && <div className="shrink-0">{action}</div>}
        </div>
        {intro && <p className={cn("mt-5 max-w-2xl text-lg leading-relaxed", dark ? "text-white/65" : "text-slate-600")}>{intro}</p>}
      </div>
    </div>
  );
}
