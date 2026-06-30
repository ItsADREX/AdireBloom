# Switch Paystack from Test to Live

Only the **backend** uses Paystack. The frontend never stores a Paystack key.

Live secret format: `sk_live_...`  
Test secret format: `sk_test_...`

---

## Before you start

- [ ] Paystack business account **approved** (KYC / business details complete)
- [ ] Business bank account linked on Paystack for payouts
- [ ] Client owns the Paystack account (payouts go to them)
- [ ] You have **Live** keys from https://dashboard.paystack.com/#/settings/developer

---

## Step 1 — Get live keys (Paystack dashboard)

1. Log in to https://dashboard.paystack.com  
2. Top-left: switch from **Test** to **Live** mode  
3. Go to **Settings → API Keys & Webhooks**  
4. Copy **Live Secret Key** (`sk_live_...`)  
5. Keep it private — only paste into Render, never GitHub or chat

You do **not** need the public key for this project (checkout is server-initiated).

---

## Step 2 — Update Render (main step)

1. Open https://dashboard.render.com  
2. Select service **adirebloom-api**  
3. **Environment** → find `PAYSTACK_SECRET_KEY`  
4. Replace `sk_test_...` with `sk_live_...`  
5. Confirm `FRONTEND_URL` includes your real shop URL, for example:

```
https://adirebloom.com,https://www.adirebloom.com,https://adirebloomtest.netlify.app
```

6. Add **`SUPABASE_JWT_SECRET`** if you use Supabase login (Supabase → Settings → API → JWT Secret)  
7. **Save Changes** — Render redeploys automatically  
8. After deploy, open **Logs** — you should see: `Paystack: LIVE mode`

---

## Step 3 — Webhook (recommended for live)

1. Paystack dashboard → **Settings → API Keys & Webhooks** (Live mode)  
2. **Webhook URL:**

```
https://adirebloom-api.onrender.com/api/payment/webhook
```

3. Save  
4. Paystack may send a test event — check Render logs for `Payment confirmed`

---

## Step 4 — Local `.env` (optional)

Keep **test** keys on your laptop for development:

**`server/.env`** (local only — do not commit):

```
PAYSTACK_SECRET_KEY=sk_test_...
```

Use **live** key **only** on Render production.

---

## Step 5 — Test a real payment

1. Open your live shop URL  
2. Sign in → add item → checkout  
3. Use a **real** Nigerian debit card (small amount, e.g. ₦100 test product if available)  
4. Complete Paystack checkout  
5. Confirm **Order success** page loads  
6. Check Paystack dashboard → **Transactions** (Live mode) — payment appears  

**Do not** use test cards (`4084...`) in Live mode — they will fail.

---

## Step 6 — Security after switch

- [ ] Regenerate old **test** secret if it was ever shared publicly  
- [ ] Never commit `server/.env`  
- [ ] Only client / business owner has Live secret access long-term  
- [ ] Checkout and verify require a signed-in user (Bearer token) — Paystack is never called from the browser  
- [ ] Rate limits: auth 30/15min, checkout init 10/15min, verify 40/15min per IP  

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| “Payment service not configured” | `PAYSTACK_SECRET_KEY` missing on Render |
| Checkout opens but fails | Wrong key (test key while in live mode on Paystack) |
| Success page fails verify | Render API sleeping — wait 60s and retry |
| CORS error on checkout | Add shop URL to `FRONTEND_URL` on Render |
| “Authentication required” on checkout | User must sign in; set `SUPABASE_JWT_SECRET` on Render for Supabase users |
| Webhook not firing | Confirm webhook URL in Paystack Live settings |

---

## Quick checklist

| Step | Where | Action |
|------|--------|--------|
| 1 | Paystack | Switch to Live, copy `sk_live_...` |
| 2 | Render | Set `PAYSTACK_SECRET_KEY` |
| 3 | Render | Set `FRONTEND_URL` to production domain |
| 4 | Paystack | Add webhook URL |
| 5 | Shop | Real card test payment |

No Netlify changes needed for Paystack — frontend talks to your Render API only.
