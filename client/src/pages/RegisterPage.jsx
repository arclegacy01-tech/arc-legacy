import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import GoogleSignInButton from '../components/GoogleSignInButton.jsx';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', marketingOptIn: false });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await register(form);
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
    <div className="mx-auto max-w-lg px-4 py-16">
      <form onSubmit={onSubmit} className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-card">
        <h1 className="font-serif text-2xl text-maroon">Create Account</h1>
        <p className="mt-1 text-sm text-neutral-600">Fill in your details to get started</p>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        {['name', 'email', 'phone'].map((field) => (
          <label key={field} className="mt-4 block text-sm capitalize">
            {field === 'name' ? 'Full Name' : field}
            <input
              className="input-field mt-1"
              type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
              required={field !== 'phone'}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            />
          </label>
        ))}
        <label className="mt-4 block text-sm">
          Password
          <input
            className="input-field mt-1"
            type="password"
            required
            minLength={8}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </label>
        <label className="mt-4 flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.marketingOptIn}
            onChange={(e) => setForm({ ...form, marketingOptIn: e.target.checked })}
          />
          Send me offers via email & WhatsApp
        </label>
        <button type="submit" className="btn-primary mt-6 w-full" disabled={busy}>
          Create Account
        </button>
        <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-wider text-neutral-400">
          <span className="h-px flex-1 bg-neutral-200" />
          or
          <span className="h-px flex-1 bg-neutral-200" />
        </div>
        <GoogleSignInButton onClick={onGoogle} disabled={busy} label="Sign up with Google" />
        <p className="mt-4 text-center text-sm">
          Already have an account? <Link to="/login" className="text-maroon underline">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
