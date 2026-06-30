import { contactInfo } from '../data/site';
import { formatPrice } from '../data/products';

export function buildOrderWhatsAppMessage(order) {
  if (!order?.reference) return '';

  const lines = [
    'Hello AdireBloom! My payment has been confirmed.',
    '',
    `Order ID: ${order.reference}`,
    `Amount: ${formatPrice(order.amount)}`,
  ];

  if (order.order?.customerName) lines.push(`Name: ${order.order.customerName}`);
  if (order.customerEmail) lines.push(`Email: ${order.customerEmail}`);
  if (order.order?.phone) lines.push(`Phone: ${order.order.phone}`);
  if (order.order?.shippingAddress) lines.push(`Shipping: ${order.order.shippingAddress}`);
  if (order.order?.items) lines.push(`Items: ${order.order.items}`);
  if (order.order?.discountCode) lines.push(`Discount code: ${order.order.discountCode}`);
  if (order.paidAt) lines.push(`Paid at: ${new Date(order.paidAt).toLocaleString('en-NG')}`);

  lines.push('', 'Please confirm my order. Thank you!');
  return lines.join('\n');
}

export function getOrderWhatsAppUrl(order) {
  const text = buildOrderWhatsAppMessage(order);
  const base = contactInfo.whatsappHref.split('?')[0];
  return `${base}?text=${encodeURIComponent(text)}`;
}

export function getReferenceWhatsAppUrl(reference) {
  const text = [
    'Hello AdireBloom! I need help with my payment.',
    '',
    `Order / payment reference: ${reference}`,
    '',
    'Please assist me. Thank you!',
  ].join('\n');
  const base = contactInfo.whatsappHref.split('?')[0];
  return `${base}?text=${encodeURIComponent(text)}`;
}

export async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}
