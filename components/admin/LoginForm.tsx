"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export function LoginForm() {
  const router = useRouter(); const [csrf, setCsrf] = useState(""); const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  useEffect(() => { fetch("/api/auth/csrf").then(r => r.json()).then(d => setCsrf(d.csrfToken)); }, []);
  async function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); setBusy(true); setError(""); const f = new FormData(e.currentTarget);
    const response = await fetch("/api/auth/login", { method: "POST", headers: { "content-type": "application/json", "x-csrf-token": csrf }, body: JSON.stringify({ email: f.get("email"), password: f.get("password") }) }); const data = await response.json(); setBusy(false);
    if (!response.ok) return setError(data.error); router.push(data.mustChangePassword ? "/admin/change-password" : data.user.role === "OWNER" ? "/admin/users" : "/admin/storage"); router.refresh();
  }
  return <form onSubmit={submit} className="mx-auto mt-28 max-w-md space-y-5 rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
    <div><p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">FKF Administration</p><h1 className="mt-2 text-3xl font-bold text-slate-950">Secure sign in</h1><p className="mt-2 text-sm text-slate-500">Authorized staff accounts only.</p></div>
    <label className="block text-sm font-medium">Email<input name="email" type="email" required autoComplete="email" className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5" /></label>
    <label className="block text-sm font-medium">Password<input name="password" type="password" required autoComplete="current-password" className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5" /></label>
    {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    <button disabled={busy || !csrf} className="w-full rounded-lg bg-emerald-700 px-4 py-3 font-semibold text-white disabled:opacity-50">{busy ? "Signing in…" : "Sign in"}</button>
  </form>;
}
