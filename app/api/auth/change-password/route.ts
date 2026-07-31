import { currentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { audit } from "@/lib/audit";
import { validCsrf } from "@/lib/security";
import { strongPassword } from "@/lib/user-validation";
export async function POST(request:Request){const user=await currentUser();if(!user)return Response.json({error:"Authentication required"},{status:401});if(!await validCsrf(request))return Response.json({error:"Invalid CSRF token"},{status:403});const body=await request.json().catch(()=>null) as {newPassword?:string}|null;if(!strongPassword.safeParse(body?.newPassword).success)return Response.json({error:"Use a 12+ character password with uppercase, lowercase, number, and symbol"},{status:400});const {error}=await(await createClient()).auth.updateUser({password:body!.newPassword});if(error)return Response.json({error:error.message},{status:400});await createAdminClient().from("profiles").update({must_change_password:false,status:"ACTIVE"}).eq("id",user.id);await audit("PASSWORD_CHANGED",user.id,user.id);return Response.json({ok:true,role:user.role})}
