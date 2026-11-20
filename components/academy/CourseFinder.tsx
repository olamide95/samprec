"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import { useState } from "react";
import { goalOptions, recommendCourses, roleOptions, type Goal, type Role } from "@/data/samprecData";
import { cn } from "@/lib/utils";

type Exp = "early" | "mid" | "senior";
const expOptions: { id: Exp; label: string }[] = [
  { id: "early", label: "0 – 2 years" },
  { id: "mid", label: "3 – 7 years" },
  { id: "senior", label: "8+ years" },
];

export function CourseFinder() {
  const [role, setRole] = useState<Role | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [exp, setExp] = useState<Exp | null>(null);
  const step = !role ? 0 : !goal ? 1 : !exp ? 2 : 3;
  const results = step === 3 ? recommendCourses(role, goal, exp) : [];

  const Opt = ({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button type="button" onClick={onClick} aria-pressed={on} className={cn("rounded-2xl px-5 py-4 text-left text-[15px] font-medium ring-1 transition-all", on ? "bg-copper-500 text-ink ring-copper-500" : "bg-white/5 text-white ring-white/15 hover:ring-white/40")}>
      {children}
    </button>
  );

  return (
    <div className="grid gap-10 rounded-[32px] bg-ink p-8 text-white md:p-12 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <p className="label-mono text-copper-300">Course finder</p>
        <h2 className="font-display mt-4 text-4xl font-semibold leading-tight tracking-tight">Not sure where to start?</h2>
        <p className="mt-4 text-white/60">Three questions. We&apos;ll match you to the programmes that fit your role and ambition.</p>
        <ol className="mt-8 space-y-2">
          {["Your role", "Your goal", "Your experience"].map((l, i) => (
            <li key={l} className="flex items-center gap-3 text-sm">
              <span className={cn("flex size-7 items-center justify-center rounded-full font-mono text-xs", i < step ? "bg-copper-500 text-ink" : i === step ? "ring-1 ring-copper-300 text-copper-300" : "ring-1 ring-white/20 text-white/40")}>{i + 1}</span>
              <span className={i <= step ? "text-white" : "text-white/40"}>{l}</span>
            </li>
          ))}
        </ol>
        {step > 0 && (
          <button type="button" onClick={() => { setRole(null); setGoal(null); setExp(null); }} className="mt-8 inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">
            <RotateCcw className="size-4" /> Start over
          </button>
        )}
      </div>

      <div className="min-h-[320px] lg:col-span-8">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }}>
            {step === 0 && (
              <>
                <p className="font-display text-2xl font-semibold">Which best describes you?</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">{roleOptions.map((r) => <Opt key={r.id} on={role === r.id} onClick={() => setRole(r.id)}>{r.label}</Opt>)}</div>
              </>
            )}
            {step === 1 && (
              <>
                <p className="font-display text-2xl font-semibold">What do you want to achieve?</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">{goalOptions.map((g) => <Opt key={g.id} on={goal === g.id} onClick={() => setGoal(g.id)}>{g.label}</Opt>)}</div>
              </>
            )}
            {step === 2 && (
              <>
                <p className="font-display text-2xl font-semibold">How much professional experience do you have?</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">{expOptions.map((e) => <Opt key={e.id} on={exp === e.id} onClick={() => setExp(e.id)}>{e.label}</Opt>)}</div>
              </>
            )}
            {step === 3 && (
              <>
                <p className="font-display text-2xl font-semibold">{results.length ? "Your recommended programmes" : "Let's talk it through"}</p>
                {results.length ? (
                  <ol className="mt-6 space-y-3">
                    {results.map(({ course }, i) => (
                      <li key={course.slug}>
                        <Link href={`/academy/courses/${course.slug}`} className="group flex items-center gap-5 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition-colors hover:bg-white/10">
                          <span className="font-mono text-xs text-copper-300">{i === 0 ? "Best match" : `0${i + 1}`}</span>
                          <span className="flex-1">
                            <span className="block font-display text-lg font-semibold">{course.title}</span>
                            <span className="block text-sm text-white/55">{course.summary}</span>
                          </span>
                          <ArrowRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="mt-4 text-white/60">No exact match — the Academy team can recommend a programme or design one for your team.</p>
                )}
                <div className="mt-6 flex flex-wrap gap-4 text-sm">
                  <Link href="/academy/courses" className="font-semibold text-copper-300 hover:underline">Browse all courses →</Link>
                  <Link href="/academy/corporate" className="font-semibold text-white/70 hover:underline">Training for a team? →</Link>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
