"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, type FormEvent } from "react";
import { digitalSolutions } from "@/data/samprecData";
import { Field, SuccessPanel, darkInputCls, isEmail, isPhone } from "@/components/forms/fields";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useSubmit } from "@/lib/useSubmit";
import { cn } from "@/lib/utils";

function Prefill({ onPick }: { onPick: (s: string) => void }) {
  const p = useSearchParams().get("solution");
  useEffect(() => {
    if (p) onPick(p);
  }, [p, onPick]);
  return null;
}

export function DigitalBrief({ preselect }: { preselect?: string }) {
  const [sel, setSel] = useState<string[]>(preselect ? [preselect] : []);
  const [error, setError] = useState<string | null>(null);
  const { status, submit, reset } = useSubmit();
  const label = (s: string) => digitalSolutions.find((d) => d.slug === s)?.title ?? s;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (!sel.length) return setError("Select at least one solution.");
    if (!d.name?.trim() || !isEmail(d.email ?? "") || !isPhone(d.phone ?? "")) return setError("Enter your name, a valid email and phone number.");
    setError(null);
    await submit({
      payload: { type: "digitals-brief", solutions: sel.map(label).join(", "), ...d },
      subject: `Samprec Digitals brief — ${d.organisation || d.name}`,
      lines: [`Solutions: ${sel.map(label).join(", ")}`, `Organisation: ${d.organisation || "-"} (${d.sector})`, `Users: ${d.users}`, `Timeline: ${d.timeline}`, `Want a live demo: ${d.demo ? "Yes" : "No"}`, "", `Name: ${d.name}`, `Email: ${d.email}`, `Phone: ${d.phone}`, "", d.description || ""],
    });
  };

  if (status === "sent" || status === "mailto")
    return (
      <SuccessPanel dark sent={status === "sent"} sentText="A Samprec Digitals lead will contact you within one working day to arrange a discovery call." mailtoText="Your brief is ready in your email app — press send.">
        <MagneticButton onClick={reset} variant="ghost-light" icon={false}>Send another brief</MagneticButton>
      </SuccessPanel>
    );

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <Suspense fallback={null}>
        <Prefill onPick={(s) => setSel((cur) => (cur.includes(s) ? cur : [...cur, s]))} />
      </Suspense>
      <div className="sm:col-span-2">
        <p className="label-mono text-white/50">What do you need? *</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {digitalSolutions.map((s) => {
            const on = sel.includes(s.slug);
            return (
              <button key={s.slug} type="button" aria-pressed={on} onClick={() => setSel(on ? sel.filter((x) => x !== s.slug) : [...sel, s.slug])} className={cn("rounded-full px-3.5 py-2 text-sm ring-1", on ? "bg-copper-500 font-semibold text-ink ring-copper-500" : "text-white/80 ring-white/15 hover:ring-white/40")}>
                {s.title}
              </button>
            );
          })}
        </div>
      </div>
      <Field dark label="Full name" required><input name="name" autoComplete="name" className={darkInputCls} /></Field>
      <Field dark label="Organisation"><input name="organisation" autoComplete="organization" className={darkInputCls} /></Field>
      <Field dark label="Email" required><input name="email" type="email" autoComplete="email" className={darkInputCls} /></Field>
      <Field dark label="Phone" required><input name="phone" type="tel" autoComplete="tel" className={darkInputCls} /></Field>
      <Field dark label="Sector">
        <select name="sector" className={darkInputCls}><option>Public sector / MDA</option><option>Contractor</option><option>Consultancy</option><option>Developer / funder</option><option>Other</option></select>
      </Field>
      <Field dark label="Expected users">
        <select name="users" className={darkInputCls}><option>Under 20</option><option>20 – 100</option><option>100 – 500</option><option>500+</option></select>
      </Field>
      <Field dark label="Timeline" className="sm:col-span-2">
        <select name="timeline" className={darkInputCls}><option>As soon as possible</option><option>Within 3 months</option><option>3 – 6 months</option><option>Exploring options</option></select>
      </Field>
      <Field dark label="Describe the problem" className="sm:col-span-2"><textarea name="description" rows={4} placeholder="Current process, systems in use, what success looks like…" className={darkInputCls} /></Field>
      <label className="flex items-center gap-3 text-sm text-white/70 sm:col-span-2">
        <input type="checkbox" name="demo" className="size-4 accent-[#E29432]" /> I&apos;d like a live demo
      </label>
      {error && <p role="alert" className="text-sm text-red-400 sm:col-span-2">{error}</p>}
      <div className="sm:col-span-2"><MagneticButton type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send brief"}</MagneticButton></div>
    </form>
  );
}
