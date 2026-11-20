import type { ReactNode } from "react";

interface Props {
  index: string;
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  aside?: ReactNode;
}

export function PageHero({ index, eyebrow, title, intro, aside }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-white">
      <div className="grid-lines pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
      <div className="container-grid relative grid gap-10 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-8">
          <p className="label-mono text-copper-700">
            {index} / {eyebrow}
          </p>
          <h1 className="font-display mt-6 text-4xl font-semibold leading-[1.02] tracking-tight text-slate-ink md:text-6xl lg:text-7xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">{intro}</p>
        </div>
        {aside && <div className="md:col-span-4 md:self-end">{aside}</div>}
      </div>
    </section>
  );
}
