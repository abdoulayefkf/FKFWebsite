import PublicPage from "@/components/sections/PublicPage";
import { pageMap } from "@/lib/site-content";
export default function WhoWeArePage() { return <PublicPage page={pageMap.get("/about")!} />; }
