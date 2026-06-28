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
- **Authentication** — Custom sign-up / sign-in (JWT tokens), **not Supabase**

Visitors can browse products, read the blog, and view policies **without** signing in.  
Adding to cart, checkout, and payment require an account.

---

## Demo sign-in (for your presentation)

The live site uses a **real backend**. Accounts created on your laptop do **not** carry over to the live site.

For the client demo, use this pre-seeded account (created automatically when the API starts):

| Field | Value |
|-------|--------|
| **Email** | `demo@adirebloom.com` |
| **Password** | `AdireBloom2026!` |

Or create a **new account** on the live site via **Sign Up** — that works too.

**Important:** The API runs on Render’s free tier. If nobody has used the site for ~15 minutes, the first sign-in may take **30–60 seconds** while the server wakes up. Wait and try again if you see a connection message.

---

## Authentication — how it works (not Supabase)

Sign-in is handled by **your own Express API**, not Supabase or Firebase.

```
Browser (Netlify)  →  POST /api/auth/register or /login  →  Render API
                              ↓
                    JWT token returned → stored in browser
                              ↓
                    Cart / checkout send token with requests
```

- Passwords are hashed with **bcrypt**
- Sessions use **JWT** (7-day expiry)
- User records are stored in a JSON file on the server (`users.json`)

This was chosen to keep the stack simple and avoid extra third-party accounts during development. **Supabase can be added later** if you want managed auth + a real database — it is not wired up today.

---

## Main features

| Feature | Status |
|---------|--------|
| Product catalog (22 items, local images) | ✅ Live |
| Collections, shop, product detail | ✅ Live |
| Sign up / sign in | ✅ Live |
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

Set in **Site settings → Environment variables**, then redeploy:

```
VITE_API_URL=https://adirebloom-api.onrender.com
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

1. **User storage** — JSON file on the server; needs a persistent disk on Render (or a database migration) for production reliability.
2. **Track order** — Shows sample progress; real tracking needs order storage + admin updates.
3. **Contact form** — Does not email anyone yet (needs Resend, SendGrid, or similar).
4. **Paystack** — Test mode until the client completes Paystack business verification and live keys are added.
5. **Render cold starts** — Free tier sleeps; first request after idle can be slow.

---

## Recommended next steps (after client approval)

1. Client completes Paystack registration → swap in **live** keys on Render
2. Migrate users/orders to **Supabase** or **PostgreSQL** for production data
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
