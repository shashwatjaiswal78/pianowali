import { grantAccess, revokeAccess } from "@/lib/enrol/flow";
import { sendAdminAlert } from "@/lib/enrol/mail";
import { verifySignature } from "@/lib/enrol/razorpay";

/* Razorpay calls this after a payment or a refund. Subscribe the webhook to
 * `payment_page.paid` (or `payment.captured`) and `refund.processed`.
 *
 * A non-2xx reply makes Razorpay retry for up to 24 hours, which is what we
 * want when Drive or Gmail has a hiccup — every step is safe to repeat. */

type Webhook = {
  event: string;
  payload: {
    payment?: { entity: { id: string } };
    refund?: { entity: { payment_id: string } };
  };
};

export async function POST(req: Request) {
  const raw = await req.text();
  if (!verifySignature(raw, req.headers.get("x-razorpay-signature"))) {
    return new Response("Invalid signature", { status: 400 });
  }

  let body: Webhook;
  try {
    body = JSON.parse(raw);
  } catch {
    return new Response("Bad JSON", { status: 400 });
  }

  const { event, payload } = body;
  const paymentId =
    event === "refund.processed" ? payload.refund?.entity.payment_id : payload.payment?.entity.id;

  try {
    if ((event === "payment_page.paid" || event === "payment.captured") && paymentId) {
      const result = await grantAccess(paymentId);
      return Response.json({ ok: true, result });
    }
    if (event === "refund.processed" && paymentId) {
      const result = await revokeAccess(paymentId);
      return Response.json({ ok: true, result });
    }
    return Response.json({ ok: true, result: "event-ignored" });
  } catch (err) {
    console.error(`webhook ${event} ${paymentId ?? "?"} failed:`, (err as Error).message);
    await sendAdminAlert(`Course access step failed (${event})`, [
      `Payment: ${paymentId ?? "unknown"}`,
      `Error: ${(err as Error).message}`,
      "",
      "Razorpay will retry automatically for 24 hours. If this keeps happening,",
      "share the course folder with the buyer by hand and check the Vercel logs.",
    ]);
    return new Response("Failed — will retry", { status: 500 });
  }
}
