import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides } from '../data/home';

const AUTO_ADVANCE_MS = 6500;

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index) => {
    setActiveIndex((index + heroSlides.length) % heroSlides.length);
  }, []);

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setInterval(goNext, AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [paused, goNext]);

  const slide = heroSlides[activeIndex];

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured collections"
    >
      <div className="absolute inset-0">
        {heroSlides.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={index !== activeIndex}
          >
            <img
              src={item.image}
              alt=""
              className="w-full h-full object-cover object-top"
              fetchPriority={index === 0 ? 'high' : 'auto'}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="max-w-2xl">
          <p
            key={`${slide.id}-label`}
            className="section-label text-gold-light mb-4 animate-fade-up"
          >
            {slide.label}
          </p>
          <h1
            key={`${slide.id}-title`}
            className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-cream-50 leading-tight mb-6 animate-fade-up text-balance"
          >
            {slide.title}
          </h1>
          <p
            key={`${slide.id}-desc`}
            className="font-body text-base sm:text-lg text-cream-200/80 mb-10 leading-relaxed max-w-lg animate-fade-up"
          >
            {slide.description}
          </p>
          <div key={`${slide.id}-ctas`} className="flex flex-wrap gap-4 animate-fade-up">
            <Link to={slide.primaryCta.to} className="btn-primary text-sm">
              {slide.primaryCta.label}
              <ArrowRight size={16} />
            </Link>
            {slide.secondaryCta && (
              <Link
                to={slide.secondaryCta.to}
                className="btn-outline border-cream-50 text-cream-50 hover:bg-cream-50 hover:text-ink text-sm"
              >
                {slide.secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={goPrev}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 border border-cream-50/30 text-cream-50 hover:bg-cream-50/10 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        onClick={goNext}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 border border-cream-50/30 text-cream-50 hover:bg-cream-50/10 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={22} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          {heroSlides.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-8 bg-gold'
                  : 'w-2 bg-cream-200/40 hover:bg-cream-200/70'
              }`}
              aria-label={`Go to slide ${index + 1}: ${item.title}`}
              aria-current={index === activeIndex ? 'true' : undefined}
            />
          ))}
        </div>
        <div className="flex flex-col items-center gap-1 text-cream-200/50">
          <span className="text-[10px] font-body tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-cream-200/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
