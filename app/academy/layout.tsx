import { PillarNav } from "@/components/layout/PillarNav";

export default function AcademyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PillarNav
        theme="academy"
        brand="Samprec Academy"
        links={[
          { label: "Overview", href: "/academy" },
          { label: "Courses", href: "/academy/courses" },
          { label: "Schedule", href: "/academy/schedule" },
          { label: "Corporate training", href: "/academy/corporate" },
        ]}
        cta={{ label: "Enrol now", href: "/academy/enrol" }}
      />
      {children}
    </>
  );
}
