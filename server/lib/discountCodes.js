/** Keep in sync with src/data/promotions.js */
const discountCodes = {
  HERITAGE5: { percentOff: 5, minSubtotal: 25000 },
  BLOOM5: { percentOff: 5, minSubtotal: 0 },
  ADIRE5: { percentOff: 5, minSubtotal: 0 },
};

function computeOrderTotals(items, discountCode) {
  const subtotal = items.reduce((sum, item) => {
    const price = Number(item.unitPrice);
    const qty = Number(item.quantity);
    if (!Number.isFinite(price) || !Number.isFinite(qty) || qty < 1) {
      throw new Error('Invalid item data');
    }
    return sum + price * qty;
  }, 0);

  let discountAmount = 0;
  let appliedCode = null;
  let percentOff = 0;

  const normalized = String(discountCode || '').trim().toUpperCase();
  if (normalized && discountCodes[normalized]) {
    const promo = discountCodes[normalized];
    if (subtotal >= promo.minSubtotal) {
      appliedCode = normalized;
      percentOff = promo.percentOff;
      discountAmount = Math.round((subtotal * promo.percentOff) / 100);
    }
  }

  const shipping = subtotal > 0 && subtotal < 30000 ? 2500 : 0;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  return { subtotal, shipping, discountAmount, total, appliedCode, percentOff };
}

module.exports = { discountCodes, computeOrderTotals };
