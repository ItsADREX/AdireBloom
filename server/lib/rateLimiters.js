const rateLimit = require('express-rate-limit');

const jsonMessage = (message) => ({ message });

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: jsonMessage('Too many attempts. Please try again later.'),
});

const paymentInitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: jsonMessage('Too many checkout attempts. Please wait and try again.'),
});

const paymentVerifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
  message: jsonMessage('Too many verification requests. Please try again later.'),
});

module.exports = {
  authLimiter,
  paymentInitLimiter,
  paymentVerifyLimiter,
};
