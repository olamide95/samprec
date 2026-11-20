"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, CheckCircle2, MessageCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { company, lifecycle, services } from "@/data/samprecData";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { buildMailto, cn, submitForm } from "@/lib/utils";

/* -------------------------------------------------------------- Options -- */

const sectors = ["Healthcare", "Hospitality", "Residential", "Commercial / Office", "Education", "Public Infrastructure", "Industrial", "Other"] as const;
const clientKinds = ["Private developer", "Government / MDA", "Agency", "Financial institution", "Private builder", "Donor agency"] as const;
const scales = [
  { id: "s", label: "Small", hint: "Single building, under 2,000 m²", weight: 1 },
  { id: "m", label: "Medium", hint: "2,000 – 10,000 m² or a few buildings", weight: 2 },
  { id: "l", label: "Large", hint: "10,000 – 30,000 m² or multi-storey complex", weight: 3 },
  { id: "xl", label: "Major / Programme", hint: "Above 30,000 m², estate or infrastructure", weight: 4 },
] as const;
const timelines = ["Immediately", "Within 3 months", "3 – 6 months", "6 months +", "Exploring options"] as const;
const extraServices = [
  { id: "digitals", short: "Samprec Digitals (ERP, BIM, e-procurement)" },
  { id: "academy", short: "Training via Samprec Academy" },
] as const;

type Scale = (typeof scales)[number]["id"];

interface FormState {
  sector: string;
  clientKind: string;
  services: string[];
  stage: number;
  scale: Scale | "";
  location: string;
  timeline: string;
  description: string;
  name: string;
  organisation: string;
  email: string;
  phone: string;
}

const initial: FormState = {
  sector: "",
  clientKind: "",
  services: [],
  stage: 0,
  scale: "",
  location: "Abuja",
  timeline: "",
  description: "",
  name: "",
  organisation: "",
  email: "",
  phone: "",
};

const steps = ["Project", "Services", "Scope", "Contact", "Review"] as const;

/* ------------------------------------------------------------ Estimator -- */

function estimate(f: FormState) {
  const scaleW = scales.find((s) => s.id === f.scale)?.weight ?? 0;
  const consultancy = f.services.filter((s) => services.some((x) => x.id === s));
  const stagesCovered = Array.from(new Set(consultancy.flatMap((id) => services.find((s) => s.id === id)?.lifecycleStages ?? []).filter((i) => i >= f.stage))).sort();
  const complexSector = ["Healthcare", "Public Infrastructure", "Industrial", "Hospitality"].includes(f.sector) ? 1 : 0;
  const score = scaleW * 2 + consultancy.length + complexSector + (stagesCovered.length >= 4 ? 1 : 0);
  const band = score >= 10 ? "High" : score >= 6 ? "Moderate" : score > 0 ? "Standard" : "—";
  const team =
    band === "High"
      ? "Dedicated project lead with discipline specialists and site presence"
      : band === "Moderate"
        ? "Project lead supported by cost and M&E specialists"
        : band === "Standard"
          ? "Consultant-led engagement with specialist input as required"
          : "Complete the scope to see a recommendation";
  return { band, score, team, stagesCovered };
}

/* ---------------------------------------------------------- Component --- */

const input = "w-full rounded-xl bg-white px-4 py-3 text-sm ring-1 ring-hairline focus:outline-none focus:ring-2 focus:ring-copper-500";

function Choice({ active, onClick, children, sub }: { active: boolean; onClick: () => void; children: React.ReactNode; sub?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "relative flex w-full items-start gap-3 rounded-2xl p-4 text-left ring-1 transition-all",
        active ? "bg-slate-ink text-white ring-slate-ink" : "bg-white ring-hairline hover:ring-slate-400",
      )}
    >
      <span className={cn("mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border", active ? "border-copper-300 bg-copper-500" : "border-slate-300")}>
        {active && <Check className="size-3 text-ink" />}
      </span>
      <span>
        <span className="block text-sm font-semibold">{children}</span>
        {sub && <span className={cn("mt-0.5 block text-xs", active ? "text-white/60" : "text-slate-500")}>{sub}</span>}
      </span>
    </button>
  );
}

function ServicePrefill({ onService }: { onService: (id: string) => void }) {
  const params = useSearchParams();
  const svc = params.get("service");
  useEffect(() => {
    if (svc) onService(svc);
  }, [svc, onService]);
  return null;
}

export function InquiryWizard() {
  const [step, setStep] = useState(0);
  const [f, setF] = useState<FormState>(initial);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailto">("idle");

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setF((s) => ({ ...s, [k]: v }));
  const toggleService = (id: string) => set("services", f.services.includes(id) ? f.services.filter((s) => s !== id) : [...f.services, id]);

  const est = useMemo(() => estimate(f), [f]);
  const serviceLabel = (id: string) => services.find((s) => s.id === id)?.title ?? extraServices.find((s) => s.id === id)?.short ?? id;

  const validate = (i: number): string | null => {
    if (i === 0 && (!f.sector || !f.clientKind)) return "Select a sector and client type.";
    if (i === 1 && f.services.length === 0) return "Select at least one service.";
    if (i === 2 && (!f.scale || !f.timeline)) return "Select the project scale and timeline.";
    if (i === 3) {
      if (!f.name.trim()) return "Enter your name.";
      if (!/^\S+@\S+\.\S+$/.test(f.email)) return "Enter a valid email address.";
      if (f.phone.replace(/\D/g, "").length < 7) return "Enter a valid phone number.";
    }
    return null;
  };

  const next = () => {
    const e = validate(step);
    setError(e);
    if (!e) setStep((s) => Math.min(steps.length - 1, s + 1));
  };
  const back = () => {
    setError(null);
    setStep((s) => Math.max(0, s - 1));
  };

  const summary = () =>
    [
      "PROJECT BRIEF — samprecconsultants.com",
      "",
      `Sector: ${f.sector}`,
      `Client type: ${f.clientKind}`,
      `Services: ${f.services.map(serviceLabel).join("; ")}`,
      `Current stage: ${lifecycle[f.stage].index} ${lifecycle[f.stage].title}`,
      `Scale: ${scales.find((s) => s.id === f.scale)?.label ?? "-"}`,
      `Location: ${f.location}`,
      `Timeline: ${f.timeline}`,
      `Indicative complexity: ${est.band}`,
      "",
      "Description:",
      f.description || "-",
      "",
      `Name: ${f.name}`,
      `Organisation: ${f.organisation || "-"}`,
      `Email: ${f.email}`,
      `Phone: ${f.phone}`,
    ].join("\n");

  const submit = async () => {
    for (let i = 0; i < 4; i++) {
      const e = validate(i);
      if (e) {
        setStep(i);
        setError(e);
        return;
      }
    }
    setStatus("sending");
    const delivered = await submitForm({ type: "proposal-request", ...f, stage: lifecycle[f.stage].title, complexity: est.band });
    if (delivered) {
      setStatus("sent");
      return;
    }
    window.location.href = buildMailto(company.primaryEmail, `Proposal request — ${f.sector} (${f.organisation || f.name})`, summary());
    setStatus("mailto");
  };

  if (status === "sent" || status === "mailto") {
    return (
      <div className="rounded-[28px] border border-hairline bg-white p-10 text-center md:p-16">
        <CheckCircle2 className="mx-auto size-14 text-copper-600" />
        <h3 className="font-display mt-6 text-3xl font-semibold tracking-tight">{status === "sent" ? "Brief received." : "Your brief is ready to send."}</h3>
        <p className="mx-auto mt-4 max-w-md text-slate-600">
          {status === "sent"
            ? "A Samprec consultant will review your brief and respond within one working day (Mon – Sat)."
            : "We've opened your email app with the full brief. Press send — or reach us on WhatsApp for a faster response."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <MagneticButton href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(summary())}`} external variant="ink">WhatsApp the brief</MagneticButton>
          <MagneticButton onClick={() => { setF(initial); setStep(0); setStatus("idle"); }} variant="outline" icon={false}>Start a new brief</MagneticButton>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <Suspense fallback={null}>
        <ServicePrefill onService={(id) => setF((s) => (s.services.includes(id) ? s : { ...s, services: [...s.services, id] }))} />
      </Suspense>

      <div className="rounded-[28px] border border-hairline bg-white lg:col-span-8">
        <ol className="flex border-b border-hairline" aria-label="Progress">
          {steps.map((label, i) => (
            <li key={label} className="flex-1">
              <button
                type="button"
                onClick={() => i < step && setStep(i)}
                disabled={i > step}
                aria-current={i === step ? "step" : undefined}
                className={cn("relative w-full px-2 py-4 text-left md:px-5", i <= step ? "text-slate-ink" : "text-slate-300")}
              >
                <span className="font-mono text-xs">{String(i + 1).padStart(2, "0")}</span>
                <span className="ml-2 hidden text-sm font-semibold sm:inline">{label}</span>
                <span className={cn("absolute inset-x-0 bottom-0 h-0.5 transition-colors", i <= step ? "bg-copper-500" : "bg-transparent")} />
              </button>
            </li>
          ))}
        </ol>

        <div className="min-h-[440px] p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
              {step === 0 && (
                <div className="space-y-8">
                  <fieldset>
                    <legend className="font-display text-2xl font-semibold tracking-tight">What are you building?</legend>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {sectors.map((s) => (
                        <Choice key={s} active={f.sector === s} onClick={() => set("sector", s)}>{s}</Choice>
                      ))}
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend className="label-mono text-slate-500">You are a…</legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {clientKinds.map((c) => (
                        <button key={c} type="button" onClick={() => set("clientKind", c)} aria-pressed={f.clientKind === c} className={cn("rounded-full px-4 py-2 text-sm ring-1", f.clientKind === c ? "bg-copper-500 font-semibold text-ink ring-copper-500" : "bg-white ring-hairline hover:ring-slate-400")}>
                          {c}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </div>
              )}

              {step === 1 && (
                <fieldset>
                  <legend className="font-display text-2xl font-semibold tracking-tight">Which services do you need?</legend>
                  <p className="mt-2 text-sm text-slate-500">Select all that apply.</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {services.map((s) => (
                      <Choice key={s.id} active={f.services.includes(s.id)} onClick={() => toggleService(s.id)} sub={s.deliverables.slice(0, 2).join(" · ")}>
                        {s.title}
                      </Choice>
                    ))}
                    {extraServices.map((s) => (
                      <Choice key={s.id} active={f.services.includes(s.id)} onClick={() => toggleService(s.id)}>{s.short}</Choice>
                    ))}
                  </div>
                </fieldset>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <fieldset>
                    <legend className="font-display text-2xl font-semibold tracking-tight">Where is the project today?</legend>
                    <div className="mt-5 grid grid-cols-3 gap-2 md:grid-cols-6">
                      {lifecycle.map((st, i) => (
                        <button key={st.index} type="button" onClick={() => set("stage", i)} aria-pressed={f.stage === i} className={cn("rounded-xl p-3 text-left ring-1 transition-colors", f.stage === i ? "bg-slate-ink text-white ring-slate-ink" : "bg-white ring-hairline hover:ring-slate-400")}>
                          <span className={cn("block font-mono text-xs", f.stage === i ? "text-copper-300" : "text-copper-700")}>{st.index}</span>
                          <span className="mt-1 block text-xs font-semibold leading-tight">{st.title}</span>
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend className="label-mono text-slate-500">Project scale</legend>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {scales.map((s) => (
                        <Choice key={s.id} active={f.scale === s.id} onClick={() => set("scale", s.id)} sub={s.hint}>{s.label}</Choice>
                      ))}
                    </div>
                  </fieldset>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label>
                      <span className="label-mono text-slate-500">Location</span>
                      <input value={f.location} onChange={(e) => set("location", e.target.value)} className={`${input} mt-2`} />
                    </label>
                    <label>
                      <span className="label-mono text-slate-500">Timeline</span>
                      <select value={f.timeline} onChange={(e) => set("timeline", e.target.value)} className={`${input} mt-2`}>
                        <option value="">Select…</option>
                        {timelines.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </label>
                    <label className="sm:col-span-2">
                      <span className="label-mono text-slate-500">Brief description</span>
                      <textarea value={f.description} onChange={(e) => set("description", e.target.value)} rows={4} placeholder="Building type, floors, key constraints, funding position…" className={`${input} mt-2`} />
                    </label>
                  </div>
                </div>
              )}

              {step === 3 && (
                <fieldset>
                  <legend className="font-display text-2xl font-semibold tracking-tight">Who should we contact?</legend>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <label className="sm:col-span-2">
                      <span className="label-mono text-slate-500">Full name *</span>
                      <input value={f.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" className={`${input} mt-2`} />
                    </label>
                    <label className="sm:col-span-2">
                      <span className="label-mono text-slate-500">Organisation</span>
                      <input value={f.organisation} onChange={(e) => set("organisation", e.target.value)} autoComplete="organization" className={`${input} mt-2`} />
                    </label>
                    <label>
                      <span className="label-mono text-slate-500">Email *</span>
                      <input type="email" value={f.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" className={`${input} mt-2`} />
                    </label>
                    <label>
                      <span className="label-mono text-slate-500">Phone *</span>
                      <input type="tel" value={f.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" className={`${input} mt-2`} />
                    </label>
                  </div>
                </fieldset>
              )}

              {step === 4 && (
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight">Review your brief</h3>
                  <dl className="mt-6 divide-y divide-hairline border-y border-hairline">
                    {[
                      ["Sector", f.sector],
                      ["Client", f.clientKind],
                      ["Services", f.services.map(serviceLabel).join(", ")],
                      ["Stage", `${lifecycle[f.stage].index} — ${lifecycle[f.stage].title}`],
                      ["Scale", scales.find((s) => s.id === f.scale)?.label ?? ""],
                      ["Location / timeline", `${f.location} · ${f.timeline}`],
                      ["Contact", `${f.name}${f.organisation ? `, ${f.organisation}` : ""} · ${f.email} · ${f.phone}`],
                    ].map(([k, v]) => (
                      <div key={k} className="grid gap-1 py-3 sm:grid-cols-3">
                        <dt className="label-mono text-slate-400">{k}</dt>
                        <dd className="text-sm sm:col-span-2">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  {f.description && <p className="mt-4 rounded-xl bg-alabaster p-4 text-sm text-slate-600">{f.description}</p>}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {error && <p role="alert" className="mt-6 text-sm font-medium text-red-600">{error}</p>}
        </div>

        <div className="flex items-center justify-between border-t border-hairline p-6 md:px-10">
          <button type="button" onClick={back} disabled={step === 0} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 disabled:opacity-30">
            <ArrowLeft className="size-4" /> Back
          </button>
          {step < steps.length - 1 ? (
            <MagneticButton onClick={next} variant="ink">Continue</MagneticButton>
          ) : (
            <MagneticButton onClick={submit} disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Submit brief"}</MagneticButton>
          )}
        </div>
      </div>

      <aside className="lg:col-span-4">
        <div className="rounded-[28px] bg-ink p-8 text-white lg:sticky lg:top-32">
          <p className="label-mono text-copper-300">Live scope estimator</p>
          <p className="mt-6 text-sm text-white/50">Indicative complexity</p>
          <p className="font-display mt-1 text-5xl font-semibold tracking-tight">{est.band}</p>
          <div className="mt-4 flex gap-1" aria-hidden>
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className={cn("h-1.5 flex-1 rounded-full", i < Math.min(12, est.score) ? "bg-copper-500" : "bg-white/10")} />
            ))}
          </div>

          <p className="label-mono mt-8 text-white/40">Lifecycle coverage</p>
          <div className="mt-3 grid grid-cols-6 gap-1">
            {lifecycle.map((st, i) => (
              <div key={st.index} title={st.title} className={cn("rounded py-2 text-center font-mono text-[10px]", est.stagesCovered.includes(i) ? "copper-gradient text-ink" : i < f.stage ? "bg-white/5 text-white/20" : "bg-white/10 text-white/50")}>
                {st.index}
              </div>
            ))}
          </div>

          <p className="label-mono mt-8 text-white/40">Recommended team</p>
          <p className="mt-2 text-sm leading-relaxed text-white/80">{est.team}</p>

          <p className="mt-8 border-t border-white/10 pt-6 text-xs leading-relaxed text-white/45">
            The estimator sizes your engagement from the scope you describe. Fees are quoted after a consultant reviews your brief.
          </p>
          <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-copper-300 hover:underline">
            <MessageCircle className="size-4" /> Prefer to chat? WhatsApp us
          </a>
        </div>
      </aside>
    </div>
  );
}
