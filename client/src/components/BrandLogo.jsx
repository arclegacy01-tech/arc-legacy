import { Link } from 'react-router-dom';

/** Official brand files: `public/images/arc-logo.jpg` and transparent lockup `public/images/arc-logo-lockup.png` */
const lockupTransparent = '/images/arc-logo-lockup.png';
const lockupMaroon = '/images/arc-logo.jpg';

const heights = {
  header: 'h-[76px] w-auto max-w-[min(100%,220px)] md:h-[92px] md:max-w-[260px]',
  admin: 'h-[72px] w-auto max-w-[200px]',
  footer: 'h-[140px] w-auto max-w-[240px] rounded-lg',
};

export default function BrandLogo({ linked = true, to = '/', size = 'header' }) {
  const onDark = size === 'footer';
  const src = onDark ? lockupMaroon : lockupTransparent;
  const img = (
    <img
      src={src}
      alt="ARC LEGACY — India's First Lace Brand"
      className={`object-contain object-center ${heights[size] || heights.header}`}
      width={260}
      height={onDark ? 140 : 92}
      decoding="async"
    />
  );

  const wrap = linked ? (
    <Link to={to} className="inline-flex justify-center transition hover:opacity-90">
      {img}
    </Link>
  ) : (
    <span className="inline-flex justify-center">{img}</span>
  );

  return wrap;
}
