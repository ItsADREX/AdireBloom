import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products, siteAssets } from '../data/products';

const countByCategory = (cat) => products.filter((p) => p.category === cat).length;

const categoryImage = {
  bespoke: siteAssets.collectionNxt1,
  gown: '/assets/products/gown.png',
  batik: '/assets/products/floral-design.jpg',
  fabric: siteAssets.aboutFabric2,
};

const collections = [
  {
    slug: 'bespoke',
    title: 'Bespoke Wears',
    headline: 'Made for You',
    description:
      'From baggy trousers to heritage tops and polos — bespoke Adire pieces tailored to your style and measurements.',
    accent: 'bg-gold/5 border-gold/20',
  },
  {
    slug: 'gown',
    title: 'Gowns',
    headline: 'Ceremonial Elegance',
    description:
      'Floor-length silhouettes crafted for celebrations, coronations, and milestones. Tie-dye gowns that turn every entrance into a statement.',
    accent: 'bg-terracotta/5 border-terracotta/20',
  },
  {
    slug: 'batik',
    title: 'Batik',
    headline: 'Waxed Pattern Artistry',
    description:
      'Premium batik fabrics with floral motifs, customized patterns, and classic wax finishes — ideal for traditional and ceremonial outfits.',
    accent: 'bg-indigo/5 border-indigo/20',
  },
  {
    slug: 'fabric',
    title: 'Tie & Dye Fabrics',
    headline: 'Raw Heritage',
    description:
      'Hand-dyed Adire textiles, guinea brocade, silk tie-dye, and thread pattern designs — available for tailors, designers, and creatives.',
    accent: 'bg-cream-100 border-cream-200',
  },
];

export default function Collections() {
  return (
    <>
      <section className="pt-32 pb-12 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-3">AdireBloom</p>
          <h1 className="section-heading mb-4">Our Collections</h1>
          <p className="font-body text-ink/60 max-w-xl mx-auto text-sm leading-relaxed">
            Four distinct expressions of Adire artistry — each category a different chapter in Nigerian textile heritage.
          </p>
        </div>
      </section>

      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {collections.map(({ slug, title, headline, description, accent }, i) => (
            <div
              key={slug}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden border ${accent}`}
            >
              <div className={`${i % 2 === 1 ? 'lg:order-2' : ''} aspect-[4/3] lg:aspect-auto min-h-[280px]`}>
                <img
                  src={categoryImage[slug]}
                  alt={title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={`${i % 2 === 1 ? 'lg:order-1' : ''} flex flex-col justify-center p-10 lg:p-14`}>
                <p className="section-label mb-3">{countByCategory(slug)} Pieces Available</p>
                <h2 className="font-display text-3xl lg:text-4xl font-semibold text-ink mb-2">{title}</h2>
                <p className="font-display text-lg text-gold font-medium mb-4 italic">{headline}</p>
                <p className="font-body text-sm text-ink/70 leading-relaxed mb-8">{description}</p>
                <Link
                  to={`/shop?cat=${slug}`}
                  className="btn-primary self-start text-sm"
                >
                  Explore {title} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
