import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, getAuthErrorMessage } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/shop';

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(form.email, form.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(getAuthErrorMessage(err, 'Invalid email or password.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-cream-50">
      <div className="max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <p className="section-label mb-2">Welcome Back</p>
          <h1 className="font-display text-3xl font-semibold text-ink mb-2">Sign In</h1>
          <p className="font-body text-sm text-ink/60">Access your bag and order history.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-cream-200 p-8 space-y-5">
          <div>
            <label className="block text-xs font-body font-semibold uppercase tracking-widest text-ink mb-1.5">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-xs font-body font-semibold uppercase tracking-widest text-ink mb-1.5">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="input-field"
            />
          </div>

          {error && (
            <p className="text-sm font-body text-terracotta bg-terracotta/10 border border-terracotta/30 px-3 py-2">{error}</p>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full text-sm disabled:opacity-60">
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm font-body text-ink/60">
          New to AdireBloom?{' '}
          <Link to="/signup" state={{ from }} className="text-indigo font-medium hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
