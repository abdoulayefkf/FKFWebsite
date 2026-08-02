# Deployment

Vercel is the intended Next.js host. Create a deployment from the repository, use the detected Next.js defaults, and configure the production custom domain. Cloudflare can provide DNS and edge protection. Verify canonical URLs, `/robots.txt`, `/sitemap.xml`, images, redirects, and external donation links after deployment.

## Public and staff access

The production deployment must not use Vercel Deployment Protection for all visitors. In Vercel, open **Project Settings → Deployment Protection** and leave **Production** publicly accessible. If preview deployments need protection, scope the protection to preview deployments only.

Vercel Deployment Protection is deployment-wide and runs before the application, so it cannot make `/` public while selectively protecting `/admin`. Access control for this project is enforced by the application instead:

- `/` and the informational website routes are public.
- `/admin/login` is the staff sign-in page.
- `/admin/cms` and `/admin/storage` require an active Owner, Administrator, or Editor account.
- `/admin/users` and the user-management APIs require an active Owner account.
- `/api/admin/*` performs server-side role checks; hiding links in the interface is not treated as authorization.

After changing Deployment Protection, test `/` in a private browser window. It must load without a Vercel account. Then confirm `/admin/cms`, `/admin/storage`, and `/admin/users` redirect anonymous visitors to `/admin/login`.

Deploy preview builds from pull requests. Promote only reviewed work from `development`; do not merge or deploy unreviewed changes directly from `main`.
