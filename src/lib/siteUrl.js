const PRODUCTION_SITE_URL = 'https://adirebloomtest.netlify.app';

export function getSiteUrl() {
  const fromEnv = import.meta.env.VITE_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/+$/, '');

  if (import.meta.env.PROD) return PRODUCTION_SITE_URL;

  if (typeof window !== 'undefined') return window.location.origin;

  return PRODUCTION_SITE_URL;
}
