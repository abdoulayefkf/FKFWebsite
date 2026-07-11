# Deployment

Vercel is the intended Next.js host. Create a deployment from the repository, use the detected Next.js defaults, and configure the production custom domain. Cloudflare can provide DNS and edge protection. Verify canonical URLs, `/robots.txt`, `/sitemap.xml`, images, redirects, and external donation links after deployment.

Deploy preview builds from pull requests. Promote only reviewed work from `development`; do not merge or deploy unreviewed changes directly from `main`.
