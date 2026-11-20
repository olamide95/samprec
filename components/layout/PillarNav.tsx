"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  theme: "academy" | "digitals";
  brand: string;
  links: { label: string; href: string }[];
  cta: { label: string; href: string };
}

export function PillarNav({ theme, brand, links, cta }: Props) {
  const pathname = usePathname();
  const dark = theme === "digitals";
  return (
    <div className={cn("sticky top-[112px] z-40 border-b backdrop-blur-xl", dark ? "border-white/10 bg-ink/90 text-white" : "border-copper-100 bg-copper-50/90")}>
      <div className="container-grid flex h-14 items-center gap-6">
        <Link href={links[0].href} className="flex shrink-0 items-center gap-2">
          <span className="copper-gradient flex size-6 items-center justify-center rounded-md font-mono text-[11px] font-bold text-ink">{theme === "digitals" ? "B" : "C"}</span>
          <span className="font-display text-sm font-semibold tracking-tight">{brand}</span>
        </Link>
        <nav aria-label={`${brand} sections`} className="-mx-2 flex flex-1 items-center gap-1 overflow-x-auto [scrollbar-width:none]">
          {links.map((l) => {
            const active = l.href === links[0].href ? pathname === l.href : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-colors",
                  active ? (dark ? "bg-white/10 text-copper-300" : "bg-white text-copper-700 shadow-sm") : dark ? "text-white/60 hover:text-white" : "text-slate-600 hover:text-slate-ink",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <Link href={cta.href} className="hidden shrink-0 items-center gap-1.5 rounded-full bg-copper-500 px-4 py-2 text-xs font-semibold text-ink hover:bg-copper-300 sm:inline-flex">
          {cta.label} <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}
