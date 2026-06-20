import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Heart, ChevronDown } from 'lucide-react';
import { products, formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { AuthGateBanner, useRequireAuthAction } from '../components/AuthGate';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));
  const { addItem } = useCart();
  const requireAuth = useRequireAuthAction();

  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [careOpen, setCareOpen] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 pt-24">
        <p className="font-display text-2xl text-ink/40">Product not found</p>
        <Link to="/shop" className="btn-primary text-sm">Back to Shop</Link>
      </div>
    );
  }

  const discount = product.originalPrice && product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const canPurchase = product.purchasable && product.price;

  const handleAddToCart = () => {
    if (!canPurchase) return;
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    requireAuth(() => {
      setSizeError(false);
      addItem(product, selectedSize, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    });
  };

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-body uppercase tracking-widest text-ink/50 hover:text-indigo transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <div>
            <div className="aspect-[4/5] bg-cream overflow-hidden mb-4">
              <img
                src={product.images[activeImg]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-20 h-24 flex-shrink-0 overflow-hidden border-2 transition-colors ${
                      activeImg === i ? 'border-indigo' : 'border-transparent'
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <p className="section-label mb-2 capitalize">{product.category}</p>
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-body text-2xl font-semibold text-ink">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.price && (
                <>
                  <span className="font-body text-base text-ink/40 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-xs font-body font-semibold bg-terracotta text-white px-2 py-0.5">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            <p className="font-body text-sm text-ink/70 leading-relaxed mb-8">
              {product.description}
            </p>

            <AuthGateBanner />

            {/* Size */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-body font-semibold uppercase tracking-widest text-ink">Select Size</p>
                {sizeError && (
                  <span className="text-xs text-terracotta font-body">Please select a size</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false); }}
                    className={`min-w-[48px] px-4 py-2.5 text-xs font-body font-medium uppercase tracking-wide border transition-all duration-200 ${
                      selectedSize === size
                        ? 'bg-indigo text-cream-50 border-indigo'
                        : 'bg-white text-ink border-cream-200 hover:border-indigo'
                    } ${sizeError ? 'border-terracotta' : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {canPurchase ? (
            <div className="flex gap-3 mb-8">
              <div className="flex items-center border border-cream-200">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 text-ink/60 hover:text-indigo transition-colors font-body font-medium"
                >−</button>
                <span className="px-4 py-3 font-body text-sm font-medium min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-3 text-ink/60 hover:text-indigo transition-colors font-body font-medium"
                >+</button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3 font-body font-medium text-sm tracking-wide uppercase transition-all duration-300 ${
                  added
                    ? 'bg-indigo-mid text-cream-50'
                    : 'bg-indigo text-cream-50 hover:bg-indigo-mid'
                }`}
              >
                <ShoppingBag size={16} />
                {added ? 'Added to Bag!' : 'Add to Bag'}
              </button>
              <button className="p-3 border border-cream-200 text-ink/50 hover:text-terracotta hover:border-terracotta transition-colors">
                <Heart size={18} />
              </button>
            </div>
            ) : (
              <div className="mb-8 p-5 bg-cream-100 border border-cream-200">
                <p className="font-body text-sm text-ink/70 mb-4">This piece is priced on request. Contact us to place a bespoke order.</p>
                <Link to="/contact" className="btn-primary text-sm inline-flex">Request a Quote</Link>
              </div>
            )}

            {/* Proceed to cart if added */}
            {added && (
              <div className="flex gap-3 mb-6 animate-fade-in">
                <Link to="/cart" className="btn-outline text-xs flex-1 text-center">View Cart</Link>
                <Link to="/checkout" className="btn-primary text-xs flex-1 text-center">Checkout Now</Link>
              </div>
            )}

            {/* Care instructions accordion */}
            <div className="border-t border-cream-200 pt-4">
              <button
                onClick={() => setCareOpen((o) => !o)}
                className="w-full flex items-center justify-between py-2 text-xs font-body font-semibold uppercase tracking-widest text-ink hover:text-indigo transition-colors"
              >
                Care Instructions
                <ChevronDown size={14} className={`transition-transform duration-200 ${careOpen ? 'rotate-180' : ''}`} />
              </button>
              {careOpen && (
                <p className="text-sm font-body text-ink/60 leading-relaxed pb-4 animate-fade-in">
                  {product.care}
                </p>
              )}
            </div>

            <div className="border-t border-cream-200 pt-4">
              <div className="flex items-center gap-6 text-xs font-body text-ink/50">
                <span>Free delivery over ₦30,000</span>
                <span>·</span>
                <span>14-day returns</span>
                <span>·</span>
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <div className="mb-10">
              <p className="section-label mb-2">You May Also Like</p>
              <h2 className="font-display text-2xl font-semibold text-ink">Related Pieces</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
