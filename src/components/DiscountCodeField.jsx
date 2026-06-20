import { useState } from 'react';
import { Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

export default function DiscountCodeField({ compact = false }) {
  const { discount, applyDiscountCode, clearDiscount } = useCart();
  const [input, setInput] = useState(discount?.code || '');
  const [error, setError] = useState('');
  const [applying, setApplying] = useState(false);

  const handleApply = (e) => {
    e.preventDefault();
    setApplying(true);
    setError('');
    const result = applyDiscountCode(input);
    if (!result.ok) {
      setError(result.message);
    }
    setApplying(false);
  };

  const handleRemove = () => {
    clearDiscount();
    setInput('');
    setError('');
  };

  if (discount && compact) {
    return (
      <div className="flex items-center justify-between gap-2 text-sm font-body">
        <span className="text-indigo flex items-center gap-1.5">
          <Tag size={14} />
          {discount.code} (−{discount.percentOff}%)
        </span>
        <button type="button" onClick={handleRemove} className="text-xs text-ink/50 hover:text-terracotta">
          Remove
        </button>
      </div>
    );
  }

  return (
    <div className={compact ? '' : 'p-4 bg-cream-50 border border-cream-200 rounded-xl'}>
      {!compact && (
        <p className="text-xs font-body font-semibold uppercase tracking-widest text-ink mb-3 flex items-center gap-2">
          <Tag size={14} className="text-gold" />
          Discount Code
        </p>
      )}

      {discount ? (
        <div className="flex items-center justify-between gap-3 p-3 bg-indigo/5 border border-indigo/20 rounded-lg">
          <div>
            <p className="text-sm font-body font-semibold text-indigo">{discount.code}</p>
            <p className="text-xs font-body text-ink/55">
              {discount.label} — saving {formatPrice(discount.amount)}
            </p>
          </div>
          <button type="button" onClick={handleRemove} className="text-xs font-body text-terracotta hover:underline">
            Remove
          </button>
        </div>
      ) : (
        <form onSubmit={handleApply} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value.toUpperCase());
              setError('');
            }}
            placeholder="Enter code"
            className="input-field flex-1 text-sm uppercase tracking-wide bg-white"
          />
          <button
            type="submit"
            disabled={applying || !input.trim()}
            className="btn-outline text-xs px-4 py-2 whitespace-nowrap disabled:opacity-50"
          >
            Apply
          </button>
        </form>
      )}

      {error && <p className="text-xs text-terracotta mt-2 font-body">{error}</p>}
    </div>
  );
}
