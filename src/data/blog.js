export const blogPosts = [
  {
    id: 614,
    slug: 'the-history-of-adire-nigeria',
    title: 'The History of Adire: Nigeria',
    date: '2025-09-23',
    excerpt:
      'Adire is more than just a fabric — it is a living story, woven into the cultural identity of the Yoruba people of southwestern Nigeria.',
    image: '/assets/blog/history-adire.jpg',
    content: `
      <p>Adire is more than just a fabric — it is a living story, woven into the cultural identity of the Yoruba people of southwestern Nigeria. Known for its rich indigo hues and intricate patterns, Adire has traveled from the hands of traditional dyers to runways and wardrobes around the world.</p>
      <h3>Origins of Adire</h3>
      <p>The word <em>Adire</em> comes from two Yoruba words — <strong>adi</strong> (to tie) and <strong>re</strong> (to dye). The craft dates back to the 19th century, especially in the city of Abeokuta, where women perfected the art of resist dyeing. This involved tying, stitching, or painting patterns on cotton cloth before dipping it into natural indigo dye extracted from local plants.</p>
      <h3>Traditional Techniques</h3>
      <p>Adire-making is a skill passed down through generations. Popular methods include:</p>
      <ul>
        <li><strong>Adire Eleso</strong> — tied and stitched resist patterns</li>
        <li><strong>Adire Alabere</strong> — stitch-resist using raffia</li>
        <li><strong>Adire Oniko</strong> — tied with pebbles or seeds</li>
        <li><strong>Adire Batik</strong> — wax-resist hand-painted designs</li>
      </ul>
      <p>Each technique produces unique patterns that tell stories of Yoruba culture, nature, and daily life.</p>
      <h3>Adire Today</h3>
      <p>Modern designers and brands like AdireBloom are reimagining Adire for contemporary fashion — blending heritage craftsmanship with modern silhouettes for a global audience while supporting the artisans who keep this tradition alive.</p>
    `,
  },
  {
    id: 618,
    slug: 'how-to-style-adire-for-modern-outfits',
    title: 'How to Style Adire for Modern Outfits',
    date: '2025-09-23',
    excerpt:
      'Adire is no longer limited to traditional occasions — it is now a bold fashion statement embraced by designers, celebrities, and everyday style lovers.',
    image: '/assets/blog/style-adire.jpg',
    content: `
      <p>Adire is no longer limited to traditional occasions — it is now a bold fashion statement embraced by designers, celebrities, and everyday style lovers. The beauty of Adire lies in its versatility: it can be dressed up for formal events, toned down for casual wear, or transformed into unique accessories.</p>
      <h3>Casual Everyday Wear</h3>
      <p>For a relaxed look, pair an Adire shirt with plain jeans or chinos. Wear an Adire kimono jacket over a simple top and trousers. Use an Adire headwrap or scarf to add a pop of colour to a plain outfit.</p>
      <p><em>Tip: Stick to one Adire piece at a time for casual wear to keep your look balanced.</em></p>
      <h3>Corporate & Office Styles</h3>
      <p>Adire can look elegant and professional when styled well. Choose subtle indigo or earth-tone Adire for blazers, pencil skirts, or structured tops. Pair with neutral accessories and minimal jewellery for a polished office look.</p>
      <h3>Special Occasions</h3>
      <p>For weddings, owambes, and ceremonies, go bold with full Adire gowns, agbada sets, or matching Aso-ebi coordinates. Layer with gele, coral beads, and gold accessories to complete the look.</p>
    `,
  },
  {
    id: 620,
    slug: 'caring-for-your-adire-fabric',
    title: 'Caring for Your Adire Fabric',
    date: '2025-09-23',
    excerpt:
      'Adire is more than just fabric — it is art. Each piece is handcrafted, dyed, and patterned with love and tradition.',
    image: '/assets/blog/care-adire.jpg',
    content: `
      <p>Adire is more than just fabric — it is art. Each piece is handcrafted, dyed, and patterned with love and tradition. To keep your Adire looking as vibrant as the day you bought it, handle it with special care.</p>
      <h3>Washing Your Adire</h3>
      <p><strong>Hand wash only (recommended):</strong></p>
      <ul>
        <li>Fill a basin with cool or lukewarm water</li>
        <li>Add a small amount of mild detergent or liquid soap</li>
        <li>Gently press and swirl the fabric — avoid scrubbing or twisting</li>
        <li>Rinse thoroughly in clean water</li>
      </ul>
      <p><strong>Machine wash (if necessary):</strong> Use the gentle/delicate cycle. Place the Adire in a mesh laundry bag. Wash with similar colours only.</p>
      <p><em>Never use bleach — it will strip the colours and damage the fabric.</em></p>
      <h3>Drying & Storage</h3>
      <p>Line dry in shade away from direct sunlight, which can fade indigo dyes over time. Iron on the reverse side using low to medium heat. Store folded in a cool, dry place or hang on padded hangers for garments.</p>
    `,
  },
];

export function getPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug);
}

export function formatBlogDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
