import "server-only";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { requestIp } from "@/lib/security";
export async function audit(action:string, actorId?:string, targetUserId?:string, details?:object) { const h=await headers(); const { error }=await createAdminClient().from("audit_logs").insert({action,actor_id:actorId||null,target_user_id:targetUserId||null,details:details||null,ip_address:await requestIp(),user_agent:h.get("user-agent")}); if(error) console.error("Audit write failed",error.message); }
