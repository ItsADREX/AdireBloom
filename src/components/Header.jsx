import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { siteAssets } from '../data/products';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/collections', label: 'Collections' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totals } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isHome = location.pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? 'bg-white/95 backdrop-blur-sm shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={siteAssets.logo}
              alt="AdireBloom"
              className="h-10 w-auto object-contain"
            />
            <div className="hidden sm:flex flex-col leading-none">
              <span className={`font-display text-xl font-semibold transition-colors duration-300 ${
                scrolled || !isHome ? 'text-indigo' : 'text-white'
              } group-hover:text-indigo-mid`}>
                AdireBloom
              </span>
              <span className={`text-[10px] tracking-widest uppercase font-body transition-colors duration-300 ${
                scrolled || !isHome ? 'text-gold' : 'text-gold-light'
              }`}>
                Wear Heritage, Bloom with Style
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `font-body text-sm font-medium tracking-wide uppercase transition-colors duration-200 pb-0.5 border-b ${
                    isActive
                      ? 'border-gold text-indigo'
                      : `border-transparent ${scrolled || !isHome ? 'text-ink hover:text-indigo' : 'text-white/90 hover:text-white'}`
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Cart + Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-4">
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                <span className={`text-xs font-body max-w-[120px] truncate ${scrolled || !isHome ? 'text-ink/70' : 'text-cream-200/80'}`}>
                  Hi, {user.firstName}
                </span>
                <button
                  onClick={logout}
                  className={`p-2 transition-colors duration-200 ${scrolled || !isHome ? 'text-ink hover:text-indigo' : 'text-white hover:text-gold-light'}`}
                  aria-label="Sign out"
                  title="Sign out"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-body font-medium uppercase tracking-wide transition-colors ${
                  scrolled || !isHome ? 'text-ink hover:text-indigo' : 'text-white hover:text-gold-light'
                }`}
              >
                <User size={16} /> Sign In
              </Link>
            )}

            <Link
              to="/cart"
              className={`relative p-2 transition-colors duration-200 ${
                scrolled || !isHome ? 'text-ink hover:text-indigo' : 'text-white hover:text-gold-light'
              }`}
              aria-label="Shopping cart"
            >
              <ShoppingBag size={22} />
              {totals.count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-indigo text-cream-50 text-[10px] font-body font-semibold flex items-center justify-center">
                  {totals.count > 9 ? '9+' : totals.count}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileOpen((o) => !o)}
              className={`lg:hidden p-2 transition-colors duration-200 ${
                scrolled || !isHome ? 'text-ink hover:text-indigo' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } bg-white border-t border-cream-200`}
      >
        <nav className="px-4 py-4 flex flex-col gap-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `block px-4 py-3 font-body text-sm font-medium tracking-wide uppercase rounded transition-colors ${
                  isActive
                    ? 'bg-cream text-indigo border-l-2 border-indigo'
                    : 'text-ink hover:bg-cream'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-3 font-body text-sm font-medium tracking-wide uppercase rounded text-ink hover:bg-cream transition-colors w-full text-left"
            >
              <LogOut size={16} /> Sign Out
            </button>
          ) : (
            <>
              <Link to="/login" className="block px-4 py-3 font-body text-sm font-medium tracking-wide uppercase rounded text-ink hover:bg-cream">Sign In</Link>
              <Link to="/signup" className="block px-4 py-3 font-body text-sm font-medium tracking-wide uppercase rounded bg-indigo text-cream-50 mx-4 text-center">Create Account</Link>
            </>
          )}
          <Link
            to="/cart"
            className="flex items-center gap-2 px-4 py-3 font-body text-sm font-medium tracking-wide uppercase rounded text-ink hover:bg-cream transition-colors"
          >
            <ShoppingBag size={16} />
            Cart
            {totals.count > 0 && (
              <span className="ml-auto w-5 h-5 rounded-full bg-indigo text-cream-50 text-[10px] font-semibold flex items-center justify-center">
                {totals.count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
