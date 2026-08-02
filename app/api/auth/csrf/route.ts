import { issueCsrfToken } from "@/lib/security";
export async function GET() {
  return Response.json(
    { csrfToken: await issueCsrfToken() },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
