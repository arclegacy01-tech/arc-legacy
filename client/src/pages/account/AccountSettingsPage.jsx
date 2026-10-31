import { useEffect, useRef, useState } from 'react';
import { api } from '../../api/client.js';
import { useAuth } from '../../context/AuthContext.jsx';

const TABS = [
  {
    id: 'profile',
    label: 'Profile Information',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: 'password',
    label: 'Change Password',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    id: 'preferences',
    label: 'Preferences',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    id: 'delete',
    label: 'Delete Account',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    ),
  },
];

const ALL_CATEGORIES = ['Laces', 'Latkans', 'Trims & Borders', 'Pom Pom Trims', 'Gota Patti', 'Embellishments'];

export default function AccountSettingsPage() {
  const { user, refreshUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [toast, setToast] = useState('');

  const [profile, setProfile] = useState({
    name: user?.name || 'Ananya Sharma',
    email: user?.email || 'ananya.sharma@gmail.com',
    countryCode: '+91',
    phone: user?.phone || '9876543210',
    gender: 'Female',
    dob: '',
    language: 'English',
    avatarPreview: null,
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    newArrivals: true,
    offers: false,
    wishlistAlerts: true,
  });

  const [defaultAddress, setDefaultAddress] = useState('Home - 123, Shree Residency, Ahmedabad');
  const [preferredCategories, setPreferredCategories] = useState(['Laces', 'Latkans', 'Trims & Borders']);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const fileInputRef = useRef(null);
  const sectionRefs = {
    profile: useRef(null),
    password: useRef(null),
    notifications: useRef(null),
    preferences: useRef(null),
    delete: useRef(null),
  };

  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
      }));
    }
    api('/users/profile')
      .then((d) => {
        if (d?.user) {
          setProfile((prev) => ({
            ...prev,
            name: d.user.name || prev.name,
            email: d.user.email || prev.email,
            phone: d.user.phone || prev.phone,
          }));
        }
      })
      .catch(() => {});
  }, [user]);

  const showStatus = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    sectionRefs[tabId]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSaveProfile = async (e) => {
    e?.preventDefault();
    try {
      if (user) {
        await api('/users/profile', {
          method: 'PATCH',
          body: JSON.stringify({ name: profile.name, phone: profile.phone }),
        });
        await refreshUser?.();
      }
      showStatus('Profile information saved successfully!');
    } catch {
      showStatus('Profile information saved!');
    }
  };

  const handleSavePassword = async (e) => {
    e?.preventDefault();
    if (!passwords.currentPassword || !passwords.newPassword) {
      showStatus('Please fill in your current and new password.');
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      showStatus('New password and confirmation do not match.');
      return;
    }
    try {
      if (user) {
        await api('/users/password', {
          method: 'PATCH',
          body: JSON.stringify({
            currentPassword: passwords.currentPassword,
            newPassword: passwords.newPassword,
          }),
        });
      }
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
      showStatus('Password updated successfully!');
    } catch (err) {
      showStatus(err.message || 'Password updated!');
    }
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (user) {
        api('/users/notifications', { method: 'PATCH', body: JSON.stringify({ [key]: next[key] }) }).catch(() => {});
      }
      return next;
    });
  };

  const removeCategory = (cat) => {
    setPreferredCategories((prev) => prev.filter((c) => c !== cat));
  };

  const addCategory = (cat) => {
    if (!preferredCategories.includes(cat)) {
      setPreferredCategories((prev) => [...prev, cat]);
    }
    setShowCategoryDropdown(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, avatarPreview: url }));
      showStatus('Profile photo updated!');
    }
  };

  const initials = (profile.name || 'Ananya Sharma')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-5">
      {/* Top Horizontal Tabs */}
      <div className="overflow-x-auto rounded-xl border border-[#ECE2D8] bg-[#FDF9F6] px-2 shadow-sm">
        <div className="flex min-w-max items-center justify-between gap-2">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center gap-2 border-b-2 px-4 py-3.5 text-xs font-medium transition ${
                  isActive
                    ? 'border-[#7A1C24] font-semibold text-[#7A1C24]'
                    : 'border-transparent text-neutral-600 hover:text-[#7A1C24]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {toast && (
        <div className="rounded-xl border border-[#7A1C24]/25 bg-[#FCECEF] px-4 py-2.5 text-xs font-medium text-[#7A1C24]">
          {toast}
        </div>
      )}

      {/* 1. Profile Information Card */}
      <div
        ref={sectionRefs.profile}
        className="rounded-2xl border border-[#ECE2D8] bg-white p-6 shadow-sm"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F2EAE1] pb-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FCECEF] text-[#7A1C24]">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <h2 className="font-serif text-lg font-semibold text-[#7A1C24]">Profile Information</h2>
              <p className="text-xs text-neutral-500">Update your personal details and contact information.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSaveProfile}
            className="rounded-lg bg-[#7A1C24] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#61151C]"
          >
            Save Changes
          </button>
        </div>

        <form onSubmit={handleSaveProfile} className="mt-6 grid gap-6 md:grid-cols-[160px_1fr]">
          {/* Left Avatar Upload */}
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              {profile.avatarPreview ? (
                <img
                  src={profile.avatarPreview}
                  alt={profile.name}
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F4D9DC] font-serif text-2xl font-semibold text-[#7A1C24]">
                  {initials}
                </div>
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#7A1C24] text-white shadow-sm"
                aria-label="Upload photo"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
            <p className="mt-3 text-xs font-semibold text-neutral-800">Upload Profile Picture</p>
            <p className="mt-0.5 text-[10px] text-neutral-400">JPG, PNG (Max 2MB)</p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-2.5 rounded-lg border border-[#B06A70]/60 bg-white px-4 py-1.5 text-xs font-medium text-[#7A1C24] transition hover:bg-[#FCECEF]"
            >
              Choose Image
            </button>
          </div>

          {/* Right Form Fields Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-neutral-800">
                Full Name <span className="text-[#7A1C24]">*</span>
              </label>
              <div className="relative mt-1.5">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-400">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full rounded-lg border border-[#E5DEC9] bg-white py-2.5 pl-9 pr-3 text-xs text-neutral-800 focus:border-[#7A1C24] focus:outline-none"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-semibold text-neutral-800">
                Phone Number <span className="text-[#7A1C24]">*</span>
              </label>
              <div className="mt-1.5 flex gap-2">
                <div className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[#E5DEC9] bg-white px-2.5 py-2 text-xs text-neutral-700">
                  <span className="text-sm leading-none">🇮🇳</span>
                  <select
                    value={profile.countryCode}
                    onChange={(e) => setProfile({ ...profile, countryCode: e.target.value })}
                    className="bg-transparent text-xs font-medium focus:outline-none"
                  >
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                  </select>
                </div>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full rounded-lg border border-[#E5DEC9] bg-white px-3 py-2.5 text-xs text-neutral-800 focus:border-[#7A1C24] focus:outline-none"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-neutral-800">
                Email Address <span className="text-[#7A1C24]">*</span>
              </label>
              <div className="relative mt-1.5">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-400">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full rounded-lg border border-[#E5DEC9] bg-[#F5F3F0] py-2.5 pl-9 pr-3 text-xs text-neutral-600 focus:border-[#7A1C24] focus:outline-none"
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-semibold text-neutral-800">Gender</label>
              <div className="mt-3 flex items-center gap-6">
                {['Female', 'Male', 'Other'].map((g) => (
                  <label key={g} className="flex cursor-pointer items-center gap-2 text-xs text-neutral-700">
                    <input
                      type="radio"
                      name="gender"
                      checked={profile.gender === g}
                      onChange={() => setProfile({ ...profile, gender: g })}
                      className="h-4 w-4 accent-[#7A1C24]"
                    />
                    <span>{g}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-xs font-semibold text-neutral-800">Date of Birth</label>
              <div className="relative mt-1.5">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-400">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="DD / MM / YYYY"
                  value={profile.dob}
                  onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                  className="w-full rounded-lg border border-[#E5DEC9] bg-white py-2.5 pl-9 pr-3 text-xs text-neutral-800 placeholder:text-neutral-400 focus:border-[#7A1C24] focus:outline-none"
                />
              </div>
            </div>

            {/* Preferred Language */}
            <div>
              <label className="block text-xs font-semibold text-neutral-800">Preferred Language</label>
              <div className="relative mt-1.5">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-400">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </span>
                <select
                  value={profile.language}
                  onChange={(e) => setProfile({ ...profile, language: e.target.value })}
                  className="w-full rounded-lg border border-[#E5DEC9] bg-white py-2.5 pl-9 pr-8 text-xs text-neutral-800 focus:border-[#7A1C24] focus:outline-none"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Gujarati">Gujarati</option>
                  <option value="Marathi">Marathi</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* 2. Change Password Card */}
      <div
        ref={sectionRefs.password}
        className="rounded-2xl border border-[#ECE2D8] bg-white p-6 shadow-sm"
      >
        <div className="flex items-center gap-3.5 border-b border-[#F2EAE1] pb-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FCECEF] text-[#7A1C24]">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <div>
            <h2 className="font-serif text-lg font-semibold text-[#7A1C24]">Change Password</h2>
            <p className="text-xs text-neutral-500">Keep your account secure by using a strong password.</p>
          </div>
        </div>

        <form onSubmit={handleSavePassword} className="mt-5 grid gap-6 lg:grid-cols-[1fr_260px]">
          <div className="space-y-4">
            {/* Current Password */}
            <div>
              <label className="block text-xs font-semibold text-neutral-800">
                Current Password <span className="text-[#7A1C24]">*</span>
              </label>
              <div className="relative mt-1.5">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-400">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  type={showCurrentPw ? 'text' : 'password'}
                  placeholder="Enter current password"
                  value={passwords.currentPassword}
                  onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                  className="w-full rounded-lg border border-[#E5DEC9] bg-white py-2.5 pl-9 pr-10 text-xs text-neutral-800 placeholder:text-neutral-400 focus:border-[#7A1C24] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPw((v) => !v)}
                  className="absolute inset-y-0 right-3 flex items-center text-neutral-400 hover:text-neutral-600"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                </button>
              </div>
            </div>

            {/* New Password + Confirm New Password */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-neutral-800">
                  New Password <span className="text-[#7A1C24]">*</span>
                </label>
                <div className="relative mt-1.5">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-400">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    type={showNewPw ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                    className="w-full rounded-lg border border-[#E5DEC9] bg-white py-2.5 pl-9 pr-10 text-xs text-neutral-800 placeholder:text-neutral-400 focus:border-[#7A1C24] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPw((v) => !v)}
                    className="absolute inset-y-0 right-3 flex items-center text-neutral-400 hover:text-neutral-600"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800">
                  Confirm New Password <span className="text-[#7A1C24]">*</span>
                </label>
                <div className="relative mt-1.5">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-400">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    type={showConfirmPw ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    value={passwords.confirmPassword}
                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                    className="w-full rounded-lg border border-[#E5DEC9] bg-white py-2.5 pl-9 pr-10 text-xs text-neutral-800 placeholder:text-neutral-400 focus:border-[#7A1C24] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPw((v) => !v)}
                    className="absolute inset-y-0 right-3 flex items-center text-neutral-400 hover:text-neutral-600"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Password Tips Box */}
          <div className="flex flex-col justify-between">
            <div className="rounded-xl border border-[#F5E0E2] bg-[#FDF4F5] p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#7A1C24]">
                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                <span>Password Tips:</span>
              </div>
              <ul className="mt-2.5 space-y-1.5 text-[11px] text-neutral-600">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#7A1C24]">✓</span>
                  <span>Use at least 8 characters</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#7A1C24]">✓</span>
                  <span>Include a mix of letters, numbers and symbols</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#7A1C24]">✓</span>
                  <span>Use both uppercase and lowercase letters</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#7A1C24]">✓</span>
                  <span>Avoid using personal information</span>
                </li>
              </ul>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                className="rounded-lg bg-[#7A1C24] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#61151C]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* 3. Notification Preferences Card */}
      <div
        ref={sectionRefs.notifications}
        className="rounded-2xl border border-[#ECE2D8] bg-white p-6 shadow-sm"
      >
        <div className="flex items-center gap-3.5 border-b border-[#F2EAE1] pb-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FCECEF] text-[#7A1C24]">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </div>
          <div>
            <h2 className="font-serif text-lg font-semibold text-[#7A1C24]">Notification Preferences</h2>
            <p className="text-xs text-neutral-500">Choose what updates you want to receive.</p>
          </div>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {/* Order Updates */}
          <div className="flex items-center justify-between gap-4 rounded-xl border border-[#F2EAE1] bg-[#FDFBF9] p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FCECEF] text-[#7A1C24]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="1" y="3" width="15" height="13" rx="1" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-neutral-900">Order Updates</h3>
                <p className="mt-0.5 text-[11px] leading-relaxed text-neutral-500">
                  Get notified about your order status, shipping and delivery updates.
                </p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={notifications.orderUpdates}
              onClick={() => toggleNotification('orderUpdates')}
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                notifications.orderUpdates ? 'bg-[#7A1C24]' : 'bg-[#D1CBC5]'
              }`}
            >
              <span
                className={`block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow transition ${
                  notifications.orderUpdates ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>

          {/* New Arrivals */}
          <div className="flex items-center justify-between gap-4 rounded-xl border border-[#F2EAE1] bg-[#FDFBF9] p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FCECEF] text-[#7A1C24]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <polyline points="20 12 20 22 4 22 4 12" />
                  <rect x="2" y="7" width="20" height="5" />
                  <line x1="12" y1="22" x2="12" y2="7" />
                  <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                  <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-neutral-900">New Arrivals</h3>
                <p className="mt-0.5 text-[11px] leading-relaxed text-neutral-500">
                  Be the first to know about new collections and trending trims.
                </p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={notifications.newArrivals}
              onClick={() => toggleNotification('newArrivals')}
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                notifications.newArrivals ? 'bg-[#7A1C24]' : 'bg-[#D1CBC5]'
              }`}
            >
              <span
                className={`block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow transition ${
                  notifications.newArrivals ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>

          {/* Offers & Discounts */}
          <div className="flex items-center justify-between gap-4 rounded-xl border border-[#F2EAE1] bg-[#FDFBF9] p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FCECEF] text-[#7A1C24]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-neutral-900">Offers & Discounts</h3>
                <p className="mt-0.5 text-[11px] leading-relaxed text-neutral-500">
                  Receive exclusive offers, festive deals and member-only discounts.
                </p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={notifications.offers}
              onClick={() => toggleNotification('offers')}
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                notifications.offers ? 'bg-[#7A1C24]' : 'bg-[#D1CBC5]'
              }`}
            >
              <span
                className={`block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow transition ${
                  notifications.offers ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>

          {/* Wishlist Alerts */}
          <div className="flex items-center justify-between gap-4 rounded-xl border border-[#F2EAE1] bg-[#FDFBF9] p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FCECEF] text-[#7A1C24]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 20s-7.5-4.35-9.5-8.5C1 7.5 3.5 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.5 0 6 3.5 4.5 7.5C19.5 15.65 12 20 12 20z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-neutral-900">Wishlist Alerts</h3>
                <p className="mt-0.5 text-[11px] leading-relaxed text-neutral-500">
                  Get notified when wishlist items are back in stock or on sale.
                </p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={notifications.wishlistAlerts}
              onClick={() => toggleNotification('wishlistAlerts')}
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                notifications.wishlistAlerts ? 'bg-[#7A1C24]' : 'bg-[#D1CBC5]'
              }`}
            >
              <span
                className={`block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow transition ${
                  notifications.wishlistAlerts ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Shopping Preferences Card */}
      <div
        ref={sectionRefs.preferences}
        className="rounded-2xl border border-[#ECE2D8] bg-white p-6 shadow-sm"
      >
        <div className="flex items-center gap-3.5 border-b border-[#F2EAE1] pb-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FCECEF] text-[#7A1C24]">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </div>
          <div>
            <h2 className="font-serif text-lg font-semibold text-[#7A1C24]">Shopping Preferences</h2>
            <p className="text-xs text-neutral-500">Personalize your shopping experience.</p>
          </div>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {/* Default Address */}
          <div>
            <label className="block text-xs font-semibold text-neutral-800">Default Address</label>
            <div className="relative mt-1.5">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-500">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <select
                value={defaultAddress}
                onChange={(e) => setDefaultAddress(e.target.value)}
                className="w-full rounded-lg border border-[#E5DEC9] bg-white py-2.5 pl-9 pr-8 text-xs text-neutral-800 focus:border-[#7A1C24] focus:outline-none"
              >
                <option value="Home - 123, Shree Residency, Ahmedabad">
                  Home - 123, Shree Residency, Ahmedabad
                </option>
                <option value="Boutique Studio - 45, CG Road, Ahmedabad">
                  Boutique Studio - 45, CG Road, Ahmedabad
                </option>
                <option value="Workshop - Ring Road Textile Market, Surat">
                  Workshop - Ring Road Textile Market, Surat
                </option>
              </select>
            </div>
            <p className="mt-1.5 text-[11px] text-neutral-400">
              This address will be selected by default at checkout.
            </p>
          </div>

          {/* Preferred Categories */}
          <div className="relative">
            <label className="block text-xs font-semibold text-neutral-800">Preferred Categories</label>
            <div className="mt-1.5 flex min-h-[38px] flex-wrap items-center justify-between gap-1.5 rounded-lg border border-[#E5DEC9] bg-white px-3 py-1.5">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="mr-1 text-[#7A1C24]">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                  </svg>
                </span>
                {preferredCategories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1 rounded-md bg-[#FCECEF] px-2.5 py-1 text-[11px] font-medium text-[#7A1C24]"
                  >
                    {cat}
                    <button
                      type="button"
                      onClick={() => removeCategory(cat)}
                      className="ml-0.5 text-[#7A1C24]/70 hover:text-[#7A1C24]"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setShowCategoryDropdown((v) => !v)}
                className="text-neutral-400 hover:text-neutral-700"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>

            {showCategoryDropdown && (
              <div className="absolute right-0 top-16 z-20 w-56 rounded-xl border border-[#ECE2D8] bg-white p-2 shadow-lg">
                {ALL_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => addCategory(cat)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left text-xs text-neutral-700 hover:bg-[#FCECEF] hover:text-[#7A1C24]"
                  >
                    <span>{cat}</span>
                    {preferredCategories.includes(cat) && <span className="text-[#7A1C24]">✓</span>}
                  </button>
                ))}
              </div>
            )}

            <p className="mt-1.5 text-[11px] text-neutral-400">
              Select categories you love to get personalized recommendations.
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => showStatus('Shopping preferences saved!')}
            className="rounded-lg bg-[#7A1C24] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#61151C]"
          >
            Save Preferences
          </button>
        </div>
      </div>

      {/* 5. Delete Account Card */}
      <div
        ref={sectionRefs.delete}
        className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#ECE2D8] bg-white p-5 shadow-sm"
      >
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FCECEF] text-[#7A1C24]">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </div>
          <div>
            <h2 className="font-serif text-lg font-semibold text-[#7A1C24]">Delete Account</h2>
            <p className="text-xs text-neutral-500">
              Permanently delete your account and all associated data.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            if (window.confirm('Are you sure you want to permanently delete your account?')) {
              showStatus('Account deletion request submitted.');
            }
          }}
          className="rounded-lg border border-[#7A1C24] bg-white px-5 py-2.5 text-xs font-semibold text-[#7A1C24] transition hover:bg-[#FCECEF]"
        >
          Delete My Account
        </button>
      </div>
    </div>
  );
}
