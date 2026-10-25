import { useEffect, useState } from 'react';
import { api } from '../../api/client.js';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AccountSettingsPage() {
  const { user, refreshUser } = useAuth();
  const [profile, setProfile] = useState({ name: '', phone: '', marketingOptIn: false });
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setProfile({ name: user.name, phone: user.phone || '', marketingOptIn: user.marketingOptIn || false });
    }
    api('/users/profile').then((d) => {
      setProfile({
        name: d.user.name,
        phone: d.user.phone || '',
        marketingOptIn: d.user.marketingOptIn,
      });
    });
  }, [user]);

  const saveProfile = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await api('/users/profile', { method: 'PATCH', body: JSON.stringify(profile) });
      await refreshUser?.();
      setMessage('Profile updated');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const savePassword = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await api('/users/password', { method: 'PATCH', body: JSON.stringify(passwords) });
      setPasswords({ currentPassword: '', newPassword: '' });
      setMessage('Password updated');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="font-serif text-2xl text-maroon">Account Settings</h2>
      {message && <p className="text-sm text-green-700">{message}</p>}
      <form onSubmit={saveProfile} className="max-w-md space-y-3 rounded-xl border border-neutral-200 bg-white p-6">
        <h3 className="font-medium">Personal information</h3>
        <label className="block text-sm">
          Full name
          <input className="input-field mt-1" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
        </label>
        <label className="block text-sm">
          Phone
          <input className="input-field mt-1" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={profile.marketingOptIn}
            onChange={(e) => setProfile({ ...profile, marketingOptIn: e.target.checked })}
          />
          Marketing emails & WhatsApp
        </label>
        <button type="submit" className="btn-primary text-xs">Save changes</button>
      </form>

      <form onSubmit={savePassword} className="max-w-md space-y-3 rounded-xl border border-neutral-200 bg-white p-6">
        <h3 className="font-medium">Change password</h3>
        <label className="block text-sm">
          Current password
          <input className="input-field mt-1" type="password" value={passwords.currentPassword} onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })} />
        </label>
        <label className="block text-sm">
          New password
          <input className="input-field mt-1" type="password" minLength={8} value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} />
        </label>
        <button type="submit" className="btn-primary text-xs">Update password</button>
      </form>
    </div>
  );
}
