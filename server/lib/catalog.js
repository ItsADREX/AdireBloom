const fs = require('fs');
const path = require('path');

const CATALOG_FILE = path.join(__dirname, '..', 'data', 'catalog.json');

function getCatalog() {
  return JSON.parse(fs.readFileSync(CATALOG_FILE, 'utf8'));
}

function getProductPrice(productId) {
  const price = getCatalog()[String(productId)];
  return price == null ? null : Number(price);
}

function normalizeCartItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Cart is empty');
  }

  return items.map((item) => {
    const productId = String(item.productId);
    const serverPrice = getProductPrice(productId);
    const qty = Number(item.quantity);

    if (!productId || serverPrice == null || !Number.isFinite(qty) || qty < 1 || qty > 99) {
      throw new Error('Invalid item data');
    }

    const clientPrice = Number(item.unitPrice);
    if (Number.isFinite(clientPrice) && Math.abs(clientPrice - serverPrice) > 1) {
      throw new Error('Price mismatch');
    }

    return {
      productId,
      name: item.name,
      size: item.size,
      quantity: qty,
      unitPrice: serverPrice,
    };
  });
}

module.exports = { getCatalog, getProductPrice, normalizeCartItems };
