import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PublicPage from "@/components/sections/PublicPage";
import { pageMap, pages, siteUrl } from "@/lib/site-content";
import { getCmsPage, getCmsVideos } from "@/lib/cms";

type Props = { params: Promise<{ slug: string[] }> };
const aliases: Record<string, string> = { "/foundation-programs": "/programs", "/scholarship-program": "/programs/scholarship", "/community-service": "/programs/community-service", "/speaker-series": "/programs/speaker-series", "/who-we-are": "/about", "/leadership": "/about/leadership", "/board-of-directors": "/about/board-of-directors" };
const findPage = (slug: string[]) => { const path = `/${slug.join("/")}`; return pageMap.get(aliases[path] ?? path); };

export function generateStaticParams() { return [...pages.map(page => ({ slug: page.path.slice(1).split("/") })), ...Object.keys(aliases).map(path => ({ slug: path.slice(1).split("/") }))]; }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const page = findPage(slug); if (!page) return {}; const canonical = `${siteUrl}/${slug.join("/")}`; return { title: page.title, description: page.description, alternates: { canonical }, openGraph: { title: page.title, description: page.description, url: canonical }, twitter: { card: "summary_large_image", title: page.title, description: page.description } }; }
export default async function CatchAllPage({ params }: Props) { const { slug } = await params; const path=`/${slug.join("/")}`; const canonical=aliases[path]??path; const page=await getCmsPage(canonical); if (!page) notFound(); const videos=canonical==="/videos"?await getCmsVideos():[]; return <PublicPage page={page} videos={videos} />; }
