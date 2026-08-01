# Setup

Requirements: a current Node.js LTS release and npm.

1. Clone the repository and check out `development`.
2. Run `npm install`.
3. Run `npm run dev` and open `http://localhost:3000`.
4. Before proposing changes, run `npm run lint` and `npm run build`.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | yes | Supabase project URL (auth, CMS content). |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | yes | Supabase anon key used by the browser and public pages. |
| `SUPABASE_SECRET_KEY` | yes | Server-side Supabase key for admin routes. |
| `OPEN_ROUTER_API` | no | OpenRouter key for the FKF Assistant chat widget. |
| `OPEN_ROUTER_MODEL` | no | Overrides the assistant's first-choice model. |

## FKF Assistant

The chat widget (`components/layout/ChatBot.tsx` and `app/api/assistant/route.ts`) answers
only from website content: the pages in `lib/site-content.ts`, published CMS pages, and the
hand-written entries in `lib/assistant-knowledge.ts`. Anything the website does not cover is
handed off to `info@franciskoromafoundation.org` and the contact page.

It runs on **free** OpenRouter models only (model ids ending in `:free`), so it costs the
Foundation nothing. Free endpoints are rate limited upstream, so the route tries several in
order; if none answer - or if `OPEN_ROUTER_API` is missing - it replies with the matching
website content plus the Foundation's contact details instead of failing. If you set
`OPEN_ROUTER_MODEL`, keep the `:free` suffix or the account will be billed.

When a hand-built page (home, founder, leadership) changes, update the matching document in
`lib/assistant-knowledge.ts` so the assistant does not quote outdated content.
