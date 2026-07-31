# Supabase user management

The public site has no registration route or signup endpoint. User creation is restricted to authenticated Owners at `/admin/users`.

## Setup

1. Configure the Supabase URL, publishable key, and server-only secret key shown in `.env.example`. Never prefix the secret key with `NEXT_PUBLIC_`.
2. Authenticate the CLI, then run `npx supabase link --project-ref szftsebprkmxbeenjodm` and `npx supabase db push`.
3. Create the first user in Supabase Auth, then set its `profiles.role` to `OWNER` and `profiles.status` to `ACTIVE` in the SQL Editor. Every later account is created by an Owner in the dashboard.
4. Configure Gmail API delivery by following `docs/google-workspace-email.md`.
5. Sign in at `/admin/login`.

## Architecture and security

Supabase Auth owns user identities and cookie-based sessions. Supabase PostgreSQL stores profiles and audit logs with Row Level Security. `website-media` is public-read with staff-only writes; `private-documents` requires an authenticated active staff profile and is served with short-lived signed URLs.

The Supabase secret key, Gmail OAuth secrets, and production credentials must remain outside Git. Use HTTPS in production.
