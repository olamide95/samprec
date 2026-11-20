import { CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const inputCls =
  "w-full rounded-xl bg-white px-4 py-3 text-sm text-slate-ink ring-1 ring-hairline placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-copper-500";

export const darkInputCls =
  "w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white ring-1 ring-white/15 placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-copper-500";

export function Field({ label, children, className, dark, required }: { label: string; children: ReactNode; className?: string; dark?: boolean; required?: boolean }) {
  return (
    <label className={cn("block", className)}>
      <span className={cn("label-mono", dark ? "text-white/50" : "text-slate-500")}>
        {label}
        {required && " *"}
      </span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

export function SuccessPanel({ sent, title, sentText, mailtoText, children, dark }: { sent: boolean; title?: string; sentText: string; mailtoText: string; children?: ReactNode; dark?: boolean }) {
  return (
    <div className="py-10 text-center">
      <CheckCircle2 className="mx-auto size-14 text-copper-500" />
      <p className={cn("font-display mt-5 text-2xl font-semibold tracking-tight md:text-3xl", dark && "text-white")}>{title ?? (sent ? "Received — thank you." : "Your email is ready to send.")}</p>
      <p className={cn("mx-auto mt-3 max-w-md", dark ? "text-white/60" : "text-slate-600")}>{sent ? sentText : mailtoText}</p>
      {children && <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>}
    </div>
  );
}

export const isEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v);
export const isPhone = (v: string) => v.replace(/\D/g, "").length >= 7;
