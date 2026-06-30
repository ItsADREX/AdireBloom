# AdireBloom — Project Documentation

Handoff document for the AdireBloom e-commerce rebuild. Share this with the client team alongside the live demo link and GitHub repository.

---

## Live links

| Resource | URL |
|----------|-----|
| **Website (demo / staging)** | https://adirebloomtest.netlify.app |
| **Backend API** | https://adirebloom-api.onrender.com |
| **GitHub repository** | https://github.com/ItsADREX/AdireBloom |
| **API health check** | https://adirebloom-api.onrender.com/health |

---

## What this project is

A full rebuild of the AdireBloom online store:

- **Frontend** — React + Vite + Tailwind (hosted on Netlify)
- **Backend** — Node.js + Express (hosted on Render)
- **Payments** — Paystack (test mode until live keys are added)
- **Authentication** — Supabase (production-grade accounts + PostgreSQL profiles)

Visitors can browse products, read the blog, and view policies **without** signing in.  
Adding to cart, checkout, and payment require an account.

---

## Sign-in (Supabase)

Customer accounts are managed by **Supabase Auth** — the same approach used by production e-commerce businesses.

1. Create a free project at https://supabase.com  
2. In **Project Settings → API**, copy:
   - Project URL → `VITE_SUPABASE_URL`
   - anon public key → `VITE_SUPABASE_ANON_KEY`
3. Add to **Netlify → Environment variables**, then redeploy:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_SITE_URL=https://adirebloomtest.netlify.app` (confirmation email links)
4. In Supabase **Authentication → URL Configuration**:
   - **Site URL:** `https://adirebloomtest.netlify.app`
   - **Redirect URLs:** add `https://adirebloomtest.netlify.app/**` and `http://localhost:5173/**`
5. In Supabase **SQL Editor**, run the script in `supabase/schema.sql`
6. For smoother demos: **Authentication → Providers → Email** → turn off **Confirm email** (optional)

After setup, customers **Sign Up** on the live site and accounts persist in Supabase permanently.

**Fallback:** If Supabase env vars are missing, the site falls back to the Render API auth (temporary/dev only).

---

## Authentication — how it works

```
Browser (Netlify)  →  Supabase Auth (sign up / sign in)
                              ↓
                    Session stored securely in browser
                              ↓
                    Customer profile in PostgreSQL (profiles table)
```

Paystack checkout still uses the **Render API** for payment initialization — auth and payments are separate by design.

---

## Main features

| Feature | Status |
|---------|--------|
| Product catalog (22 items, local images) | ✅ Live |
| Homepage hero slider | ✅ Live |
| Collections, shop, product detail | ✅ Live |
| Sign up / sign in (Supabase) | ✅ Ready — add Supabase keys on Netlify |
| Cart & checkout (auth required) | ✅ Live |
| Paystack payments (test cards) | ✅ Live |
| Blog | ✅ Live |
| Terms, Refund Policy, Privacy Policy | ✅ Live |
| Contact page (map, social links) | ✅ Live |
| Limited-time offers & discount codes | ✅ Live |
| Track order page | ⚠️ Demo UI only — no real order lookup yet |
| Contact form submission | ⚠️ UI only — does not send email yet |
| Order history in dashboard | ❌ Not built yet |

---

## Paystack test payment

Use Paystack **test** keys on Render until the business Paystack account is fully set up.

**Test card (success):**

| Field | Value |
|-------|--------|
| Card number | `4084 0840 8408 4081` |
| CVV | `408` |
| Expiry | Any future date |
| OTP | `123456` |

---

## Repository structure

```
AdireBloom/
├── src/                 # React frontend
│   ├── pages/           # Home, Shop, Cart, Checkout, Blog, Legal, etc.
│   ├── components/      # Header, Footer, ProductCard, AuthGate, …
│   ├── context/         # Auth + Cart state
│   └── data/            # Products, blog posts, legal text, promos
├── server/              # Express API
│   ├── routes/          # auth.js, payment.js
│   └── lib/             # User store, Paystack helpers, CORS
├── public/assets/       # Product images, logo, favicon
├── netlify.toml         # Frontend deploy config
└── render.yaml          # Backend deploy blueprint
```

---

## Environment variables

### Netlify (frontend)

```
VITE_API_URL=https://adirebloom-api.onrender.com
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Render (backend)

| Variable | Purpose |
|----------|---------|
| `PAYSTACK_SECRET_KEY` | Paystack secret (`sk_test_…` or `sk_live_…`) |
| `JWT_SECRET` | Random string for session tokens |
| `FRONTEND_URL` | `https://adirebloomtest.netlify.app` (comma-separated if multiple) |
| `USERS_DATA_DIR` | `/var/data` when using a Render persistent disk |

---

## Running locally

```bash
# Terminal 1 — frontend
npm install
npm run dev
# → http://localhost:5173

# Terminal 2 — backend
cd server
cp .env.example .env
# Edit .env with Paystack test key
npm install
npm run dev
# → http://localhost:4000
```

Root `.env`:

```
VITE_API_URL=http://localhost:4000
```

---

## Deployment checklist

### Netlify
1. Connect repo → build command `npm run build` → publish `dist`
2. Set `VITE_API_URL=https://adirebloom-api.onrender.com`
3. Trigger redeploy after env changes

### Render
1. Web service, root directory: `server`
2. Build: `npm install` · Start: `npm start`
3. Add env vars above
4. **Recommended:** Attach a **1 GB persistent disk** mounted at `/var/data` so user accounts survive redeploys
5. Health check path: `/health`

---

## Known limitations (honest scope)

1. **User storage** — Supabase handles accounts once env vars are set; legacy API auth is dev fallback only.
2. **Track order** — Shows sample progress; real tracking needs order storage + admin updates.
3. **Contact form** — Does not email anyone yet (needs Resend, SendGrid, or similar).
4. **Paystack** — Test mode until the client completes Paystack business verification and live keys are added.
5. **Render cold starts** — Free tier sleeps; first request after idle can be slow.

---

## Recommended next steps (after client approval)

1. Client completes Paystack registration → swap in **live** keys on Render
2. Migrate orders to Supabase PostgreSQL for real order tracking
3. Wire contact form to email
4. Build real order tracking + optional admin panel
5. Point custom domain (e.g. `shop.adirebloom.com`) at Netlify
6. Remove or rotate demo account password before go-live

---

## Support / developer contact

Repository owner: **ItsADREX** — https://github.com/ItsADREX/AdireBloom

For questions about this build, refer to the README in the repo root or open a GitHub issue on the repository.

---

*Last updated: June 2026*
