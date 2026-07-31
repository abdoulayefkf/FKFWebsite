import { Suspense } from "react";
import { ActivationForm } from "@/components/admin/ActivationForm";
export default function ActivatePage() { return <main className="min-h-screen bg-slate-50 px-5 py-10"><Suspense><ActivationForm /></Suspense></main>; }
