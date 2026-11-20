import type { Metadata } from "next";
import { Suspense } from "react";
import { CourseCatalog } from "@/components/academy/CourseCatalog";
import { courses } from "@/data/samprecData";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Course Catalogue — Samprec Academy",
  description: `Search ${courses.length} Samprec Academy programmes in certification, project controls, digital construction and workplace skills.`,
  path: "/academy/courses",
});

export default function CoursesPage() {
  return (
    <>
      <section className="border-b border-hairline bg-white">
        <div className="container-grid py-14 md:py-20">
          <p className="label-mono text-copper-700">Academy / Catalogue</p>
          <h1 className="font-display mt-5 text-4xl font-semibold tracking-tight md:text-6xl">Course catalogue</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">Filter by track and level, or search for a skill, software or certification.</p>
        </div>
      </section>
      <section className="bg-alabaster py-12 md:py-16">
        <div className="container-grid">
          <Suspense fallback={<p className="text-slate-500">Loading catalogue…</p>}>
            <CourseCatalog />
          </Suspense>
        </div>
      </section>
    </>
  );
}
