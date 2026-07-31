import "server-only";
import { createHash, randomBytes } from "crypto";
import { cookies, headers } from "next/headers";

const attempts = new Map<string, { count: number; resetAt: number }>();
export function rateLimit(key: string, limit = 10, windowMs = 60_000) {
  const now = Date.now(); const item = attempts.get(key);
  if (!item || item.resetAt <= now) { attempts.set(key, { count: 1, resetAt: now + windowMs }); return true; }
  item.count += 1; return item.count <= limit;
}
export async function requestIp() {
  const h = await headers(); return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}
export async function issueCsrfToken() {
  const jar = await cookies(); let token = jar.get("fkf_csrf")?.value;
  if (!token) { token = randomBytes(32).toString("hex"); jar.set("fkf_csrf", token, { httpOnly: false, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/" }); }
  return token;
}
export async function validCsrf(request: Request) {
  const cookie = (await cookies()).get("fkf_csrf")?.value;
  const supplied = request.headers.get("x-csrf-token");
  return Boolean(cookie && supplied && cookie === supplied);
}
export const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");
