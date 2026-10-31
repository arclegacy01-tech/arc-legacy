import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function LogoutPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleConfirmLogout = async () => {
    try {
      await logout?.();
    } catch {
      // ignore
    }
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-[#ECE2D8] bg-[#FDFBF9] px-6 py-10 shadow-sm md:px-12 md:py-14">
      {/* Main Confirmation Card */}
      <div className="w-full max-w-2xl rounded-2xl border border-[#F2EAE1] bg-white px-6 py-10 text-center shadow-sm md:px-14 md:py-12">
        {/* Top Pink Circle + Logout Icon + Sparkles */}
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#FCECEF] text-[#7A1C24]">
          {/* 4-point Sparkles around the circle */}
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute -left-8 top-2 h-5 w-5 text-[#D8A868]"
            fill="currentColor"
          >
            <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
          </svg>
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute -right-8 top-1 h-5 w-5 text-[#D8A868]"
            fill="currentColor"
          >
            <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
          </svg>
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute -left-5 bottom-0 h-3 w-3 text-[#E4C290]"
            fill="currentColor"
          >
            <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
          </svg>
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute -right-5 bottom-1 h-3 w-3 text-[#E4C290]"
            fill="currentColor"
          >
            <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
          </svg>

          {/* Logout Door + Arrow Icon */}
          <svg viewBox="0 0 24 24" className="h-11 w-11" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </div>

        {/* Heading & Description */}
        <h2 className="mt-6 font-serif text-2xl font-semibold text-[#7A1C24] md:text-3xl">
          Log Out of Your Account?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-neutral-600 md:text-sm">
          You will be signed out from ARC LEGACY and won&apos;t be able to access your orders, wishlist, and saved addresses.
        </p>

        {/* Cancel & Logout Buttons */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/account')}
            className="min-w-[160px] rounded-xl border border-[#7A1C24] bg-white px-8 py-3 text-sm font-semibold text-[#7A1C24] transition hover:bg-[#FCECEF]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmLogout}
            className="min-w-[160px] rounded-xl bg-[#7A1C24] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#61151C]"
          >
            Logout
          </button>
        </div>

        {/* Safe Account Data Reassurance */}
        <div className="mt-7 flex items-center justify-center gap-2.5 text-left text-xs text-neutral-600">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 shrink-0 text-[#7A1C24]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          <div>
            <p>Your account data is safe with us.</p>
            <p>You can always log back in anytime.</p>
          </div>
        </div>
      </div>

      {/* Bottom "We'll be here when you're back!" Card */}
      <div className="mt-7 flex w-full max-w-2xl flex-col items-center justify-center gap-5 rounded-2xl border border-[#F5DCE0] bg-[#FCECEF]/80 px-6 py-5 sm:flex-row sm:px-10">
        {/* Pastel Shopping Bag + Heart + Maroon Checkmark Illustration */}
        <div className="relative flex h-16 w-20 shrink-0 items-center justify-center">
          <svg viewBox="0 0 80 72" className="h-16 w-20" fill="none">
            {/* Bag handles */}
            <path
              d="M28 22 C28 11, 44 11, 44 22"
              stroke="#7A1C24"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M34 22 C34 14, 48 14, 48 22"
              stroke="#7A1C24"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            {/* Bag side gusset */}
            <polygon points="16,22 23,22 21,62 13,60" fill="#D5CCB8" />
            {/* Bag front body */}
            <polygon points="21,22 55,22 58,62 19,62" fill="#EFE6D5" />
            {/* Decorative pastel green wave */}
            <path d="M20 46 Q38 38 57 48 L58 62 L19 62 Z" fill="#DCE8D0" />
            {/* Soft heart on bag */}
            <path
              d="M39 47s-5.5-3.2-7-6.2C30.8 38 32.6 35.5 35.2 35.5c1.5 0 2.6.8 3.8 2.2 1.2-1.4 2.3-2.2 3.8-2.2 2.6 0 4.4 2.5 3.2 5.3-1.5 3-7 6.2-7 6.2z"
              fill="#CFE0C3"
            />
            {/* Maroon circle checkmark badge */}
            <circle cx="57" cy="52" r="10" fill="#7A1C24" />
            <polyline
              points="52.5,52 55.8,55.2 61.8,49"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="text-center sm:text-left">
          <h3 className="font-serif text-base font-semibold text-[#7A1C24] md:text-lg">
            We&apos;ll be here when you&apos;re back!
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-neutral-600">
            Explore new arrivals, exclusive offers and handcrafted collections anytime.
          </p>
        </div>
      </div>
    </div>
  );
}

