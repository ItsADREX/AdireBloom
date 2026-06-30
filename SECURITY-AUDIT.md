# AdireBloom Security Audit

Audit date: June 2026  
Methodology: [vibe-security-skill](https://github.com/raroque/vibe-security-skill) (AI-assisted app vulnerability patterns)  
Tests: `cd server && npm test` — **17 happy/sad tests, all passing**

---

## Executive summary

The codebase is **reasonable for a staging demo** but had real payment and auth gaps typical of vibe-coded apps. **Critical/high issues found in payment price validation have been fixed in this pass.** Remaining items are documented below with priority.

---

## Critical

### ~~Client-controlled product prices at checkout~~ — FIXED

**File:** `server/routes/payment.js`  
**Issue:** Checkout trusted `unitPrice` from the browser. An attacker could POST `unitPrice: 1` and pay ₦1 for any item.  
**Fix:** Added `server/lib/catalog.js` + `server/data/catalog.json`. Server now looks up prices by `productId` and rejects tampered totals.  
**Test:** `payment initialize — sad paths › rejects tampered unit price`

---

## High

### Legacy JWT fallback secret — FIXED

**File:** `server/middleware/auth.js`  
**Issue:** Default `JWT_SECRET` worked in production if env var was missing — forged tokens possible.  
**Fix:** Server now **throws on startup** in production without `JWT_SECRET`. Dev-only fallback renamed to make risk obvious.

### Supabase RLS missing `WITH CHECK` — FIXED (re-run SQL)

**File:** `supabase/schema.sql`  
**Issue:** Update policy without `WITH CHECK` could allow profile row ownership changes in some setups.  
**Fix:** Added `WITH CHECK (auth.uid() = id)` and blocked direct client inserts (profiles created via trigger only).  
**Action for you:** Re-run `supabase/schema.sql` in your Supabase SQL Editor.

### No rate limiting on auth endpoints — FIXED

**File:** `server/app.js`  
**Issue:** Login/register could be brute-forced.  
**Fix:** `express-rate-limit` — 30 requests per 15 minutes per IP on `/api/auth/*`.

### Demo account auto-seeded in production — FIXED

**File:** `server/lib/seedDemoUser.js`  
**Issue:** Hardcoded demo credentials on every API deploy.  
**Fix:** Disabled in production unless `SEED_DEMO_USER=true`.

---

## Medium

### Supabase anon key in frontend (expected — monitor RLS)

**File:** `src/lib/supabase.js`  
**Issue:** `VITE_SUPABASE_ANON_KEY` is public in the browser bundle — **this is normal** for Supabase.  
**Mitigation:** RLS must protect all tables. Never put `service_role` in `VITE_*` vars.  
**Status:** `profiles` table has RLS; re-run updated schema.

### Legacy API auth still active when Supabase unset

**File:** `src/context/AuthContext.jsx`  
**Issue:** Falls back to Express JSON-file auth if Supabase env vars missing — not production-grade.  
**Mitigation:** You have Supabase configured — ensure Netlify has `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` and redeploy.

### CORS allows any `*.netlify.app` origin

**File:** `server/lib/frontendUrl.js`  
**Issue:** Any Netlify preview site can call your API.  
**Mitigation:** Acceptable for staging; tighten to exact domain before go-live.

### Payment initialize does not require auth token

**File:** `server/routes/payment.js`  
**Issue:** Backend doesn't verify JWT/Supabase session on checkout (frontend gates cart).  
**Mitigation:** Add server-side session verification before Paystack init for production.

### Track order is fake / contact form not wired

**Files:** `src/pages/TrackOrder.jsx`, Contact form  
**Issue:** No real data — not a security hole but misleading for customers.  
**Status:** Known limitation.

---

## Low

### Session storage in browser

**Issue:** Supabase client stores session in localStorage (Supabase default). XSS could steal tokens.  
**Mitigation:** Standard for SPAs; keep dependencies updated, avoid `dangerouslySetInnerHTML`.

### Paystack verify endpoint is unauthenticated

**File:** `server/routes/payment.js`  
**Issue:** Anyone with a reference can check payment status.  
**Impact:** Low — references are unguessable; only reveals payment metadata.

---

## What passed (good patterns)

| Area | Status |
|------|--------|
| Paystack secret server-side only | ✅ |
| Webhook HMAC-SHA512 verification | ✅ |
| Raw body before JSON parse on webhook | ✅ |
| Server-side cart total recomputation | ✅ (now with catalog prices) |
| Passwords hashed with bcrypt (legacy API) | ✅ |
| `jwt.verify()` not `jwt.decode()` | ✅ |
| `.env` in `.gitignore` | ✅ |
| No `service_role` in frontend | ✅ |
| Supabase RLS enabled on `profiles` | ✅ |

---

## Test coverage

```bash
cd server && npm test
```

| Suite | Happy | Sad |
|-------|-------|-----|
| Auth API | register, login | wrong password, no terms, short password, bad email |
| Payment | — | tampered total, tampered unit price |
| Catalog | price lookup, normalize, totals | fake product, zero qty, price attack, empty cart |
| Webhook | valid HMAC | tampered payload |

---

## Recommended before go-live

1. Re-run updated `supabase/schema.sql` on your Supabase project  
2. Confirm Netlify has Supabase + API env vars; redeploy  
3. Set `JWT_SECRET` on Render (required in production)  
4. Remove `SEED_DEMO_USER` / rotate demo password  
5. Tighten CORS to production domain only  
6. Require auth on `POST /api/payment/initialize`  
7. Persist orders from Paystack webhook to Supabase  
8. Regenerate any Paystack test keys that were shared in chat  

---

*Audit tooling: [vibe-security-skill](https://github.com/raroque/vibe-security-skill) by Chris Raroque / Aloa*
