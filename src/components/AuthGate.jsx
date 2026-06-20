import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function useRequireAuthAction() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (action) => {
    if (!isAuthenticated) {
      navigate('/signup', { state: { from: window.location.pathname, message: 'Create an account to add items to your bag and checkout.' } });
      return false;
    }
    action();
    return true;
  };
}

export function AuthGateBanner({ message }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return null;

  return (
    <div className="bg-indigo/5 border border-indigo/20 px-4 py-3 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <p className="text-sm font-body text-ink/70">
        {message || 'Sign in or create an account to add items to your bag and complete purchases.'}
      </p>
      <div className="flex gap-2 flex-shrink-0">
        <Link to="/login" className="btn-outline text-xs py-2 px-4">Sign In</Link>
        <Link to="/signup" className="btn-primary text-xs py-2 px-4">Create Account</Link>
      </div>
    </div>
  );
}
