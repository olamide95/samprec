"use client";

import { Check, Printer, Share2 } from "lucide-react";
import { useState } from "react";

export function CourseActions({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title, url });
      else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      /* user cancelled */
    }
  };
  return (
    <div className="flex gap-2 print:hidden">
      <button type="button" onClick={() => window.print()} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium ring-1 ring-hairline hover:ring-slate-400">
        <Printer className="size-4" /> Print outline
      </button>
      <button type="button" onClick={share} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium ring-1 ring-hairline hover:ring-slate-400">
        {copied ? <Check className="size-4 text-copper-600" /> : <Share2 className="size-4" />} {copied ? "Link copied" : "Share"}
      </button>
    </div>
  );
}
