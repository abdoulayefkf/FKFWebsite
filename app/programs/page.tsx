import PublicPage from "@/components/sections/PublicPage";
import { pageMap } from "@/lib/site-content";

export default function ProgramsPage() { return <PublicPage page={pageMap.get("/programs")!} />; }
