import { articles, courses, digitalSolutions, offices, projects, services } from "@/data/samprecData";

export interface SearchItem {
  title: string;
  href: string;
  group: "Pages" | "Services" | "Projects" | "Academy" | "Digitals" | "Insights";
  sub?: string;
  text: string;
}

export const searchIndex: SearchItem[] = [
  { group: "Pages", title: "Home", href: "/", text: "home samprec consultants" },
  { group: "Pages", title: "About & project lifecycle", href: "/about", text: "about vision lifecycle leadership ayodele faleye indigenous" },
  { group: "Pages", title: "Request a proposal", href: "/contact#proposal", text: "contact proposal quote consultation brief estimator" },
  { group: "Pages", title: "Offices & directions", href: "/contact#offices", sub: offices.map((o) => o.name).join(" · "), text: offices.map((o) => o.address).join(" ") },
  { group: "Academy", title: "Course finder", href: "/academy#finder", text: "recommend which course quiz" },
  { group: "Academy", title: "Enrol on a course", href: "/academy/enrol", text: "enrol register pay seat" },
  { group: "Academy", title: "Schedule & intakes", href: "/academy/schedule", text: "dates cohort calendar waitlist" },
  { group: "Academy", title: "Corporate training", href: "/academy/corporate", text: "in-house team organisation" },
  { group: "Digitals", title: "Live demos", href: "/digitals/demos", text: "demo try prototype" },
  { group: "Digitals", title: "Digital readiness assessment", href: "/digitals/assessment", text: "maturity score quiz" },
  ...services.map((s) => ({ group: "Services" as const, title: s.title, href: `/services?tab=${s.id}`, sub: s.short, text: `${s.summary} ${s.deliverables.join(" ")}` })),
  ...projects.map((p) => ({ group: "Projects" as const, title: p.title, href: `/projects/${p.slug}`, sub: p.location, text: `${p.client} ${p.sector} ${p.summary}` })),
  ...courses.map((c) => ({ group: "Academy" as const, title: c.title, href: `/academy/courses/${c.slug}`, sub: `${c.code} · ${c.category}`, text: `${c.code} ${c.summary} ${c.modules.map((m) => m.title).join(" ")}` })),
  ...digitalSolutions.map((d) => ({ group: "Digitals" as const, title: d.title, href: `/digitals/solutions/${d.slug}`, sub: d.tagline, text: `${d.summary} ${d.modules.join(" ")}` })),
  ...articles.map((a) => ({ group: "Insights" as const, title: a.title, href: `/insights/${a.slug}`, sub: a.category, text: a.excerpt })),
];

export function search(q: string, limit = 12): SearchItem[] {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return searchIndex
    .map((it) => {
      const title = it.title.toLowerCase();
      const hay = `${title} ${(it.sub ?? "").toLowerCase()} ${it.text.toLowerCase()}`;
      let score = 0;
      for (const t of terms) {
        if (!hay.includes(t)) return { it, score: -1 };
        score += title.startsWith(t) ? 5 : title.includes(t) ? 3 : 1;
      }
      return { it, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.it);
}
