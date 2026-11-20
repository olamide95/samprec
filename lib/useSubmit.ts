"use client";

import { useState } from "react";
import { company } from "@/data/samprecData";
import { buildMailto, submitForm } from "@/lib/utils";

export type SubmitStatus = "idle" | "sending" | "sent" | "mailto";

/**
 * Shared form submission: POST to /api/inquiry (webhook); if not delivered,
 * open a pre-filled email so no enquiry is ever lost.
 */
export function useSubmit() {
  const [status, setStatus] = useState<SubmitStatus>("idle");

  async function submit(opts: { payload: Record<string, unknown>; subject: string; lines: string[]; to?: string }) {
    setStatus("sending");
    const delivered = await submitForm(opts.payload);
    if (delivered) {
      setStatus("sent");
      return "sent" as const;
    }
    window.location.href = buildMailto(opts.to ?? company.primaryEmail, opts.subject, opts.lines.join("\n"));
    setStatus("mailto");
    return "mailto" as const;
  }

  return { status, setStatus, submit, reset: () => setStatus("idle") };
}
