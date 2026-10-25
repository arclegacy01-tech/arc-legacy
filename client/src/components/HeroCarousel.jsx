import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function HeroCarousel({ banners, fallback }) {
  const slides = banners?.length ? banners : [fallback];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return undefined;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, [slides.length]);

  const slide = slides[index];
  const image = slide.imageUrl || '/images/hero-home.jpg';

  return (
    <section className="relative min-h-[460px] overflow-hidden bg-cream md:min-h-[520px]">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/75 to-cream/20" />
      <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-4 py-16 md:min-h-[520px] md:py-20">
        {slide.subtitle && (
          <p className="font-script text-2xl text-maroon/90 md:text-3xl">{slide.subtitle}</p>
        )}
        <h1 className="mt-2 max-w-xl font-serif text-3xl font-semibold leading-tight text-maroon md:text-[2.75rem] md:leading-[1.15]">
          {slide.title}
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-700">
          {slide.body ||
            'Discover handcrafted laces, latkans and trims for ethnic wear, home décor, and boutique collections.'}
        </p>
        <Link to={slide.ctaLink || '/category/latkans'} className="btn-primary mt-8 w-fit text-xs tracking-widest">
          {slide.ctaLabel || 'Shop Now'} →
        </Link>
      </div>
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition ${i === index ? 'bg-maroon' : 'bg-maroon/30'}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
