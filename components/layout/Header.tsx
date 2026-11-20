"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation } from "@/data/samprecData";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { UtilityBar } from "./UtilityBar";
import { CommandPalette, SearchButton } from "@/components/search/CommandPalette";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  const activeGroup = navigation.find((g) => g.label === open);

  return (
    <header className="sticky top-0 z-50" onMouseLeave={() => setOpen(null)}>
      <UtilityBar />
      <div className={cn("border-b bg-white/90 backdrop-blur-xl transition-shadow", scrolled ? "border-hairline shadow-[0_10px_30px_-20px_rgba(15,23,42,0.25)]" : "border-transparent")}>
        <div className="container-grid flex h-[72px] items-center justify-between gap-6">
          <Link href="/" aria-label="Samprec Consultants — home" className="shrink-0">
            <Image src="/brand/samprec-logo.png" alt="Samprec Consultants Ltd" width={238} height={102} priority className="h-11 w-auto" />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigation.map((g) => {
                const isActive = pathname === g.href || pathname.startsWith(`${g.href}/`);
                return (
                  <li key={g.label}>
                    <Link
                      href={g.href}
                      onMouseEnter={() => setOpen(g.label)}
                      onFocus={() => setOpen(g.label)}
                      aria-expanded={open === g.label}
                      className={cn(
                        "flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors xl:px-4",
                        isActive ? "text-copper-700" : "text-slate-700 hover:text-slate-ink",
                        open === g.label && "bg-slate-100",
                      )}
                    >
                      {g.label}
                      <ChevronDown className={cn("size-3.5 transition-transform", open === g.label && "rotate-180")} aria-hidden />
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link href="/contact" onMouseEnter={() => setOpen(null)} className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-ink">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <SearchButton />
            <MagneticButton href="/contact#proposal">Request a Proposal</MagneticButton>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
          <SearchButton />
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-hairline lg:hidden"
            onClick={() => setMobile((v) => !v)}
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
          >
            {mobile ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          </div>
        </div>

        <AnimatePresence>
          {activeGroup && (
            <motion.div
              key={activeGroup.label}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full hidden border-b border-hairline bg-white lg:block"
            >
              <div className="container-grid grid grid-cols-12 gap-8 py-10">
                <div className="col-span-4 border-r border-hairline pr-8">
                  <p className="label-mono text-copper-700">{String(navigation.indexOf(activeGroup) + 1).padStart(2, "0")} / {activeGroup.label}</p>
                  <p className="font-display mt-4 text-2xl font-semibold leading-snug tracking-tight">{activeGroup.intro}</p>
                  <Link href={activeGroup.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-copper-700 hover:gap-3 transition-all">
                    Explore {activeGroup.label} <ArrowRight className="size-4" />
                  </Link>
                </div>
                <ul className="col-span-8 grid grid-cols-2 gap-x-8 gap-y-1">
                  {activeGroup.links.map((l, i) => (
                    <li key={l.href + l.label}>
                      <Link href={l.href} className="group flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-alabaster">
                        <span className="label-mono mt-1 text-slate-400 group-hover:text-copper-600">{String(i + 1).padStart(2, "0")}</span>
                        <span>
                          <span className="block text-[15px] font-semibold text-slate-ink">{l.label}</span>
                          {l.description && <span className="mt-0.5 block text-sm text-slate-500">{l.description}</span>}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-x-0 bottom-0 top-[112px] z-40 overflow-y-auto bg-white lg:hidden"
          >
            <nav aria-label="Mobile" className="container-grid py-6">
              {navigation.map((g, gi) => (
                <details key={g.label} className="group border-b border-hairline py-2">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-3">
                    <span className="flex items-baseline gap-3">
                      <span className="label-mono text-copper-700">{String(gi + 1).padStart(2, "0")}</span>
                      <span className="font-display text-2xl font-semibold">{g.label}</span>
                    </span>
                    <ChevronDown className="size-5 transition-transform group-open:rotate-180" />
                  </summary>
                  <ul className="pb-3 pl-9">
                    <li>
                      <Link href={g.href} className="block py-2 font-semibold text-copper-700">Overview</Link>
                    </li>
                    {g.links.map((l) => (
                      <li key={l.href + l.label}>
                        <Link href={l.href} className="block py-2 text-slate-600">{l.label}</Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
              <Link href="/contact" className="font-display block border-b border-hairline py-5 text-2xl font-semibold">Contact</Link>
              <div className="mt-8">
                <MagneticButton href="/contact#proposal" className="w-full justify-center">Request a Proposal</MagneticButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <CommandPalette />
    </header>
  );
}
