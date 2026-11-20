"use client";

import { useState, type FormEvent } from "react";
import { courses } from "@/data/samprecData";
import { Field, SuccessPanel, inputCls, isEmail, isPhone } from "@/components/forms/fields";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useSubmit } from "@/lib/useSubmit";
import { cn } from "@/lib/utils";

function CourseMulti({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {courses.map((c) => {
        const on = value.includes(c.slug);
        return (
          <button key={c.slug} type="button" aria-pressed={on} onClick={() => onChange(on ? value.filter((v) => v !== c.slug) : [...value, c.slug])} className={cn("rounded-full px-3 py-1.5 text-sm ring-1", on ? "bg-slate-ink text-white ring-slate-ink" : "bg-white ring-hairline hover:ring-slate-400")}>
            {c.title}
          </button>
        );
      })}
    </div>
  );
}

const titles = (slugs: string[]) => slugs.map((s) => courses.find((c) => c.slug === s)?.title ?? s).join(", ");

export function WaitlistForm() {
  const [sel, setSel] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { status, submit, reset } = useSubmit();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (!sel.length) return setError("Select at least one course.");
    if (!d.name?.trim() || !isEmail(d.email ?? "") || !isPhone(d.phone ?? "")) return setError("Enter your name, a valid email and phone number.");
    setError(null);
    await submit({
      payload: { type: "academy-waitlist", courses: titles(sel), ...d },
      subject: "Academy — register interest",
      lines: [`Courses: ${titles(sel)}`, `Name: ${d.name}`, `Email: ${d.email}`, `Phone: ${d.phone}`, `Preferred mode: ${d.mode}`],
    });
  };

  if (status === "sent" || status === "mailto")
    return (
      <SuccessPanel sent={status === "sent"} sentText="You're on the list. We'll contact you as soon as dates are published." mailtoText="Your email is ready — press send to join the waitlist.">
        <MagneticButton onClick={reset} variant="outline" icon={false}>Add another</MagneticButton>
      </SuccessPanel>
    );

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <p className="label-mono text-slate-500">Courses of interest *</p>
        <div className="mt-3"><CourseMulti value={sel} onChange={setSel} /></div>
      </div>
      <Field label="Full name" required><input name="name" autoComplete="name" className={inputCls} /></Field>
      <Field label="Email" required><input name="email" type="email" autoComplete="email" className={inputCls} /></Field>
      <Field label="Phone" required><input name="phone" type="tel" autoComplete="tel" className={inputCls} /></Field>
      <Field label="Preferred mode">
        <select name="mode" className={inputCls}><option>Classroom (Jabi)</option><option>Virtual</option><option>Either</option></select>
      </Field>
      {error && <p role="alert" className="text-sm text-red-600 sm:col-span-2">{error}</p>}
      <div className="sm:col-span-2"><MagneticButton type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Notify me of dates"}</MagneticButton></div>
    </form>
  );
}

export function CorporateForm() {
  const [sel, setSel] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { status, submit, reset } = useSubmit();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (!d.organisation?.trim() || !d.name?.trim() || !isEmail(d.email ?? "") || !isPhone(d.phone ?? "")) return setError("Organisation, contact name, valid email and phone are required.");
    setError(null);
    await submit({
      payload: { type: "academy-corporate", courses: titles(sel), ...d },
      subject: `Corporate training request — ${d.organisation}`,
      lines: [`Organisation: ${d.organisation}`, `Contact: ${d.name} (${d.role || "-"})`, `Email: ${d.email}`, `Phone: ${d.phone}`, `Team size: ${d.team}`, `Format: ${d.format}`, `Timeframe: ${d.timeframe}`, `Courses: ${titles(sel) || "To be advised"}`, "", d.notes || ""],
    });
  };

  if (status === "sent" || status === "mailto")
    return (
      <SuccessPanel sent={status === "sent"} sentText="An Academy programme lead will contact you to scope a training needs analysis." mailtoText="Your request is ready in your email app — press send.">
        <MagneticButton onClick={reset} variant="outline" icon={false}>New request</MagneticButton>
      </SuccessPanel>
    );

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <Field label="Organisation" required className="sm:col-span-2"><input name="organisation" autoComplete="organization" className={inputCls} /></Field>
      <Field label="Contact name" required><input name="name" autoComplete="name" className={inputCls} /></Field>
      <Field label="Role"><input name="role" autoComplete="organization-title" className={inputCls} /></Field>
      <Field label="Email" required><input name="email" type="email" autoComplete="email" className={inputCls} /></Field>
      <Field label="Phone" required><input name="phone" type="tel" autoComplete="tel" className={inputCls} /></Field>
      <Field label="Team size">
        <select name="team" className={inputCls}><option>5 – 10</option><option>11 – 25</option><option>26 – 50</option><option>50+</option></select>
      </Field>
      <Field label="Format">
        <select name="format" className={inputCls}><option>At our premises</option><option>At Samprec Academy, Jabi</option><option>Virtual</option><option>Blended</option></select>
      </Field>
      <Field label="Timeframe" className="sm:col-span-2">
        <select name="timeframe" className={inputCls}><option>Within a month</option><option>1 – 3 months</option><option>This year</option><option>Planning ahead</option></select>
      </Field>
      <div className="sm:col-span-2">
        <p className="label-mono text-slate-500">Programmes of interest</p>
        <div className="mt-3"><CourseMulti value={sel} onChange={setSel} /></div>
      </div>
      <Field label="Training objectives" className="sm:col-span-2"><textarea name="notes" rows={4} placeholder="Skills gaps, projects, certification targets…" className={inputCls} /></Field>
      {error && <p role="alert" className="text-sm text-red-600 sm:col-span-2">{error}</p>}
      <div className="sm:col-span-2"><MagneticButton type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Request a proposal"}</MagneticButton></div>
    </form>
  );
}
