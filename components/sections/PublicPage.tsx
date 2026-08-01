import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import type { SitePage } from "@/lib/site-content";
import type { CmsVideo } from "@/lib/cms";

export default function PublicPage({ page, videos=[] }: { page: SitePage; videos?:CmsVideo[] }) {
  const external = page.cta?.href.startsWith("http") || page.cta?.href.startsWith("mailto:");
  return <>
    <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} image={page.image} />
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="grid gap-8 lg:grid-cols-2">
        {page.sections.map((section, index) => (
          <section key={section.title} className={index % 2 ? "rounded-3xl bg-[#e1b726] p-8 text-black sm:p-12" : "rounded-3xl border border-black/10 bg-white p-8 shadow-sm sm:p-12"}>
            <h2 className="text-3xl font-bold tracking-tight">{section.title}</h2>
            <p className="mt-5 text-lg leading-8 opacity-80">{section.body}</p>
            {section.items && <ul className="mt-7 grid gap-3 sm:grid-cols-2">{section.items.map(item => <li key={item} className="flex items-center gap-3"><Check aria-hidden="true" className="size-5 shrink-0" />{item}</li>)}</ul>}
          </section>
        ))}
      </div>
      {videos.length>0&&<section className="mt-12"><h2 className="text-3xl font-bold">Latest videos</h2><div className="mt-6 grid gap-6 md:grid-cols-2">{videos.map(video=><article key={video.id} className="overflow-hidden rounded-2xl border bg-white shadow-sm"><video controls preload="metadata" poster={video.thumbnail_url||undefined} className="aspect-video w-full bg-black"><source src={video.video_url}/></video><div className="p-5"><h3 className="text-xl font-bold">{video.title}</h3>{video.description&&<p className="mt-2 text-slate-600">{video.description}</p>}</div></article>)}</div></section>}
      {page.cta && <div className="mt-12 rounded-3xl bg-black px-6 py-10 text-center text-white sm:px-12"><h2 className="text-3xl font-bold">Ready to take the next step?</h2><Link href={page.cta.href} target={external && !page.cta.href.startsWith("mailto:") ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-md bg-[#e1b726] px-6 py-3 font-bold text-black outline-offset-4 transition hover:bg-[#f0c838] focus-visible:outline-2 focus-visible:outline-[#e1b726]">{page.cta.label}<ArrowRight aria-hidden="true" className="size-4" /></Link></div>}
    </div>
  </>;
}
