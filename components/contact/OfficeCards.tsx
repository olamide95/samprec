"use client";

import { Check, Copy, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { useState } from "react";
import { offices, telHref } from "@/data/samprecData";
import { cn } from "@/lib/utils";

export function OfficeCards() {
  const [active, setActive] = useState<string>(offices[0].id);
  const [copied, setCopied] = useState<string | null>(null);
  const office = offices.find((o) => o.id === active) ?? offices[0];

  const copy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      setCopied(null);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="space-y-4 lg:col-span-5">
        {offices.map((o, i) => (
          <article
            key={o.id}
            onClick={() => setActive(o.id)}
            className={cn("cursor-pointer rounded-[24px] border p-7 transition-all", active === o.id ? "border-slate-ink bg-white shadow-[0_24px_50px_-30px_rgba(15,23,42,0.4)]" : "border-hairline bg-white/60 hover:border-slate-300")}
          >
            <div className="flex items-start justify-between">
              <p className="label-mono text-copper-700">{String(i + 1).padStart(2, "0")} / {o.role}</p>
              {active === o.id && <span className="label-mono rounded-full bg-copper-100 px-2 py-0.5 text-copper-700">On map</span>}
            </div>
            <h3 className="font-display mt-4 text-2xl font-semibold tracking-tight">{o.name}</h3>
            <p className="mt-3 flex gap-2 text-[15px] text-slate-600">
              <MapPin className="mt-0.5 size-4 shrink-0 text-copper-600" aria-hidden /> {o.address}
            </p>
            <p className="mt-2 font-mono text-xs text-slate-500">{o.hours}</p>
            <div className="mt-6 flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
              {o.phones.map((p) => (
                <a key={p} href={telHref(p)} className="inline-flex items-center gap-1.5 rounded-full bg-slate-ink px-3.5 py-2 text-xs font-semibold text-white hover:bg-black">
                  <Phone className="size-3.5" /> {p}
                </a>
              ))}
              <a href={`mailto:${o.email}`} className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold ring-1 ring-hairline hover:ring-slate-400">
                <Mail className="size-3.5" /> Email
              </a>
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(o.mapQuery)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold ring-1 ring-hairline hover:ring-slate-400">
                <Navigation className="size-3.5" /> Directions
              </a>
              <button type="button" onClick={() => copy(o.id, o.address)} className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold ring-1 ring-hairline hover:ring-slate-400">
                {copied === o.id ? <Check className="size-3.5 text-copper-600" /> : <Copy className="size-3.5" />} {copied === o.id ? "Copied" : "Copy address"}
              </button>
            </div>
          </article>
        ))}
      </div>
      <div className="overflow-hidden rounded-[24px] border border-hairline bg-white lg:col-span-7">
        <iframe
          key={office.id}
          title={`Map — ${office.name}`}
          src={`https://www.google.com/maps?q=${encodeURIComponent(office.mapQuery)}&output=embed`}
          className="h-full min-h-[420px] w-full grayscale-[0.6]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
