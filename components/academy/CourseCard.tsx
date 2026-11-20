import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatNaira, type Course } from "@/data/samprecData";

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="group relative flex h-full flex-col rounded-[24px] border border-hairline bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(15,23,42,0.45)]">
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-lg bg-slate-ink px-2.5 py-1.5 font-mono text-sm font-semibold text-copper-300">{course.code}</span>
        <span className="rounded-full bg-copper-50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-copper-700">{course.level}</span>
      </div>
      <p className="label-mono mt-6 text-slate-400">{course.category}</p>
      <h3 className="font-display mt-2 text-xl font-semibold tracking-tight">
        <Link href={`/academy/courses/${course.slug}`} className="after:absolute after:inset-0">
          {course.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-600">{course.summary}</p>
      <div className="mt-6 flex items-center justify-between border-t border-hairline pt-4">
        <span className="font-mono text-xs text-slate-500">
          {course.outlinePending ? "Outline on request" : `${course.modules.length} modules`}
          {course.duration && ` · ${course.duration}`}
          {course.feeNaira ? ` · ${formatNaira(course.feeNaira)}` : ""}
        </span>
        <ArrowUpRight className="size-5 text-slate-300 transition-all group-hover:rotate-45 group-hover:text-copper-600" />
      </div>
    </article>
  );
}
