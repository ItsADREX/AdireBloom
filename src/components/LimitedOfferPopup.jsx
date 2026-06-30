import { useEffect, useState } from 'react';
import { X, Tag, Copy, Check } from 'lucide-react';
import { limitedTimeOffer } from '../data/promotions';

const STORAGE_KEY = 'adirebloom_lto_dismissed';

export default function LimitedOfferPopup() {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) return;

    const timer = window.setTimeout(() => setVisible(true), 7000);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = (remember = false) => {
    setVisible(false);
    if (remember) localStorage.setItem(STORAGE_KEY, limitedTimeOffer.id);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(limitedTimeOffer.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-50 max-w-sm w-[calc(100%-2.5rem)] animate-fade-in"
      role="dialog"
      aria-labelledby="lto-title"
      aria-describedby="lto-desc"
    >
      <div className="relative bg-white border border-indigo/20 shadow-xl rounded-xl overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-indigo via-gold to-terracotta" />
        <div className="p-5">
          <button
            type="button"
            onClick={() => dismiss(true)}
            className="absolute top-3 right-3 p-1 text-ink/40 hover:text-ink transition-colors"
            aria-label="Dismiss offer"
          >
            <X size={16} />
          </button>

          <div className="flex items-start gap-3 pr-6">
            <div className="w-10 h-10 rounded-full bg-indigo/10 flex items-center justify-center text-indigo flex-shrink-0">
              <Tag size={18} />
            </div>
            <div>
              <p id="lto-title" className="font-display text-lg font-semibold text-indigo leading-tight mb-1">
                {limitedTimeOffer.title}
              </p>
              <p id="lto-desc" className="font-body text-xs text-ink/65 leading-relaxed mb-3">
                {limitedTimeOffer.description}
              </p>
              <p className="text-[10px] font-body uppercase tracking-widest text-terracotta/80 mb-3">
                {limitedTimeOffer.expiresLabel}
              </p>

              <div className="flex items-center gap-2">
                <code className="flex-1 px-3 py-2 bg-cream-50 border border-dashed border-indigo/30 text-sm font-mono font-semibold text-indigo tracking-wider">
                  {limitedTimeOffer.code}
                </code>
                <button
                  type="button"
                  onClick={copyCode}
                  className="p-2 border border-cream-200 text-ink/60 hover:text-indigo hover:border-indigo/30 transition-colors rounded-md"
                  aria-label="Copy discount code"
                >
                  {copied ? <Check size={16} className="text-indigo" /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => dismiss(false)}
            className="mt-4 w-full text-center text-[11px] font-body text-ink/45 hover:text-ink/65 transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
