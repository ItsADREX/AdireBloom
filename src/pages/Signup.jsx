import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { legalLinks } from '../data/legal';

export default function Signup() {
  const { register, getAuthErrorMessage } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/shop';
  const bannerMessage = location.state?.message;

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!form.agreedToTerms) {
      setError('You must agree to our Terms, Refund Policy, and Privacy Policy.');
      return;
    }
    setLoading(true);
    try {
      await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        agreedToTerms: form.agreedToTerms,
      });
      navigate(from, { replace: true });
    } catch (err) {
      setError(getAuthErrorMessage(err, 'Registration failed. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-cream-50">
      <div className="max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <p className="section-label mb-2">Join AdireBloom</p>
          <h1 className="font-display text-3xl font-semibold text-ink mb-2">Create Your Account</h1>
          <p className="font-body text-sm text-ink/60">
            Browse freely — sign up to add to cart and checkout securely.
          </p>
        </div>

        {bannerMessage && (
          <div className="mb-6 p-4 bg-gold/10 border border-gold/30 text-sm font-body text-ink/80">
            {bannerMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white border border-cream-200 p-8 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-body font-semibold uppercase tracking-widest text-ink mb-1.5">First Name</label>
              <input name="firstName" value={form.firstName} onChange={handleChange} required className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-body font-semibold uppercase tracking-widest text-ink mb-1.5">Last Name</label>
              <input name="lastName" value={form.lastName} onChange={handleChange} required className="input-field" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-body font-semibold uppercase tracking-widest text-ink mb-1.5">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required className="input-field" />
          </div>
          <div>
            <label className="block text-xs font-body font-semibold uppercase tracking-widest text-ink mb-1.5">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required minLength={8} className="input-field" placeholder="Min. 8 characters" />
          </div>
          <div>
            <label className="block text-xs font-body font-semibold uppercase tracking-widest text-ink mb-1.5">Confirm Password</label>
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required className="input-field" />
          </div>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              name="agreedToTerms"
              checked={form.agreedToTerms}
              onChange={handleChange}
              className="mt-1 w-4 h-4 accent-indigo flex-shrink-0"
            />
            <span className="text-xs font-body text-ink/70 leading-relaxed">
              I agree to the{' '}
              {legalLinks.map((link, i) => (
                <span key={link.key}>
                  <Link to={link.path} target="_blank" className="text-indigo underline underline-offset-2 hover:text-indigo-mid">
                    {link.label}
                  </Link>
                  {i < legalLinks.length - 1 ? (i === legalLinks.length - 2 ? ', and ' : ', ') : ''}
                </span>
              ))}
              .
            </span>
          </label>

          {error && (
            <p className="text-sm font-body text-terracotta bg-terracotta/10 border border-terracotta/30 px-3 py-2">{error}</p>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full text-sm disabled:opacity-60">
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm font-body text-ink/60">
          Already have an account?{' '}
          <Link to="/login" state={{ from }} className="text-indigo font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
