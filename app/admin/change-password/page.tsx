import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { ChangePasswordForm } from "@/components/admin/ChangePasswordForm";
export default async function ChangePasswordPage(){if(!await currentUser())redirect("/admin/login");return <main className="min-h-screen bg-slate-50 px-5 py-10"><ChangePasswordForm/></main>}
