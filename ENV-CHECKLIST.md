# Environment Variables Checklist

Secrets are **not** stored in GitHub. Copy this checklist when deploying. Fill values in your hosting dashboard only.

---

## Netlify (frontend)

Site → **Environment variables** → add each → **Redeploy** after saving.

| Variable | Example / notes | Required |
|----------|-----------------|----------|
| `VITE_API_URL` | `https://adirebloom-api.onrender.com` | Yes |
| `VITE_SUPABASE_URL` | `https://xxxxx.supabase.co` | Yes (for login) |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbG...` (anon public key) | Yes (for login) |
| `VITE_SITE_URL` | `https://adirebloom.com` or staging URL | Yes (email confirm links) |

**Staging values today:**

```
VITE_API_URL=https://adirebloom-api.onrender.com
VITE_SITE_URL=https://adirebloomtest.netlify.app
```

**After custom domain:**

```
VITE_SITE_URL=https://adirebloom.com
```

---

## Render (backend API)

Service → **Environment** → add each → redeploy.

| Variable | Example / notes | Required |
|----------|-----------------|----------|
| `PAYSTACK_SECRET_KEY` | `sk_test_...` or `sk_live_...` | Yes (checkout) |
| `JWT_SECRET` | Long random string | Yes |
| `SUPABASE_JWT_SECRET` | From Supabase → Settings → API → JWT Secret | Yes (if using Supabase login) |
| `FRONTEND_URL` | Comma-separated site URLs | Yes (CORS + Paystack return) |
| `PORT` | `4000` | Auto on Render |
| `USERS_DATA_DIR` | `/var/data` | Optional (persistent disk) |

**Staging:**

```
FRONTEND_URL=http://localhost:5173,https://adirebloomtest.netlify.app
```

**Production domain:**

```
FRONTEND_URL=https://adirebloom.com,https://www.adirebloom.com
```

---

## Supabase (dashboard, not env file in repo)

| Setting | Value |
|---------|--------|
| **Site URL** | `https://adirebloom.com` (or staging URL) |
| **Redirect URLs** | `https://adirebloom.com/**`, `https://www.adirebloom.com/**`, `http://localhost:5173/**` |
| **SQL** | Run `supabase/schema.sql` once |
| **Confirm email** | Turn off for easier demos (optional) |

---

## Local development

**Root `.env`:**

```
VITE_API_URL=http://localhost:4000
VITE_SITE_URL=http://localhost:5173
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**`server/.env`:**

```
PAYSTACK_SECRET_KEY=sk_test_...
JWT_SECRET=local-dev-secret
SUPABASE_JWT_SECRET=your-supabase-jwt-secret
PORT=4000
FRONTEND_URL=http://localhost:5173
```

Copy from `.env.example` and `server/.env.example`.

---

## What to send the lecturer privately

Send **names** from this doc + the **actual values** in a private message (WhatsApp/email), **not** in GitHub:

1. Supabase URL + anon key (or invite them to Supabase project)
2. Paystack test/live secret (Render only — never frontend)
3. Confirm Netlify + Render dashboard access if they will host

**Never commit** `.env` or paste Paystack **secret** keys in GitHub issues or public chat.

---

## After changing any variable

1. **Netlify** → Trigger deploy  
2. **Render** → Manual deploy (or wait for auto)  
3. Test sign-up and checkout on the live URL

---

## Paystack live keys

See [PAYSTACK-LIVE.md](./PAYSTACK-LIVE.md) for switching from test to live on Render.
