import { createClient } from '@supabase/supabase-js';
import { getSiteUrl } from './siteUrl';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured && import.meta.env.PROD) {
  console.error(
    'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.',
  );
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        detectSessionInUrl: true,
        flowType: 'pkce',
      },
    })
  : null;

export function getAuthRedirectUrl(path = '/login') {
  const base = getSiteUrl();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

export function mapSupabaseUser(authUser) {
  if (!authUser) return null;
  return {
    id: authUser.id,
    email: authUser.email,
    firstName: authUser.user_metadata?.first_name || '',
    lastName: authUser.user_metadata?.last_name || '',
    createdAt: authUser.created_at,
  };
}

export function getAuthErrorMessage(error, fallback = 'Something went wrong. Please try again.') {
  if (!error) return fallback;
  const message = error.message || '';

  if (/invalid login credentials/i.test(message)) {
    return 'Invalid email or password.';
  }
  if (/user already registered|already been registered/i.test(message)) {
    return 'An account with this email already exists.';
  }
  if (/email not confirmed/i.test(message)) {
    return 'Please confirm your email before signing in. Check your inbox for the link.';
  }
  if (/password should be at least/i.test(message)) {
    return 'Password must be at least 8 characters.';
  }
  if (/unable to validate email/i.test(message)) {
    return 'Please enter a valid email address.';
  }
  if (/signup is disabled/i.test(message)) {
    return 'New sign-ups are temporarily disabled. Please contact support.';
  }

  return message || fallback;
}
