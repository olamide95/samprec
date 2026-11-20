"use client";

import { ArrowRight, Check } from "lucide-react";
import { useState, type FormEvent } from "react";
import { submitForm } from "@/lib/utils";
import { company } from "@/data/samprecData";
import { cn } from "@/lib/utils";

export function Newsletter({ dark }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setState("error");
    setState("sending");
    const ok = await submitForm({ type: "newsletter", name: "Newsletter subscriber", email });
    if (!ok) window.location.href = `mailto:${company.primaryEmail}?subject=${encodeURIComponent("Subscribe to Samprec Insights")}&body=${encodeURIComponent(`Please subscribe ${email} to Samprec Insights.`)}`;
    setState("done");
  };

  if (state === "done")
    return <p className={cn("flex items-center gap-2 text-sm", dark ? "text-copper-300" : "text-copper-700")}><Check className="size-4" /> You&apos;re subscribed to Samprec Insights.</p>;

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div className={cn("flex items-center rounded-full p-1 ring-1", dark ? "bg-white/5 ring-white/15" : "bg-white ring-hairline")}>
        <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setState("idle"); }} placeholder="Your email" aria-label="Email address" className={cn("min-w-0 flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none", dark ? "text-white placeholder:text-white/35" : "")} />
        <button type="submit" disabled={state === "sending"} aria-label="Subscribe" className="copper-gradient flex size-9 items-center justify-center rounded-full text-ink"><ArrowRight className="size-4" /></button>
      </div>
      {state === "error" && <p className="mt-2 text-xs text-red-500">Enter a valid email.</p>}
    </form>
  );
}
