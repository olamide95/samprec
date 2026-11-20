"use client";

interface PaystackTransaction {
  reference: string;
}

interface PaystackPopInstance {
  newTransaction(opts: {
    key: string;
    email: string;
    amount: number; // kobo
    currency?: string;
    metadata?: Record<string, unknown>;
    onSuccess: (tx: PaystackTransaction) => void;
    onCancel: () => void;
  }): void;
}

declare global {
  interface Window {
    PaystackPop?: new () => PaystackPopInstance;
  }
}

export const paystackKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? "";
export const paystackEnabled = paystackKey.length > 0;

let loader: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (window.PaystackPop) return Promise.resolve();
  if (!loader) {
    loader = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://js.paystack.co/v2/inline.js";
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => {
        loader = null;
        reject(new Error("Could not load Paystack"));
      };
      document.head.appendChild(s);
    });
  }
  return loader;
}

/** Opens the Paystack checkout. Resolves with the reference on success, null if cancelled. */
export async function payWithPaystack(opts: { email: string; amountNaira: number; metadata: Record<string, unknown> }): Promise<string | null> {
  await loadScript();
  if (!window.PaystackPop) throw new Error("Paystack unavailable");
  const Pop = window.PaystackPop;
  return new Promise((resolve) => {
    new Pop().newTransaction({
      key: paystackKey,
      email: opts.email,
      amount: Math.round(opts.amountNaira * 100),
      currency: "NGN",
      metadata: opts.metadata,
      onSuccess: (tx) => resolve(tx.reference),
      onCancel: () => resolve(null),
    });
  });
}
