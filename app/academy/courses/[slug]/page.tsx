import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CourseCard } from "@/components/academy/CourseCard";
import { CourseActions } from "@/components/academy/CourseActions";
import { cohorts, company, courses, formatNaira, getCourse, learningPaths } from "@/data/samprecData";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const c = getCourse(slug);
  if (!c) return { title: "Course not found" };
  return pageMetadata({ title: `${c.title} — Samprec Academy`, description: c.description, path: `/academy/courses/${c.slug}` });
}

export default async function CoursePage({ params }: Params) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const next = cohorts.filter((c) => c.courseSlug === course.slug && c.status !== "Full").sort((a, b) => a.startDate.localeCompare(b.startDate))[0];
  const paths = learningPaths.filter((p) => p.steps.includes(course.slug));
  const related = courses.filter((c) => c.slug !== course.slug && (c.category === course.category || c.roles.some((r) => course.roles.includes(r)))).slice(0, 3);

  const ld = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    provider: { "@type": "Organization", name: `Samprec Academy — ${company.name}`, sameAs: company.siteUrl },
    ...(course.feeNaira ? { offers: { "@type": "Offer", price: course.feeNaira, priceCurrency: "NGN" } } : {}),
  };

  return (
    <>
      <section className="relative overflow-hidden border-b border-hairline bg-white">
        <div className="grid-lines pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
        <div className="container-grid relative py-12 md:py-16">
          <Link href="/academy/courses" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-ink print:hidden"><ArrowLeft className="size-4" /> All courses</Link>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-lg bg-slate-ink px-2.5 py-1.5 font-mono text-sm font-semibold text-copper-300">{course.code}</span>
            <span className="label-mono text-slate-500">{course.category} · {course.level}</span>
          </div>
          <h1 className="font-display mt-6 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl">{course.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">{course.description}</p>
        </div>
      </section>

      <section className="bg-alabaster py-14 md:py-20">
        <div className="container-grid grid gap-10 lg:grid-cols-12">
          <div className="space-y-14 lg:col-span-8">
            <div>
              <p className="label-mono text-copper-700">01 / What you&apos;ll achieve</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {course.outcomes.map((o) => (
                  <li key={o} className="flex gap-3 rounded-2xl bg-white p-5 ring-1 ring-hairline">
                    <Check className="mt-0.5 size-5 shrink-0 text-copper-600" aria-hidden /> <span className="text-[15px]">{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="label-mono text-copper-700">02 / Curriculum</p>
              <div className="mt-4 rounded-[24px] bg-white px-6 ring-1 ring-hairline">
                <Accordion
                  numbered
                  items={course.modules.map((m) => ({
                    title: m.title,
                    body: (
                      <ul className="space-y-1.5">
                        {m.points.map((p) => (
                          <li key={p} className="flex gap-2.5"><span className="mt-2.5 h-px w-3 shrink-0 bg-copper-500" />{p}</li>
                        ))}
                      </ul>
                    ),
                  }))}
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-[24px] bg-white p-7 ring-1 ring-hairline">
                <p className="label-mono text-copper-700">03 / Who it&apos;s for</p>
                <p className="mt-4 text-[15px] leading-relaxed">{course.audience}</p>
              </div>
              <div className="rounded-[24px] bg-white p-7 ring-1 ring-hairline">
                <p className="label-mono text-copper-700">04 / Prerequisites</p>
                <p className="mt-4 text-[15px] leading-relaxed">{course.prerequisites}</p>
              </div>
              {course.certification && (
                <div className="rounded-[24px] bg-slate-ink p-7 text-white sm:col-span-2">
                  <p className="label-mono text-copper-300">Certification</p>
                  <p className="mt-3 text-[15px]">{course.certification} Participants also receive a Samprec Academy certificate of completion.</p>
                </div>
              )}
            </div>

            {paths.length > 0 && (
              <div>
                <p className="label-mono text-copper-700">05 / Part of</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {paths.map((p) => (
                    <Link key={p.id} href="/academy#paths" className="rounded-2xl bg-white px-5 py-4 ring-1 ring-hairline hover:ring-copper-300">
                      <span className="block font-semibold">{p.title}</span>
                      <span className="block text-xs text-slate-500">Step {p.steps.indexOf(course.slug) + 1} of {p.steps.length} · {p.outcome}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="lg:col-span-4">
            <div className="space-y-4 lg:sticky lg:top-[200px]">
              <div className="rounded-[28px] bg-white p-7 shadow-[0_30px_60px_-40px_rgba(15,23,42,0.5)] ring-1 ring-hairline">
                <p className="label-mono text-slate-400">Fee</p>
                <p className="font-mono mt-1 text-3xl font-semibold">{course.feeNaira ? formatNaira(course.feeNaira) : "On request"}</p>
                <dl className="mt-6 divide-y divide-hairline border-y border-hairline text-sm">
                  <div className="flex justify-between py-3"><dt className="text-slate-500">Next intake</dt><dd className="font-medium">{next ? new Date(next.startDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "Dates TBC"}</dd></div>
                  <div className="flex justify-between py-3"><dt className="text-slate-500">Duration</dt><dd className="font-medium">{course.duration ?? "Confirmed on enrolment"}</dd></div>
                  <div className="flex justify-between py-3"><dt className="text-slate-500">Mode</dt><dd className="font-medium">{course.mode ?? "Classroom · Virtual · In-house"}</dd></div>
                  <div className="flex justify-between py-3"><dt className="text-slate-500">Modules</dt><dd className="font-medium">{course.outlinePending ? "On request" : course.modules.length}</dd></div>
                </dl>
                <div className="mt-6 space-y-3 print:hidden">
                  <MagneticButton href={`/academy/enrol?course=${course.slug}`} className="w-full justify-center">{course.outlinePending ? "Register interest" : "Enrol now"}</MagneticButton>
                  <CourseActions title={course.title} />
                </div>
              </div>
              <Link href="/academy/corporate" className="block rounded-[24px] bg-copper-50 p-6 ring-1 ring-copper-100 hover:ring-copper-300 print:hidden">
                <p className="font-semibold">Training a team?</p>
                <p className="mt-1 text-sm text-slate-600">Run this programme in-house for your organisation →</p>
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-white py-16 print:hidden">
          <div className="container-grid">
            <p className="label-mono text-slate-400">You may also like</p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">{related.map((c) => <CourseCard key={c.slug} course={c} />)}</div>
          </div>
        </section>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
