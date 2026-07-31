import { z } from "zod";
import { rateLimit, requestIp, validCsrf } from "@/lib/security";
import { sendContactConfirmation, sendContactNotification } from "@/lib/email";

const contactSchema = z.object({ firstName: z.string().trim().min(1).max(80), lastName: z.string().trim().min(1).max(80), email: z.string().trim().toLowerCase().email().max(254), message: z.string().trim().min(10).max(4000), website: z.string().max(0) });

export async function POST(request: Request) {
  if (!(await validCsrf(request))) return Response.json({ error: "Invalid request" }, { status: 403 });
  const ip = await requestIp(); if (!rateLimit(`contact:${ip}`, 3, 15 * 60_000)) return Response.json({ error: "Too many messages. Please try again later." }, { status: 429 });
  const parsed = contactSchema.safeParse(await request.json().catch(() => null)); if (!parsed.success) return Response.json({ error: "Please check the form fields." }, { status: 400 });
  const recordId = crypto.randomUUID(); const visitorName = `${parsed.data.firstName} ${parsed.data.lastName}`;
  sendContactNotification({ visitorEmail: parsed.data.email, visitorName, message: parsed.data.message, relatedRecordId: recordId });
  sendContactConfirmation({ recipient: parsed.data.email, firstName: parsed.data.firstName, relatedRecordId: recordId });
  return Response.json({ ok: true, reference: recordId }, { status: 202 });
}
