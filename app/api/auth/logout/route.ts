import { createClient } from "@/lib/supabase/server";
import { currentUser } from "@/lib/auth";
import { audit } from "@/lib/audit";
import { validCsrf } from "@/lib/security";
export async function POST(request:Request){if(!await validCsrf(request))return Response.json({error:"Invalid CSRF token"},{status:403});const user=await currentUser();if(user)await audit("LOGOUT",user.id,user.id);await(await createClient()).auth.signOut();return Response.json({ok:true})}
