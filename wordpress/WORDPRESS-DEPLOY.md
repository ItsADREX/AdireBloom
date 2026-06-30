# Deploy AdireBloom on WordPress.com

This guide walks you through deploying the custom **AdireBloom** theme and **WooCommerce** shop on [WordPress.com](https://wordpress.com).

## What is in this folder

| Path | Purpose |
|------|---------|
| `adirebloom-theme/` | Custom WordPress theme (upload as zip) |
| `import/products.csv` | 22 products with size variations |
| `scripts/generate-products-csv.mjs` | Regenerate CSV from `src/data/products.js` |

**Requires:** WordPress.com **Business** or **Commerce** plan (WooCommerce + custom theme upload).

---

## Part 1 — Create your WordPress.com site

1. Go to [wordpress.com](https://wordpress.com) and sign in (or create an account).
2. Click **Create a new site**.
3. Choose a temporary address, e.g. `adirebloom.wordpress.com`.
4. Select **Business** or **Commerce** when asked for a plan.
5. Skip the default theme setup if offered — you will upload AdireBloom.

---

## Part 2 — Install WooCommerce

1. In your site dashboard, go to **Plugins → Add New**.
2. Search for **WooCommerce** → **Install** → **Activate**.
3. Run the WooCommerce setup wizard:
   - **Store address:** Nigeria
   - **Currency:** Nigerian Naira (₦)
   - **Industry:** Fashion / apparel
   - Enable **Cash on delivery** off (you will use Paystack)
   - Create sample products: **No**

### Shipping

1. **WooCommerce → Settings → Shipping → Add zone**
2. Zone name: `Nigeria`
3. Region: **Nigeria**
4. Add method: **Flat rate** → Cost: `2500`

### Product categories

Create these under **Products → Categories** (slugs matter for menu links):

| Name | Slug |
|------|------|
| Bespoke Wears | `bespoke-wears` |
| Gowns | `gowns` |
| Batik | `batik` |
| Tie & Dye Fabrics | `tie-dye-fabrics` |

---

## Part 3 — Upload the AdireBloom theme

### Zip the theme

On your computer:

```bash
cd wordpress
zip -r adirebloom-theme.zip adirebloom-theme
```

### Activate on WordPress.com

1. **Appearance → Themes → Add New → Upload Theme**
2. Choose `adirebloom-theme.zip` → **Install Now** → **Activate**
3. **Settings → General**
   - Site title: `AdireBloom`
   - Tagline: `Wear Heritage, Bloom with Style`

### Create pages

Create these pages (**Pages → Add New**):

| Page title | Template / slug | Notes |
|------------|-----------------|-------|
| Home | — | Leave content empty |
| About | slug: `about` | Theme uses `page-about.php` automatically |
| Contact | Template: **Contact Page** | slug: `contact` |
| Collections | Template: **Collections Page** | slug: `collections` |
| Terms | slug: `terms` | Paste content from your legal pages |
| Refund Policy | slug: `refund-policy` | |
| Privacy Policy | slug: `privacy-policy` | |
| FAQ | slug: `faq` | Optional |

### Set homepage

1. **Settings → Reading**
2. **Your homepage displays:** A static page
3. Homepage: **Home**
4. Posts page: create **Blog** page if you want a blog archive

### Menu

1. **Appearance → Menus**
2. Create menu **Primary**
3. Add: Home, Shop (WooCommerce shop page), Collections, Blog, About, Contact
4. Assign to **Primary Menu** location

---

## Part 4 — Import products

### Upload product images first

1. **Media → Add New**
2. Upload all files from `adirebloom-theme/assets/images/products/`
3. Keep filenames the same as in the CSV (e.g. `adire-baggy-trouser.png`)

### Import CSV

1. **Products → Import**
2. Choose `import/products.csv`
3. Map columns — defaults usually work
4. Run import
5. Check **Products → All Products** — each item should be **Variable** with Size variations

### Regenerate CSV (optional)

If you update products in the React app:

```bash
node wordpress/scripts/generate-products-csv.mjs
```

---

## Part 5 — Paystack payments

1. **Plugins → Add New** → search **Paystack WooCommerce Payment Gateway**
2. Install and activate (available on WordPress.com Business+)
3. **WooCommerce → Settings → Payments → Paystack**
4. Enter keys from [Paystack dashboard](https://dashboard.paystack.com):
   - **Test mode** while building: `pk_test_...` and `sk_test_...`
   - **Live mode** when ready: `pk_live_...` and `sk_live_...`
5. Enable the gateway and save

### Test checkout

1. Add a product to cart → **Checkout**
2. Use Paystack test card: `4084 0840 8408 4081`, any future expiry, CVV `408`
3. Confirm order appears in **WooCommerce → Orders**

---

## Part 6 — Optional plugins

| Plugin | Why |
|--------|-----|
| **Contact Form 7** | Makes the Contact page form send email |
| **Yoast SEO** or **Jetpack SEO** | Better search previews |
| **WooCommerce Coupons** | Recreate codes like `BLOOM5` under **Marketing → Coupons** |

---

## Part 7 — Connect your domain

When the site is ready for `adirebloom.com`:

1. Remove the domain from any other host (Netlify, old WordPress, etc.) — only one service can use it.
2. **Upgrades → Domains → Add domain** → enter `adirebloom.com`
3. Follow WordPress.com DNS instructions at your domain registrar.
4. Wait for DNS propagation (up to 24–48 hours).

---

## Part 8 — Go live checklist

- [ ] Theme activated and homepage set
- [ ] All pages created with correct slugs
- [ ] Primary menu assigned
- [ ] WooCommerce currency = NGN
- [ ] Shipping zone for Nigeria (₦2,500)
- [ ] Products imported with images
- [ ] Paystack test payment succeeded
- [ ] Paystack switched to live keys when business account is ready
- [ ] Domain pointed to WordPress.com (if replacing old site)

---

## React site vs WordPress site

You currently also have a React + Netlify + Render version in this repo. They are **separate**:

| | React (this repo root) | WordPress (this folder) |
|--|------------------------|-------------------------|
| Hosting | Netlify + Render | WordPress.com |
| Checkout | Custom API + Paystack | WooCommerce + Paystack plugin |
| Product edits | Edit `products.js` / CSV | WooCommerce admin |

Pick one as your main shop for `adirebloom.com`. You can keep the other as staging.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Cannot upload theme | Upgrade to Business or Commerce plan |
| WooCommerce missing | Install plugin from Plugins screen |
| Product images blank after import | Upload images to Media Library with same filenames, re-import or edit products |
| Paystack not showing at checkout | Enable gateway in WooCommerce → Settings → Payments |
| Shop page looks unstyled | Confirm AdireBloom theme is active, not a default theme |
| Domain already in use | Remove domain from Netlify/old host first |

---

## Need help?

Work through each part in order. If you get stuck on a step, note the exact screen and error message — we can fix it together in chat.
