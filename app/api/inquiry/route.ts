import { NextResponse } from "next/server";

const MAX_BYTES = 20_000;

/**
 * Receives enquiry/enrolment payloads. When FORMS_WEBHOOK_URL is configured the
 * payload is forwarded there and `delivered: true` is returned; otherwise the
 * client falls back to a pre-filled email (delivered: false).
 */
export async function POST(req: Request) {
  const raw = await req.text();
  if (raw.length > MAX_BYTES) return NextResponse.json({ delivered: false, error: "Payload too large" }, { status: 413 });

  let data: Record<string, unknown>;
  try {
    data = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ delivered: false, error: "Invalid JSON" }, { status: 400 });
  }

  const email = typeof data.email === "string" ? data.email : "";
  const name = typeof data.name === "string" ? data.name.trim() : "";
  if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ delivered: false, error: "Name and a valid email are required" }, { status: 422 });
  }

  const webhook = process.env.FORMS_WEBHOOK_URL;
  if (!webhook) return NextResponse.json({ delivered: false });

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, source: "samprecconsultants.com", receivedAt: new Date().toISOString() }),
    });
    return NextResponse.json({ delivered: res.ok });
  } catch {
    return NextResponse.json({ delivered: false });
  }
}
