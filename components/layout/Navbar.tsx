"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const groups = [
  { label: "Who We Are", links: [["About the Foundation", "/about"], ["Founder", "/about/founder"], ["Leadership", "/about/leadership"], ["Board of Directors", "/about/board-of-directors"]] },
  { label: "Programs", links: [["Foundation Programs", "/programs"], ["Mentorship Program", "/programs/mentorship"], ["Scholarship Program", "/programs/scholarship"], ["Community Service", "/programs/community-service"], ["Speaker Series", "/programs/speaker-series"]] },
  { label: "Media & Resources", links: [["Impact News", "/impact-news"], ["Gallery", "/gallery"], ["Videos", "/videos"], ["Resources", "/resources"], ["Annual Reports", "/annual-reports"]] },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/95 shadow-sm backdrop-blur">
    <a href="#main-content" className="sr-only z-[60] bg-black px-4 py-3 text-white focus:not-sr-only focus:absolute focus:left-3 focus:top-3">Skip to content</a>
    <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-5 sm:px-8">
      <Link href="/" aria-label="Francis Koroma Foundation home" className="rounded outline-offset-4 focus-visible:outline-2 focus-visible:outline-black"><Image src="/fkf-logo.png" alt="Francis Koroma Foundation" width={92} height={76} priority className="h-20 w-auto object-contain" /></Link>
      <nav aria-label="Primary navigation" className="hidden items-center gap-5 xl:flex">
        <Link href="/" className={`nav-link ${active("/") ? "text-[#9b7600]" : ""}`}>Home</Link>
        {groups.map(group => <div key={group.label} className="group relative"><button className="nav-link flex items-center gap-1" aria-haspopup="true">{group.label}<ChevronDown aria-hidden="true" className="size-4 transition group-hover:rotate-180 group-focus-within:rotate-180" /></button><div className="invisible absolute left-0 top-full w-64 translate-y-2 rounded-xl border border-black/10 bg-white p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">{group.links.map(([label, href]) => <Link key={href} href={href} className="block rounded-lg px-4 py-3 text-sm hover:bg-amber-50 focus:bg-amber-50 focus:outline-none">{label}</Link>)}</div></div>)}
        <Link href="/volunteer" className="nav-link">Volunteer</Link><Link href="/contact" className="nav-link">Contact</Link><Link href="/donate" className="rounded-md bg-[#d4a501] px-5 py-3 font-bold text-black transition hover:bg-[#e1b726] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">Donate</Link>
      </nav>
      <button type="button" className="rounded-lg p-3 xl:hidden" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav id="mobile-navigation" aria-label="Mobile navigation" className="max-h-[calc(100dvh-6rem)] overflow-y-auto border-t bg-white px-5 py-5 xl:hidden"><Link href="/" className="block rounded-lg px-3 py-3 font-semibold">Home</Link>{groups.map(group => <details key={group.label} className="group"><summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-3 font-semibold">{group.label}<ChevronDown className="size-4 group-open:rotate-180" /></summary><div className="ml-3 border-l border-amber-300 pl-3">{group.links.map(([label, href]) => <Link key={href} href={href} className="block rounded-lg px-3 py-3">{label}</Link>)}</div></details>)}<Link href="/volunteer" className="block rounded-lg px-3 py-3 font-semibold">Volunteer</Link><Link href="/contact" className="block rounded-lg px-3 py-3 font-semibold">Contact</Link><Link href="/donate" className="mt-3 block rounded-md bg-[#d4a501] px-5 py-3 text-center font-bold text-black">Donate</Link></nav>}
  </header>;
}
