import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";
export default async function LoginPage() { if (await currentUser()) redirect("/admin/users"); return <main className="min-h-screen bg-slate-50 px-5 py-10"><LoginForm /></main>; }
