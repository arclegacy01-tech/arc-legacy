import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function BotanicalLineart({ className }) {
  return (
    <svg viewBox="0 0 220 400" className={className} fill="none" aria-hidden="true">
      <path d="M110 380 C110 380 60 320 40 250 C20 180 50 120 90 80 C130 40 160 20 180 10" stroke="#C9A227" strokeWidth="0.6" opacity="0.35" />
      <path d="M110 380 C110 380 160 320 180 250 C200 180 170 110 130 80 C90 50 60 30 40 20" stroke="#C9A227" strokeWidth="0.6" opacity="0.35" />
      <ellipse cx="90" cy="180" rx="28" ry="14" transform="rotate(-30 90 180)" stroke="#C9A227" strokeWidth="0.5" opacity="0.3" />
      <ellipse cx="130" cy="200" rx="28" ry="14" transform="rotate(30 130 200)" stroke="#C9A227" strokeWidth="0.5" opacity="0.3" />
      <ellipse cx="75" cy="240" rx="22" ry="11" transform="rotate(-45 75 240)" stroke="#C9A227" strokeWidth="0.5" opacity="0.25" />
      <ellipse cx="145" cy="155" rx="22" ry="11" transform="rotate(45 145 155)" stroke="#C9A227" strokeWidth="0.5" opacity="0.25" />
      <circle cx="110" cy="100" r="6" stroke="#C9A227" strokeWidth="0.6" opacity="0.4" />
    </svg>
  );
}

const BENEFITS = [
  {
    title: 'Faster Checkout',
    desc: 'Save your details for a quicker and easier shopping experience.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-maroon" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    title: 'Save Your Favorites',
    desc: 'Keep your wishlist items at one place.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-maroon" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 20s-7.5-4.35-9.5-8.5C1 7.5 3.5 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.5 0 6 3.5 4.5 7.5C19.5 15.65 12 20 12 20z" />
      </svg>
    ),
  },
  {
    title: 'Track Your Orders',
    desc: 'Get real-time updates on your orders.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-maroon" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="13" y2="17" />
      </svg>
    ),
  },
  {
    title: 'Manage Addresses',
    desc: 'Save multiple delivery addresses for your convenience.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-maroon" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: 'Exclusive Offers',
    desc: 'Be the first to know about new arrivals, special discounts and member-only deals.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-maroon" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
  },
  {
    title: 'Personalized Recommendations',
    desc: 'Get suggestions tailored to your style and preferences.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-maroon" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
];

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: true,
    marketingOptIn: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Compute password strength (0..4)
  const passwordStrength = (() => {
    const p = form.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score++;
    if (/\d/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return Math.max(1, score);
  })();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!form.agreeTerms) {
      setError('Please agree to the Terms & Conditions and Privacy Policy.');
      return;
    }
    setBusy(true);
    try {
      await register({
        name: form.name,
        email: form.email,
        phone: form.phone ? `${form.countryCode} ${form.phone}` : '',
        password: form.password,
        marketingOptIn: form.marketingOptIn,
      });
      navigate('/account');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const onGoogle = async () => {
    setError('');
    setBusy(true);
    try {
      await loginWithGoogle();
      navigate('/account');
    } catch (err) {
      setError(err.message || 'Google sign-in failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-[#FAF3EB]">
      {/* Top-Right Decorative Photo from Local Library */}
      <div className="pointer-events-none absolute right-0 top-0 h-[300px] w-full overflow-hidden md:w-[55%]">
        <img
          src="/images/home-mfg-rolls.jpg"
          alt=""
          className="h-full w-full object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF3EB] via-[#FAF3EB]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF3EB] via-transparent to-transparent" />
      </div>

      {/* Bottom-Left Decorative Lace Photo from Local Library */}
      <div className="pointer-events-none absolute bottom-0 left-0 hidden h-[620px] w-[180px] overflow-hidden lg:block">
        <img
          src="/images/provided-floral-lace.jpg"
          alt=""
          className="h-full w-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FAF3EB]/50 to-[#FAF3EB]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF3EB] via-transparent to-transparent" />
      </div>

      <BotanicalLineart className="pointer-events-none absolute left-0 top-0 h-72 w-28 opacity-45" />
      <BotanicalLineart className="pointer-events-none absolute bottom-0 right-0 h-72 w-28 -scale-x-100 opacity-45" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-8">
        {/* ── Hero Heading ── */}
        <div className="max-w-lg pb-7">
          <p className="text-xs font-medium text-maroon">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-1.5 text-neutral-400">/</span>
            <span>Create Account</span>
          </p>
          <h1 className="mt-2.5 font-serif text-3xl font-medium text-maroon md:text-4xl">
            Create Your Account
          </h1>
          <p className="mt-2 text-xs leading-relaxed text-neutral-600 sm:text-sm">
            Join ARC LEGACY and explore a world of exquisite laces, trims and embellishments.
          </p>
        </div>

        {/* ── Two-Column Card Grid ── */}
        <div className="grid items-stretch gap-7 lg:grid-cols-[1.18fr_0.92fr]">
          {/* Left Column: Form Card */}
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-neutral-200/80 bg-[#FFFCF9] p-6 shadow-sm sm:p-9"
          >
            {/* Card Header */}
            <div className="flex items-start gap-3.5">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-maroon/10 text-maroon">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div>
                <h2 className="font-serif text-2xl font-medium text-maroon">Create Account</h2>
                <p className="text-xs text-neutral-500 sm:text-sm">
                  Fill in your details to get started.
                </p>
              </div>
            </div>

            {error && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-700">
                {error}
              </div>
            )}

            <div className="mt-6 space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-neutral-800 sm:text-sm">
                  Full Name <span className="text-maroon">*</span>
                </label>
                <div className="relative mt-1.5 flex items-center">
                  <span className="pointer-events-none absolute left-3.5 text-neutral-400">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-neutral-200 bg-white py-2.5 pl-10 pr-3.5 text-xs text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-maroon sm:text-sm"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-neutral-800 sm:text-sm">
                  Email Address <span className="text-maroon">*</span>
                </label>
                <div className="relative mt-1.5 flex items-center">
                  <span className="pointer-events-none absolute left-3.5 text-neutral-400">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-lg border border-neutral-200 bg-white py-2.5 pl-10 pr-3.5 text-xs text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-maroon sm:text-sm"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-neutral-800 sm:text-sm">
                  Phone Number <span className="text-maroon">*</span>
                </label>
                <div className="mt-1.5 grid grid-cols-[100px_1fr] gap-2.5">
                  <div className="relative flex items-center rounded-lg border border-neutral-200 bg-white px-2.5">
                    <span className="mr-1.5 text-sm leading-none" aria-hidden="true">🇮🇳</span>
                    <select
                      aria-label="Country code"
                      value={form.countryCode}
                      onChange={(e) => setForm({ ...form, countryCode: e.target.value })}
                      className="w-full bg-transparent py-2.5 text-xs font-medium text-neutral-700 outline-none sm:text-sm"
                    >
                      <option value="+91">+91</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                      <option value="+971">+971</option>
                    </select>
                  </div>

                  <div className="relative flex items-center">
                    <span className="pointer-events-none absolute left-3.5 text-neutral-400">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="Enter your phone number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-lg border border-neutral-200 bg-white py-2.5 pl-10 pr-3.5 text-xs text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-maroon sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Create Password */}
              <div>
                <label className="block text-xs font-semibold text-neutral-800 sm:text-sm">
                  Create Password <span className="text-maroon">*</span>
                </label>
                <div className="relative mt-1.5 flex items-center">
                  <span className="pointer-events-none absolute left-3.5 text-neutral-400">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    placeholder="Create a password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full rounded-lg border border-neutral-200 bg-white py-2.5 pl-10 pr-10 text-xs text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-maroon sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 text-neutral-400 hover:text-maroon"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      {!showPassword && <line x1="1" y1="1" x2="23" y2="23" />}
                    </svg>
                  </button>
                </div>

                {/* 4-segment strength bar */}
                <div className="mt-2 grid grid-cols-4 gap-1.5">
                  {[1, 2, 3, 4].map((seg) => (
                    <div
                      key={seg}
                      className={`h-1 rounded-full transition ${
                        passwordStrength >= seg ? 'bg-maroon/75' : 'bg-neutral-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-1.5 text-[11px] text-neutral-500">
                  Use at least 8 characters with a mix of letters, numbers and symbols.
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-neutral-800 sm:text-sm">
                  Confirm Password <span className="text-maroon">*</span>
                </label>
                <div className="relative mt-1.5 flex items-center">
                  <span className="pointer-events-none absolute left-3.5 text-neutral-400">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    required
                    minLength={8}
                    placeholder="Confirm your password"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    className="w-full rounded-lg border border-neutral-200 bg-white py-2.5 pl-10 pr-10 text-xs text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-maroon sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((s) => !s)}
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                    className="absolute right-3 text-neutral-400 hover:text-maroon"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      {!showConfirm && <line x1="1" y1="1" x2="23" y2="23" />}
                    </svg>
                  </button>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-2.5 pt-1">
                <label className="flex cursor-pointer items-start gap-2.5 text-xs text-neutral-700">
                  <input
                    type="checkbox"
                    checked={form.agreeTerms}
                    onChange={(e) => setForm({ ...form, agreeTerms: e.target.checked })}
                    className="mt-0.5 h-4 w-4 rounded border-neutral-300 accent-maroon"
                  />
                  <span>
                    I agree to the{' '}
                    <Link to="/policies/terms" className="font-semibold text-maroon underline">
                      Terms &amp; Conditions
                    </Link>{' '}
                    and{' '}
                    <Link to="/policies/privacy" className="font-semibold text-maroon underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                <label className="flex cursor-pointer items-start gap-2.5 text-xs text-neutral-600">
                  <input
                    type="checkbox"
                    checked={form.marketingOptIn}
                    onChange={(e) => setForm({ ...form, marketingOptIn: e.target.checked })}
                    className="mt-0.5 h-4 w-4 rounded border-neutral-300 accent-maroon"
                  />
                  <span>
                    I would like to receive exclusive offers, new arrivals and updates via email and WhatsApp.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={busy}
                className="mt-2 w-full rounded-lg bg-maroon py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-maroon-dark disabled:opacity-50"
              >
                {busy ? 'Creating Account…' : 'Create Account'}
              </button>

              {/* OR Divider */}
              <div className="flex items-center gap-3 py-1 text-[11px] font-medium uppercase tracking-wider text-neutral-400">
                <span className="h-px flex-1 bg-neutral-200" />
                <span>OR</span>
                <span className="h-px flex-1 bg-neutral-200" />
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={onGoogle}
                  disabled={busy}
                  className="flex items-center justify-center gap-2.5 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-700 shadow-2xs transition hover:border-maroon"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.3-1.5 3.8-5.5 3.8-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.4 14.6 2.5 12 2.5 6.8 2.5 2.5 6.8 2.5 12s4.3 9.5 9.5 9.5c5.5 0 9.1-3.8 9.1-9.2 0-.6-.1-1.1-.2-1.6H12z" />
                    <path fill="#34A853" d="M3.6 7.4l3.2 2.4C7.7 7.8 9.7 6.4 12 6.4c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.4 14.6 2.5 12 2.5 8.3 2.5 5.1 4.6 3.6 7.4z" />
                    <path fill="#FBBC05" d="M12 21.5c2.5 0 4.7-.8 6.3-2.3l-2.9-2.4c-.8.6-1.9 1-3.4 1-2.6 0-4.9-1.8-5.7-4.2l-3.2 2.5c1.5 3.1 4.9 5.4 8.9 5.4z" />
                    <path fill="#4285F4" d="M21.1 12.3c0-.6-.1-1.1-.2-1.6H12v3.9h5.5c-.3 1.3-1 2.4-2.1 3.1l2.9 2.4c1.7-1.6 2.8-4 2.8-7.8z" />
                  </svg>
                  Continue with Google
                </button>

                <button
                  type="button"
                  onClick={onGoogle}
                  disabled={busy}
                  className="flex items-center justify-center gap-2.5 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-700 shadow-2xs transition hover:border-maroon"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#1877F2]" fill="currentColor" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Continue with Facebook
                </button>
              </div>

              {/* Sign In Link */}
              <p className="pt-2 text-center text-xs text-neutral-600 sm:text-sm">
                Already have an account?{' '}
                <Link to="/login" className="font-bold text-maroon hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </form>

          {/* Right Column: Why Create an Account? */}
          <aside className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200/60 bg-[#FAF0EE] p-7 sm:p-9">
            <div>
              <h2 className="font-serif text-2xl font-medium text-maroon sm:text-[26px]">
                Why Create an Account?
              </h2>
              <p className="mt-1.5 text-xs leading-relaxed text-neutral-600 sm:text-sm">
                Enjoy a seamless shopping experience with exclusive benefits.
              </p>

              <div className="mt-7 space-y-5">
                {BENEFITS.map((b) => (
                  <div key={b.title} className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F3DDDA] shadow-2xs">
                      {b.icon}
                    </div>
                    <div>
                      <h3 className="font-serif text-sm font-semibold text-neutral-900 sm:text-base">
                        {b.title}
                      </h3>
                      <p className="mt-0.5 text-xs leading-relaxed text-neutral-600">
                        {b.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Handwritten Community Note */}
            <div className="mt-10 flex flex-col items-center text-center">
              <p className="-rotate-3 font-serif text-xl italic leading-snug text-[#9C7A44] sm:text-2xl">
                Be a part of
                <br />
                our creative community
              </p>
              <svg
                viewBox="0 0 24 24"
                className="mt-2 h-6 w-6 text-[#9C7A44]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M12 20s-7.5-4.35-9.5-8.5C1 7.5 3.5 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.5 0 6 3.5 4.5 7.5C19.5 15.65 12 20 12 20z" />
              </svg>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
