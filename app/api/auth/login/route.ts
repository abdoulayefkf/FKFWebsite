import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { audit } from "@/lib/audit";
import { rateLimit, requestIp, validCsrf } from "@/lib/security";

export async function POST(request: Request) {
  if (!(await validCsrf(request))) return Response.json({ error: "Invalid CSRF token" }, { status: 403 });
  if (!rateLimit(`login:${await requestIp()}`, 10, 15 * 60_000)) return Response.json({ error: "Too many attempts" }, { status: 429 });
  const body = await request.json().catch(() => null) as { email?: string; password?: string } | null;
  if (!body?.email || !body.password) return Response.json({ error: "Email and password are required" }, { status: 400 });

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email: body.email.trim().toLowerCase(), password: body.password });
  if (error || !data.user) return Response.json({ error: "Invalid email or password" }, { status: 401 });

  // Use the authenticated user's session and the "read own profile" RLS policy.
  // Login must not depend on the server-only Supabase secret key.
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role,status,must_change_password,locked_until,first_name")
    .eq("id", data.user.id)
    .single();

  if (profileError || !profile) {
    await supabase.auth.signOut();
    return Response.json({ error: "Account profile is not configured. Contact the site Owner." }, { status: 403 });
  }
  if (profile.status !== "ACTIVE") {
    await supabase.auth.signOut();
    return Response.json({ error: `Account is ${profile.status.toLowerCase()}. Contact the site Owner.` }, { status: 403 });
  }
  if (profile.locked_until && new Date(profile.locked_until) > new Date()) {
    await supabase.auth.signOut();
    return Response.json({ error: "Account is temporarily locked." }, { status: 403 });
  }

  const admin = createAdminClient();
  await admin.from("profiles").update({ last_login: new Date().toISOString() }).eq("id", data.user.id);
  await audit("LOGIN_SUCCESS", data.user.id, data.user.id);
  return Response.json({ user: { id: data.user.id, firstName: profile.first_name, role: profile.role }, mustChangePassword: profile.must_change_password });
}
