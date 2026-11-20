import type { Metadata } from "next";
import { Clock, Mail, Phone } from "lucide-react";
import { DigitalBrief } from "@/components/digitals/DigitalBrief";
import { company, digitalProcess, telHref } from "@/data/samprecData";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Start a Project — Samprec Digitals", description: "Send a brief to Samprec Digitals or book a live demo of our ERP, e-procurement, BIM and point cloud solutions.", path: "/digitals/start" });

export default function StartPage() {
  return (
    <div className="text-white">
      <section className="container-grid grid gap-12 py-16 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="label-mono text-copper-300">Digitals / Start</p>
          <h1 className="font-display mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">Start a project or book a demo.</h1>
          <ol className="mt-10 space-y-4">
            {digitalProcess.slice(0, 3).map((p) => (
              <li key={p.index} className="flex gap-4">
                <span className="font-mono text-sm text-copper-300">{p.index}</span>
                <span><span className="block font-semibold">{p.title}</span><span className="text-sm text-white/55">{p.text}</span></span>
              </li>
            ))}
          </ol>
          <ul className="mt-10 space-y-3 border-t border-white/10 pt-8 text-sm text-white/70">
            <li><a href={telHref(company.primaryPhone)} className="inline-flex items-center gap-2 hover:text-white"><Phone className="size-4 text-copper-300" /> {company.primaryPhone}</a></li>
            <li><a href={`mailto:${company.primaryEmail}`} className="inline-flex items-center gap-2 hover:text-white"><Mail className="size-4 text-copper-300" /> {company.primaryEmail}</a></li>
            <li className="inline-flex items-center gap-2"><Clock className="size-4 text-copper-300" /> {company.hours}</li>
          </ul>
        </div>
        <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8 md:p-10 lg:col-span-7"><DigitalBrief /></div>
      </section>
    </div>
  );
}
