const LOCAL_ORIGINS = ['http://localhost:5173', 'http://localhost:4173'];

/** Production Netlify site — also allow any *.netlify.app for preview deploys */
const PRODUCTION_ORIGIN = 'https://adirebloomtest.netlify.app';

function parseEnvOrigins() {
  return (process.env.FRONTEND_URL || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
}

function getAllowedOrigins() {
  return [...new Set([...LOCAL_ORIGINS, PRODUCTION_ORIGIN, ...parseEnvOrigins()])];
}

/** Paystack callback — prefer HTTPS production URL over localhost */
function getPrimaryFrontendUrl() {
  const fromEnv = parseEnvOrigins();
  const https = fromEnv.find((u) => u.startsWith('https://'));
  if (https) return https;
  if (fromEnv[0]) return fromEnv[0];
  return PRODUCTION_ORIGIN;
}

function isAllowedOrigin(origin) {
  if (!origin) return true;
  if (getAllowedOrigins().includes(origin)) return true;
  try {
    const { hostname } = new URL(origin);
    if (hostname.endsWith('.netlify.app')) return true;
  } catch {
    /* ignore invalid origin */
  }
  return false;
}

module.exports = { getAllowedOrigins, getPrimaryFrontendUrl, isAllowedOrigin };
