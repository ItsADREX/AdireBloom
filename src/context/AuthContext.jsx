import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api, ensureApiReady, getApiErrorMessage } from '../lib/api';
import {
  supabase,
  isSupabaseConfigured,
  mapSupabaseUser,
  getAuthErrorMessage as getSupabaseAuthErrorMessage,
  getAuthRedirectUrl,
} from '../lib/supabase';

const AuthContext = createContext(null);
const TOKEN_KEY = 'adirebloom_token';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getToken = useCallback(async () => {
    if (isSupabaseConfigured) {
      const { data } = await supabase.auth.getSession();
      return data.session?.access_token || null;
    }
    return localStorage.getItem(TOKEN_KEY);
  }, []);

  const authHeaders = useCallback(async () => {
    const token = await getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [getToken]);

  const clearLegacySession = () => {
    localStorage.removeItem(TOKEN_KEY);
  };

  useEffect(() => {
    if (isSupabaseConfigured) {
      clearLegacySession();

      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(mapSupabaseUser(session?.user ?? null));
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(mapSupabaseUser(session?.user ?? null));
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    }

    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return undefined;
    }

    ensureApiReady()
      .then(() => api.get('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } }))
      .then(({ data }) => setUser(data.user))
      .catch(() => clearLegacySession())
      .finally(() => setLoading(false));

    return undefined;
  }, []);

  const register = async (payload) => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signUp({
        email: payload.email.trim(),
        password: payload.password,
        options: {
          emailRedirectTo: getAuthRedirectUrl('/login'),
          data: {
            first_name: payload.firstName.trim(),
            last_name: payload.lastName.trim(),
            agreed_to_terms_at: new Date().toISOString(),
          },
        },
      });

      if (error) throw error;
      if (data.user && !data.session) {
        return {
          user: mapSupabaseUser(data.user),
          needsEmailConfirmation: true,
        };
      }

      const mapped = mapSupabaseUser(data.user);
      setUser(mapped);
      return { user: mapped, needsEmailConfirmation: false };
    }

    await ensureApiReady();
    const { data } = await api.post('/api/auth/register', payload);
    localStorage.setItem(TOKEN_KEY, data.token);
    setUser(data.user);
    return { user: data.user, needsEmailConfirmation: false };
  };

  const login = async (email, password) => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) throw error;
      const mapped = mapSupabaseUser(data.user);
      setUser(mapped);
      return mapped;
    }

    await ensureApiReady();
    const { data } = await api.post('/api/auth/login', { email, password });
    localStorage.setItem(TOKEN_KEY, data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
      setUser(null);
      return;
    }
    clearLegacySession();
    setUser(null);
  };

  const getAuthErrorMessage = (err, fallback) => (
    isSupabaseConfigured
      ? getSupabaseAuthErrorMessage(err, fallback)
      : getApiErrorMessage(err, fallback)
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        register,
        login,
        logout,
        authHeaders,
        getToken,
        getAuthErrorMessage,
        authProvider: isSupabaseConfigured ? 'supabase' : 'api',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
