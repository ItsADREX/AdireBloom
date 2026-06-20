const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { computeOrderTotals } = require('../lib/discountCodes');
const { getPrimaryFrontendUrl } = require('../lib/frontendUrl');

const router = express.Router();

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
const FRONTEND_URL = getPrimaryFrontendUrl();

// ─── Guards ──────────────────────────────────────────────────────────────────
function requirePaystackSecret(req, res, next) {
  if (!PAYSTACK_SECRET) {
    console.error('PAYSTACK_SECRET_KEY is not configured');
    return res.status(503).json({ message: 'Payment service not configured. Please contact support.' });
  }
  next();
}

// ─── Validate cart server-side ────────────────────────────────────────────────
function computeExpectedTotal(items, discountCode) {
  try {
    return computeOrderTotals(items, discountCode).total;
  } catch {
    throw new Error('Invalid item data');
  }
}

// ─── POST /api/payment/initialize ─────────────────────────────────────────────
router.post('/initialize', requirePaystackSecret, async (req, res) => {
  try {
    const { customer, shipping, items, total, discountCode } = req.body;

    if (!customer?.email || !items?.length) {
      return res.status(400).json({ message: 'Missing required order fields.' });
    }

    // Server-side total validation — client cannot manipulate the price
    let expectedTotal;
    try {
      expectedTotal = computeExpectedTotal(items, discountCode);
    } catch {
      return res.status(400).json({ message: 'Invalid item data in cart.' });
    }

    if (Math.abs(expectedTotal - Number(total)) > 1) {
      return res.status(400).json({ message: 'Cart total mismatch. Please refresh and try again.' });
    }

    const reference = `AB-${Date.now()}-${uuidv4().slice(0, 8).toUpperCase()}`;

    const metadata = {
      order_reference: reference,
      customer_name: `${customer.firstName} ${customer.lastName}`,
      phone: customer.phone,
      shipping_address: `${shipping.address}, ${shipping.city}, ${shipping.state}`,
      items: items.map((i) => `${i.name} x${i.quantity} (${i.size})`).join(' | '),
      discount_code: discountCode || '',
    };

    const { data } = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email: customer.email,
        amount: Math.round(expectedTotal * 100), // Paystack uses kobo
        currency: 'NGN',
        reference,
        callback_url: `${FRONTEND_URL}/order-success`,
        metadata,
        channels: ['card', 'bank', 'ussd', 'bank_transfer'],
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!data.status || !data.data?.authorization_url) {
      return res.status(502).json({ message: 'Failed to initialize payment with Paystack.' });
    }

    return res.json({
      reference: data.data.reference,
      authorizationUrl: data.data.authorization_url,
      accessCode: data.data.access_code,
    });
  } catch (err) {
    const paystackMsg = err?.response?.data?.message;
    console.error('Paystack initialize error:', paystackMsg || err.message);
    return res.status(502).json({ message: paystackMsg || 'Payment initialization failed.' });
  }
});

// ─── GET /api/payment/verify/:reference ───────────────────────────────────────
router.get('/verify/:reference', requirePaystackSecret, async (req, res) => {
  const { reference } = req.params;
  if (!reference || !/^AB-/.test(reference)) {
    return res.status(400).json({ message: 'Invalid payment reference.' });
  }

  try {
    const { data } = await axios.get(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` },
      }
    );

    if (!data.status) {
      return res.status(400).json({ status: 'failed', message: 'Transaction not found.' });
    }

    const txn = data.data;
    const paid = txn.status === 'success';

    return res.json({
      status: paid ? 'success' : 'failed',
      reference: txn.reference,
      amount: txn.amount / 100, // convert from kobo
      currency: txn.currency,
      customerEmail: txn.customer?.email,
      paidAt: txn.paid_at,
      channel: txn.channel,
    });
  } catch (err) {
    const paystackMsg = err?.response?.data?.message;
    console.error('Paystack verify error:', paystackMsg || err.message);
    return res.status(502).json({ status: 'failed', message: paystackMsg || 'Verification failed.' });
  }
});

// ─── POST /api/payment/webhook ─────────────────────────────────────────────
// Paystack sends raw JSON. We verify the X-Paystack-Signature header using HMAC-SHA512.
router.post('/webhook', (req, res) => {
  const signature = req.headers['x-paystack-signature'];
  const secret = PAYSTACK_SECRET;

  if (!secret || !signature) {
    return res.status(400).send('Missing signature');
  }

  const hash = crypto
    .createHmac('sha512', secret)
    .update(req.body) // req.body is raw Buffer here
    .digest('hex');

  if (hash !== signature) {
    console.warn('Paystack webhook signature mismatch');
    return res.status(401).send('Invalid signature');
  }

  let event;
  try {
    event = JSON.parse(req.body.toString());
  } catch {
    return res.status(400).send('Invalid JSON');
  }

  // Acknowledge immediately — process async
  res.sendStatus(200);

  handleWebhookEvent(event);
});

async function handleWebhookEvent(event) {
  const { event: type, data } = event;

  switch (type) {
    case 'charge.success': {
      const ref = data.reference;
      const amount = data.amount / 100;
      const email = data.customer?.email;
      console.log(`✓ Payment confirmed — ${ref} | ₦${amount.toLocaleString('en-NG')} | ${email}`);
      // TODO: persist order to database, send confirmation email, update inventory
      break;
    }
    case 'transfer.success':
      console.log('Transfer success:', data.reference);
      break;
    case 'transfer.failed':
      console.log('Transfer failed:', data.reference);
      break;
    default:
      console.log('Unhandled webhook event:', type);
  }
}

module.exports = router;
