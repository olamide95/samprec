import Link from "next/link";
import { getCourse, learningPaths } from "@/data/samprecData";
import { Reveal } from "@/components/ui/Reveal";

export function LearningPaths() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {learningPaths.map((p, pi) => (
        <Reveal key={p.id} delay={pi * 0.06}>
          <div className="flex h-full flex-col rounded-[28px] border border-hairline bg-white p-8">
            <p className="label-mono text-copper-700">Path {String(pi + 1).padStart(2, "0")}</p>
            <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight">{p.title}</h3>
            <p className="mt-2 text-slate-500">{p.summary}</p>
            <ol className="relative mt-8 flex-1 space-y-4 before:absolute before:bottom-6 before:left-[15px] before:top-6 before:w-px before:bg-hairline">
              {p.steps.map((slug, i) => {
                const c = getCourse(slug);
                if (!c) return null;
                return (
                  <li key={slug} className="relative">
                    <Link href={`/academy/courses/${slug}`} className="group flex items-center gap-4">
                      <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-white font-mono text-xs ring-1 ring-hairline group-hover:bg-copper-500 group-hover:ring-copper-500">{i + 1}</span>
                      <span>
                        <span className="block font-semibold group-hover:text-copper-700">{c.title}</span>
                        <span className="block text-xs text-slate-400">{c.level}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
            <div className="mt-8 rounded-2xl bg-copper-50 p-4">
              <p className="label-mono text-copper-700">Outcome</p>
              <p className="mt-1 text-sm font-semibold">{p.outcome}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
