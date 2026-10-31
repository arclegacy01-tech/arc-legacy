import { Link } from 'react-router-dom';

/* ─── Detailed Botanical Floral Branch (Matching Top Section Right Edge) ─── */
function BotanicalBranchSvg({ className = '' }) {
  return (
    <svg
      viewBox="0 0 260 420"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Main graceful curving vine */}
      <path
        d="M210 0 C 200 50, 175 90, 195 150 C 210 195, 230 230, 220 280 C 210 325, 185 365, 180 420"
        strokeWidth="1.2"
      />
      {/* Side branch branches */}
      <path
        d="M190 120 C 155 135, 130 160, 120 205 C 112 245, 125 285, 120 330"
        strokeWidth="1"
      />
      <path
        d="M205 200 C 175 190, 145 200, 115 180 C 95 168, 80 150, 65 155"
        strokeWidth="0.9"
      />
      <path
        d="M200 80 C 170 70, 145 80, 120 70 C 100 64, 88 50, 75 45"
        strokeWidth="0.8"
      />

      {/* Flower 1 - Top Blooming Blossom */}
      <g transform="translate(195, 60) scale(0.9)">
        <circle cx="0" cy="0" r="7" strokeWidth="1" />
        <circle cx="0" cy="0" r="3" fill="currentColor" fillOpacity="0.2" strokeWidth="0.7" />
        {[0, 72, 144, 216, 288].map((angle, idx) => (
          <g key={idx} transform={`rotate(${angle})`}>
            <path
              d="M0 -7 C-9 -14, -11 -28, 0 -34 C11 -28, 9 -14, 0 -7 Z"
              strokeWidth="0.9"
            />
            <path d="M0 -7 L0 -24" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
          </g>
        ))}
      </g>

      {/* Flower 2 - Middle Left Blossom */}
      <g transform="translate(100, 170) scale(0.8)">
        <circle cx="0" cy="0" r="6" strokeWidth="1" />
        <circle cx="0" cy="0" r="2.5" fill="currentColor" fillOpacity="0.2" strokeWidth="0.7" />
        {[0, 60, 120, 180, 240, 300].map((angle, idx) => (
          <g key={idx} transform={`rotate(${angle})`}>
            <path
              d="M0 -6 C-7 -12, -9 -24, 0 -30 C9 -24, 7 -12, 0 -6 Z"
              strokeWidth="0.85"
            />
            <path d="M0 -6 L0 -20" strokeWidth="0.5" />
          </g>
        ))}
      </g>

      {/* Flower 3 - Bottom Right Blossom */}
      <g transform="translate(210, 300) scale(0.75)">
        <circle cx="0" cy="0" r="6" strokeWidth="1" />
        <circle cx="0" cy="0" r="2.5" fill="currentColor" fillOpacity="0.2" strokeWidth="0.7" />
        {[0, 72, 144, 216, 288].map((angle, idx) => (
          <g key={idx} transform={`rotate(${angle})`}>
            <path
              d="M0 -6 C-8 -13, -9 -25, 0 -31 C9 -25, 8 -13, 0 -6 Z"
              strokeWidth="0.8"
            />
          </g>
        ))}
      </g>

      {/* Flower Buds */}
      <g transform="translate(68, 42) rotate(-35) scale(0.65)">
        <path d="M0 0 C-5 -7, -5 -18, 0 -24 C5 -18, 5 -7, 0 0 Z" strokeWidth="0.9" />
        <path d="M-3 -2 C-8 -8, -6 -18, -2 -20" strokeWidth="0.7" />
        <path d="M3 -2 C8 -8, 6 -18, 2 -20" strokeWidth="0.7" />
      </g>

      <g transform="translate(62, 150) rotate(-60) scale(0.6)">
        <path d="M0 0 C-5 -7, -5 -18, 0 -24 C5 -18, 5 -7, 0 0 Z" strokeWidth="0.9" />
        <path d="M-3 -2 C-8 -8, -6 -18, -2 -20" strokeWidth="0.7" />
      </g>

      {/* Detailed veined leaves */}
      <g transform="translate(205, 25) rotate(40) scale(0.65)">
        <path d="M0 0 C-9 -14, -13 -32, 0 -46 C13 -32, 9 -14, 0 0 Z" strokeWidth="0.85" />
        <path d="M0 0 L0 -40" strokeWidth="0.55" />
        <path d="M0 -14 L-5 -22 M0 -24 L-7 -32 M0 -14 L5 -22 M0 -24 L7 -32" strokeWidth="0.45" />
      </g>

      <g transform="translate(180, 110) rotate(-65) scale(0.75)">
        <path d="M0 0 C-10 -16, -14 -36, 0 -50 C14 -36, 10 -16, 0 0 Z" strokeWidth="0.85" />
        <path d="M0 0 L0 -45" strokeWidth="0.55" />
        <path d="M0 -14 L-6 -25 M0 -26 L-7 -37 M0 -14 L6 -25 M0 -26 L7 -37" strokeWidth="0.45" />
      </g>

      <g transform="translate(145, 90) rotate(-110) scale(0.6)">
        <path d="M0 0 C-9 -14, -13 -32, 0 -44 C13 -32, 9 -14, 0 0 Z" strokeWidth="0.8" />
        <path d="M0 0 L0 -38" strokeWidth="0.5" />
      </g>

      <g transform="translate(150, 205) rotate(-30) scale(0.7)">
        <path d="M0 0 C-10 -15, -13 -33, 0 -48 C13 -33, 10 -15, 0 0 Z" strokeWidth="0.85" />
        <path d="M0 0 L0 -42" strokeWidth="0.55" />
        <path d="M0 -14 L-6 -24 M0 -25 L-6 -34 M0 -14 L6 -24 M0 -25 L6 -34" strokeWidth="0.45" />
      </g>

      <g transform="translate(125, 275) rotate(-85) scale(0.7)">
        <path d="M0 0 C-10 -15, -13 -33, 0 -48 C13 -33, 10 -15, 0 0 Z" strokeWidth="0.85" />
        <path d="M0 0 L0 -42" strokeWidth="0.55" />
      </g>

      <g transform="translate(220, 245) rotate(50) scale(0.75)">
        <path d="M0 0 C-10 -16, -14 -36, 0 -50 C14 -36, 10 -16, 0 0 Z" strokeWidth="0.85" />
        <path d="M0 0 L0 -45" strokeWidth="0.55" />
        <path d="M0 -14 L-6 -25 M0 -26 L-7 -37 M0 -14 L6 -25 M0 -26 L7 -37" strokeWidth="0.45" />
      </g>

      <g transform="translate(205, 360) rotate(70) scale(0.65)">
        <path d="M0 0 C-9 -14, -13 -32, 0 -44 C13 -32, 9 -14, 0 0 Z" strokeWidth="0.8" />
        <path d="M0 0 L0 -38" strokeWidth="0.5" />
      </g>

      <g transform="translate(150, 370) rotate(-55) scale(0.6)">
        <path d="M0 0 C-9 -14, -13 -32, 0 -44 C13 -32, 9 -14, 0 0 Z" strokeWidth="0.8" />
        <path d="M0 0 L0 -38" strokeWidth="0.5" />
      </g>

      {/* Tendrils */}
      <path d="M170 145 C 155 138, 150 120, 160 112 C 168 104, 176 112, 172 120" strokeWidth="0.55" />
      <path d="M115 240 C 102 248, 94 240, 98 232 C 102 224, 110 228, 108 236" strokeWidth="0.55" />
      <path d="M220 185 C 235 178, 242 190, 237 198 C 230 206, 222 198, 226 192" strokeWidth="0.55" />
    </svg>
  );
}

/* ─── Indian Heritage Monument Architecture (Matching Bottom Section Right Edge) ─── */
function HeritageArchitectureSvg({ className = '' }) {
  return (
    <svg
      viewBox="0 0 340 320"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Base ground & steps */}
      <path d="M30 310 L335 310" strokeWidth="1.2" />
      <path d="M50 315 L330 315" strokeWidth="0.8" />
      <path d="M70 305 L320 305" strokeWidth="0.8" />

      {/* Royal Garden / Banyan Tree Foreground */}
      <g transform="translate(255, 230)">
        <path d="M20 80 C 20 50, 24 30, 26 10" strokeWidth="1.4" />
        <path d="M22 40 C 10 32, -4 28, -12 24" strokeWidth="0.9" />
        <path d="M24 26 C 36 18, 50 16, 58 14" strokeWidth="0.9" />
        {/* Canopy outline */}
        <path
          d="M-20 18 C-30 14, -34 -4, -26 -12 C-22 -20, -8 -20, 0 -16 C8 -28, 26 -28, 38 -20 C50 -25, 64 -16, 64 -4 C72 4, 68 16, 60 20 C50 24, 38 22, 34 26"
          strokeWidth="0.8"
          fill="currentColor"
          fillOpacity="0.04"
        />
        {[
          [-12, 4], [8, -8], [28, -10], [45, 4], [16, 6], [-4, -6], [36, 10]
        ].map(([x, y], idx) => (
          <ellipse key={idx} cx={x} cy={y} rx="4.5" ry="2.6" strokeWidth="0.55" transform="rotate(-15)" />
        ))}
      </g>

      {/* Main Temple Shikhara Tower */}
      <g transform="translate(170, 115)">
        <path d="M0 -75 L0 -90" strokeWidth="1.1" />
        <circle cx="0" cy="-92" r="2.2" strokeWidth="0.8" />
        <ellipse cx="0" cy="-75" rx="5.5" ry="2.2" strokeWidth="0.8" />
        {/* Curving Spire */}
        <path
          d="M-5 -73 C -12 -38, -16 0, -20 55 L 20 55 C 16 0, 12 -38, 5 -73 Z"
          strokeWidth="0.9"
          fill="currentColor"
          fillOpacity="0.03"
        />
        {/* Horizontal Ribs */}
        {[-60, -46, -32, -18, -4, 10, 24, 38, 50].map((y) => (
          <path key={y} d={`M${-8 - (y + 75) * 0.11} ${y} Q 0 ${y - 3} ${8 + (y + 75) * 0.11} ${y}`} strokeWidth="0.55" />
        ))}
        {/* Arch niche */}
        <path d="M-7 55 L-7 28 Q 0 18 7 28 L7 55 Z" strokeWidth="0.75" />
      </g>

      {/* Left Chhatri Pavilion */}
      <g transform="translate(105, 150)">
        <path d="M0 -42 L0 -52" strokeWidth="0.9" />
        <circle cx="0" cy="-53" r="1.8" strokeWidth="0.65" />
        {/* Dome */}
        <path
          d="M-16 -18 C -16 -35, -5 -42, 0 -42 C 5 -42, 16 -35, 16 -18 Z"
          strokeWidth="0.9"
          fill="currentColor"
          fillOpacity="0.05"
        />
        <path d="M-9 -18 C -9 -32, -3 -39, 0 -42" strokeWidth="0.55" />
        <path d="M9 -18 C 9 -32, 3 -39, 0 -42" strokeWidth="0.55" />
        {/* Eaves cornice */}
        <path d="M-20 -17 Q 0 -13 20 -17" strokeWidth="1" />
        {/* Pillars */}
        <path d="M-14 -13 L-14 32 M14 -13 L14 32" strokeWidth="0.8" />
        <path d="M-5 -13 L-5 32 M5 -13 L5 32" strokeWidth="0.6" />
        {/* Cusped arch inside */}
        <path d="M-14 0 C-9 -7, -3 -3, 0 -8 C3 -3, 9 -7, 14 0" strokeWidth="0.65" />
        {/* Balustrade railing */}
        <path d="M-16 20 L16 20" strokeWidth="0.65" />
        <path d="M-16 25 L16 25" strokeWidth="0.65" />
        {[-12, -7, -2, 3, 8, 13].map((x) => (
          <line key={x} x1={x} y1="20" x2={x} y2="25" strokeWidth="0.45" />
        ))}
        {/* Base podium */}
        <path d="M-18 32 L18 32 L22 42 L-22 42 Z" strokeWidth="0.75" />
      </g>

      {/* Right Chhatri Pavilion */}
      <g transform="translate(230, 165)">
        <path d="M0 -38 L0 -48" strokeWidth="0.9" />
        <circle cx="0" cy="-49" r="1.8" strokeWidth="0.65" />
        <path
          d="M-14 -16 C -14 -32, -4 -38, 0 -38 C 4 -38, 14 -32, 14 -16 Z"
          strokeWidth="0.85"
          fill="currentColor"
          fillOpacity="0.05"
        />
        <path d="M-18 -15 Q 0 -12 18 -15" strokeWidth="0.9" />
        <path d="M-12 -12 L-12 28 M12 -12 L12 28" strokeWidth="0.75" />
        <path d="M-12 0 C-7 -5, -2 -2, 0 -7 C2 -2, 7 -5, 12 0" strokeWidth="0.55" />
        <path d="M-14 18 L14 18" strokeWidth="0.65" />
      </g>

      {/* Palace Colonnade & Jharokhas */}
      <g transform="translate(65, 205)">
        <path d="M0 0 L195 0" strokeWidth="0.85" />
        <path d="M0 22 L195 22" strokeWidth="0.65" />
        {[12, 38, 65, 92, 118, 145, 172].map((x) => (
          <g key={x} transform={`translate(${x}, 0)`}>
            <path d="M-9 22 L-9 8 C-5 3, -2 5, 0 1 C2 5, 5 3, 9 8 L9 22" strokeWidth="0.6" />
            <line x1="-9" y1="22" x2="-9" y2="65" strokeWidth="0.7" />
            <line x1="9" y1="22" x2="9" y2="65" strokeWidth="0.7" />
          </g>
        ))}
        <line x1="0" y1="40" x2="195" y2="40" strokeWidth="0.45" strokeDasharray="5 3" />
        <line x1="0" y1="58" x2="195" y2="58" strokeWidth="0.45" strokeDasharray="7 4" />
        <line x1="0" y1="76" x2="195" y2="76" strokeWidth="0.75" />
      </g>

      {/* Botanical Flourish at Bottom Right */}
      <g transform="translate(225, 260) scale(0.6)">
        <path d="M10 45 C 35 36, 55 18, 70 0" strokeWidth="0.9" />
        <path d="M28 38 C 28 22, 40 14, 50 8" strokeWidth="0.7" />
        <ellipse cx="54" cy="6" rx="7" ry="3.5" strokeWidth="0.7" transform="rotate(-30 54 6)" />
        <ellipse cx="70" cy="-2" rx="6" ry="3" strokeWidth="0.7" transform="rotate(-40 70 -2)" />
        <ellipse cx="36" cy="18" rx="6" ry="3" strokeWidth="0.7" transform="rotate(-20 36 18)" />
      </g>
    </svg>
  );
}

/* ─── Traditional Indian 8-Petal Floral Mandala / Motif ─── */
function IndianMandalaMotif({ className = 'h-4 w-4' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="2.2" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
        <path
          key={i}
          d="M12 4.2 C11.2 6.5, 11 8, 12 9 C13 8, 12.8 6.5, 12 4.2 Z"
          transform={`rotate(${deg} 12 12)`}
        />
      ))}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg, i) => (
        <circle key={i} cx="12" cy="5" r="0.75" transform={`rotate(${deg} 12 12)`} />
      ))}
    </svg>
  );
}

export default function HomeManufacturingStory({ storyCtaLink = '/our-story' }) {
  return (
    <div className="bg-[#FAF4EB] py-8 sm:py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6 md:space-y-7">

        {/* ═════════════════════════════════════════════════════════════ */}
        {/* 1. OUR MANUFACTURING                                         */}
        {/* ═════════════════════════════════════════════════════════════ */}
        <div className="relative overflow-hidden rounded-lg bg-[#FAF4EB]">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-8">

            {/* Left: 3 Side-by-Side Images */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="overflow-hidden rounded-md sm:rounded-lg">
                <img
                  src="/images/home-mfg-needle.jpg"
                  alt="Artisan hand-stitching delicate pearls and lace with needle"
                  className="h-44 w-full object-cover sm:h-56 md:h-64 lg:h-72 transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-md sm:rounded-lg">
                <img
                  src="/images/home-mfg-scissors.jpg"
                  alt="Golden scissors, spools of thread and opulent embroidered fabric"
                  className="h-44 w-full object-cover sm:h-56 md:h-64 lg:h-72 transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-md sm:rounded-lg">
                <img
                  src="/images/home-mfg-shelves.jpg"
                  alt="Shelves filled with countless rolls of vibrant lace trims"
                  className="h-44 w-full object-cover sm:h-56 md:h-64 lg:h-72 transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right: Content with Botanical Background Art */}
            <div className="relative py-2 sm:py-3 lg:pr-24">
              {/* Botanical Background Flourish (Far right edge) */}
              <BotanicalBranchSvg className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 hidden h-[125%] w-48 text-[#BA8C4C]/45 lg:block select-none" />

              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9E6E38]">
                MADE WITH CARE
              </p>

              <h2 className="mt-2 font-serif text-3xl text-maroon sm:text-4xl md:text-[38px] leading-tight">
                Our Manufacturing
              </h2>

              <p className="mt-3.5 max-w-lg text-[13.5px] leading-relaxed text-[#5A5550]">
                From intricate detailing to careful finishing, every trim is selected and crafted with attention to detail.
              </p>

              {/* 3 Features in Single Horizontal Grid (Icons to the left of text) */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5 pt-1">

                {/* Feature 1: Craftsmanship */}
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 sm:h-8.5 sm:w-8.5 shrink-0 items-center justify-center rounded-full border border-[#C49A5A]/80 text-[#9E6E38]">
                    {/* Compass / Star Diamond Craft Motif */}
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[12px] font-semibold text-neutral-900 leading-tight">Craftsmanship</div>
                    <div className="text-[10.5px] text-neutral-500 mt-0.5 leading-tight">Thoughtful selection</div>
                  </div>
                </div>

                {/* Feature 2: Quality Checks */}
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 sm:h-8.5 sm:w-8.5 shrink-0 items-center justify-center rounded-full border border-[#C49A5A]/80 text-[#9E6E38]">
                    {/* Shield with Checkmark */}
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 3L4.5 6.5v5.5c0 5 3.2 9.2 7.5 10 4.3-.8 7.5-5 7.5-10V6.5L12 3z" />
                      <path d="M9 12l2 2 4-4" strokeWidth="1.8" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[12px] font-semibold text-neutral-900 leading-tight">Quality Checks</div>
                    <div className="text-[10.5px] text-neutral-500 mt-0.5 leading-tight">Consistent standards</div>
                  </div>
                </div>

                {/* Feature 3: Consistent Finishing */}
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 sm:h-8.5 sm:w-8.5 shrink-0 items-center justify-center rounded-full border border-[#C49A5A]/80 text-[#9E6E38]">
                    {/* Rosette Medal / Seal */}
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="8.5" />
                      <circle cx="12" cy="12" r="3.5" />
                      <path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.5 1.5M16.5 16.5l1.5 1.5M6 18l1.5-1.5M16.5 7.5l1.5-1.5" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[12px] font-semibold text-neutral-900 leading-tight">Consistent Finishing</div>
                    <div className="text-[10.5px] text-neutral-500 mt-0.5 leading-tight">A refined final look</div>
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="mt-7">
                <Link
                  to="/our-story"
                  className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#5C1422] px-5 py-2.5 sm:px-6 sm:py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#450e18] shadow-sm"
                >
                  EXPLORE OUR PROCESS <span aria-hidden="true">→</span>
                </Link>
              </div>

            </div>

          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════ */}
        {/* 2. OUR BRAND STORY                                           */}
        {/* ═════════════════════════════════════════════════════════════ */}
        <div className="relative overflow-hidden rounded-lg bg-[#FAF4EB]">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-8">

            {/* Left: Wide Hero Lace Image */}
            <div className="overflow-hidden rounded-md sm:rounded-lg">
              <img
                src="/images/home-story-lace.jpg"
                alt="Gold embroidered lace on maroon silk"
                className="h-56 w-full object-cover sm:h-64 md:h-72 lg:h-[310px] transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Right: Brand Story Content with Heritage Monument Art */}
            <div className="relative py-2 sm:py-3 lg:pr-24">
              {/* Heritage Monument Background Art (Far right / bottom right) */}
              <HeritageArchitectureSvg className="pointer-events-none absolute -right-6 -bottom-6 hidden h-[125%] w-60 text-[#BA8C4C]/40 lg:block select-none" />

              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9E6E38]">
                THE STORY BEHIND ARC LEGACY
              </p>

              <h2 className="mt-2 font-serif text-3xl text-maroon sm:text-4xl md:text-[38px] leading-tight">
                Our Brand Story
              </h2>

              <p className="mt-3.5 max-w-lg text-[13.5px] leading-relaxed text-[#5A5550]">
                At ARC LEGACY, we celebrate the details that transform fabric into something memorable. Our collection brings together traditional Indian embellishments and contemporary design, created for makers, boutiques, designers and creators who value quality, beauty and timeless style.
              </p>

              {/* Action Button */}
              <div className="mt-6">
                <Link
                  to={storyCtaLink || '/our-story'}
                  className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#5C1422] px-5 py-2.5 sm:px-6 sm:py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#450e18] shadow-sm"
                >
                  DISCOVER OUR PROCESS <span aria-hidden="true">→</span>
                </Link>
              </div>

              {/* Tagline: INDIA'S FIRST LACE BRAND */}
              <div className="mt-6 flex items-center gap-2.5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9E6E38]">
                  INDIA&apos;S FIRST LACE BRAND
                </span>
                <IndianMandalaMotif className="h-4 w-4 text-[#BA8C4C]" />
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
