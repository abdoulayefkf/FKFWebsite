import "server-only";
import { createClient } from "@/lib/supabase/server";

export type AppUser = { id: string; firstName: string; lastName: string; email: string; phone: string | null; profilePhoto: string | null; role: "OWNER"|"ADMINISTRATOR"|"EDITOR"; status: "ACTIVE"|"SUSPENDED"|"DISABLED"|"INVITED"; lastLogin: string|null; createdAt: string; updatedAt: string; createdById: string|null; twoFactorEnabled: boolean; mustChangePassword: boolean; lockedUntil: string|null };
const mapProfile = (p: Record<string, unknown>): AppUser => ({ id:p.id as string, firstName:p.first_name as string, lastName:p.last_name as string, email:p.email as string, phone:p.phone as string|null, profilePhoto:p.profile_photo as string|null, role:p.role as AppUser["role"], status:p.status as AppUser["status"], lastLogin:p.last_login as string|null, createdAt:p.created_at as string, updatedAt:p.updated_at as string, createdById:p.created_by as string|null, twoFactorEnabled:Boolean(p.two_factor_enabled), mustChangePassword:Boolean(p.must_change_password), lockedUntil:p.locked_until as string|null });

export async function currentUser() {
  const supabase = await createClient(); const { data: { user } } = await supabase.auth.getUser(); if (!user) return null;
  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single(); if (!data) return null; return mapProfile(data);
}
export async function requireOwner() {
  const user = await currentUser(); if (!user) return { error: Response.json({ error:"Authentication required" },{status:401}) } as const;
  if (user.role !== "OWNER" || user.status !== "ACTIVE") return { error: Response.json({ error:"Owner access required" },{status:403}) } as const; return { user } as const;
}
export { mapProfile };
