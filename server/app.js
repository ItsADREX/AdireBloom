require('dotenv').config();
const express = require('express');
const cors = require('cors');
const paymentRoutes = require('./routes/payment');
const authRoutes = require('./routes/auth');
const { getAllowedOrigins, isAllowedOrigin } = require('./lib/frontendUrl');
const { authLimiter } = require('./lib/rateLimiters');

function createApp() {
  const app = express();
  const allowedOrigins = getAllowedOrigins();

  app.use(cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        callback(null, origin || true);
        return;
      }
      callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  app.use('/api/payment/webhook', express.raw({ type: 'application/json' }));
  app.use(express.json());

  app.use('/api/auth', authLimiter, authRoutes);
  app.use('/api/payment', paymentRoutes);

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

  return app;
}

module.exports = { createApp };
