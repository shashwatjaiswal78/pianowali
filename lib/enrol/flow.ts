import "server-only";
import { folderUrl, shareFolder, unshareFolder } from "./drive";
import { sendAdminAlert, sendNeedsGmail, sendWelcome } from "./mail";
import {
  addNotes,
  buyerFromPayment,
  getPayment,
  isCoursePayment,
  notesOf,
  recentPayments,
} from "./razorpay";

/* What happens after Razorpay tells us about a payment or a refund. Each step
 * re-reads the payment from Razorpay rather than trusting the webhook body,
 * and each is safe to run twice: Razorpay retries any webhook that fails.
 *
 * Logs carry payment IDs only — never names or addresses. */

/* Drive refuses to share with an address that has no Google account. */
function isNotGoogleAccount(err: unknown) {
  const e = err as { code?: number; errors?: Array<{ reason?: string }> };
  return e.code === 400 && e.errors?.some((x) => x.reason === "invalidSharingRequest");
}

export async function grantAccess(paymentId: string) {
  const payment = await getPayment(paymentId);

  if (payment.status !== "captured" || !isCoursePayment(payment)) {
    console.info(`grant: ${paymentId} is not a captured course payment — ignored`);
    return "ignored";
  }
  if (notesOf(payment).access_sent) {
    console.info(`grant: ${paymentId} already handled`);
    return "already-sent";
  }

  const buyer = buyerFromPayment(payment);
  const details = [
    `Payment: ${payment.id} (₹${payment.amount / 100})`,
    `Name: ${buyer.name || "—"}`,
    `Checkout email: ${buyer.email || "—"}`,
    `Access Gmail: ${buyer.gmail || "—"}`,
    `Phone: ${payment.contact ?? "—"}`,
  ];

  if (!buyer.gmail) {
    await addNotes(payment, { access_sent: "no_email" });
    await sendAdminAlert("Payment with no email address — share access by hand", details);
    return "no-email";
  }

  try {
    await shareFolder(buyer.gmail);
  } catch (err) {
    if (!isNotGoogleAccount(err)) throw err;
    await sendNeedsGmail({ name: buyer.name, to: buyer.email || buyer.gmail, gmail: buyer.gmail });
    await addNotes(payment, { access_sent: "needs_gmail" });
    await sendAdminAlert("Buyer needs a Gmail address — they've been asked to reply with one", [
      ...details,
      "",
      "Once they reply, add their Gmail as a Viewer on the course folder and send them the link.",
    ]);
    return "needs-gmail";
  }

  await sendWelcome({
    name: buyer.name,
    to: buyer.email || buyer.gmail,
    gmail: buyer.gmail,
    folderUrl: folderUrl(),
    whatsappGroup: process.env.WHATSAPP_GROUP_LINK || undefined,
  });
  await addNotes(payment, { access_sent: "yes" });
  console.info(`grant: ${paymentId} access sent`);
  return "sent";
}

export async function revokeAccess(paymentId: string) {
  const payment = await getPayment(paymentId);
  if (!isCoursePayment(payment)) return "ignored";

  const buyer = buyerFromPayment(payment);
  const details = [
    `Payment: ${payment.id}`,
    `Refunded: ₹${payment.amount_refunded / 100} of ₹${payment.amount / 100}`,
    `Access Gmail: ${buyer.gmail || "—"}`,
  ];

  if (payment.amount_refunded < payment.amount) {
    await sendAdminAlert("Partial refund — course access kept", details);
    return "partial";
  }
  if (!buyer.gmail) return "no-email";

  /* Charged twice: the duplicate is refunded, but the other payment still
   * stands, so access stays. */
  const stillPaid = (await recentPayments()).some(
    (p) =>
      p.id !== payment.id &&
      p.status === "captured" &&
      p.amount_refunded === 0 &&
      isCoursePayment(p) &&
      buyerFromPayment(p).gmail === buyer.gmail,
  );
  if (stillPaid) {
    await sendAdminAlert("Refund processed — access kept (another payment from this buyer)", details);
    return "kept";
  }

  const removed = await unshareFolder(buyer.gmail);
  await sendAdminAlert(
    removed ? "Refund processed — course access removed" : "Refund processed — buyer had no access to remove",
    details,
  );
  console.info(`revoke: ${paymentId} ${removed ? "access removed" : "nothing to remove"}`);
  return removed ? "revoked" : "nothing-to-remove";
}
