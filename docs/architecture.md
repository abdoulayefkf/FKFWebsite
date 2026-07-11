# Architecture

The site uses Next.js App Router, React, TypeScript, Tailwind CSS, and reusable components. `app/layout.tsx` owns the global shell. The existing homepage remains composed from `components/sections`. Public informational routes use `PublicPage`, `PageHero`, and typed content in `lib/site-content.ts`; the catch-all route statically generates those known pages and returns a 404 for unknown paths.

Phase 1 is intentionally static. There is no authentication, database, CMS, payment processor, or form backend.
