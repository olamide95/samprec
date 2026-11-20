"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

type Variant = "copper" | "ink" | "outline" | "ghost-light";

const styles: Record<Variant, string> = {
  copper: "copper-gradient text-ink shadow-[0_8px_30px_-12px_rgba(201,122,34,0.7)]",
  ink: "bg-slate-ink text-white hover:bg-black",
  outline: "border border-slate-ink/20 text-slate-ink hover:border-slate-ink bg-white/60",
  "ghost-light": "border border-white/25 text-white hover:border-white bg-white/5",
};

interface Props {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: boolean;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function MagneticButton({ href, onClick, children, variant = "copper", className, icon = true, external, type = "button", disabled }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <>
      <span>{children}</span>
      {icon && <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />}
    </>
  );
  const cls = cn(
    "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-tight transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
    styles[variant],
    className,
  );

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset} style={{ x: sx, y: sy }} className="inline-block">
      {href ? (
        external ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
            {inner}
          </a>
        ) : (
          <Link href={href} className={cls}>
            {inner}
          </Link>
        )
      ) : (
        <button type={type} onClick={onClick} className={cls} disabled={disabled}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}
