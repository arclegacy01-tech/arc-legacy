import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import GoogleSignInButton from '../components/GoogleSignInButton.jsx';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/account';

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const user = await login(email, password);
      navigate(user.role === 'admin' ? '/admin' : from);
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
      const user = await loginWithGoogle();
      navigate(user.role === 'admin' ? '/admin' : from);
    } catch (err) {
      setError(err.message || 'Google sign-in failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 md:grid-cols-2">
      <form onSubmit={onSubmit} className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-card">
        <h1 className="font-serif text-2xl text-maroon">Sign In</h1>
        <p className="mt-1 text-sm text-neutral-600">Welcome back to ARC LEGACY</p>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        <label className="mt-6 block text-sm">
          Email
          <input className="input-field mt-1" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="mt-4 block text-sm">
          Password
          <input className="input-field mt-1" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit" className="btn-primary mt-6 w-full" disabled={busy}>
          Sign In
        </button>
        <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-wider text-neutral-400">
          <span className="h-px flex-1 bg-neutral-200" />
          or
          <span className="h-px flex-1 bg-neutral-200" />
        </div>
        <GoogleSignInButton onClick={onGoogle} disabled={busy} />
        <p className="mt-4 text-center text-sm">
          New here? <Link to="/register" className="text-maroon underline">Create account</Link>
        </p>
      </form>
      <div className="rounded-2xl bg-blush p-8">
        <h2 className="font-serif text-xl text-maroon">Admin access</h2>
        <p className="mt-2 text-sm text-neutral-600">
          Use the seeded admin account after running <code className="text-xs">npm run seed</code> (see README).
        </p>
      </div>
    </div>
  );
}
