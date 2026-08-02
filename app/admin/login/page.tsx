import { redirect } from "next/navigation";
import { adminHome, currentUser, isStaff } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";
export default async function LoginPage() { const user = await currentUser(); if (isStaff(user)) redirect(user.mustChangePassword ? "/admin/change-password" : adminHome(user)); return <main className="min-h-screen bg-slate-50 px-5 py-10"><LoginForm /></main>; }
