const { createApp } = require('./app');
const { ensureDemoUser } = require('./lib/seedDemoUser');

const app = createApp();
const PORT = process.env.PORT || 4000;

const paystackKey = process.env.PAYSTACK_SECRET_KEY || '';
if (paystackKey.startsWith('sk_live_')) {
  console.log('Paystack: LIVE mode');
} else if (paystackKey.startsWith('sk_test_')) {
  console.log('Paystack: TEST mode');
} else if (!paystackKey) {
  console.warn('Paystack: PAYSTACK_SECRET_KEY not set');
}

const allowedOrigins = require('./lib/frontendUrl').getAllowedOrigins();
console.log('CORS allowed origins:', allowedOrigins.join(', '));

app.listen(PORT, () => {
  console.log(`AdireBloom API running on port ${PORT}`);
  ensureDemoUser().catch((err) => console.error('Demo user seed failed:', err.message));
});
