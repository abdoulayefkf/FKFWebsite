import "server-only";
import { createClient } from "@supabase/supabase-js";
export function createAdminClient() {
  const serverKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  if (!serverKey) throw new Error("A server-only Supabase key is required");
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serverKey, { auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false } });
}
