const icons = {
  instagram: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  facebook: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  tiktok: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.87a8.18 8.18 0 0 0 4.76 1.52V6.94a4.85 4.85 0 0 1-1-.25z" />
    </svg>
  ),
};

const variantStyles = {
  light: 'border-cream-200 bg-white text-ink/80 hover:border-indigo hover:text-indigo hover:bg-indigo/5',
  inverse: 'border-cream-200/35 bg-white/5 text-cream-100 hover:text-gold hover:border-gold hover:bg-white/10',
};

export default function SocialLinks({ links, size = 'md', variant = 'light', className = '' }) {
  const sizeClass = size === 'lg' ? 'w-11 h-11' : 'w-9 h-9';
  const baseStyle = variantStyles[variant] || variantStyles.light;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map(({ id, label, href, brandClass }) => {
        const Icon = icons[id];
        return (
          <a
            key={id}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={label}
            className={`${sizeClass} flex items-center justify-center rounded-lg border transition-all duration-200 ${baseStyle} ${brandClass || ''}`}
          >
            {Icon ? <Icon /> : label[0]}
          </a>
        );
      })}
    </div>
  );
}
