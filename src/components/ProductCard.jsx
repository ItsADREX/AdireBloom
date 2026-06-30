import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import { useRequireAuthAction } from './AuthGate';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const requireAuth = useRequireAuthAction();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [wished, setWished] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    if (!product.purchasable || !product.price) return;
    requireAuth(() => {
      const defaultSize = product.sizes[0];
      setAdding(true);
      addItem(product, defaultSize, 1);
      setTimeout(() => setAdding(false), 1200);
    });
  };

  const discount = product.originalPrice && product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-white overflow-hidden card-hover"
    >
      <div className="relative aspect-[3/4] bg-cream overflow-hidden">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-cream-200 animate-pulse" />
        )}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImgLoaded(true)}
        />

        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-300" />

        <button
          onClick={(e) => { e.preventDefault(); setWished((w) => !w); }}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm transition-all duration-200 hover:scale-110"
          aria-label="Add to wishlist"
        >
          <Heart
            size={16}
            className={wished ? 'fill-terracotta text-terracotta' : 'text-ink/50'}
          />
        </button>

        {product.badge && (
          <span className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-body font-semibold tracking-widest uppercase ${
            product.badge === 'Sale' || product.badge === 'Bestseller'
              ? 'bg-terracotta text-white'
              : product.badge === 'New'
              ? 'bg-indigo text-cream-50'
              : product.badge === 'Premium' || product.badge === 'Limited'
              ? 'bg-gold text-white'
              : 'bg-ink text-cream-50'
          }`}>
            {product.badge}
            {discount && product.badge === 'Sale' && ` −${discount}%`}
          </span>
        )}

        {product.purchasable && product.price && (
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleQuickAdd}
            className={`w-full flex items-center justify-center gap-2 py-3 text-xs font-body font-semibold tracking-widest uppercase transition-colors duration-200 ${
              adding
                ? 'bg-indigo-mid text-cream-50'
                : 'bg-indigo text-cream-50 hover:bg-indigo-mid'
            }`}
          >
            <ShoppingBag size={14} />
            {adding ? 'Added!' : 'Quick Add'}
          </button>
        </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-[10px] font-body font-medium tracking-widest uppercase text-gold mb-1 capitalize">
          {product.category}
        </p>
        <h3 className="font-display text-base font-medium text-ink leading-snug mb-2 group-hover:text-indigo transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-body font-semibold text-ink text-sm">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="font-body text-xs text-ink/40 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
