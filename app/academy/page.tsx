import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MapPin, Phone, Search } from "lucide-react";
import { CourseFinder } from "@/components/academy/CourseFinder";
import { LearningPaths } from "@/components/academy/LearningPaths";
import { CourseCard } from "@/components/academy/CourseCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { academyFaqs, company, courseCategories, courses, leader, learningPaths, offices, telHref } from "@/data/samprecData";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Samprec Academy — PMP, RICS APC, Primavera P6, BIM & AI Training in Abuja",
  description: `Professional training for the built environment in Abuja: ${courses.map((c) => c.title).join(", ")}. Individual and corporate programmes.`,
  path: "/academy",
});

const trackBlurb: Record<string, string> = {
  "Professional Certification": "PMP, RICS APC and professional programmes",
  "Project Controls & Software": "Plan and control with Primavera P6",
  "Digital Construction": "BIM, AutoCAD, Navisworks and AI",
  "Career & Workplace": "Core skills for professional practice",
};

export default function AcademyPage() {
  const office = offices.find((o) => o.id === "jabi");
  const featured = ["pmp-exam-preparation", "rics-apc-coaching", "oracle-primavera-p6", "bim-essentials", "ai-for-construction", "autocad-navisworks"]
    .map((s) => courses.find((c) => c.slug === s))
    .filter((c): c is (typeof courses)[number] => Boolean(c));
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: academyFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <section className="relative overflow-hidden bg-copper-50">
        <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden />
        <div className="container-grid relative grid gap-12 pb-20 pt-16 md:pb-28 md:pt-24 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="label-mono text-copper-700">C / Samprec Academy · Jabi, Abuja</p>
            <h1 className="font-display mt-6 text-5xl font-semibold leading-[0.98] tracking-[-0.03em] md:text-7xl lg:text-[88px]">
              Learn from <span className="text-copper-gradient">practitioners</span>, not textbooks.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-600">
              Certification coaching, project controls software and digital construction — taught by the people who measure, plan and deliver real projects at Samprec.
            </p>
            <form action="/academy/courses" className="mt-10 flex max-w-lg items-center rounded-full bg-white p-1.5 shadow-[0_20px_40px_-25px_rgba(15,23,42,0.4)] ring-1 ring-hairline">
              <Search className="ml-4 size-5 text-slate-400" aria-hidden />
              <input name="q" placeholder="What do you want to learn?" aria-label="Search courses" className="flex-1 bg-transparent px-3 py-2.5 text-[15px] focus:outline-none" />
              <button type="submit" className="rounded-full bg-slate-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-black">Search</button>
            </form>
            <div className="mt-5 flex flex-wrap gap-2 text-sm">
              {["PMP", "Primavera P6", "BIM", "RICS APC", "AI"].map((t) => (
                <Link key={t} href={`/academy/courses?q=${encodeURIComponent(t)}`} className="rounded-full bg-white/70 px-3 py-1 ring-1 ring-copper-100 hover:ring-copper-300">{t}</Link>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="relative rounded-[32px] bg-ink p-8 text-white">
              <p className="label-mono text-copper-300">At a glance</p>
              <dl className="mt-6 grid grid-cols-2 gap-6">
                <div><dt className="text-xs text-white/50">Programmes</dt><dd className="font-mono mt-1 text-5xl font-semibold">{String(courses.length).padStart(2, "0")}</dd></div>
                <div><dt className="text-xs text-white/50">Tracks</dt><dd className="font-mono mt-1 text-5xl font-semibold">{String(courseCategories.length).padStart(2, "0")}</dd></div>
                <div><dt className="text-xs text-white/50">Learning paths</dt><dd className="font-mono mt-1 text-5xl font-semibold">{String(learningPaths.length).padStart(2, "0")}</dd></div>
                <div><dt className="text-xs text-white/50">Delivery</dt><dd className="mt-2 text-sm leading-snug">Classroom · Virtual · In-house</dd></div>
              </dl>
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-xs text-white/50">Led by</p>
                <p className="mt-1 font-semibold">{leader.name}</p>
                <p className="font-mono text-xs text-copper-300">{leader.credentials.map((c) => c.code).join(" · ")}</p>
              </div>
            </div>
            {office && (
              <div className="mt-4 rounded-[24px] bg-white p-6 ring-1 ring-hairline">
                <p className="flex gap-2 text-sm"><MapPin className="size-4 shrink-0 text-copper-600" aria-hidden /> {office.address}</p>
                <p className="mt-2 flex flex-wrap gap-3 font-mono text-xs">
                  <Phone className="size-4 text-copper-600" aria-hidden />
                  {office.phones.map((p) => <a key={p} href={telHref(p)} className="hover:text-copper-700">{p}</a>)}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="container-grid">
          <SectionHeading index="01" eyebrow="Tracks" title="Four tracks for every stage of a built-environment career." />
          <div className="mt-12 grid border-l border-t border-hairline sm:grid-cols-2 lg:grid-cols-4">
            {courseCategories.map((c, i) => (
              <Link key={c} href={`/academy/courses?category=${encodeURIComponent(c)}`} className="group flex min-h-[240px] flex-col justify-between border-b border-r border-hairline p-8 transition-colors hover:bg-slate-ink">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-sm text-copper-700 group-hover:text-copper-300">{String(i + 1).padStart(2, "0")} /</span>
                  <ArrowUpRight className="size-5 text-slate-300 transition-all group-hover:rotate-45 group-hover:text-copper-300" />
                </div>
                <div>
                  <p className="font-display text-2xl font-semibold tracking-tight group-hover:text-white">{c}</p>
                  <p className="mt-2 text-sm text-slate-500 group-hover:text-white/60">{trackBlurb[c]}</p>
                  <p className="mt-4 font-mono text-xs text-slate-400 group-hover:text-copper-300">{courses.filter((x) => x.category === c).length} programmes</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="finder" className="bg-alabaster py-20 md:py-28">
        <div className="container-grid">
          <Reveal><CourseFinder /></Reveal>
        </div>
      </section>

      <section id="paths" className="bg-alabaster pb-20 md:pb-28">
        <div className="container-grid">
          <SectionHeading index="02" eyebrow="Learning paths" title="Sequenced programmes with a clear destination." intro="Follow a path end-to-end, or join at the step that matches your experience." />
          <div className="mt-12"><LearningPaths /></div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="container-grid">
          <SectionHeading index="03" eyebrow="Popular programmes" title="Start here." action={<MagneticButton href="/academy/courses" variant="outline">All {courses.length} courses</MagneticButton>} />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 3) * 0.05}><CourseCard course={c} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink py-20 text-white md:py-28">
        <div className="grid-lines-dark pointer-events-none absolute inset-0" aria-hidden />
        <div className="container-grid relative grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="label-mono text-copper-300">04 / Corporate</p>
            <h2 className="font-display mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">Train your whole team — on your projects.</h2>
            <p className="mt-6 max-w-xl text-lg text-white/60">In-house programmes for contractors, consultancies and public institutions, at your premises, ours, or online.</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <MagneticButton href="/academy/corporate">Corporate training</MagneticButton>
            <MagneticButton href="/academy/schedule" variant="ghost-light">See intakes</MagneticButton>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="container-grid grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label-mono text-copper-700">05 / FAQ</p>
            <h2 className="font-display mt-5 text-4xl font-semibold tracking-tight">Before you enrol.</h2>
            <p className="mt-4 text-slate-500">Still unsure? Call the Academy or email {company.primaryEmail}.</p>
          </div>
          <div className="lg:col-span-8">
            <Accordion numbered items={academyFaqs.map((f) => ({ title: f.q, body: f.a }))} />
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </>
  );
}
