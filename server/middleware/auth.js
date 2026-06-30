const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET must be set in production.');
}

const EFFECTIVE_JWT_SECRET = JWT_SECRET || 'adirebloom-dev-secret-local-only';

function authRequired(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required.' });
  }
  try {
    const token = header.slice(7);
    req.user = jwt.verify(token, EFFECTIVE_JWT_SECRET, { algorithms: ['HS256'] });
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired session. Please sign in again.' });
  }
}

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName },
    EFFECTIVE_JWT_SECRET,
    { expiresIn: '7d' }
  );
}

module.exports = { authRequired, signToken, JWT_SECRET: EFFECTIVE_JWT_SECRET };
