const express = require('express');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { computeOrderTotals } = require('../lib/discountCodes');
const { normalizeCartItems } = require('../lib/catalog');
const { getPrimaryFrontendUrl } = require('../lib/frontendUrl');
const paystack = require('../lib/paystack');
const { requireSession } = require('../middleware/sessionAuth');
const { paymentInitLimiter, paymentVerifyLimiter } = require('../lib/rateLimiters');

const router = express.Router();

const FRONTEND_URL = getPrimaryFrontendUrl();

function requirePaystackConfigured(req, res, next) {
  if (!paystack.isConfigured()) {
    console.error('PAYSTACK_SECRET_KEY is not configured');
    return res.status(503).json({ message: 'Payment service not configured. Please contact support.' });
  }
  next();
}

router.post('/initialize', paymentInitLimiter, requireSession, requirePaystackConfigured, async (req, res) => {
  try {
    const { customer, shipping, items, total, discountCode } = req.body;

    if (!customer?.email || !items?.length || !shipping?.address) {
      return res.status(400).json({ message: 'Missing required order fields.' });
    }

    const checkoutEmail = customer.email.trim().toLowerCase();
    const accountEmail = (req.user.email || '').trim().toLowerCase();
    if (accountEmail && checkoutEmail !== accountEmail) {
      return res.status(403).json({ message: 'Checkout email must match your signed-in account.' });
    }

    let normalizedItems;
    let expectedTotal;
    try {
      normalizedItems = normalizeCartItems(items);
      expectedTotal = computeOrderTotals(normalizedItems, discountCode).total;
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
      items: normalizedItems.map((i) => `${i.name} x${i.quantity} (${i.size})`).join(' | '),
      discount_code: discountCode || '',
      user_id: req.user.id,
    };

    const data = await paystack.initializeTransaction({
      email: customer.email,
      amountKobo: Math.round(expectedTotal * 100),
      reference,
      callbackUrl: `${FRONTEND_URL}/order-success`,
      metadata,
    });

    if (!data.status || !data.data?.authorization_url) {
      return res.status(502).json({ message: 'Failed to initialize payment with Paystack.' });
    }

    return res.json({
      reference: data.data.reference,
      authorizationUrl: data.data.authorization_url,
    });
  } catch (err) {
    if (err.code === 'PAYSTACK_NOT_CONFIGURED') {
      return res.status(503).json({ message: err.message });
    }
    const paystackMsg = err?.response?.data?.message;
    console.error('Paystack initialize error:', paystackMsg || err.message);
    return res.status(502).json({ message: paystackMsg || 'Payment initialization failed.' });
  }
});

router.get('/verify/:reference', paymentVerifyLimiter, requireSession, requirePaystackConfigured, async (req, res) => {
  const { reference } = req.params;
  if (!reference || !/^AB-/.test(reference)) {
    return res.status(400).json({ message: 'Invalid payment reference.' });
  }

  try {
    const data = await paystack.verifyTransaction(reference);

    if (!data.status) {
      return res.status(400).json({ status: 'failed', message: 'Transaction not found.' });
    }

    const txn = data.data;
    const paid = txn.status === 'success';
    const txnEmail = (txn.customer?.email || '').trim().toLowerCase();
    const accountEmail = (req.user.email || '').trim().toLowerCase();

    if (paid && accountEmail && txnEmail && txnEmail !== accountEmail) {
      return res.status(403).json({ status: 'failed', message: 'Not authorized to view this payment.' });
    }

    const meta = txn.metadata || {};

    return res.json({
      status: paid ? 'success' : 'failed',
      reference: txn.reference,
      amount: txn.amount / 100,
      currency: txn.currency,
      customerEmail: txn.customer?.email,
      paidAt: txn.paid_at,
      channel: txn.channel,
      order: {
        customerName: meta.customer_name || '',
        phone: meta.phone || '',
        shippingAddress: meta.shipping_address || '',
        items: meta.items || '',
        discountCode: meta.discount_code || '',
      },
    });
  } catch (err) {
    const paystackMsg = err?.response?.data?.message;
    console.error('Paystack verify error:', paystackMsg || err.message);
    return res.status(502).json({ status: 'failed', message: paystackMsg || 'Verification failed.' });
  }
});

router.post('/webhook', requirePaystackConfigured, (req, res) => {
  const signature = req.headers['x-paystack-signature'];
  const secret = process.env.PAYSTACK_SECRET_KEY;

  if (!signature) {
    return res.status(400).send('Missing signature');
  }

  const hash = crypto
    .createHmac('sha512', secret)
    .update(req.body)
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
      console.log(`Payment confirmed — ${ref} | ₦${amount.toLocaleString('en-NG')} | ${email}`);
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
