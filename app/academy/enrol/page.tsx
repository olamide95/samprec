import type { Metadata } from "next";
import { Suspense } from "react";
import { EnrolmentWizard } from "@/components/academy/EnrolmentWizard";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Enrol — Samprec Academy", description: "Reserve your seat on a Samprec Academy programme.", path: "/academy/enrol" });

export default function EnrolPage() {
  return (
    <section className="bg-alabaster py-14 md:py-20">
      <div className="container-grid">
        <p className="label-mono text-copper-700">Academy / Enrol</p>
        <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Reserve your seat.</h1>
        <p className="mt-3 max-w-xl text-slate-600">Three quick steps. You&apos;ll receive confirmation and joining instructions from the Academy.</p>
        <div className="mt-10">
          <Suspense fallback={<p className="text-slate-500">Loading…</p>}>
            <EnrolmentWizard />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
