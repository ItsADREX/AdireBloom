import { useState } from 'react';
import { Search, Package } from 'lucide-react';

export default function TrackOrder() {
  const [ref, setRef] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="pt-32 pb-12 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-3">Delivery Status</p>
          <h1 className="section-heading mb-4">Track Your Order</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-lg mx-auto px-4">
          {!submitted ? (
            <form
              onSubmit={(e) => { e.preventDefault(); if (ref.trim()) setSubmitted(true); }}
              className="bg-white border border-cream-200 p-8 space-y-5"
            >
              <div className="text-center mb-2">
                <Package size={40} className="mx-auto text-gold mb-3" />
                <p className="font-body text-sm text-ink/60">Enter the order reference from your confirmation email.</p>
              </div>
              <div>
                <label className="block text-xs font-body font-semibold uppercase tracking-widest text-ink mb-1.5">Order Reference</label>
                <input
                  type="text"
                  value={ref}
                  onChange={(e) => setRef(e.target.value)}
                  className="input-field"
                  placeholder="e.g. AB-2024-001234"
                  required
                />
              </div>
              <button type="submit" className="btn-primary w-full text-sm">
                <Search size={14} /> Track Order
              </button>
            </form>
          ) : (
            <div className="bg-white border border-cream-200 p-8 text-center space-y-4">
              <Package size={40} className="mx-auto text-indigo" />
              <h2 className="font-display text-2xl font-semibold text-ink">Order Found</h2>
              <p className="font-body text-sm text-ink/60">Reference: <strong>{ref}</strong></p>
              <div className="text-left bg-cream-100 p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-indigo flex-shrink-0" />
                  <span className="font-body text-sm text-ink">Order Confirmed</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-gold flex-shrink-0" />
                  <span className="font-body text-sm text-ink">Being Packaged</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-cream-200 flex-shrink-0" />
                  <span className="font-body text-sm text-ink/50">In Transit</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-cream-200 flex-shrink-0" />
                  <span className="font-body text-sm text-ink/50">Delivered</span>
                </div>
              </div>
              <button onClick={() => { setSubmitted(false); setRef(''); }} className="btn-ghost text-xs">Track another order</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
