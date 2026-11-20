import Image from "next/image";
import Link from "next/link";
import { company, offices, services, telHref } from "@/data/samprecData";
import { Newsletter } from "@/components/forms/Newsletter";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-ink text-white/70">
      <div className="grid-lines-dark pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="container-grid relative">
        <div className="grid gap-12 border-b border-white/10 py-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="inline-block rounded-xl bg-white px-4 py-3">
              <Image src="/brand/samprec-logo.png" alt="Samprec Consultants Ltd" width={238} height={102} className="h-10 w-auto" />
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed">{company.intro}</p>
            <p className="label-mono mt-6 text-copper-300">100% indigenous · CAC registered</p>
            <div className="mt-8 max-w-sm">
              <p className="label-mono mb-3 text-white">Samprec Insights newsletter</p>
              <Newsletter dark />
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="label-mono text-white">Firm</p>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                ["About", "/about"],
                ["Projects", "/projects"],
                ["Insights", "/insights"],
                ["Digitals", "/digitals"],
                ["Live demos", "/digitals/demos"],
                ["Academy", "/academy"],
                ["Courses", "/academy/courses"],
                ["Enrol", "/academy/enrol"],
                ["Contact", "/contact"],
              ].map(([l, h]) => (
                <li key={h}>
                  <Link href={h} className="hover:text-copper-300">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="label-mono text-white">Services</p>
            <ul className="mt-5 space-y-3 text-sm">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={`/services?tab=${s.id}`} className="hover:text-copper-300">{s.short}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="label-mono text-white">Offices</p>
            <ul className="mt-5 space-y-5 text-sm">
              {offices.map((o) => (
                <li key={o.id}>
                  <p className="font-semibold text-white">{o.name}</p>
                  <p className="mt-1">{o.address}</p>
                  <p className="mt-1 font-mono text-xs">
                    {o.phones.map((p, i) => (
                      <span key={p}>
                        {i > 0 && " · "}
                        <a href={telHref(p)} className="hover:text-copper-300">{p}</a>
                      </span>
                    ))}
                  </p>
                </li>
              ))}
              <li>
                <a href={`mailto:${company.primaryEmail}`} className="font-mono text-xs hover:text-copper-300">{company.primaryEmail}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-3 py-6 text-xs md:flex-row md:items-center md:justify-between">
          <p>© {year} {company.name}. All rights reserved.</p>
          <p className="font-mono">{company.hours}</p>
        </div>
      </div>
    </footer>
  );
}
