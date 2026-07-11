import type { MetadataRoute } from "next";
import { pages, siteUrl } from "@/lib/site-content";
export default function sitemap(): MetadataRoute.Sitemap { return ["/", "/about/founder", "/about/leadership", ...pages.map(page => page.path)].map(path => ({ url: `${siteUrl}${path === "/" ? "" : path}`, lastModified: new Date(), changeFrequency: path === "/" ? "weekly" as const : "monthly" as const, priority: path === "/" ? 1 : .7 })); }
