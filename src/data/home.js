import { siteAssets } from './products';

export const heroSlides = [
  {
    id: 'season-collection',
    image: siteAssets.hero,
    label: 'New Arrivals — Season Collection',
    title: 'Adire for Every Occasion',
    description:
      'Handcrafted heritage wear rooted in Yoruba artistry. Each piece carries the soul of a tradition — curated for the modern African.',
    primaryCta: { label: 'Explore Collection', to: '/shop' },
    secondaryCta: { label: 'Our Story', to: '/about' },
  },
  {
    id: 'bespoke',
    image: siteAssets.collectionNxt1,
    label: 'Bespoke Wears',
    title: 'Tailored to Your Story',
    description:
      'From ceremony kaftans to everyday statement pieces — bespoke Adire made to your measure, yours alone.',
    primaryCta: { label: 'Shop Bespoke', to: '/shop?cat=bespoke' },
    secondaryCta: { label: 'View Collections', to: '/collections' },
  },
  {
    id: 'gowns',
    image: siteAssets.collectionNxt2,
    label: 'Ceremonial Gowns',
    title: 'Elegance in Every Drape',
    description:
      'Floor-length silhouettes for celebrations and milestones. Tie-dye artistry that turns every entrance into a statement.',
    primaryCta: { label: 'Shop Gowns', to: '/shop?cat=gown' },
    secondaryCta: { label: 'Featured Pieces', to: '/shop' },
  },
  {
    id: 'fabrics',
    image: siteAssets.aboutFabric2,
    label: 'Adire Fabrics',
    title: 'Authentic Textiles by the Yard',
    description:
      'Premium tie-and-dye fabrics for designers, tailors, and makers who want genuine Nigerian Adire at the source.',
    primaryCta: { label: 'Shop Fabrics', to: '/shop?cat=fabric' },
    secondaryCta: { label: 'Contact Us', to: '/contact' },
  },
];
