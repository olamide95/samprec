import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Blueprint, type BlueprintVariant } from "@/components/ui/Blueprint";
import type { Project, ProjectSector } from "@/data/samprecData";

export const sectorArt: Record<ProjectSector, BlueprintVariant> = {
  Healthcare: "tower",
  Hospitality: "hotel",
  "Public Infrastructure": "reactor",
};

export function ProjectVisual({ project, className }: { project: Project; className?: string }) {
  if (project.image) {
    return (
      <div className={`relative overflow-hidden ${className ?? ""}`}>
        <Image src={project.image} alt={project.title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
      </div>
    );
  }
  return <Blueprint variant={sectorArt[project.sector]} className={className} label={project.sector} />;
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block overflow-hidden rounded-[24px] border border-hairline bg-white transition-shadow hover:shadow-[0_30px_60px_-30px_rgba(15,23,42,0.35)]">
      <div className="relative">
        <ProjectVisual project={project} className="aspect-[4/3] w-full transition-transform duration-700 group-hover:scale-[1.03]" />
        <span className="label-mono absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-slate-ink">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <span className="label-mono text-copper-700">{project.sector}</span>
          <ArrowUpRight className="size-5 text-slate-300 transition-all group-hover:rotate-45 group-hover:text-copper-600" />
        </div>
        <h3 className="font-display mt-4 text-xl font-semibold leading-snug tracking-tight">{project.title}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin className="size-3.5" aria-hidden /> {project.location}
        </p>
        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-600">{project.summary}</p>
      </div>
    </Link>
  );
}
