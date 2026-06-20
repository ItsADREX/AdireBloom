import { Link } from 'react-router-dom';
import { legalDocuments } from '../data/legal';

export default function LegalPage({ docKey }) {
  const doc = legalDocuments[docKey];
  if (!doc) return null;

  return (
    <>
      <section className="pt-32 pb-12 bg-cream-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-3">AdireBloom</p>
          <h1 className="section-heading mb-2">{doc.title}</h1>
          <p className="font-body text-xs text-ink/50">Last updated: {doc.lastUpdated}</p>
        </div>
      </section>

      <section className="py-16 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-sm max-w-none space-y-8">
            {doc.sections.map(({ heading, body }) => (
              <div key={heading}>
                <h2 className="font-display text-xl font-semibold text-ink mb-3">{heading}</h2>
                <p className="font-body text-sm text-ink/70 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-cream-200 flex flex-wrap gap-4 text-xs font-body">
            {Object.entries(legalDocuments)
              .filter(([key]) => key !== docKey)
              .map(([key, d]) => (
                <Link key={key} to={`/${d.slug}`} className="text-indigo hover:underline">
                  {d.title}
                </Link>
              ))}
            <Link to="/contact" className="text-indigo hover:underline ml-auto">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
