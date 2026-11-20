import Link from "next/link";
import { leader } from "@/data/samprecData";
import { Reveal } from "@/components/ui/Reveal";

export function CredentialsBar() {
  return (
    <section className="relative overflow-hidden bg-ink py-16 text-white">
      <div className="grid-lines-dark pointer-events-none absolute inset-0" aria-hidden />
      <div className="container-grid relative grid gap-10 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-4">
          <p className="label-mono text-copper-300">04 / Leadership</p>
          <p className="font-display mt-4 text-3xl font-semibold tracking-tight">{leader.name}</p>
          <p className="mt-1 text-white/60">{leader.title}</p>
          <Link href="/about#leadership" className="mt-5 inline-block text-sm font-semibold text-copper-300 underline-offset-4 hover:underline">
            Read profile →
          </Link>
        </Reveal>
        <ul className="grid grid-cols-2 border-l border-t border-white/10 md:grid-cols-4 lg:col-span-8">
          {leader.credentials.map((c, i) => (
            <li key={c.code} className="border-b border-r border-white/10 p-6">
              <Reveal delay={i * 0.06}>
                <p className="font-mono text-2xl font-semibold text-copper-300 md:text-3xl">{c.code}</p>
                <p className="mt-3 text-xs leading-relaxed text-white/55">{c.label}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
