# AdireBloom — Handoff Guide

Simple guide for the developer (you) and the lecturer/client team.

---

## Links to share

| What | URL |
|------|-----|
| **Live preview** | https://adirebloomtest.netlify.app |
| **GitHub (full source code)** | https://github.com/ItsADREX/AdireBloom |
| **This handoff guide** | https://github.com/ItsADREX/AdireBloom/blob/main/HANDOFF.md |
| **Full documentation** | https://github.com/ItsADREX/AdireBloom/blob/main/DOCUMENTATION.md |
| **Security audit** | https://github.com/ItsADREX/AdireBloom/blob/main/SECURITY-AUDIT.md |
| **Backend API** | https://adirebloom-api.onrender.com |

---

## Old site vs new site

| | Old (WordPress) | New (this project) |
|---|---|---|
| Address today | https://adirebloom.com | https://adirebloomtest.netlify.app |
| Admin login | `/wp-admin` | Not needed — code is on GitHub |
| Built with | WordPress + WooCommerce | React + Netlify + Supabase + Paystack |

The WordPress login was only to view the **old** shop. The **new** shop is on GitHub and Netlify.

---

## GitHub vs “raw files”

**Use GitHub.** Do not email zip files with secret keys inside.

The repo has all source code. These are **intentionally not** in GitHub (security):

- Paystack secret key
- Supabase keys (set on hosting dashboard)
- Local `.env` files

Whoever deploys must add those in **Netlify / Render settings** after connecting the repo. See [ENV-CHECKLIST.md](./ENV-CHECKLIST.md).

---

## Two ways to go live on adirebloom.com

### Option A — Keep current hosting (easiest)

You already run Netlify + Render + Supabase. The lecturer only needs to:

1. Remove `adirebloom.com` from **whatever other Netlify project** owns it (see below).
2. Add `adirebloom.com` to **your** Netlify project (`adirebloomtest`).
3. Update env vars to use `https://adirebloom.com` (see ENV-CHECKLIST).

### Option B — Lecturer deploys from GitHub himself

1. Clone https://github.com/ItsADREX/AdireBloom
2. Deploy frontend to Netlify (or any static host).
3. Deploy `server/` folder to Render (or any Node host).
4. Create Supabase project + run `supabase/schema.sql`.
5. Add all env vars from ENV-CHECKLIST.md.
6. Point `adirebloom.com` DNS to his Netlify site.

---

## Fix: “Another project is already using this domain”

Netlify allows **one project per domain**. `adirebloom.com` is already on another Netlify account/project (likely the lecturer’s).

**Fix:**

1. Lecturer logs into **their** Netlify account.
2. Finds the project that has `adirebloom.com`.
3. **Domain management** → remove `adirebloom.com` from that project (or delete old project).
4. Then **you** add `adirebloom.com` to project `adirebloomtest`.

Or: lecturer adds **your** Netlify site as the deploy target and gives you access to the domain — same result.

---

## Replace WordPress (simple steps)

1. ✅ New site built and on GitHub  
2. ✅ Preview live at adirebloomtest.netlify.app  
3. ⬜ Lecturer approves / payment settled  
4. ⬜ Fix Netlify domain (section above)  
5. ⬜ Set `VITE_SITE_URL` and Supabase URLs to `https://adirebloom.com`  
6. ⬜ Set Render `FRONTEND_URL` to `https://adirebloom.com`  
7. ⬜ Test sign-up, cart, Paystack on adirebloom.com  
8. ⬜ Old WordPress no longer receives traffic (DNS points to Netlify)  
9. ⬜ Optional: cancel WordPress hosting later  

You do **not** need to learn WordPress to complete this.

---

## Deploy from GitHub (for lecturer or new host)

### Frontend (Netlify)

1. **Add new site** → Import from GitHub → select `AdireBloom` repo.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables from [ENV-CHECKLIST.md](./ENV-CHECKLIST.md) (Netlify section).
5. Deploy.

### Backend (Render)

1. **New Web Service** → connect same GitHub repo.
2. Root directory: `server`
3. Build: `npm install` · Start: `npm start`
4. Add environment variables from ENV-CHECKLIST (Render section).
5. Health check path: `/health`

### Supabase

1. Create project at https://supabase.com
2. **SQL Editor** → paste and run `supabase/schema.sql`
3. **Authentication → URL Configuration** → set Site URL to your live domain
4. Copy URL + anon key into Netlify env vars

---

## Test Paystack (no real charge)

| Field | Value |
|-------|--------|
| Card | 4084 0840 8408 4081 |
| CVV | 408 |
| Expiry | Any future date |
| OTP | 123456 |

Use **test** Paystack secret on Render until business account is live.

---

## What works / what doesn’t yet

| Feature | Status |
|---------|--------|
| Shop, collections, blog, legal pages | ✅ |
| Sign up / sign in (Supabase) | ✅ with env vars |
| Cart + Paystack checkout | ✅ with env vars |
| Track order | Demo only |
| Contact form email | Not wired yet |

---

## Developer contact

GitHub: https://github.com/ItsADREX/AdireBloom
