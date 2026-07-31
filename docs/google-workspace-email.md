# Google Workspace transactional email

Transactional mail is sent through the Gmail API as the organization mailbox. Cloudflare D1 records each attempt, and Worker `waitUntil()` lets noncritical delivery continue after the HTTP response has returned.

## 1. Prepare Google Workspace and Google Cloud

Use a Workspace administrator account to complete these steps:

1. Confirm that `info@franciskoromafoundation.org` is an active mailbox or a valid **Send mail as** alias for the mailbox that will authorize the application.
2. In Google Cloud Console, create or select a project owned by the organization.
3. Open **APIs & Services → Library** and enable **Gmail API**.
4. Open **Google Auth platform → Branding** and configure the app name, support email, organization domain, and developer contact.
5. Choose the **Internal** audience when the Cloud project belongs to the same Workspace organization. Otherwise add the organization mailbox as a test user while authorization is being configured.
6. In **Data Access**, add only `https://www.googleapis.com/auth/gmail.send`. This application does not need permission to read or delete mail.
7. Create an OAuth 2.0 client. A temporary **Web application** client with an HTTPS callback controlled by the organization, or a temporary local callback, can be used to complete the one-time authorization. Record the client ID and client secret in a password manager—never in this repository.

## 2. Generate the offline refresh token

Use Google's OAuth 2.0 authorization-code flow while signed in as the exact organization mailbox that will send mail.

Build the authorization URL with:

- `scope=https://www.googleapis.com/auth/gmail.send`
- `access_type=offline`
- `prompt=consent`
- the exact registered `redirect_uri`
- a cryptographically random `state` value that the callback verifies

After the administrator consents, exchange the one-time authorization code at `https://oauth2.googleapis.com/token` using the same redirect URI, client ID, and client secret. The response contains a refresh token on the first offline consent. Move it immediately into the Cloudflare secret in the next step, then remove it from terminals, temporary files, shell history, and password-manager notes that are no longer needed.

Google's OAuth 2.0 Playground may be used for this one-time operation only if **Use your own OAuth credentials** is enabled and its callback URL is registered on the OAuth client. Select the Gmail API `gmail.send` scope, request offline access, authorize as the organization mailbox, and exchange the code. Do not use Playground-owned credentials in production.

If Google does not return a refresh token, revoke the app's existing grant from the mailbox's Google Account security page, then repeat authorization with `access_type=offline` and `prompt=consent`.

## 3. Store secrets in Cloudflare

Replace the D1 placeholder in `wrangler.jsonc` with the ID returned by `npx wrangler d1 create fkf-email-logs`. Then enter each value interactively; do not append values to these commands:

```bash
npx wrangler secret put GOOGLE_CLIENT_ID
npx wrangler secret put GOOGLE_CLIENT_SECRET
npx wrangler secret put GOOGLE_REFRESH_TOKEN
npx wrangler secret put GOOGLE_SENDER_EMAIL
npx wrangler secret put GOOGLE_REPLY_TO
```

Set `GOOGLE_SENDER_EMAIL` to `info@franciskoromafoundation.org`. Set `GOOGLE_REPLY_TO` to the same address or another designated organization inbox. These are secrets—not `NEXT_PUBLIC_` variables and not Wrangler plaintext `vars`.

For preview environments, create separate secrets with `--env preview`. Never place production OAuth credentials in `.dev.vars` or `.env`.

## 4. Create the D1 log table

```bash
npm run email-db:migrate:local
npm run email-db:migrate:remote
```

The migration creates `email_logs` with recipient, sender, subject, fixed email type, related record, Gmail message ID, delivery status, error, sent time, and creation time. OAuth tokens are never logged.

## 5. Preview and deploy

```bash
npm run preview
npm run deploy
```

Send a test administrator invitation and confirm all three results: the message is in Gmail's **Sent** folder, it arrives from `FKF Foundation <info@franciskoromafoundation.org>`, and its D1 row changes from `pending` to `sent` with a Gmail provider message ID.

## Operations and security

- A rejected/expired refresh token produces a failed D1 log. Reauthorize the mailbox and replace only `GOOGLE_REFRESH_TOKEN`.
- Temporary network errors and Gmail 408, 429, and 5xx responses receive three bounded retries. Permanent failures are not retried.
- Public forms must validate and rate-limit their own records before calling the email service. The service exposes fixed functions and never accepts a caller-controlled sender, arbitrary subject, template, or notification recipient.
- Rotate the OAuth client secret after suspected exposure and revoke the old grant. Review Google Workspace OAuth app access regularly.
