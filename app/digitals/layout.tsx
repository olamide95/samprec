import { PillarNav } from "@/components/layout/PillarNav";

export default function DigitalsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-ink">
      <PillarNav
        theme="digitals"
        brand="Samprec Digitals"
        links={[
          { label: "Overview", href: "/digitals" },
          { label: "Solutions", href: "/digitals/solutions" },
          { label: "Live demos", href: "/digitals/demos" },
          { label: "Readiness assessment", href: "/digitals/assessment" },
          { label: "Start a project", href: "/digitals/start" },
        ]}
        cta={{ label: "Book a demo", href: "/digitals/start" }}
      />
      {children}
    </div>
  );
}
