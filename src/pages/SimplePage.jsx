export default function SimplePage({ title, children }) {
  return (
    <>
      <section className="pt-32 pb-12 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-heading">{title}</h1>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="prose prose-sm max-w-none font-body text-ink/70 leading-relaxed space-y-4">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
