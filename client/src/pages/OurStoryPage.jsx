import { Link } from 'react-router-dom';

const PILLARS = [
  {
    title: 'Premium Quality',
    desc: 'Thoughtfully sourced materials',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 3l2.2 5.2L20 9l-4 3.6L17.2 19 12 16.2 6.8 19 8 12.6 4 9l5.8-.8z" />
      </svg>
    ),
  },
  {
    title: 'Rooted in Tradition',
    desc: "Inspired by India's textile heritage",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
      </svg>
    ),
  },
  {
    title: 'For Every Creator',
    desc: 'Serving designers, boutiques, tailors and DIY lovers',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="8" cy="9" r="2.2" />
        <circle cx="16" cy="9" r="2.2" />
        <path d="M4.5 18c.8-2.2 2.4-3.2 3.5-3.2S11 15.8 12 18M12 18c1-2.2 2.6-3.2 4-3.2s2.7 1 3.5 3.2" />
      </svg>
    ),
  },
  {
    title: 'Timeless Designs',
    desc: 'Blending traditional craft with modern aesthetics',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z" />
      </svg>
    ),
  },
];

const MILESTONES = [
  { title: 'The Idea', desc: "A dream to celebrate India's rich craft heritage and make it accessible to all." },
  { title: 'Growing Together', desc: 'From a small collection to a wide range of laces, latkans, trims and embellishments.' },
  { title: 'A Trusted Brand', desc: 'Today, ARC LEGACY is a preferred choice for designers, boutiques, tailors and DIY creators across India.' },
  { title: 'The Future', desc: 'We continue to innovate, expand and bring you finishing designs that celebrate tradition with a modern touch.' },
];

const VALUES = [
  { title: 'Quality First', desc: 'We use premium materials and fine craftsmanship in every piece.' },
  { title: 'Authentic Designs', desc: 'Inspired by traditional motifs with a modern aesthetic.' },
  { title: 'Customer Focused', desc: 'Dedicated to supporting designers, boutiques, tailors and DIY enthusiasts.' },
  { title: 'Sustainable Growth', desc: 'Preserving heritage crafts while creating opportunities for artisans.' },
];

const CREATORS = [
  { title: 'Bridal Wear', desc: 'Adding elegance to special occasions.', image: '/images/product-8.jpg' },
  { title: 'Fashion Designers', desc: 'Perfect for couture and ethnic wear.', image: '/images/product-2.jpg' },
  { title: 'Boutiques & Tailors', desc: 'A wide range for custom creations.', image: '/images/product-6.jpg' },
  { title: 'DIY & Home Decor', desc: 'Crafting beauty around the home.', image: '/images/product-4.jpg' },
];

function ValueIcon({ title }) {
  if (title === 'Quality First') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    );
  }
  if (title === 'Authentic Designs') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2" />
      </svg>
    );
  }
  if (title === 'Customer Focused') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    );
  }
  // Sustainable Growth
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22V10M12 10C12 5 18 3 18 3s0 6-6 7M12 14c-4-1-6-5-6-5s5-1 6 3" />
    </svg>
  );
}

export default function OurStoryPage() {
  return (
    <div className="bg-cream">
      <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 md:grid-cols-2 md:py-16">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-maroon/80">Our Story</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-maroon md:text-5xl">A Legacy Woven with Love</h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-700">
            ARC LEGACY is more than a brand — it&apos;s a celebration of India&apos;s rich textile heritage, brought to life through exquisite laces, latkans, trims and embellishments.
          </p>
          <a href="#journey" className="btn-primary mt-8 inline-flex text-xs tracking-widest">Our Journey →</a>
        </div>
        <img src="/images/product-9.jpg" alt="" className="aspect-[5/4] w-full rounded-sm object-cover" />
      </section>

      <section className="border-y border-neutral-200/80 bg-[#fbf7f1]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-10 md:grid-cols-4">
          {PILLARS.map((item) => (
            <div key={item.title} className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-gold">
                {item.icon}
              </div>
              <h2 className="font-serif text-sm font-semibold text-maroon md:text-base">{item.title}</h2>
              <p className="mt-1 text-xs text-neutral-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">Our Beginning</p>
          <h2 className="mt-3 font-serif text-3xl text-maroon md:text-4xl">From a Passion for Craft to a Purposeful Brand</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-700">
            ARC LEGACY was born from a deep love for Indian craftsmanship and a vision to make high-quality ethnic trims and embellishments accessible to everyone. What started as a small idea has now grown into a trusted brand, serving thousands of creators across India.
          </p>
        </div>
        <img src="/images/product-5.jpg" alt="Craftsmanship" className="aspect-[4/3] w-full rounded-lg object-cover" />
      </section>

      <section id="journey" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-center text-[11px] uppercase tracking-[0.28em] text-gold">Our Journey</p>
          <h2 className="mt-2 text-center font-serif text-3xl text-maroon md:text-4xl">Milestones that Inspire Us</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {MILESTONES.map((item, index) => (
              <div key={item.title} className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 font-serif text-maroon">
                  {index + 1}
                </div>
                <h3 className="font-serif text-lg text-maroon">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <p className="text-center text-[11px] uppercase tracking-[0.28em] text-gold">Our Values</p>
        <h2 className="mt-2 text-center font-serif text-3xl text-maroon md:text-4xl">What We Stand For</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((item) => (
            <div key={item.title} className="text-center">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold bg-[#FAF4EB]/60">
                <ValueIcon title={item.title} />
              </div>
              <h3 className="font-serif text-lg text-maroon">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 lg:grid-cols-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-gold">Our Craftsmanship</p>
            <h2 className="mt-2 font-serif text-3xl text-maroon md:text-4xl">Tradition in Every Detail</h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-700">
              Each lace, latkan, trim and embellishment is carefully curated with attention to detail, reflecting the skill and dedication of Indian artisans. Our collection blends age-old techniques with contemporary designs, bringing you products that are timeless, versatile and full of charm.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <img src="/images/product-3.jpg" alt="" className="aspect-[3/4] w-full rounded-lg object-cover" />
            <img src="/images/provided-floral-lace.jpg" alt="" className="aspect-[3/4] w-full rounded-lg object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <p className="text-center text-[11px] uppercase tracking-[0.28em] text-gold">Made for Every Creation</p>
        <h2 className="mt-2 text-center font-serif text-3xl text-maroon md:text-4xl">Loved by Creators Across India</h2>
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {CREATORS.map((item) => (
            <article key={item.title} className="text-center">
              <img src={item.image} alt="" className="aspect-[4/3] w-full rounded-lg object-cover" />
              <h3 className="mt-3 font-serif text-lg text-maroon">{item.title}</h3>
              <p className="mt-1 text-sm text-neutral-600">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#fbf7f1] py-16 text-center">
        <p className="text-[11px] uppercase tracking-[0.28em] text-gold">Our Promise</p>
        <h2 className="mt-2 font-serif text-3xl text-maroon md:text-4xl">To Keep the Legacy Alive</h2>
        <p className="mx-auto mt-4 max-w-2xl px-4 text-sm leading-relaxed text-neutral-700">
          We are committed to delivering high-quality trims and embellishments that inspire creativity, support artisans and keep India&apos;s textile heritage alive for generations to come.
        </p>
        <Link to="/new-arrivals" className="btn-primary mt-8 inline-flex text-xs tracking-widest">Shop Our Collection →</Link>
      </section>
    </div>
  );
}
