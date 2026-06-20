import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, RefreshCw, Truck } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, siteAssets } from '../data/products';

const featured = products.filter((p) => p.featured).slice(0, 4);

const collections = [
  {
    title: 'Bespoke Wears',
    subtitle: 'Made to your measure, yours alone',
    image: siteAssets.collectionNxt1,
    link: '/shop?cat=bespoke',
  },
  {
    title: 'Gowns',
    subtitle: 'Ceremonial elegance, modern drape',
    image: siteAssets.collectionNxt2,
    link: '/shop?cat=gown',
  },
  {
    title: 'Batik',
    subtitle: 'Hand-waxed patterns, rich colour',
    image: '/assets/products/floral-design.jpg',
    link: '/shop?cat=batik',
  },
  {
    title: 'Tie & Dye Fabrics',
    subtitle: 'Authentic Adire textiles by the yard',
    image: siteAssets.aboutFabric2,
    link: '/shop?cat=fabric',
  },
];

const trust = [
  { icon: Shield, title: 'Authentic Adire', body: 'Every piece is handcrafted using genuine resist-dye techniques passed down through generations.' },
  { icon: Star, title: 'Premium Quality', body: 'We source only the finest Nigerian cotton and silk to ensure your garment ages beautifully.' },
  { icon: Truck, title: 'Nationwide Delivery', body: 'Careful packaging and reliable delivery to every state in Nigeria, with tracking included.' },
  { icon: RefreshCw, title: 'Easy Returns', body: 'Not quite right? Return within 14 days for a full refund or exchange — no questions asked.' },
];

export default function Home() {
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={siteAssets.hero}
            alt="Adire heritage wear"
            className="w-full h-full object-cover object-top"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="max-w-2xl">
            <p className="section-label text-gold-light mb-4 animate-fade-up">
              New Arrivals — Season Collection
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-cream-50 leading-tight mb-6 animate-fade-up text-balance">
              Adire for Every Occasion
            </h1>
            <p className="font-body text-base sm:text-lg text-cream-200/80 mb-10 leading-relaxed max-w-lg animate-fade-up">
              Handcrafted heritage wear rooted in Yoruba artistry. Each piece carries the soul of a tradition — curated for the modern African.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up">
              <Link to="/shop" className="btn-primary text-sm">
                Explore Collection
                <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="btn-outline border-cream-50 text-cream-50 hover:bg-cream-50 hover:text-ink text-sm">
                Our Story
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-cream-200/50">
          <span className="text-[10px] font-body tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-cream-200/50 to-transparent" />
        </div>
      </section>

      <div className="bg-indigo py-3 overflow-hidden">
        <div className="flex gap-12 animate-none whitespace-nowrap">
          {Array(3).fill(['Handcrafted Adire', 'Bespoke Wears', 'Tie & Dye Fabrics', 'Batik Artistry', 'Heritage Gowns', 'Made in Nigeria']).flat().map((t, i) => (
            <span key={i} className="text-xs font-body font-medium tracking-widest uppercase text-cream-200/70 flex-shrink-0">
              {t} <span className="text-gold mx-3">◆</span>
            </span>
          ))}
        </div>
      </div>

      <section className="py-20 lg:py-28 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Curated for You</p>
            <h2 className="section-heading">Explore Our Collections</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map(({ title, subtitle, image, link }) => (
              <Link
                key={title}
                to={link}
                className="group relative overflow-hidden aspect-[4/5] block"
              >
                <img
                  src={image}
                  alt={title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-xl font-semibold text-cream-50 mb-1">{title}</h3>
                  <p className="text-xs font-body text-cream-200/70 mb-4 uppercase tracking-wide">{subtitle}</p>
                  <span className="inline-flex items-center gap-2 text-xs font-body font-semibold uppercase tracking-widest text-gold group-hover:gap-4 transition-all duration-300">
                    Shop Now <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="section-label mb-3">Hand-Picked</p>
              <h2 className="section-heading">Featured Pieces</h2>
            </div>
            <Link to="/shop" className="btn-ghost hidden sm:inline-flex">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="text-center mt-10 sm:hidden">
            <Link to="/shop" className="btn-outline text-sm">View All Products</Link>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-ink text-cream-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="relative">
              <div className="aspect-square max-w-sm mx-auto lg:mx-0">
                <img
                  src={siteAssets.collectionNxt1}
                  alt="Adire heritage craft"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 border border-gold/30 hidden lg:block" />
            </div>

            <div>
              <p className="section-label text-gold mb-4">Our Heritage</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-cream-50 mb-6 leading-tight">
                Rooted in Tradition,<br />Designed for Today
              </h2>
              <p className="font-body text-cream-200/70 text-base leading-relaxed mb-6">
                Adire — Yoruba for "tie and dye" — is one of Nigeria's oldest and most revered textile arts. At AdireBloom, we work directly with skilled artisans to preserve and evolve this craft for the modern wardrobe.
              </p>
              <p className="font-body text-cream-200/70 text-base leading-relaxed mb-8">
                Every stitch, every dye vat, every finished garment carries the intentionality of hands that know what they're doing. We believe clothing can be both luxurious and culturally meaningful.
              </p>
              <Link to="/about" className="btn-outline border-cream-200/30 text-cream-50 hover:bg-cream-50 hover:text-ink hover:border-cream-50">
                Read Our Story <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo rounded-none relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full" style={{
                backgroundImage: 'repeating-linear-gradient(45deg, #c9a84c 0px, #c9a84c 1px, transparent 1px, transparent 20px)',
              }} />
            </div>
            <div className="relative z-10 px-8 py-12 sm:px-12 sm:py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div>
                <p className="text-gold text-xs font-body tracking-widest uppercase mb-2">Limited Season Offer</p>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-cream-50 mb-3">
                  Free Delivery on Orders Over ₦30,000
                </h2>
                <p className="font-body text-cream-200/70 text-sm">
                  Shop our curated selection and let us bring heritage to your door — at no extra cost.
                </p>
              </div>
              <Link to="/shop" className="btn-primary bg-gold text-ink hover:bg-gold-light flex-shrink-0 whitespace-nowrap">
                Shop Now <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {trust.map(({ icon: Icon, title, body }) => (
              <div key={title} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 border border-gold/30 text-gold mb-4">
                  <Icon size={20} />
                </div>
                <h4 className="font-display text-lg font-semibold text-ink mb-2">{title}</h4>
                <p className="font-body text-sm text-ink/60 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
