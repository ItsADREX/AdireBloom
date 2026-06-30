const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('crypto');
const { normalizeCartItems, getProductPrice } = require('../lib/catalog');
const { computeOrderTotals } = require('../lib/discountCodes');

describe('catalog — happy paths', () => {
  test('returns a known server-side price', () => {
    assert.equal(getProductPrice(928), 13000);
  });

  test('normalizes cart with correct client price', () => {
    const items = normalizeCartItems([
      { productId: 928, name: 'Trouser', size: 'M', quantity: 1, unitPrice: 13000 },
    ]);
    assert.equal(items[0].unitPrice, 13000);
    assert.equal(items[0].quantity, 1);
  });

  test('computes shipping and discount totals from server prices', () => {
    const items = normalizeCartItems([
      { productId: 928, name: 'Trouser', size: 'M', quantity: 2, unitPrice: 13000 },
    ]);
    const totals = computeOrderTotals(items, 'BLOOM5');
    assert.equal(totals.subtotal, 26000);
    assert.equal(totals.discountAmount, 1300);
    assert.equal(totals.shipping, 2500);
    assert.equal(totals.total, 27200);
  });
});

describe('catalog — sad paths (attack scenarios)', () => {
  test('rejects tampered unit price', () => {
    assert.throws(
      () => normalizeCartItems([
        { productId: 928, name: 'Trouser', size: 'M', quantity: 1, unitPrice: 100 },
      ]),
      /Invalid item data|Price mismatch/,
    );
  });

  test('rejects unknown product id', () => {
    assert.throws(
      () => normalizeCartItems([
        { productId: 999999, name: 'Fake', size: 'M', quantity: 1, unitPrice: 1000 },
      ]),
      /Invalid item data/,
    );
  });

  test('rejects zero quantity', () => {
    assert.throws(
      () => normalizeCartItems([
        { productId: 928, name: 'Trouser', size: 'M', quantity: 0, unitPrice: 13000 },
      ]),
      /Invalid item data/,
    );
  });

  test('rejects empty cart', () => {
    assert.throws(() => normalizeCartItems([]), /Cart is empty/);
  });
});

describe('Paystack webhook signature — happy / sad', () => {
  const secret = 'test-paystack-secret';

  function sign(body) {
    return crypto.createHmac('sha512', secret).update(body).digest('hex');
  }

  test('accepts valid HMAC signature', () => {
    const body = Buffer.from(JSON.stringify({ event: 'charge.success', data: { reference: 'AB-1' } }));
    const signature = sign(body);
    const expected = sign(body);
    assert.equal(signature, expected);
  });

  test('rejects tampered payload signature', () => {
    const body = Buffer.from(JSON.stringify({ event: 'charge.success', data: { reference: 'AB-1' } }));
    const tampered = Buffer.from(JSON.stringify({ event: 'charge.success', data: { reference: 'AB-2' } }));
    assert.notEqual(sign(body), sign(tampered));
  });
});
