import type { Metadata } from "next";
import { Clock, Mail, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InquiryWizard } from "@/components/contact/InquiryWizard";
import { OfficeCards } from "@/components/contact/OfficeCards";
import { company, telHref } from "@/data/samprecData";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact & Request a Proposal",
  description: `Request a proposal or consultation from Samprec Consultants. Utako and Jabi offices, Abuja. ${company.primaryPhone} · ${company.primaryEmail}.`,
  path: "/contact",
});

export default function ContactPage() {
  const actions = [
    { icon: Phone, label: "Call", value: company.primaryPhone, href: telHref(company.primaryPhone) },
    { icon: Mail, label: "Email", value: company.primaryEmail, href: `mailto:${company.primaryEmail}` },
    { icon: MessageCircle, label: "WhatsApp", value: "Chat with a consultant", href: `https://wa.me/${company.whatsapp}` },
    { icon: Clock, label: "Hours", value: company.hours },
  ];

  return (
    <>
      <PageHero
        index="08"
        eyebrow="Contact"
        title={<>Start with <span className="text-copper-gradient">a conversation.</span></>}
        intro="Send a structured brief, call the office, or visit us in Utako or Jabi. Every enquiry is reviewed by a consultant."
      />

      <div className="border-b border-hairline bg-white">
        <ul className="container-grid grid sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((a) => {
            const content = (
              <>
                <a.icon className="size-5 text-copper-600" aria-hidden />
                <span className="label-mono mt-4 block text-slate-400">{a.label}</span>
                <span className="mt-1 block text-sm font-semibold">{a.value}</span>
              </>
            );
            return (
              <li key={a.label} className="border-hairline py-8 sm:border-r sm:px-6 sm:first:pl-0 lg:last:border-r-0">
                {a.href ? (
                  <a href={a.href} target={a.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block hover:text-copper-700">
                    {content}
                  </a>
                ) : (
                  content
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <section id="proposal" className="bg-alabaster py-20 md:py-28">
        <div className="container-grid">
          <SectionHeading index="01" eyebrow="Proposal wizard" title="Request a proposal or consultation." intro="Five short steps. The estimator on the right sizes your engagement as you go." />
          <div className="mt-12">
            <InquiryWizard />
          </div>
        </div>
      </section>

      <section id="offices" className="bg-white py-20 md:py-28">
        <div className="container-grid">
          <SectionHeading index="02" eyebrow="Offices" title="Two addresses on I.T. Igbani Street." />
          <div className="mt-12">
            <OfficeCards />
          </div>
        </div>
      </section>
    </>
  );
}
