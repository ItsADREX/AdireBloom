const axios = require('axios');

const PAYSTACK_API = 'https://api.paystack.co';

function getSecret() {
  return process.env.PAYSTACK_SECRET_KEY || '';
}

function isConfigured() {
  return Boolean(getSecret());
}

function isLiveMode() {
  return getSecret().startsWith('sk_live_');
}

function isTestMode() {
  return getSecret().startsWith('sk_test_');
}

function requireSecret() {
  const secret = getSecret();
  if (!secret) {
    const err = new Error('Payment service not configured.');
    err.code = 'PAYSTACK_NOT_CONFIGURED';
    throw err;
  }
  return secret;
}

async function initializeTransaction({ email, amountKobo, reference, callbackUrl, metadata }) {
  const secret = requireSecret();
  const { data } = await axios.post(
    `${PAYSTACK_API}/transaction/initialize`,
    {
      email,
      amount: amountKobo,
      currency: 'NGN',
      reference,
      callback_url: callbackUrl,
      metadata,
      channels: ['card', 'bank', 'ussd', 'bank_transfer'],
    },
    {
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/json',
      },
    },
  );
  return data;
}

async function verifyTransaction(reference) {
  const secret = requireSecret();
  const { data } = await axios.get(
    `${PAYSTACK_API}/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: { Authorization: `Bearer ${secret}` },
    },
  );
  return data;
}

module.exports = {
  isConfigured,
  isLiveMode,
  isTestMode,
  initializeTransaction,
  verifyTransaction,
};
