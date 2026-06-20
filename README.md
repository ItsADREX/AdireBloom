# AdireBloom — Premium Adire Fashion Storefront

A premium, production-ready storefront for AdireBloom built with Vite + React + Tailwind CSS, backed by a Node/Express API with Paystack payment integration.

## Stack

| Layer | Tech |
|---|---|
| Frontend | Vite, React 19, React Router v7, Tailwind CSS v3 |
| Icons | Lucide React |
| Backend | Node.js, Express |
| Payments | Paystack (initialize + verify + webhook) |

## Getting Started

### 1. Frontend

```bash
npm install
npm run dev
```

Frontend runs at: http://localhost:5173

### 2. Backend

```bash
cd server
cp .env.example .env
# Add your Paystack secret key to server/.env
npm run dev
```

Backend runs at: http://localhost:4000

### 3. Environment Variables

**Frontend (`.env`)**
```
VITE_API_URL=http://localhost:4000
```

**Backend (`server/.env`)**
```
PAYSTACK_SECRET_KEY=sk_test_...
PORT=4000
FRONTEND_URL=http://localhost:5173
```

Get your Paystack keys from: https://dashboard.paystack.com/#/settings/developer

## Paystack Payment Flow

1. Customer fills checkout form on frontend
2. Frontend posts order to `POST /api/payment/initialize` on the backend
3. Backend validates cart totals server-side (tamper protection)
4. Backend initializes transaction with Paystack API and returns `authorizationUrl`
5. Customer is redirected to Paystack hosted payment page
6. After payment, Paystack redirects to `/order-success?reference=...`
7. Frontend calls `GET /api/payment/verify/:reference` to confirm payment
8. Paystack also calls `POST /api/payment/webhook` for reliable server-side confirmation

## Test Cards (Paystack)

| Card | Number | CVV | Expiry |
|---|---|---|---|
| Success | 4084 0840 8408 4081 | 408 | Any future date |
| Decline | 4084 0840 8408 4084 | 408 | Any future date |

## Syncing product images from live site

When products change on adirebloom.com, re-run:

```bash
npm run sync-assets
```

This downloads homepage + product images into `public/assets/` and regenerates `src/data/products.js` from the WooCommerce API.

## Build for Production

```bash
npm run build      # outputs to /dist
```

Deploy `dist/` to any static host (Vercel, Netlify, etc.). Deploy `server/` to any Node host (Railway, Render, Heroku, etc.).
