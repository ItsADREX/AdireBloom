import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getPostBySlug, formatBlogDate } from '../data/blog';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 pt-24">
        <p className="font-display text-2xl text-ink/40">Article not found</p>
        <Link to="/blog" className="btn-primary text-sm">Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      <article className="pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-body uppercase tracking-widest text-ink/50 hover:text-indigo mb-8 transition-colors">
            <ArrowLeft size={14} /> Back to Blog
          </Link>

          <p className="section-label mb-3">{formatBlogDate(post.date)}</p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-ink mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="aspect-[16/9] overflow-hidden mb-10 bg-cream">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div
            className="legal-content font-body text-sm text-ink/75 leading-relaxed space-y-4 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink [&_h3]:mt-8 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_em]:text-ink/60 [&_strong]:text-ink"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </>
  );
}
