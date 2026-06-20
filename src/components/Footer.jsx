import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { siteAssets } from '../data/products';
import { contactInfo, socialLinks } from '../data/site';
import SocialLinks from './SocialLinks';

const shopLinks = [
  { to: '/shop', label: 'All Products' },
  { to: '/collections', label: 'Collections' },
  { to: '/shop?cat=bespoke', label: 'Bespoke Wears' },
  { to: '/shop?cat=batik', label: 'Batik' },
  { to: '/shop?cat=fabric', label: 'Tie & Dye Fabrics' },
];

const infoLinks = [
  { to: '/about', label: 'About Us' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
  { to: '/track-order', label: 'Track Order' },
  { to: '/faq', label: 'FAQs' },
];

const legalLinks = [
  { to: '/terms', label: 'Terms & Conditions' },
  { to: '/refund-policy', label: 'Refund Policy' },
  { to: '/privacy-policy', label: 'Privacy Policy' },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img src={siteAssets.logo} alt="AdireBloom" className="h-16 w-auto object-contain brightness-0 invert opacity-90" />
            </Link>
            <p className="text-xs tracking-widest uppercase text-gold mb-4 font-body">Wear Heritage, Bloom with Style</p>
            <p className="text-sm text-cream-200/70 font-body leading-relaxed mb-6">
              Handcrafted Adire garments rooted in Yoruba tradition and shaped for the modern world.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <SocialLinks links={socialLinks} variant="inverse" />
              <a href={contactInfo.emailHref} aria-label="Email"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-cream-200/20 text-cream-200/60 hover:text-gold hover:border-gold transition-colors">
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-widest uppercase text-gold mb-5">Shop</h4>
            <ul className="space-y-3">
              {shopLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-cream-200/70 hover:text-cream-50 font-body transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-widest uppercase text-gold mb-5">Information</h4>
            <ul className="space-y-3">
              {infoLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-cream-200/70 hover:text-cream-50 font-body transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-widest uppercase text-gold mb-5">Stay Connected</h4>
            <p className="text-sm text-cream-200/70 font-body mb-4 leading-relaxed">
              Get updates on new collections, limited pieces, and heritage stories.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border border-cream-200/20 px-4 py-2.5 text-sm font-body text-cream-50 placeholder-cream-200/40 focus:outline-none focus:border-gold transition-colors"
              />
              <button type="submit" className="btn-primary text-xs py-2.5">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-cream-200/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream-200/40 font-body">
            &copy; {new Date().getFullYear()} AdireBloom. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map(({ to, label }) => (
              <Link key={to} to={to} className="text-xs text-cream-200/40 hover:text-cream-200/70 font-body transition-colors">
                {label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-cream-200/30 font-body">Payments secured by Paystack</p>
        </div>
      </div>
    </footer>
  );
}
