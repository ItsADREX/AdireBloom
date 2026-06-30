import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { products } from '../../src/data/products.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'import');
const outFile = path.join(outDir, 'products.csv');

const categoryMap = {
  bespoke: 'Bespoke Wears',
  gown: 'Gowns',
  batik: 'Batik',
  fabric: 'Tie & Dye Fabrics',
};

function csvEscape(value) {
  const str = String(value ?? '');
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function imageFilename(imagePath) {
  return path.basename(imagePath);
}

const headers = [
  'Type',
  'SKU',
  'Name',
  'Published',
  'Is featured?',
  'Visibility in catalog',
  'Short description',
  'Description',
  'Regular price',
  'Sale price',
  'Categories',
  'Images',
  'Parent',
  'Attribute 1 name',
  'Attribute 1 value(s)',
  'Attribute 1 visible',
  'Attribute 1 global',
];

const rows = [headers.join(',')];

for (const product of products) {
  const category = categoryMap[product.category] || product.wpCategories?.[0] || 'Uncategorized';
  const sizes = (product.sizes || []).join(', ');
  const image = imageFilename(product.images?.[0] || '');
  const description = `${product.description || ''}\n\nCare: ${product.care || ''}`.trim();

  rows.push([
    'variable',
    `AB-${product.id}`,
    product.name,
    '1',
    product.featured ? '1' : '0',
    'visible',
    product.description || '',
    description,
    '',
    '',
    category,
    image,
    '',
    'Size',
    sizes,
    '1',
    '1',
  ].map(csvEscape).join(','));

  for (const size of product.sizes || ['One Size']) {
    rows.push([
      'variation',
      `AB-${product.id}-${size.replace(/\s+/g, '-')}`,
      '',
      '1',
      '0',
      'visible',
      '',
      '',
      product.originalPrice || product.price,
      product.price,
      '',
      '',
      product.name,
      'Size',
      size,
      '1',
      '1',
    ].map(csvEscape).join(','));
  }
}

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(outFile, rows.join('\n'), 'utf8');
console.log(`Wrote ${products.length} variable products to ${outFile}`);
