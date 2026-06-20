import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { blogPosts, formatBlogDate } from '../data/blog';

export default function Blog() {
  return (
    <>
      <section className="pt-32 pb-12 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-3">Heritage Stories</p>
          <h1 className="section-heading mb-4">The AdireBloom Blog</h1>
          <p className="font-body text-ink/60 max-w-xl mx-auto text-sm leading-relaxed">
            Explore Adire history, styling tips, and fabric care guides from our team.
          </p>
        </div>
      </section>

      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group block bg-white border border-cream-200 overflow-hidden card-hover"
              >
                <div className="aspect-[16/10] overflow-hidden bg-cream">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-body font-medium tracking-widest uppercase text-gold mb-2">
                    {formatBlogDate(post.date)}
                  </p>
                  <h2 className="font-display text-xl font-semibold text-ink mb-3 group-hover:text-indigo transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="font-body text-sm text-ink/60 leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-xs font-body font-semibold uppercase tracking-widest text-indigo group-hover:gap-3 transition-all">
                    Read More <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
