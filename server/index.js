require('dotenv').config();
const express = require('express');
const cors = require('cors');
const paymentRoutes = require('./routes/payment');
const authRoutes = require('./routes/auth');
const { getAllowedOrigins, isAllowedOrigin } = require('./lib/frontendUrl');
const { ensureDemoUser } = require('./lib/seedDemoUser');

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = getAllowedOrigins();
console.log('CORS allowed origins:', allowedOrigins.join(', '));

app.use(cors({
  origin(origin, callback) {
    if (isAllowedOrigin(origin)) {
      callback(null, origin || true);
      return;
    }
    console.warn('CORS blocked origin:', origin);
    callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Raw body needed for Paystack webhook signature verification
app.use('/api/payment/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());

app.use('/api/payment', paymentRoutes);
app.use('/api/auth', authRoutes);

app.get('/health', (_req, res) => res.json({
  status: 'ok',
  timestamp: new Date().toISOString(),
  cors: allowedOrigins,
}));

app.use((_req, res) => res.status(404).json({ message: 'Route not found' }));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`AdireBloom API running on port ${PORT}`);
  ensureDemoUser().catch((err) => console.error('Demo user seed failed:', err.message));
});
