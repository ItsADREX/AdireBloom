const LOCAL_ORIGINS = ['http://localhost:5173', 'http://localhost:4173'];

const PRODUCTION_ORIGIN = 'https://adirebloomtest.netlify.app';

function normalizeOrigin(origin) {
  if (!origin) return origin;
  return origin.replace(/\/+$/, '');
}

function parseEnvOrigins() {
  return (process.env.FRONTEND_URL || '')
    .split(',')
    .map((o) => normalizeOrigin(o.trim()))
    .filter(Boolean);
}

function getAllowedOrigins() {
  return [...new Set([...LOCAL_ORIGINS, PRODUCTION_ORIGIN, ...parseEnvOrigins()])];
}

function getPrimaryFrontendUrl() {
  const fromEnv = parseEnvOrigins();
  const https = fromEnv.find((u) => u.startsWith('https://'));
  if (https) return https;
  if (fromEnv[0]) return fromEnv[0];
  return PRODUCTION_ORIGIN;
}

function isAllowedOrigin(origin) {
  if (!origin) return true;
  const normalized = normalizeOrigin(origin);
  if (getAllowedOrigins().includes(normalized)) return true;
  try {
    const { hostname } = new URL(normalized);
    if (hostname.endsWith('.netlify.app')) return true;
  } catch {
  }
  return false;
}

module.exports = { getAllowedOrigins, getPrimaryFrontendUrl, isAllowedOrigin };
