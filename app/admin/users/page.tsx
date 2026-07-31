import { redirect } from "next/navigation";
import { currentUser, mapProfile } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { issueCsrfToken } from "@/lib/security";
import { UserManager } from "@/components/admin/UserManager";
export default async function UsersPage(){const owner=await currentUser();if(!owner)redirect("/admin/login");if(owner.mustChangePassword)redirect("/admin/change-password");if(owner.role!=="OWNER"||owner.status!=="ACTIVE")redirect("/");const{data}=await createAdminClient().from("profiles").select("*").order("created_at",{ascending:false});const users=(data||[]).map(mapProfile);return <main className="min-h-screen bg-slate-50 px-5 py-28"><div className="mx-auto max-w-7xl"><div className="mb-8"><p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">Owner dashboard</p><h1 className="text-4xl font-bold text-slate-950">User management</h1><p className="mt-2 text-slate-600">Signed in as {owner.firstName} {owner.lastName}</p></div><UserManager initialUsers={users} csrfToken={await issueCsrfToken()}/></div></main>}
