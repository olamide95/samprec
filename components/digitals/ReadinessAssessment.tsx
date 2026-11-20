"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { getSolution, readinessAdvice, readinessDimensions, readinessQuestions } from "@/data/samprecData";
import { Field, SuccessPanel, isEmail } from "@/components/forms/fields";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useSubmit } from "@/lib/useSubmit";
import { cn } from "@/lib/utils";

const lightCls = "w-full rounded-xl bg-alabaster px-4 py-3 text-sm ring-1 ring-hairline focus:outline-none focus:ring-2 focus:ring-copper-500";

type Dim = (typeof readinessDimensions)[number];

function Radar({ scores }: { scores: Record<Dim, number> }) {
  const size = 260, c = size / 2, r = 95;
  const pt = (i: number, v: number) => {
    const a = (Math.PI * 2 * i) / readinessDimensions.length - Math.PI / 2;
    return [c + Math.cos(a) * r * v, c + Math.sin(a) * r * v];
  };
  const poly = readinessDimensions.map((d, i) => pt(i, scores[d] / 100).join(",")).join(" ");
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto w-full max-w-[300px]" role="img" aria-label="Digital maturity radar chart">
      {[0.25, 0.5, 0.75, 1].map((g) => (
        <polygon key={g} points={readinessDimensions.map((_, i) => pt(i, g).join(",")).join(" ")} fill="none" stroke="rgba(255,255,255,0.1)" />
      ))}
      {readinessDimensions.map((_, i) => {
        const [x, y] = pt(i, 1);
        return <line key={i} x1={c} y1={c} x2={x} y2={y} stroke="rgba(255,255,255,0.08)" />;
      })}
      <motion.polygon initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} style={{ transformOrigin: "center" }} points={poly} fill="rgba(226,148,50,0.3)" stroke="#F9AD4D" strokeWidth="2" />
      {readinessDimensions.map((d, i) => {
        const [x, y] = pt(i, 1.2);
        return <text key={d} x={x} y={y} fill="rgba(255,255,255,0.7)" fontSize="10" textAnchor="middle" dominantBaseline="middle" fontFamily="monospace">{d.toUpperCase()}</text>;
      })}
    </svg>
  );
}

export function ReadinessAssessment() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [i, setI] = useState(0);
  const done = Object.keys(answers).length === readinessQuestions.length && i >= readinessQuestions.length;
  const { status, submit, reset } = useSubmit();
  const [error, setError] = useState<string | null>(null);

  const scores = useMemo(() => {
    const out = {} as Record<Dim, number>;
    for (const d of readinessDimensions) {
      const qs = readinessQuestions.filter((q) => q.dimension === d);
      const sum = qs.reduce((s, q) => s + (answers[q.id] ?? 0), 0);
      out[d] = Math.round((sum / (qs.length * 3)) * 100);
    }
    return out;
  }, [answers]);
  const overall = Math.round(readinessDimensions.reduce((s, d) => s + scores[d], 0) / readinessDimensions.length);
  const level = overall >= 75 ? "Leading" : overall >= 50 ? "Developing" : overall >= 25 ? "Emerging" : "Starting out";
  const weakest = [...readinessDimensions].sort((a, b) => scores[a] - scores[b]).slice(0, 2);

  const answer = (qid: string, score: number) => {
    setAnswers((a) => ({ ...a, [qid]: score }));
    setTimeout(() => setI((x) => x + 1), 180);
  };
  const restart = () => { setAnswers({}); setI(0); reset(); };

  const send = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (!d.name?.trim() || !isEmail(d.email ?? "")) return setError("Enter your name and a valid email.");
    setError(null);
    const summary = readinessDimensions.map((dim) => `${dim}: ${scores[dim]}%`);
    await submit({
      payload: { type: "digital-readiness", overall, level, ...scores, ...d },
      subject: `Digital readiness results — ${d.organisation || d.name} (${overall}%)`,
      lines: [`Overall: ${overall}% (${level})`, ...summary, "", `Name: ${d.name}`, `Organisation: ${d.organisation || "-"}`, `Email: ${d.email}`, "", "Please review these results with me."],
    });
  };

  if (!done) {
    const q = readinessQuestions[Math.min(i, readinessQuestions.length - 1)];
    return (
      <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 text-white md:p-10">
        <div className="flex items-center justify-between">
          <p className="label-mono text-copper-300">{q.dimension} · Question {i + 1} / {readinessQuestions.length}</p>
          {i > 0 && <button type="button" onClick={() => setI((x) => x - 1)} className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white"><ArrowLeft className="size-4" /> Back</button>}
        </div>
        <div className="mt-4 h-1 rounded-full bg-white/10"><div className="h-full rounded-full bg-copper-500 transition-all" style={{ width: `${(i / readinessQuestions.length) * 100}%` }} /></div>
        <AnimatePresence mode="wait">
          <motion.div key={q.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
            <h3 className="font-display mt-10 text-2xl font-semibold tracking-tight md:text-3xl">{q.question}</h3>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {q.options.map((o) => (
                <button key={o.label} type="button" onClick={() => answer(q.id, o.score)} className={cn("rounded-2xl px-5 py-4 text-left ring-1 transition-all", answers[q.id] === o.score ? "bg-copper-500 font-semibold text-ink ring-copper-500" : "bg-white/5 ring-white/15 hover:ring-white/40")}>
                  {o.label}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8 text-white lg:col-span-7">
        <div className="flex items-start justify-between">
          <div>
            <p className="label-mono text-copper-300">Your digital maturity</p>
            <p className="font-display mt-3 text-6xl font-semibold">{overall}<span className="text-2xl text-white/50">%</span></p>
            <p className="mt-1 text-lg text-white/70">{level}</p>
          </div>
          <button type="button" onClick={restart} className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white"><RotateCcw className="size-4" /> Retake</button>
        </div>
        <div className="mt-6 grid items-center gap-6 md:grid-cols-2">
          <Radar scores={scores} />
          <ul className="space-y-3">
            {readinessDimensions.map((d) => (
              <li key={d}>
                <div className="flex justify-between text-sm"><span>{d}</span><span className="font-mono text-copper-300">{scores[d]}%</span></div>
                <div className="mt-1 h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-copper-500" style={{ width: `${scores[d]}%` }} /></div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="label-mono text-white/50">Priority actions</p>
          <ul className="mt-4 space-y-3">
            {weakest.map((d) => {
              const sol = getSolution(readinessAdvice[d].solution);
              return (
                <li key={d} className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm"><span className="font-semibold text-copper-300">{d}:</span> {readinessAdvice[d].low}</p>
                  {sol && <Link href={`/digitals/solutions/${sol.slug}`} className="mt-2 inline-block text-xs font-semibold text-white/70 hover:text-white">Related: {sol.title} →</Link>}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="rounded-[28px] bg-white p-8 lg:col-span-5">
        {status === "sent" || status === "mailto" ? (
          <SuccessPanel sent={status === "sent"} sentText="A Samprec Digitals consultant will review your results and suggest next steps." mailtoText="Your results are in your email app — press send." />
        ) : (
          <>
            <p className="label-mono text-copper-700">Free review</p>
            <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight">Get a consultant to review your results</h3>
            <p className="mt-2 text-sm text-slate-500">We&apos;ll send a short written review with recommended next steps.</p>
            <form onSubmit={send} noValidate className="mt-6 space-y-4">
              <Field label="Full name" required><input name="name" autoComplete="name" className={lightCls} /></Field>
              <Field label="Organisation"><input name="organisation" autoComplete="organization" className={lightCls} /></Field>
              <Field label="Email" required><input name="email" type="email" autoComplete="email" className={lightCls} /></Field>
              {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
              <MagneticButton type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send my results"}</MagneticButton>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
