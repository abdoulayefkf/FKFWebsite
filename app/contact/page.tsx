import PublicPage from "@/components/sections/PublicPage";
import { pageMap } from "@/lib/site-content";

export default function ContactPage() { return <PublicPage page={pageMap.get("/contact")!} />; }
