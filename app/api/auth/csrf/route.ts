import { issueCsrfToken } from "@/lib/security";
export async function GET() { return Response.json({ csrfToken: await issueCsrfToken() }); }
