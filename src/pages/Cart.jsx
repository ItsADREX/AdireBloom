import { Link } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import DiscountCodeField from '../components/DiscountCodeField';

export default function Cart() {
  const { items, totals, removeItem, updateQty } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-8 pt-24 px-4">
        <div className="text-center">
          <ShoppingBag size={64} className="mx-auto text-cream-200 mb-4" />
          <h1 className="font-display text-3xl font-semibold text-ink mb-2">Your bag is empty</h1>
          <p className="font-body text-sm text-ink/60 mb-8">Explore our curated Adire pieces and add something beautiful.</p>
          <Link to="/shop" className="btn-primary text-sm">
            Explore Collection <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="section-label mb-2">Your Shopping Bag</p>
          <h1 className="section-heading">Cart ({totals.count} item{totals.count !== 1 ? 's' : ''})</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map(({ key, product, size, quantity }) => (
              <div key={key} className="flex gap-5 pb-6 border-b border-cream-200">
                <Link to={`/product/${product.id}`} className="flex-shrink-0">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-24 h-32 sm:w-28 sm:h-36 object-cover bg-cream"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/product/${product.id}`}
                    className="font-display text-base font-medium text-ink hover:text-indigo transition-colors block mb-1 leading-snug"
                  >
                    {product.name}
                  </Link>
                  <p className="text-xs font-body text-ink/50 mb-4">Size: {size}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-cream-200">
                      <button
                        onClick={() => updateQty(key, quantity - 1)}
                        className="px-3 py-2 text-ink/60 hover:text-indigo text-sm font-body"
                      >−</button>
                      <span className="px-3 py-2 text-sm font-body font-medium min-w-[2.5rem] text-center">{quantity}</span>
                      <button
                        onClick={() => updateQty(key, quantity + 1)}
                        className="px-3 py-2 text-ink/60 hover:text-indigo text-sm font-body"
                      >+</button>
                    </div>
                    <span className="font-body font-semibold text-sm text-ink">
                      {formatPrice(product.price * quantity)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(key)}
                  className="flex-shrink-0 self-start p-2 text-ink/30 hover:text-terracotta transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <div className="bg-cream-100 p-6 lg:p-8 sticky top-24">
              <h2 className="font-display text-xl font-semibold text-ink mb-6">Order Summary</h2>

              <div className="mb-6">
                <DiscountCodeField />
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm font-body">
                  <span className="text-ink/60">Subtotal</span>
                  <span className="font-medium text-ink">{formatPrice(totals.subtotal)}</span>
                </div>
                {totals.discountAmount > 0 && (
                  <div className="flex items-center justify-between text-sm font-body text-indigo">
                    <span>Discount</span>
                    <span>−{formatPrice(totals.discountAmount)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm font-body">
                  <span className="text-ink/60">Delivery</span>
                  <span className={`font-medium ${totals.shipping === 0 ? 'text-indigo' : 'text-ink'}`}>
                    {totals.shipping === 0 ? 'Free' : formatPrice(totals.shipping)}
                  </span>
                </div>
                {totals.shipping === 0 && (
                  <p className="text-xs text-indigo/70 font-body">
                    Free delivery applied on orders over ₦30,000
                  </p>
                )}
                <div className="border-t border-cream-200 pt-4 flex items-center justify-between">
                  <span className="font-body font-semibold text-ink">Total</span>
                  <span className="font-display text-xl font-semibold text-ink">{formatPrice(totals.total)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="btn-primary w-full mb-3 text-sm"
              >
                Proceed to Checkout <ArrowRight size={16} />
              </Link>
              <Link
                to="/shop"
                className="btn-ghost w-full text-center text-xs"
              >
                Continue Shopping
              </Link>

              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-body text-ink/40 uppercase tracking-widest">
                <span>Secured by</span>
                <span className="font-semibold text-ink/60">Paystack</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
