# BulkNewsMedia

Next.js news desk for **BulkNewsMedia**, themed to match the dark newsroom layout (navy surfaces, cream type, gold accents). The frontend talks to a Django REST API.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Django API URL

Set the backend origin in `.env.local`:

```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

The same value is read in `src/lib/api/config.ts` (`API_CONFIG.baseURL` and `ENDPOINTS`).

## Auth header interceptor

`src/lib/api/client.ts` is an Axios instance that:

1. Attaches `Authorization: Bearer <access token>` on every request when a token is stored.
2. Rejects malformed Authorization headers.
3. On `401`, tries `/auth/token/refresh/` and retries the original request.

Tokens live in `localStorage` under `bnm_access_token` / `bnm_refresh_token`.

Until the Django API is up, story lists fall back to local mock desk data so the homepage still renders.

In Django admin, staff can create, edit, and delete leads. Draft a reply in a lead's Response field, save it, then select the lead and choose **Email the drafted response to selected leads** from the action menu. A successful send marks the lead as responded. Configure SMTP through the email environment variables in `subscriptions/README.md`; the default development email backend writes messages to the runserver console.

Blog posts, like stories and video thumbnails, accept image uploads in admin. Uploaded files are exposed through the `image` field in the blog API and served from `/media/` during local development.
