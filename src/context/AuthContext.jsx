import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api, ensureApiReady, getApiErrorMessage } from '../lib/api';

const AuthContext = createContext(null);
const TOKEN_KEY = 'adirebloom_token';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getToken = () => localStorage.getItem(TOKEN_KEY);

  const authHeaders = useCallback(() => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, []);

  const persistSession = (token, userData) => {
    localStorage.setItem(TOKEN_KEY, token);
    setUser(userData);
  };

  const clearSession = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    ensureApiReady()
      .then(() => api.get('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } }))
      .then(({ data }) => setUser(data.user))
      .catch(() => clearSession())
      .finally(() => setLoading(false));
  }, []);

  const register = async (payload) => {
    await ensureApiReady();
    const { data } = await api.post('/api/auth/register', payload);
    persistSession(data.token, data.user);
    return data.user;
  };

  const login = async (email, password) => {
    await ensureApiReady();
    const { data } = await api.post('/api/auth/login', { email, password });
    persistSession(data.token, data.user);
    return data.user;
  };

  const logout = () => clearSession();

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
        getAuthErrorMessage: getApiErrorMessage,
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
