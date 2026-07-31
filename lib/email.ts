import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { z } from "zod";

const WEBSITE_URL = "https://franciskoromafoundation.org";
const FALLBACK_INBOX = "info@franciskoromafoundation.org";
const emailAddress = z.string().trim().toLowerCase().email().max(254);

type EmailType = "admin_invitation" | "account_activation" | "password_reset" | "contact_notification" | "contact_confirmation" | "volunteer_confirmation" | "donation_receipt" | "event_confirmation";
type Message = { to: string; subject: string; type: EmailType; relatedRecordId?: string; html: string; text: string };
type EmailEnv = CloudflareEnv & { EMAIL_LOGS: D1Database; GOOGLE_CLIENT_ID: string; GOOGLE_CLIENT_SECRET: string; GOOGLE_REFRESH_TOKEN: string; GOOGLE_SENDER_EMAIL: string; GOOGLE_REPLY_TO?: string };

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]!);
const encodeHeader = (value: string) => `=?UTF-8?B?${Buffer.from(value).toString("base64")}?=`;

function brandedTemplate(preheader: string, heading: string, content: string, action?: { label: string; url: string }) {
  const safeAction = action && /^https:\/\/franciskoromafoundation\.org(?:\/|$)/.test(action.url) ? action : undefined;
  return `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head><body style="margin:0;background:#f4f4f1;font-family:Arial,sans-serif;color:#111827"><div style="display:none;max-height:0;overflow:hidden">${escapeHtml(preheader)}</div><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f1"><tr><td align="center" style="padding:28px 12px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#fff;border-radius:14px;overflow:hidden"><tr><td style="background:#071b14;padding:24px;text-align:center"><img src="${WEBSITE_URL}/fkf-logo.png" width="76" alt="Francis Koroma Foundation" style="display:block;margin:auto;max-width:76px"><div style="color:#e1b726;font-size:13px;font-weight:bold;letter-spacing:1.5px;margin-top:10px">FRANCIS KOROMA FOUNDATION</div></td></tr><tr><td style="padding:34px 30px"><h1 style="font-size:27px;line-height:1.25;margin:0 0 18px;color:#071b14">${escapeHtml(heading)}</h1><div style="font-size:16px;line-height:1.7;color:#374151">${content}</div>${safeAction ? `<p style="margin:28px 0 8px"><a href="${safeAction.url}" style="display:inline-block;background:#d4a501;color:#071b14;text-decoration:none;font-weight:bold;padding:13px 21px;border-radius:7px">${escapeHtml(safeAction.label)}</a></p>` : ""}</td></tr><tr><td style="background:#f8f7f2;padding:22px 30px;font-size:12px;line-height:1.6;color:#6b7280">Francis Koroma Foundation · 501(c)(3) nonprofit<br><a href="${WEBSITE_URL}" style="color:#526b5c">franciskoromafoundation.org</a> · <a href="mailto:${FALLBACK_INBOX}" style="color:#526b5c">${FALLBACK_INBOX}</a></td></tr></table></td></tr></table></body></html>`;
}

async function accessToken(env: EmailEnv) {
  const response = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ client_id: env.GOOGLE_CLIENT_ID, client_secret: env.GOOGLE_CLIENT_SECRET, refresh_token: env.GOOGLE_REFRESH_TOKEN, grant_type: "refresh_token" }) });
  if (!response.ok) throw new Error(`Google OAuth token refresh failed (${response.status})`);
  const payload = await response.json() as { access_token?: string }; if (!payload.access_token) throw new Error("Google OAuth response contained no access token"); return payload.access_token;
}

function mime(message: Message, env: EmailEnv) {
  const senderAddress = emailAddress.parse(env.GOOGLE_SENDER_EMAIL); const replyTo = emailAddress.parse(env.GOOGLE_REPLY_TO || senderAddress); const boundary = `fkf-${crypto.randomUUID()}`;
  const raw = [`From: ${encodeHeader("FKF Foundation")} <${senderAddress}>`, `Reply-To: ${replyTo}`, `To: ${message.to}`, `Subject: ${encodeHeader(message.subject)}`, "MIME-Version: 1.0", `Content-Type: multipart/alternative; boundary="${boundary}"`, "", `--${boundary}`, "Content-Type: text/plain; charset=UTF-8", "Content-Transfer-Encoding: base64", "", Buffer.from(message.text).toString("base64"), `--${boundary}`, "Content-Type: text/html; charset=UTF-8", "Content-Transfer-Encoding: base64", "", Buffer.from(message.html).toString("base64"), `--${boundary}--`].join("\r\n");
  return Buffer.from(raw).toString("base64url");
}

async function updateLog(db: D1Database, id: string, status: string, providerId: string | null, error: string | null) {
  try { await db.prepare("UPDATE email_logs SET status = ?1, provider_message_id = ?2, error_message = ?3, sent_at = ?4 WHERE id = ?5").bind(status, providerId, error?.slice(0, 1000) || null, status === "sent" ? new Date().toISOString() : null, id).run(); } catch (logError) { console.error("Email log update failed", logError); }
}

async function deliver(message: Message, env: EmailEnv) {
  const recipient = emailAddress.parse(message.to); const sender = emailAddress.parse(env.GOOGLE_SENDER_EMAIL); const id = crypto.randomUUID(); const createdAt = new Date().toISOString();
  try { await env.EMAIL_LOGS.prepare("INSERT INTO email_logs (id, recipient, sender, subject, email_type, related_record_id, status, created_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6, 'pending', ?7)").bind(id, recipient, sender, message.subject, message.type, message.relatedRecordId || null, createdAt).run(); } catch (error) { console.error("Email log insert failed", error); }
  let lastError = "Unknown Gmail error";
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const token = await accessToken(env); const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", { method: "POST", headers: { authorization: `Bearer ${token}`, "content-type": "application/json" }, body: JSON.stringify({ raw: mime({ ...message, to: recipient }, env) }) });
      if (response.ok) { const result = await response.json() as { id?: string }; await updateLog(env.EMAIL_LOGS, id, "sent", result.id || null, null); return; }
      lastError = `Gmail API ${response.status}: ${(await response.text()).slice(0, 500)}`; if (![408, 429, 500, 502, 503, 504].includes(response.status)) break;
    } catch (error) { lastError = error instanceof Error ? error.message : "Network failure"; }
    await new Promise(resolve => setTimeout(resolve, 250 * 2 ** attempt));
  }
  await updateLog(env.EMAIL_LOGS, id, "failed", null, lastError); console.error("Email delivery failed", { id, type: message.type, error: lastError });
}

function background(message: Message) {
  emailAddress.parse(message.to); const { env, ctx } = getCloudflareContext(); ctx.waitUntil(deliver(message, env as EmailEnv));
}

export function sendAdminInvitation(input: { recipient: string; firstName: string; activationUrl: string; relatedRecordId?: string }) { const name = escapeHtml(input.firstName); background({ to: input.recipient, type: "admin_invitation", relatedRecordId: input.relatedRecordId, subject: "Activate your FKF administrator account", text: `Hello ${input.firstName}, activate your FKF account within 24 hours: ${input.activationUrl}`, html: brandedTemplate("Your FKF account is ready", "Welcome to the FKF team", `<p>Hello ${name},</p><p>An administrator account has been created for you. Activate it and choose a secure password within 24 hours.</p>`, { label: "Activate account", url: input.activationUrl }) }); }
export function sendAccountActivation(input: { recipient: string; firstName: string; activationUrl: string; relatedRecordId?: string }) { background({ to: input.recipient, type: "account_activation", relatedRecordId: input.relatedRecordId, subject: "Activate your FKF account", text: `Hello ${input.firstName}, activate your account: ${input.activationUrl}`, html: brandedTemplate("Activate your account", "Complete your account activation", `<p>Hello ${escapeHtml(input.firstName)},</p><p>Use the secure link below to activate your FKF account.</p>`, { label: "Activate account", url: input.activationUrl }) }); }
export function sendPasswordReset(input: { recipient: string; firstName: string; resetUrl: string; relatedRecordId?: string }) { background({ to: input.recipient, type: "password_reset", relatedRecordId: input.relatedRecordId, subject: "Reset your FKF password", text: `Reset your password: ${input.resetUrl}`, html: brandedTemplate("Password reset requested", "Reset your password", `<p>Hello ${escapeHtml(input.firstName)},</p><p>Use this secure link to reset your password. If you did not request this, contact the Foundation.</p>`, { label: "Reset password", url: input.resetUrl }) }); }
export function sendContactNotification(input: { visitorEmail: string; visitorName: string; message: string; relatedRecordId: string }) { const inbox = FALLBACK_INBOX; background({ to: inbox, type: "contact_notification", relatedRecordId: input.relatedRecordId, subject: "New website contact message", text: `${input.visitorName} (${input.visitorEmail}) wrote:\n\n${input.message}`, html: brandedTemplate("New contact form submission", "New website message", `<p><strong>From:</strong> ${escapeHtml(input.visitorName)} (${escapeHtml(input.visitorEmail)})</p><p>${escapeHtml(input.message).replace(/\n/g,"<br>")}</p>`) }); }
export function sendContactConfirmation(input: { recipient: string; firstName: string; relatedRecordId: string }) { background({ to: input.recipient, type: "contact_confirmation", relatedRecordId: input.relatedRecordId, subject: "We received your message", text: `Hello ${input.firstName}, thank you for contacting the Francis Koroma Foundation.`, html: brandedTemplate("We received your message", "Thank you for contacting us", `<p>Hello ${escapeHtml(input.firstName)},</p><p>Our team has received your message and will respond as soon as possible.</p>`) }); }
export function sendVolunteerConfirmation(input: { recipient: string; firstName: string; relatedRecordId: string }) { background({ to: input.recipient, type: "volunteer_confirmation", relatedRecordId: input.relatedRecordId, subject: "Your FKF volunteer application", text: `Hello ${input.firstName}, we received your volunteer application.`, html: brandedTemplate("Volunteer application received", "Thank you for volunteering", `<p>Hello ${escapeHtml(input.firstName)},</p><p>We received your application and appreciate your interest in serving with FKF.</p>`) }); }
export function sendDonationReceipt(input: { recipient: string; firstName: string; amount: string; receiptNumber: string; relatedRecordId: string }) { background({ to: input.recipient, type: "donation_receipt", relatedRecordId: input.relatedRecordId, subject: `Donation receipt ${input.receiptNumber}`, text: `Thank you, ${input.firstName}. Donation: ${input.amount}. Receipt: ${input.receiptNumber}.`, html: brandedTemplate("Thank you for your support", "Donation receipt", `<p>Hello ${escapeHtml(input.firstName)},</p><p>Thank you for your donation of <strong>${escapeHtml(input.amount)}</strong>.</p><p>Receipt number: ${escapeHtml(input.receiptNumber)}</p>`) }); }
export function sendEventConfirmation(input: { recipient: string; firstName: string; eventName: string; eventDetails: string; relatedRecordId: string }) { background({ to: input.recipient, type: "event_confirmation", relatedRecordId: input.relatedRecordId, subject: `Registration confirmed: ${input.eventName}`, text: `${input.firstName}, your registration for ${input.eventName} is confirmed. ${input.eventDetails}`, html: brandedTemplate("Event registration confirmed", `You're registered for ${input.eventName}`, `<p>Hello ${escapeHtml(input.firstName)},</p><p>Your registration is confirmed.</p><p>${escapeHtml(input.eventDetails)}</p>`) }); }
