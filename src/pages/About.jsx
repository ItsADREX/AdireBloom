import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { siteAssets } from '../data/products';

const values = [
  { title: 'Authentic Craft', body: 'We work only with artisans trained in traditional Adire techniques — no machine shortcuts, no synthetic shortcuts.' },
  { title: 'Cultural Stewardship', body: 'Every piece sold funds the continuation of Yoruba textile traditions in our partner communities.' },
  { title: 'Sustainable Practice', body: 'We use plant-based dyes and breathable natural fibres, minimizing chemical impact on our environment.' },
  { title: 'Inclusive Sizing', body: 'Heritage belongs to everyone. Our pieces are available from XS to 4XL, and every bespoke is made to your measure.' },
];

export default function About() {
  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden bg-ink text-cream-50">
        <div className="absolute inset-0 opacity-20">
          <img
            src={siteAssets.hero}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label text-gold mb-4">Our Story</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-cream-50 mb-6 leading-tight">
            Where Heritage Meets Modernity
          </h1>
          <p className="font-body text-cream-200/70 text-lg leading-relaxed max-w-2xl mx-auto">
            AdireBloom began with a simple conviction: that the most beautiful clothing in the world has always been made by hand, rooted in culture, and passed down through people who cared.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="section-label mb-4">The Beginning</p>
              <h2 className="section-heading mb-6">Born from a Love of Adire</h2>
              <div className="space-y-4 font-body text-sm text-ink/70 leading-relaxed">
                <p>
                  The tradition of Adire — "to tie and dye" in Yoruba — stretches back centuries in South-Western Nigeria. Using starch-resist, cassava-resist, and hand-stitched resist methods, artisans create patterns that are unique to each bolt of cloth, each dyeing session, each pair of hands.
                </p>
                <p>
                  AdireBloom was founded to give this tradition the platform it deserves: a premium brand that treats Adire not as folk craft, but as high fashion with deep roots.
                </p>
                <p>
                  We work directly with skilled artisans — paying fair prices, respecting the time and skill involved, and translating their work into garments designed for the modern African and the global diaspora.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src={siteAssets.aboutFabric1}
                alt="Adire fabric craft"
                loading="lazy"
                className="w-full aspect-[3/4] object-cover"
              />
              <img
                src={siteAssets.aboutFabric2}
                alt="Heritage dyeing"
                loading="lazy"
                className="w-full aspect-[3/4] object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label mb-3">What We Stand For</p>
            <h2 className="section-heading">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(({ title, body }) => (
              <div key={title} className="bg-white p-8 border-b-2 border-gold">
                <h3 className="font-display text-xl font-semibold text-ink mb-3">{title}</h3>
                <p className="font-body text-sm text-ink/60 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="section-label mb-3">Join the Movement</p>
          <h2 className="section-heading mb-6">Ready to Wear Heritage?</h2>
          <p className="font-body text-sm text-ink/60 mb-8 leading-relaxed">
            Browse our curated collection of Adire kaftans, gowns, bespoke wears, and fabrics. Each purchase directly supports our artisan partners.
          </p>
          <Link to="/shop" className="btn-primary text-sm">
            Shop the Collection <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
