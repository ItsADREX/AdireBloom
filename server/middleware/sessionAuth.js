const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET;

if (!JWT_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET must be set in production.');
}

const LEGACY_JWT_SECRET = JWT_SECRET || 'adirebloom-dev-secret-local-only';

function verifySupabaseToken(token) {
  if (!SUPABASE_JWT_SECRET) return null;
  try {
    const payload = jwt.verify(token, SUPABASE_JWT_SECRET, { algorithms: ['HS256'] });
    if (payload.role && payload.role !== 'authenticated') return null;
    return {
      id: payload.sub,
      email: payload.email,
    };
  } catch {
    return null;
  }
}

function verifyLegacyToken(token) {
  try {
    return jwt.verify(token, LEGACY_JWT_SECRET, { algorithms: ['HS256'] });
  } catch {
    return null;
  }
}

function requireSession(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  const token = header.slice(7);
  const supabaseUser = verifySupabaseToken(token);
  if (supabaseUser) {
    req.user = supabaseUser;
    req.authProvider = 'supabase';
    return next();
  }

  const legacyUser = verifyLegacyToken(token);
  if (legacyUser) {
    req.user = legacyUser;
    req.authProvider = 'legacy';
    return next();
  }

  return res.status(401).json({ message: 'Invalid or expired session. Please sign in again.' });
}

module.exports = { requireSession, verifySupabaseToken, verifyLegacyToken };
