"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { company } from "@/data/samprecData";

export function WhatsAppFab() {
  const pathname = usePathname();
  const context = pathname.startsWith("/academy") ? "Samprec Academy" : pathname.startsWith("/digitals") ? "Samprec Digitals" : "Samprec Consultants";
  const text = encodeURIComponent(`Hello ${context}, I'd like to make an enquiry.`);
  return (
    <a
      href={`https://wa.me/${company.whatsapp}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full bg-[#1f9d55] p-3.5 text-white shadow-[0_15px_40px_-10px_rgba(0,0,0,0.45)] transition-all hover:pr-5 print:hidden"
    >
      <MessageCircle className="size-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-40">Chat on WhatsApp</span>
    </a>
  );
}
