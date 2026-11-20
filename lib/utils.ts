import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function buildMailto(to: string, subject: string, body: string) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Posts a form payload to /api/inquiry. Returns true only when a webhook accepted it. */
export async function submitForm(payload: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { delivered?: boolean };
    return data.delivered === true;
  } catch {
    return false;
  }
}
