import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { pricing } from "@/content/site";

/* Razorpay, over its REST API with Basic auth — small enough not to need the
 * SDK. Keys come from Vercel environment variables and never leave the
 * server. */

const API = "https://api.razorpay.com/v1";

export type Payment = {
  id: string;
  amount: number; // paise
  currency: string;
  status: string;
  email: string | null;
  contact: string | null;
  amount_refunded: number;
  notes: Record<string, string> | [];
};

export type Buyer = { name: string; email: string; gmail: string };

function env(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable ${name}`);
  return v;
}

/* Razorpay signs the raw request body with the webhook secret. Anything that
 * doesn't match is not from Razorpay. */
export function verifySignature(rawBody: string, signature: string | null) {
  if (!signature) return false;
  const expected = createHmac("sha256", env("RAZORPAY_WEBHOOK_SECRET"))
    .update(rawBody)
    .digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const auth = Buffer.from(
    `${env("RAZORPAY_KEY_ID")}:${env("RAZORPAY_KEY_SECRET")}`,
  ).toString("base64");
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Razorpay ${init?.method ?? "GET"} ${path} → ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const getPayment = (id: string) =>
  api<Payment>(`/payments/${encodeURIComponent(id)}`);

/* Razorpay replaces the whole notes object on update, so merge first. */
export async function addNotes(payment: Payment, extra: Record<string, string>) {
  await api(`/payments/${encodeURIComponent(payment.id)}`, {
    method: "PATCH",
    body: JSON.stringify({ notes: { ...notesOf(payment), ...extra } }),
  });
}

/* The most recent payments — enough, at this volume, to spot a second
 * payment from the same buyer when one is refunded. */
export async function recentPayments() {
  const res = await api<{ items: Payment[] }>("/payments?count=100");
  return res.items;
}

/* Razorpay sends an empty array, not an object, when there are no notes. */
export function notesOf(p: Payment): Record<string, string> {
  return Array.isArray(p.notes) ? {} : p.notes;
}

/* The prices this course sells at, in paise: today's price, and the original
 * price for when the launch offer ends. */
export function isCoursePayment(p: Payment) {
  const toPaise = (rupees: string) => Number(rupees.replace(/,/g, "")) * 100;
  const prices = [pricing.price, pricing.originalPrice]
    .filter((x): x is string => Boolean(x))
    .map(toPaise);
  return p.currency === "INR" && prices.includes(p.amount);
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* The Payment Page's custom fields arrive in `notes`, keyed by a slug of each
 * field's label. Match loosely so renaming a label doesn't break delivery:
 * any key with "gmail" or "google" is the access address, any key with
 * "name" is the name. With no separate Gmail field, the checkout email is
 * used. */
export function buyerFromPayment(p: Payment): Buyer {
  const notes = notesOf(p);
  const find = (re: RegExp) =>
    Object.entries(notes).find(([k, v]) => re.test(k) && v?.trim())?.[1]?.trim() ?? "";

  const email = (p.email ?? "").trim().toLowerCase();
  const gmailNote = find(/gmail|google/i).toLowerCase();
  const gmail = EMAIL.test(gmailNote) ? gmailNote : email;
  const name = find(/name/i).split(/\s+/)[0] ?? "";
  return { name, email, gmail };
}
