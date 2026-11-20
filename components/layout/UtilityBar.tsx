"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, Mail, Phone } from "lucide-react";
import { company, pillars, telHref, type Pillar } from "@/data/samprecData";
import { cn } from "@/lib/utils";

export function activePillar(pathname: string): Pillar {
  if (pathname.startsWith("/digitals")) return "digitals";
  if (pathname.startsWith("/academy")) return "academy";
  return "corporate";
}

export function UtilityBar() {
  const pathname = usePathname();
  const active = activePillar(pathname);

  return (
    <div className="bg-ink text-white/70">
      <div className="container-grid flex h-10 items-center justify-between gap-4">
        <nav aria-label="Samprec ecosystem" className="flex items-center gap-1">
          {pillars.map((p) => (
            <Link
              key={p.id}
              href={p.href}
              aria-current={active === p.id ? "page" : undefined}
              className={cn(
                "label-mono relative rounded-full px-3 py-1 transition-colors",
                active === p.id ? "bg-white/10 text-copper-300" : "hover:text-white",
              )}
            >
              {p.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-6 text-xs md:flex">
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5 text-copper-300" aria-hidden /> Mon – Sat · 9:00 – 17:00
          </span>
          <a href={telHref(company.primaryPhone)} className="flex items-center gap-1.5 hover:text-white">
            <Phone className="size-3.5 text-copper-300" aria-hidden /> {company.primaryPhone}
          </a>
          <a href={`mailto:${company.primaryEmail}`} className="flex items-center gap-1.5 hover:text-white">
            <Mail className="size-3.5 text-copper-300" aria-hidden /> {company.primaryEmail}
          </a>
        </div>
      </div>
    </div>
  );
}
