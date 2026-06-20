import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const ASSETS = path.join(ROOT, 'public', 'assets');

const SITE_IMAGES = [
  { url: 'https://adirebloom.com/wp-content/uploads/2025/09/IMG_8233-2048x1536.jpg', file: 'hero.jpg' },
  { url: 'https://adirebloom.com/wp-content/uploads/2025/09/nxt1.jpg', file: 'collection-nxt1.jpg' },
  { url: 'https://adirebloom.com/wp-content/uploads/2025/09/nxt2.jpg', file: 'collection-nxt2.jpg' },
  { url: 'https://adirebloom.com/wp-content/uploads/2025/09/cropped-ADIRE-LOGO.png', file: 'logo.png' },
  { url: 'https://adirebloom.com/wp-content/uploads/2025/09/cropped-cropped-ADIRE-LOGO-192x192.png', file: 'favicon.png' },
  { url: 'https://adirebloom.com/wp-content/uploads/2025/09/wax-2.jpg', file: 'about-fabric-1.jpg' },
  { url: 'https://adirebloom.com/wp-content/uploads/2025/09/guinea-brocade.jpg', file: 'about-fabric-2.jpg' },
];

function stripHtml(html = '') {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&[^;]+;/g, ' ')
    .replace(/Add to Wishlist/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function mapCategory(categories) {
  const slugs = categories.map((c) => c.slug);
  if (slugs.includes('gowns')) return 'gown';
  if (slugs.includes('bespoke-wears') || slugs.includes('polo') || slugs.includes('shirt')) return 'bespoke';
  if (slugs.includes('batik')) return 'batik';
  if (slugs.includes('tie-and-dye-fabrics') || slugs.includes('draft-design')) return 'fabric';
  return 'bespoke';
}

function extFromUrl(url) {
  const base = url.split('?')[0];
  const ext = path.extname(base).toLowerCase();
  return ext || '.jpg';
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
}

async function main() {
  fs.mkdirSync(path.join(ASSETS, 'products'), { recursive: true });

  console.log('Downloading site images...');
  for (const { url, file } of SITE_IMAGES) {
    await download(url, path.join(ASSETS, file));
    console.log('  ✓', file);
  }

  console.log('Fetching products from WooCommerce API...');
  const res = await fetch('https://adirebloom.com/wp-json/wc/store/products?per_page=100');
  const raw = await res.json();

  const products = [];
  for (const p of raw) {
    if (!p.images?.length) continue;

    const imageUrls = [...new Set(p.images.map((img) => img.src))];
    const localImages = [];

    for (let i = 0; i < imageUrls.length; i++) {
      const ext = extFromUrl(imageUrls[i]);
      const filename = `${p.slug}${imageUrls.length > 1 ? `-${i + 1}` : ''}${ext}`;
      const dest = path.join(ASSETS, 'products', filename);
      if (!fs.existsSync(dest)) {
        await download(imageUrls[i], dest);
      }
      localImages.push(`/assets/products/${filename}`);
      console.log('  ✓ product', filename);
    }

    const minor = p.prices.currency_minor_unit ?? 2;
    const divisor = 10 ** minor;
    const price = Number(p.prices.price) / divisor;
    const regular = Number(p.prices.regular_price) / divisor;
    const onSale = p.on_sale && price > 0 && regular > price;

    const desc = stripHtml(p.short_description || p.description);
    const fullDesc = stripHtml(p.description) || desc;

    products.push({
      id: p.id,
      slug: p.slug,
      name: p.name.replace(/&#038;/g, '&'),
      category: mapCategory(p.categories),
      wpCategories: p.categories.map((c) => c.name),
      price: price > 0 ? Math.round(price) : null,
      originalPrice: onSale ? Math.round(regular) : null,
      badge: onSale ? 'Sale' : null,
      sizes: p.categories.some((c) => ['batik', 'tie-and-dye-fabrics', 'draft-design'].includes(c.slug))
        ? ['3 yards', '6 yards']
        : ['S', 'M', 'L', 'XL', 'XXL'],
      images: localImages,
      description: fullDesc || desc || 'Handcrafted Adire piece from AdireBloom.',
      care: 'Hand wash in cold water or dry clean. Store in a cool, dry place away from direct sunlight.',
      inStock: p.is_in_stock,
      purchasable: p.is_purchasable && price > 0,
      featured: false,
      permalink: p.permalink,
    });
  }

  // Feature a diverse set for homepage
  const featuredIds = [928, 686, 668, 658];
  for (const prod of products) {
    if (featuredIds.includes(prod.id)) prod.featured = true;
  }

  products.sort((a, b) => a.name.localeCompare(b.name));

  const productsJs = `// Auto-generated from adirebloom.com WooCommerce API — run: node scripts/sync-assets.mjs

export const categories = [
  { id: 'all', label: 'All Pieces' },
  { id: 'bespoke', label: 'Bespoke Wears' },
  { id: 'gown', label: 'Gowns' },
  { id: 'batik', label: 'Batik' },
  { id: 'fabric', label: 'Tie & Dye Fabrics' },
];

export const siteAssets = {
  hero: '/assets/hero.jpg',
  collectionNxt1: '/assets/collection-nxt1.jpg',
  collectionNxt2: '/assets/collection-nxt2.jpg',
  logo: '/assets/logo.png',
  favicon: '/assets/favicon.png',
  aboutFabric1: '/assets/about-fabric-1.jpg',
  aboutFabric2: '/assets/about-fabric-2.jpg',
};

export const products = ${JSON.stringify(products, null, 2)};

export const formatPrice = (amount) => {
  if (amount == null || amount <= 0) return 'Price on request';
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);
};
`;

  fs.writeFileSync(path.join(ROOT, 'src', 'data', 'products.js'), productsJs);
  console.log(`\nDone — ${products.length} products written to src/data/products.js`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
