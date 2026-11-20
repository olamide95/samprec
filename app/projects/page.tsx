import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectArchive } from "@/components/projects/ProjectArchive";
import { projects } from "@/data/samprecData";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Projects & Case Studies",
  description: `Selected Samprec engagements: ${projects.map((p) => p.title).join(", ")}.`,
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        index="03"
        eyebrow="Portfolio"
        title={<>Work that stands <span className="text-copper-gradient">on its own foundations.</span></>}
        intro="From a 12-floor hospital in Abuja's Central Business District to a biogas system for the ICRC in Lagos — selected engagements across healthcare, hospitality and public infrastructure."
      />
      <section className="bg-alabaster py-16 md:py-24">
        <div className="container-grid">
          <ProjectArchive />
        </div>
      </section>
    </>
  );
}
