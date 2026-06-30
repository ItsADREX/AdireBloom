export const limitedTimeOffer = {
  id: 'heritage-week-2026',
  title: 'Heritage Week Special',
  description: 'Enjoy 5% off when you spend ₦25,000 or more on handcrafted Adire pieces.',
  code: 'HERITAGE5',
  percentOff: 5,
  minSubtotal: 25000,
  expiresLabel: 'Limited time — while stocks last',
};

export const rewardTasks = [
  {
    id: 'follow-instagram',
    label: 'Follow us on Instagram',
    description: 'Stay close to new drops and styling inspiration.',
    href: 'https://instagram.com/adirebloom',
    code: 'BLOOM5',
    percentOff: 5,
  },
  {
    id: 'follow-tiktok',
    label: 'Follow us on TikTok',
    description: 'Watch behind-the-scenes Adire craft and outfit ideas.',
    href: 'https://www.tiktok.com/@adirebloom',
    code: 'ADIRE5',
    percentOff: 5,
  },
];

export const discountCodes = {
  HERITAGE5: { percentOff: 5, minSubtotal: 25000, label: 'Heritage Week' },
  BLOOM5: { percentOff: 5, minSubtotal: 0, label: 'Instagram follower reward' },
  ADIRE5: { percentOff: 5, minSubtotal: 0, label: 'TikTok follower reward' },
};

export function validateDiscountCode(code, subtotal) {
  const normalized = String(code || '').trim().toUpperCase();
  const promo = discountCodes[normalized];
  if (!promo) return { valid: false, message: 'Invalid discount code.' };
  if (subtotal < promo.minSubtotal) {
    return {
      valid: false,
      message: `Minimum order of ₦${promo.minSubtotal.toLocaleString()} required for this code.`,
    };
  }
  return {
    valid: true,
    code: normalized,
    percentOff: promo.percentOff,
    label: promo.label,
    discountAmount: Math.round((subtotal * promo.percentOff) / 100),
  };
}
