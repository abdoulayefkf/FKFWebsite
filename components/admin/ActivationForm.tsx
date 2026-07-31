"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
export function ActivationForm() { const token = useSearchParams().get("token"); const router = useRouter(); const [csrf, setCsrf] = useState(""); const [message, setMessage] = useState("");
  useEffect(() => { fetch("/api/auth/csrf").then(r => r.json()).then(d => setCsrf(d.csrfToken)); }, []);
  async function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); const f = new FormData(e.currentTarget); if (f.get("password") !== f.get("confirm")) return setMessage("Passwords do not match");
    const r = await fetch("/api/auth/activate", { method: "POST", headers: { "content-type": "application/json", "x-csrf-token": csrf }, body: JSON.stringify({ token, password: f.get("password") }) }); const d = await r.json(); if (!r.ok) return setMessage(d.error); setMessage("Account activated. Redirecting to sign in…"); setTimeout(() => router.push("/admin/login"), 1000);
  }
  return <form onSubmit={submit} className="mx-auto mt-24 max-w-md space-y-5 rounded-2xl bg-white p-8 shadow-xl"><h1 className="text-3xl font-bold">Activate account</h1><p className="text-sm text-slate-600">Create a password with 12+ characters, uppercase, lowercase, a number and a symbol.</p><input name="password" type="password" required placeholder="New password" className="w-full rounded-lg border p-3"/><input name="confirm" type="password" required placeholder="Confirm password" className="w-full rounded-lg border p-3"/>{message && <p className="text-sm text-slate-700">{message}</p>}<button disabled={!token || !csrf} className="w-full rounded-lg bg-emerald-700 p-3 font-semibold text-white disabled:opacity-50">Activate account</button></form>;
}
