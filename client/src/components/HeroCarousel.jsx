import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HERO_COPY =
  'Explore our exclusive collection of laces, latkans, trims and embellishments for ethnic fashion, custom outfits and home décor.';
const FINISHING_HERO_IMAGE = '/images/hero-finishing.jpg';

function isFinishingTouch(slide) {
  return /finishing touch to your creations/i.test(slide?.title || '');
}

export default function HeroCarousel({ banners, fallback }) {
  const remote = banners?.length ? banners : [];
  const lead = {
    ...fallback,
    imageUrl: isFinishingTouch(fallback) ? FINISHING_HERO_IMAGE : (fallback?.imageUrl || FINISHING_HERO_IMAGE),
  };
  const slides = [lead, ...remote.filter((banner) => banner.imageUrl !== lead.imageUrl && !isFinishingTouch(banner))]
    .map((slide) => (isFinishingTouch(slide) ? { ...slide, imageUrl: FINISHING_HERO_IMAGE } : slide));
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return undefined;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, [slides.length]);

  const slide = slides[index] || lead;
  const image = slide.imageUrl || FINISHING_HERO_IMAGE;

  return (
    <section className="relative min-h-[460px] overflow-hidden bg-[#f6efe6] md:min-h-[560px]">
      <img
        src={image}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover ${isFinishingTouch(slide) ? 'object-[62%_center]' : 'object-center'}`}
      />
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${
          isFinishingTouch(slide)
            ? 'from-[#f7f1ea]/45 via-transparent to-transparent'
            : 'from-[#f6efe6] from-[12%] via-[#f6efe6]/85 via-[42%] to-transparent'
        }`}
      />
      <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-6 py-14 md:min-h-[560px] md:px-10 md:py-16">
        {slide.subtitle && (
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-maroon md:text-xs">
            {slide.subtitle}
          </p>
        )}
        {isFinishingTouch(slide) ? (
          <h1 className="mt-3 max-w-xl">
            <span className="block font-serif text-[2.65rem] font-medium leading-[1.02] text-maroon md:text-[3.35rem]">
              The Finishing
              <br />
              Touch to
            </span>
            <span className="-mt-1 block font-display text-[3.4rem] leading-none text-[#C4A15A] md:-mt-2 md:text-[4.6rem]">
              Your Creations
            </span>
          </h1>
        ) : (
          <h1 className="mt-3 max-w-xl font-serif text-4xl leading-tight text-maroon md:text-5xl">
            {slide.title}
          </h1>
        )}
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-600 md:text-[15px]">
          {slide.body || HERO_COPY}
        </p>
        <Link to={slide.ctaLink || '/category/latkans'} className="btn-primary mt-7 w-fit px-6 py-3 text-[11px] tracking-[0.16em]">
          {slide.ctaLabel || 'Shop Now'} →
        </Link>
        <div className="mt-8 flex gap-2">
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
      </div>
    </section>
  );
}
