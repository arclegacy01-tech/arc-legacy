import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { api } from '../api/client.js';
import { firebaseAuth, googleAuthProvider, isFirebaseConfigured } from '../lib/firebase.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const persist = useCallback((token, nextUser) => {
    localStorage.setItem('arc_token', token);
    setUser(nextUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('arc_token');
    setUser(null);
    if (firebaseAuth) {
      signOut(firebaseAuth).catch(() => {});
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('arc_token');
    if (!token) {
      setLoading(false);
      return;
    }
    api('/auth/me')
      .then((data) => setUser(data.user))
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, [logout]);

  const login = useCallback(async (email, password) => {
    const data = await api('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    persist(data.token, data.user);
    return data.user;
  }, [persist]);

  const register = useCallback(async (payload) => {
    const data = await api('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    persist(data.token, data.user);
    return data.user;
  }, [persist]);

  const loginWithGoogle = useCallback(async () => {
    if (!isFirebaseConfigured || !firebaseAuth) {
      throw new Error('Google sign-in is not configured. Add Firebase keys to client/.env');
    }
    const result = await signInWithPopup(firebaseAuth, googleAuthProvider);
    const idToken = await result.user.getIdToken();
    const data = await api('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ idToken }),
    });
    persist(data.token, data.user);
    return data.user;
  }, [persist]);

  const refreshUser = useCallback(async () => {
    const data = await api('/auth/me');
    setUser(data.user);
    return data.user;
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      loginWithGoogle,
      logout,
      refreshUser,
      isAdmin: user?.role === 'admin',
      googleAuthEnabled: isFirebaseConfigured,
    }),
    [user, loading, login, register, loginWithGoogle, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
