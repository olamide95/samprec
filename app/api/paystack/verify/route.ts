import { NextResponse } from "next/server";
import { getCourse } from "@/data/samprecData";

/**
 * Verifies a Paystack transaction server-side (never trust the browser),
 * checks the amount against the course fee, then forwards the enrolment to
 * FORMS_WEBHOOK_URL when configured.
 */
export async function POST(req: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) return NextResponse.json({ verified: false, error: "Payments not configured" }, { status: 503 });

  let body: { reference?: string; courseSlug?: string; enrolment?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ verified: false, error: "Invalid JSON" }, { status: 400 });
  }
  const { reference, courseSlug, enrolment } = body;
  if (!reference || !/^[\w-]+$/.test(reference) || !courseSlug) {
    return NextResponse.json({ verified: false, error: "Missing reference" }, { status: 400 });
  }
  const course = getCourse(courseSlug);
  if (!course?.feeNaira) return NextResponse.json({ verified: false, error: "Unknown course" }, { status: 400 });

  const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${secret}` },
    cache: "no-store",
  });
  const json = (await res.json()) as { status?: boolean; data?: { status?: string; amount?: number; currency?: string } };
  const seats = Math.max(1, Number(enrolment?.seats ?? 1) || 1);
  const expected = Math.round(course.feeNaira * seats * 100);
  const verified = json.status === true && json.data?.status === "success" && json.data.currency === "NGN" && json.data.amount === expected;

  if (verified && process.env.FORMS_WEBHOOK_URL) {
    await fetch(process.env.FORMS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "academy-paid-enrolment", reference, course: course.title, amountNaira: expected / 100, ...enrolment, receivedAt: new Date().toISOString() }),
    }).catch(() => undefined);
  }
  return NextResponse.json({ verified });
}
