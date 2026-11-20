import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { WaitlistForm } from "@/components/academy/InterestForms";
import { cohorts, getCourse } from "@/data/samprecData";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Schedule & Intakes — Samprec Academy", description: "Upcoming Samprec Academy cohorts and intake dates. Join the waitlist for the next intake.", path: "/academy/schedule" });

export default function SchedulePage() {
  const upcoming = [...cohorts].filter((c) => c.startDate >= new Date().toISOString().slice(0, 10)).sort((a, b) => a.startDate.localeCompare(b.startDate));
  const byMonth = upcoming.reduce<Record<string, typeof upcoming>>((acc, c) => {
    const k = new Date(c.startDate).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
    (acc[k] ??= []).push(c);
    return acc;
  }, {});

  return (
    <>
      <section className="border-b border-hairline bg-white">
        <div className="container-grid py-14 md:py-20">
          <p className="label-mono text-copper-700">Academy / Schedule</p>
          <h1 className="font-display mt-5 text-4xl font-semibold tracking-tight md:text-6xl">Schedule & intakes</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">Published cohorts for classroom and virtual delivery. Corporate cohorts are scheduled on request.</p>
        </div>
      </section>

      <section className="bg-alabaster py-14 md:py-20">
        <div className="container-grid grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {upcoming.length > 0 ? (
              <div className="space-y-10">
                {Object.entries(byMonth).map(([month, list]) => (
                  <div key={month}>
                    <p className="label-mono text-slate-400">{month}</p>
                    <ul className="mt-4 divide-y divide-hairline overflow-hidden rounded-[24px] bg-white ring-1 ring-hairline">
                      {list.map((c) => {
                        const course = getCourse(c.courseSlug);
                        if (!course) return null;
                        return (
                          <li key={c.id} className="grid items-center gap-4 p-5 sm:grid-cols-12">
                            <div className="font-mono text-sm sm:col-span-2">{new Date(c.startDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}</div>
                            <div className="sm:col-span-6">
                              <Link href={`/academy/courses/${course.slug}`} className="font-semibold hover:text-copper-700">{course.title}</Link>
                              <p className="text-xs text-slate-500">{c.mode}{c.seats ? ` · ${c.seats} seats` : ""}</p>
                            </div>
                            <div className="sm:col-span-2"><span className="rounded-full bg-copper-50 px-2.5 py-1 font-mono text-[10px] uppercase text-copper-700">{c.status}</span></div>
                            <div className="sm:col-span-2 sm:text-right">
                              {c.status !== "Full" && <Link href={`/academy/enrol?course=${course.slug}`} className="text-sm font-semibold text-copper-700 hover:underline">Enrol →</Link>}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-[28px] bg-white p-10 ring-1 ring-hairline">
                <CalendarDays className="size-10 text-copper-600" />
                <h2 className="font-display mt-6 text-3xl font-semibold tracking-tight">The next intake calendar is being finalised.</h2>
                <p className="mt-4 text-slate-600">Join the waitlist and you&apos;ll be first to hear when dates open — with priority seat allocation. You can also enrol now on any course and the Academy will place you in the earliest cohort.</p>
                <Link href="/academy/courses" className="mt-6 inline-block font-semibold text-copper-700 hover:underline">Browse courses →</Link>
              </div>
            )}
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-[28px] bg-white p-8 ring-1 ring-hairline lg:sticky lg:top-[200px]">
              <p className="label-mono text-copper-700">Waitlist</p>
              <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight">Get notified of dates</h2>
              <div className="mt-6"><WaitlistForm /></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
