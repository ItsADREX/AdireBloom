process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-for-security-tests';

const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const request = require('supertest');
const { createApp } = require('../app');

const USERS_FILE = path.join(__dirname, '..', 'data', 'users.json');
const USERS_BACKUP = path.join(__dirname, '..', 'data', 'users.test-backup.json');

describe('auth API — happy paths', () => {
  let app;

  before(() => {
    if (fs.existsSync(USERS_FILE)) fs.copyFileSync(USERS_FILE, USERS_BACKUP);
    fs.writeFileSync(USERS_FILE, '[]', 'utf8');
    app = createApp();
  });

  after(() => {
    if (fs.existsSync(USERS_BACKUP)) {
      fs.copyFileSync(USERS_BACKUP, USERS_FILE);
      fs.unlinkSync(USERS_BACKUP);
    } else {
      fs.writeFileSync(USERS_FILE, '[]', 'utf8');
    }
  });

  test('registers a valid user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'Ada',
        lastName: 'Okafor',
        email: 'ada.test@example.com',
        password: 'securepass123',
        agreedToTerms: true,
      });

    assert.equal(res.status, 201);
    assert.ok(res.body.token);
    assert.equal(res.body.user.email, 'ada.test@example.com');
  });

  test('logs in with correct password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'ada.test@example.com', password: 'securepass123' });

    assert.equal(res.status, 200);
    assert.ok(res.body.token);
  });
});

describe('auth API — sad paths', () => {
  let app;

  before(() => {
    app = createApp();
  });

  test('rejects login with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'ada.test@example.com', password: 'wrongpassword' });

    assert.equal(res.status, 401);
    assert.match(res.body.message, /invalid/i);
  });

  test('rejects registration without agreeing to terms', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: 'no-terms@example.com',
        password: 'securepass123',
        agreedToTerms: false,
      });

    assert.equal(res.status, 400);
  });

  test('rejects short password', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: 'short-pass@example.com',
        password: 'abc',
        agreedToTerms: true,
      });

    assert.equal(res.status, 400);
  });

  test('rejects invalid email format', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'not-an-email', password: 'securepass123' });

    assert.equal(res.status, 400);
  });
});

describe('payment initialize — sad paths', () => {
  let app;
  let authToken;
  const buyerEmail = 'buyer@example.com';

  before(async () => {
    if (fs.existsSync(USERS_FILE)) fs.copyFileSync(USERS_FILE, USERS_BACKUP);
    fs.writeFileSync(USERS_FILE, '[]', 'utf8');
    app = createApp();

    const reg = await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'Buyer',
        lastName: 'Test',
        email: buyerEmail,
        password: 'securepass123',
        agreedToTerms: true,
      });
    authToken = reg.body.token;
  });

  after(() => {
    if (fs.existsSync(USERS_BACKUP)) {
      fs.copyFileSync(USERS_BACKUP, USERS_FILE);
      fs.unlinkSync(USERS_BACKUP);
    } else {
      fs.writeFileSync(USERS_FILE, '[]', 'utf8');
    }
  });

  test('rejects unauthenticated checkout', async () => {
    const res = await request(app)
      .post('/api/payment/initialize')
      .send({
        customer: { email: buyerEmail, firstName: 'A', lastName: 'B', phone: '08080000000' },
        shipping: { address: '1 Test St', city: 'Lagos', state: 'Lagos', postalCode: '100001' },
        items: [{ productId: 928, name: 'Trouser', size: 'M', quantity: 1, unitPrice: 13000 }],
        subtotal: 13000,
        shipping: 2500,
        total: 15500,
        discountCode: '',
      });

    assert.equal(res.status, 401);
  });

  test('rejects tampered cart total', async () => {
    const res = await request(app)
      .post('/api/payment/initialize')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        customer: { email: buyerEmail, firstName: 'A', lastName: 'B', phone: '08080000000' },
        shipping: { address: '1 Test St', city: 'Lagos', state: 'Lagos', postalCode: '100001' },
        items: [{ productId: 928, name: 'Trouser', size: 'M', quantity: 1, unitPrice: 13000 }],
        subtotal: 13000,
        shipping: 2500,
        total: 100,
        discountCode: '',
      });

    assert.ok([400, 503].includes(res.status));
  });

  test('rejects tampered unit price', async () => {
    const res = await request(app)
      .post('/api/payment/initialize')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        customer: { email: buyerEmail, firstName: 'A', lastName: 'B', phone: '08080000000' },
        shipping: { address: '1 Test St', city: 'Lagos', state: 'Lagos', postalCode: '100001' },
        items: [{ productId: 928, name: 'Trouser', size: 'M', quantity: 1, unitPrice: 1 }],
        subtotal: 1,
        shipping: 0,
        total: 1,
        discountCode: '',
      });

    assert.equal(res.status, 400);
  });
});
