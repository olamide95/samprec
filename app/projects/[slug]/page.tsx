import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProjectVisual } from "@/components/projects/ProjectCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { getProject, projects } from "@/data/samprecData";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Project not found" };
  return pageMetadata({ title: `${p.title}, ${p.location}`, description: p.summary, path: `/projects/${p.slug}` });
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article>
      <header className="border-b border-hairline bg-white">
        <div className="container-grid py-12 md:py-16">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-ink">
            <ArrowLeft className="size-4" /> All projects
          </Link>
          <div className="mt-10 grid gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="label-mono text-copper-700">Case study / {project.sector}</p>
              <h1 className="font-display mt-5 text-4xl font-semibold leading-[1.03] tracking-tight md:text-6xl">{project.title}</h1>
              <p className="mt-4 text-lg text-slate-500">{project.location}</p>
            </div>
            <dl className="grid grid-cols-2 gap-px self-end overflow-hidden rounded-2xl border border-hairline bg-hairline md:col-span-4">
              {[
                ["Client", project.client],
                ["Our role", project.role],
              ].map(([k, v]) => (
                <div key={k} className="col-span-2 bg-white p-4">
                  <dt className="label-mono text-slate-400">{k}</dt>
                  <dd className="mt-1 text-sm font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </header>

      <ProjectVisual project={project} className="aspect-[21/9] w-full" />

      <section className="bg-white py-16 md:py-24">
        <div className="container-grid grid gap-12 md:grid-cols-12">
          <aside className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <p className="label-mono text-slate-400">Key facts</p>
              <dl className="mt-5 divide-y divide-hairline border-y border-hairline">
                {project.highlights.map((h) => (
                  <div key={h.label} className="flex items-baseline justify-between gap-4 py-4">
                    <dt className="text-sm text-slate-500">{h.label}</dt>
                    <dd className="font-mono text-sm font-medium text-slate-ink">{h.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="label-mono mt-8 text-slate-400">Disciplines</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.disciplines.map((d) => (
                  <span key={d} className="rounded-full bg-alabaster px-3 py-1.5 text-sm ring-1 ring-hairline">{d}</span>
                ))}
              </div>
            </div>
          </aside>
          <div className="prose-samprec md:col-span-7 md:col-start-6">
            <h2 className="!mt-0">The engagement</h2>
            {project.narrative.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="mt-10">
              <MagneticButton href="/contact#proposal">Discuss a similar project</MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {next.slug !== project.slug && (
        <Link href={`/projects/${next.slug}`} className="group block border-t border-hairline bg-alabaster">
          <div className="container-grid flex items-center justify-between py-12">
            <div>
              <p className="label-mono text-slate-400">Next project</p>
              <p className="font-display mt-2 text-2xl font-semibold tracking-tight group-hover:text-copper-700 md:text-4xl">{next.title}</p>
            </div>
            <ArrowRight className="size-8 transition-transform group-hover:translate-x-2" />
          </div>
        </Link>
      )}
    </article>
  );
}
