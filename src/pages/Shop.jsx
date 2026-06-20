import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

const sortOptions = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A–Z' },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState('default');
  const [filterOpen, setFilterOpen] = useState(false);

  const activeCategory = searchParams.get('cat') || 'all';

  const setCategory = (cat) => {
    if (cat === 'all') {
      searchParams.delete('cat');
    } else {
      searchParams.set('cat', cat);
    }
    setSearchParams(searchParams);
  };

  const visible = useMemo(() => {
    let list = activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === 'name-asc') list = [...list].sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [activeCategory, sort]);

  return (
    <>
      {/* Page header */}
      <section className="pt-32 pb-12 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-3">AdireBloom Store</p>
          <h1 className="section-heading mb-4">All Collections</h1>
          <p className="font-body text-ink/60 max-w-xl mx-auto text-sm leading-relaxed">
            Handcrafted Adire garments, fabrics, and bespoke pieces — each one unique, each one carrying heritage.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            {/* Category pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setCategory(id)}
                  className={`px-4 py-2 text-xs font-body font-medium tracking-wide uppercase transition-colors duration-200 border ${
                    activeCategory === id
                      ? 'bg-indigo text-cream-50 border-indigo'
                      : 'bg-white text-ink border-cream-200 hover:border-indigo hover:text-indigo'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Sort + count */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <span className="text-xs font-body text-ink/50">{visible.length} piece{visible.length !== 1 ? 's' : ''}</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="input-field py-2 text-xs pr-8 w-auto cursor-pointer"
              >
                {sortOptions.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid */}
          {visible.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-display text-2xl text-ink/30 mb-4">No pieces found</p>
              <button
                onClick={() => setCategory('all')}
                className="btn-ghost inline-flex items-center gap-2"
              >
                <X size={14} /> Clear filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {visible.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
