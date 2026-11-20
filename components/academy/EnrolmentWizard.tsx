"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CreditCard, Lock } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { cohorts, company, courses, formatNaira, getCourse, offices } from "@/data/samprecData";
import { Field, SuccessPanel, inputCls, isEmail, isPhone } from "@/components/forms/fields";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useSubmit } from "@/lib/useSubmit";
import { payWithPaystack, paystackEnabled } from "@/lib/paystack";
import { cn } from "@/lib/utils";

const steps = ["Programme", "Participant", "Confirm"] as const;
const modes = ["Classroom (Jabi)", "Virtual", "Blended", "In-house for my organisation"];

function nextMonths(n: number) {
  const out: string[] = [];
  const d = new Date();
  for (let i = 1; i <= n; i++) {
    const m = new Date(d.getFullYear(), d.getMonth() + i, 1);
    out.push(m.toLocaleDateString("en-GB", { month: "long", year: "numeric" }));
  }
  return out;
}

export function EnrolmentWizard() {
  const params = useSearchParams();
  const initialSlug = getCourse(params.get("course") ?? "")?.slug ?? courses[0].slug;

  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);
  const [paidRef, setPaidRef] = useState<string | null>(null);
  const { status, submit } = useSubmit();
  const [f, setF] = useState({
    course: initialSlug,
    cohort: "",
    month: "",
    mode: modes[0],
    seats: 1,
    name: "",
    email: "",
    phone: "",
    organisation: "",
    jobTitle: "",
    sponsor: "Self-sponsored",
    notes: "",
  });
  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => setF((s) => ({ ...s, [k]: v }));

  const course = getCourse(f.course) ?? courses[0];
  const courseCohorts = useMemo(() => cohorts.filter((c) => c.courseSlug === course.slug && c.status !== "Full"), [course.slug]);
  const months = useMemo(() => nextMonths(6), []);
  const canPay = paystackEnabled && Boolean(course.feeNaira);
  const total = (course.feeNaira ?? 0) * f.seats;
  const cohortLabel = f.cohort ? courseCohorts.find((c) => c.id === f.cohort)?.startDate ?? f.cohort : f.month || "Next available intake";

  const validate = (i: number) => {
    if (i === 0 && courseCohorts.length > 0 && !f.cohort) return "Choose a cohort.";
    if (i === 1) {
      if (!f.name.trim()) return "Enter the participant's full name.";
      if (!isEmail(f.email)) return "Enter a valid email address.";
      if (!isPhone(f.phone)) return "Enter a valid phone number.";
      if (f.sponsor === "Employer-sponsored" && !f.organisation.trim()) return "Enter the sponsoring organisation.";
    }
    return null;
  };
  const go = (dir: 1 | -1) => {
    if (dir === 1) {
      const e = validate(step);
      setError(e);
      if (e) return;
    } else setError(null);
    setStep((s) => Math.min(2, Math.max(0, s + dir)));
  };

  const enrolment = { ...f, course: `${course.code} — ${course.title}`, intake: cohortLabel };
  const lines = [
    `Programme: ${course.code} — ${course.title}`,
    `Intake: ${cohortLabel}`,
    `Mode: ${f.mode}`,
    `Seats: ${f.seats}`,
    "",
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    `Phone: ${f.phone}`,
    `Job title: ${f.jobTitle || "-"}`,
    `Sponsor: ${f.sponsor}${f.organisation ? ` (${f.organisation})` : ""}`,
    "",
    f.notes,
  ];

  const request = () => submit({ payload: { type: "academy-enrolment", ...enrolment }, subject: `Academy enrolment — ${course.title}`, lines });

  const pay = async () => {
    setError(null);
    setPaying(true);
    try {
      const ref = await payWithPaystack({ email: f.email, amountNaira: total, metadata: { course: course.slug, name: f.name, phone: f.phone, seats: f.seats } });
      if (!ref) {
        setPaying(false);
        return;
      }
      const res = await fetch("/api/paystack/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ reference: ref, courseSlug: course.slug, enrolment }) });
      const data = (await res.json()) as { verified?: boolean };
      if (data.verified) setPaidRef(ref);
      else setError(`We couldn't verify payment reference ${ref}. Please contact the Academy with this reference.`);
    } catch {
      setError("Payment could not start. Please try again or submit an enrolment request instead.");
    } finally {
      setPaying(false);
    }
  };

  const academy = offices.find((o) => o.id === "jabi");

  if (paidRef || status === "sent" || status === "mailto") {
    return (
      <div className="rounded-[28px] border border-hairline bg-white p-8 md:p-12">
        <SuccessPanel
          sent={Boolean(paidRef) || status === "sent"}
          title={paidRef ? "Payment confirmed — you're enrolled." : undefined}
          sentText={paidRef ? `Reference ${paidRef}. A confirmation with joining instructions will follow by email.` : "The Academy will confirm your seat, intake date and payment details by email and phone."}
          mailtoText="We've opened your email app with your enrolment details. Press send to complete your request."
        >
          <MagneticButton href={`/academy/courses/${course.slug}`} variant="ink">Back to course</MagneticButton>
          <MagneticButton href="/academy/courses" variant="outline">Browse more courses</MagneticButton>
        </SuccessPanel>
        {academy && <p className="text-center font-mono text-xs text-slate-500">Academy enquiries: {academy.phones.join(" · ")}</p>}
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="overflow-hidden rounded-[28px] border border-hairline bg-white lg:col-span-8">
        <ol className="flex border-b border-hairline">
          {steps.map((s, i) => (
            <li key={s} className="flex-1">
              <button type="button" disabled={i > step} onClick={() => i < step && setStep(i)} className={cn("relative w-full px-5 py-4 text-left text-sm", i <= step ? "text-slate-ink" : "text-slate-300")}>
                <span className="font-mono text-xs">{String(i + 1).padStart(2, "0")}</span> <span className="ml-1 font-semibold">{s}</span>
                <span className={cn("absolute inset-x-0 bottom-0 h-0.5", i <= step ? "bg-copper-500" : "")} />
              </button>
            </li>
          ))}
        </ol>

        <div className="min-h-[420px] p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.28 }}>
              {step === 0 && (
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Programme" className="sm:col-span-2">
                    <select value={f.course} onChange={(e) => setF((s) => ({ ...s, course: e.target.value, cohort: "" }))} className={inputCls}>
                      {courses.map((c) => (
                        <option key={c.slug} value={c.slug}>{c.code} — {c.title}</option>
                      ))}
                    </select>
                  </Field>
                  {courseCohorts.length > 0 ? (
                    <fieldset className="sm:col-span-2">
                      <legend className="label-mono text-slate-500">Cohort *</legend>
                      <div className="mt-2 grid gap-2 sm:grid-cols-2">
                        {courseCohorts.map((c) => (
                          <button key={c.id} type="button" onClick={() => set("cohort", c.id)} aria-pressed={f.cohort === c.id} className={cn("rounded-2xl p-4 text-left ring-1", f.cohort === c.id ? "bg-slate-ink text-white ring-slate-ink" : "ring-hairline hover:ring-slate-400")}>
                            <span className="block font-semibold">{new Date(c.startDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                            <span className="mt-1 block text-xs opacity-70">{c.mode} · {c.status}</span>
                          </button>
                        ))}
                      </div>
                    </fieldset>
                  ) : (
                    <>
                      <div className="rounded-2xl bg-copper-50 p-4 text-sm text-copper-700 sm:col-span-2">Dates for the next intake are being finalised. Choose a preferred month and the Academy will confirm the earliest cohort.</div>
                      <Field label="Preferred start">
                        <select value={f.month} onChange={(e) => set("month", e.target.value)} className={inputCls}>
                          <option value="">Next available intake</option>
                          {months.map((m) => (
                            <option key={m}>{m}</option>
                          ))}
                        </select>
                      </Field>
                    </>
                  )}
                  <Field label="Delivery mode">
                    <select value={f.mode} onChange={(e) => set("mode", e.target.value)} className={inputCls}>
                      {modes.map((m) => (
                        <option key={m}>{m}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Number of seats">
                    <input type="number" min={1} max={50} value={f.seats} onChange={(e) => set("seats", Math.max(1, Math.min(50, Number(e.target.value) || 1)))} className={inputCls} />
                  </Field>
                </div>
              )}

              {step === 1 && (
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name" required className="sm:col-span-2"><input value={f.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" className={inputCls} /></Field>
                  <Field label="Email" required><input type="email" value={f.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" className={inputCls} /></Field>
                  <Field label="Phone" required><input type="tel" value={f.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" className={inputCls} /></Field>
                  <Field label="Job title"><input value={f.jobTitle} onChange={(e) => set("jobTitle", e.target.value)} autoComplete="organization-title" className={inputCls} /></Field>
                  <Field label="Sponsorship">
                    <select value={f.sponsor} onChange={(e) => set("sponsor", e.target.value)} className={inputCls}>
                      <option>Self-sponsored</option>
                      <option>Employer-sponsored</option>
                    </select>
                  </Field>
                  <Field label="Organisation" required={f.sponsor === "Employer-sponsored"} className="sm:col-span-2"><input value={f.organisation} onChange={(e) => set("organisation", e.target.value)} autoComplete="organization" className={inputCls} /></Field>
                  <Field label="Notes" className="sm:col-span-2"><textarea rows={3} value={f.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Accessibility needs, invoicing details, questions…" className={inputCls} /></Field>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight">Confirm your enrolment</h3>
                  <dl className="mt-6 divide-y divide-hairline border-y border-hairline">
                    {[
                      ["Programme", `${course.code} — ${course.title}`],
                      ["Intake", cohortLabel],
                      ["Mode · seats", `${f.mode} · ${f.seats}`],
                      ["Participant", `${f.name} · ${f.email} · ${f.phone}`],
                      ["Sponsor", `${f.sponsor}${f.organisation ? ` — ${f.organisation}` : ""}`],
                    ].map(([k, v]) => (
                      <div key={k} className="grid gap-1 py-3 sm:grid-cols-3"><dt className="label-mono text-slate-400">{k}</dt><dd className="text-sm sm:col-span-2">{v}</dd></div>
                    ))}
                    {course.feeNaira && (
                      <div className="grid gap-1 py-3 sm:grid-cols-3"><dt className="label-mono text-slate-400">Total</dt><dd className="font-mono text-lg font-semibold sm:col-span-2">{formatNaira(total)}</dd></div>
                    )}
                  </dl>
                  {canPay ? (
                    <p className="mt-6 flex items-center gap-2 text-sm text-slate-500"><Lock className="size-4" /> Secure payment by card, bank transfer or USSD via Paystack.</p>
                  ) : (
                    <p className="mt-6 text-sm text-slate-500">No payment is taken now. The Academy will confirm your seat and send payment details.</p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          {error && <p role="alert" className="mt-6 text-sm font-medium text-red-600">{error}</p>}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-hairline p-6 md:px-10">
          <button type="button" onClick={() => go(-1)} disabled={step === 0} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 disabled:opacity-30"><ArrowLeft className="size-4" /> Back</button>
          {step < 2 ? (
            <MagneticButton onClick={() => go(1)} variant="ink">Continue</MagneticButton>
          ) : (
            <div className="flex flex-wrap justify-end gap-2">
              {canPay && (
                <MagneticButton onClick={pay} disabled={paying} icon={false}>
                  <span className="inline-flex items-center gap-2"><CreditCard className="size-4" /> {paying ? "Processing…" : `Pay ${formatNaira(total)}`}</span>
                </MagneticButton>
              )}
              <MagneticButton onClick={request} variant={canPay ? "outline" : "copper"} disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : canPay ? "Pay later — request invoice" : "Submit enrolment"}
              </MagneticButton>
            </div>
          )}
        </div>
      </div>

      <aside className="lg:col-span-4">
        <div className="rounded-[28px] bg-ink p-8 text-white lg:sticky lg:top-[200px]">
          <span className="rounded-lg bg-white/10 px-2.5 py-1.5 font-mono text-sm font-semibold text-copper-300">{course.code}</span>
          <p className="font-display mt-6 text-2xl font-semibold tracking-tight">{course.title}</p>
          <p className="mt-2 text-sm text-white/60">{course.summary}</p>
          <dl className="mt-6 space-y-2 border-t border-white/10 pt-6 text-sm">
            <div className="flex justify-between"><dt className="text-white/50">Level</dt><dd>{course.level}</dd></div>
            <div className="flex justify-between"><dt className="text-white/50">Track</dt><dd className="text-right">{course.category}</dd></div>
            {course.duration && <div className="flex justify-between"><dt className="text-white/50">Duration</dt><dd>{course.duration}</dd></div>}
            {course.feeNaira && <div className="flex justify-between"><dt className="text-white/50">Fee / seat</dt><dd className="font-mono">{formatNaira(course.feeNaira)}</dd></div>}
          </dl>
          <Link href={`/academy/courses/${course.slug}`} className="mt-6 inline-block text-sm font-semibold text-copper-300 hover:underline">View full outline →</Link>
          <p className="mt-8 border-t border-white/10 pt-6 text-xs text-white/40">Questions? {company.primaryEmail}{academy ? ` · ${academy.phones[0]}` : ""}</p>
        </div>
      </aside>
    </div>
  );
}
