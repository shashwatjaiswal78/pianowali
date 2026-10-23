import "server-only";
import nodemailer from "nodemailer";
import { brand, welcomeEmail as copy } from "@/content/site";

/* Email goes out from Simran's Gmail through an app password, so each one
 * also lands in her Sent folder and replies come straight to her.
 *
 * If the Gmail password is ever changed, Google cancels the app password and
 * sending stops until a new one is set as GMAIL_APP_PASSWORD on Vercel. */

function env(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable ${name}`);
  return v;
}

function transport() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: env("GMAIL_USER"), pass: env("GMAIL_APP_PASSWORD") },
  });
}

const from = () => `"${brand.name} · ${brand.siteName}" <${env("GMAIL_USER")}>`;

/* Names and addresses come from the checkout form — escape them. */
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/* Email clients don't read CSS variables, so the palette from
 * app/globals.css is repeated here as hex. */
const c = {
  navy: "#0d101b",
  lavender: "#f3f2fa",
  rose: "#f5225b",
  roseCta: "#e01050",
  ink: "#0d101b",
  inkMuted: "#4e5266",
  line: "#e2e0ee",
  gold: "#f4c84d",
};

function button(href: string, label: string, bg: string, fg = "#ffffff") {
  return `<a href="${esc(href)}" style="display:inline-block;background:${bg};color:${fg};font-weight:700;font-size:16px;line-height:1;text-decoration:none;padding:16px 26px;border-radius:10px">${esc(label)}</a>`;
}

function layout(body: string) {
  return `<!doctype html><html><body style="margin:0;background:${c.lavender};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${c.ink}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${c.lavender};padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid ${c.line}">
<tr><td style="background:${c.navy};padding:22px 28px;color:#ffffff;font-size:20px;font-weight:800;letter-spacing:-0.02em">${esc(brand.siteName)}<span style="color:${c.rose}">.</span></td></tr>
<tr><td style="height:6px;background:${c.rose}"></td></tr>
<tr><td style="padding:28px;font-size:16px;line-height:1.6">${body}</td></tr>
</table></td></tr></table></body></html>`;
}

const p = (html: string, style = "") =>
  `<p style="margin:0 0 16px;${style}">${html}</p>`;

export async function sendWelcome(opts: {
  name: string;
  to: string;
  gmail: string;
  folderUrl: string;
  whatsappGroup?: string;
}) {
  const { name, to, gmail, folderUrl, whatsappGroup } = opts;

  const community = whatsappGroup
    ? `<div style="margin:24px 0;padding:20px;border-radius:12px;background:${c.lavender}">
${p(`<strong>${esc(copy.community.title)}</strong>`, "margin-bottom:6px")}
${p(esc(copy.community.body), `color:${c.inkMuted}`)}
${button(whatsappGroup, copy.community.buttonLabel, c.gold, c.navy)}</div>`
    : "";

  const html = layout(`
${p(esc(copy.greeting(name)))}
${p(esc(copy.intro))}
<p style="margin:24px 0">${button(folderUrl, copy.buttonLabel, c.roseCta)}</p>
${p(esc(copy.accessNote(gmail)), `font-size:14px;color:${c.inkMuted}`)}
${community}
${p(esc(copy.start))}
${p(`${esc(copy.signoff)}<br><strong>${esc(copy.signature)}</strong>`)}
${p(esc(copy.footer), `font-size:14px;color:${c.inkMuted};border-top:1px solid ${c.line};padding-top:16px;margin:0`)}`);

  const text = [
    copy.greeting(name),
    "",
    copy.intro,
    "",
    `${copy.buttonLabel}: ${folderUrl}`,
    "",
    copy.accessNote(gmail),
    ...(whatsappGroup
      ? ["", `${copy.community.title}: ${whatsappGroup}`]
      : []),
    "",
    copy.start,
    "",
    copy.signoff,
    copy.signature,
    "",
    copy.footer,
  ].join("\n");

  await transport().sendMail({
    from: from(),
    to,
    /* The access address too, if it differs from the checkout email */
    cc: gmail !== to ? gmail : undefined,
    subject: copy.subject,
    html,
    text,
  });
}

/* When the access address can't be shared with (not a Google account). */
export async function sendNeedsGmail(opts: { name: string; to: string; gmail: string }) {
  const body = copy.needsGmail.body(opts.gmail);
  await transport().sendMail({
    from: from(),
    to: opts.to,
    subject: copy.needsGmail.subject,
    html: layout(`${p(esc(copy.greeting(opts.name)))}${p(esc(body))}${p(`${esc(copy.signoff)}<br><strong>${esc(copy.signature)}</strong>`)}`),
    text: [copy.greeting(opts.name), "", body, "", copy.signoff, copy.signature].join("\n"),
  });
}

/* A short note to Simran. Never throws: an alert failing must not hide the
 * error that caused it. */
export async function sendAdminAlert(subject: string, lines: string[]) {
  try {
    await transport().sendMail({
      from: from(),
      to: process.env.ADMIN_EMAIL || env("GMAIL_USER"),
      subject: `[${brand.siteName}] ${subject}`,
      text: lines.join("\n"),
    });
  } catch (err) {
    console.error("Admin alert failed:", (err as Error).message);
  }
}
