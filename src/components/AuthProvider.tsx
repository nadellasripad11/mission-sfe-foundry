'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import ChatWidget from './ChatWidget';

export type AppUser = { id: string; email: string; name: string | null };
type AuthMode = 'signup' | 'signin';

interface AuthCtx {
  user: AppUser | null;
  ready: boolean;
  openAuth: (mode?: AuthMode) => void;
  signOut: () => Promise<void>;
}

const Ctx = createContext<AuthCtx>({ user: null, ready: false, openAuth: () => {}, signOut: async () => {} });
export const useAuth = () => useContext(Ctx);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [ready, setReady] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [msgOk, setMsgOk] = useState(false);

  useEffect(() => {
    let mounted = true;
    const toUser = (su: any): AppUser | null =>
      su ? { id: su.id, email: su.email ?? '', name: su.user_metadata?.name ?? su.user_metadata?.full_name ?? null } : null;

    const initSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (mounted) {
          if (error) {
            console.error('Session retrieval error:', error);
          }
          setUser(toUser(data?.session?.user));
          setReady(true);
        }
      } catch (err) {
        console.error('Session initialization error:', err);
        if (mounted) setReady(true);
      }
    };

    initSession();

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (mounted) {
        const u = toUser(session?.user);
        setUser(u);
        if (u) setShowModal(false);
      }
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const openAuth = (mode: AuthMode = 'signup') => { setAuthMode(mode); setMessage(''); setShowModal(true); };
  const signOut = async () => { await supabase.auth.signOut(); setUser(null); };

  const handleOAuth = async () => {
    setMessage('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined },
    });
    if (error) { setMsgOk(false); setMessage(error.message); }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (authMode === 'signup' && !name)) return;
    setLoading(true); setMessage('');
    const cleanEmail = email.trim().toLowerCase();
    try {
      if (authMode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail, password,
          options: { data: { name }, emailRedirectTo: typeof window !== 'undefined' ? window.location.origin : undefined },
        });
        if (error) {
          setMsgOk(false);
          setMessage(/registered|already/i.test(error.message) ? 'This email is already registered. Try signing in.' : error.message);
        } else if (data.user && data.user.identities && data.user.identities.length === 0) {
          setMsgOk(false); setMessage('This email is already registered. Try signing in.');
        } else {
          setMsgOk(true);
          setMessage(data.session ? 'Account created! You are signed in.' : 'Account created! Check your email for a verification link.');
          setEmail(''); setPassword(''); setName('');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: cleanEmail, password });
        if (error) {
          setMsgOk(false);
          setMessage(/not confirmed/i.test(error.message) ? 'Please verify your email first — check your inbox.' : 'Incorrect email or password.');
        } else { setMsgOk(true); setMessage('Signed in!'); setEmail(''); setPassword(''); }
      }
    } catch { setMsgOk(false); setMessage('Failed to connect. Try again.'); }
    finally { setLoading(false); }
  };

  return (
    <Ctx.Provider value={{ user, ready, openAuth, signOut }}>
      {children}

      {showModal && (
        <div className="overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-x" onClick={() => setShowModal(false)} aria-label="Close">×</button>
            <div className="mtabs">
              <button className={`mtab${authMode === 'signup' ? ' on' : ''}`} onClick={() => { setAuthMode('signup'); setMessage(''); }}>Sign Up</button>
              <button className={`mtab${authMode === 'signin' ? ' on' : ''}`} onClick={() => { setAuthMode('signin'); setMessage(''); }}>Sign In</button>
            </div>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ fontWeight: 800, fontSize: '1.4rem', color: 'var(--ink)', marginBottom: 6 }}>
                {authMode === 'signup' ? 'Create your account' : 'Welcome back'}
              </h2>
              <p style={{ color: 'var(--faint)', fontSize: '.875rem', lineHeight: 1.55 }}>
                {authMode === 'signup' ? 'Join the SFE Foundry community.' : 'Sign in to your SFE Foundry account.'}
              </p>
            </div>

            {message && <div className={msgOk ? 'msg-ok' : 'msg-err'}>{message}</div>}

            <button type="button" className="oauth-btn" onClick={handleOAuth} disabled={loading}>
              <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.71-1.57 2.68-3.89 2.68-6.62z"/><path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z"/><path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"/></svg>
              Continue with Google
            </button>
            <div className="divider"><span>or</span></div>

            <form onSubmit={submit}>
              {authMode === 'signup' && (
                <input className="input" type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required disabled={loading} />
              )}
              <input className="input" type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
              <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} minLength={6} autoComplete={authMode === 'signup' ? 'new-password' : 'current-password'} />
              {authMode === 'signup' && <div className="hint">At least 6 characters.</div>}
              <button type="submit" className="btn btn-solid btn-block" style={{ padding: 13, marginTop: 4 }} disabled={loading || !email || !password || (authMode === 'signup' && !name)}>
                {loading ? 'Please wait…' : (authMode === 'signup' ? 'Sign Up' : 'Sign In')}
              </button>
            </form>
          </div>
        </div>
      )}

      <ChatWidget />
    </Ctx.Provider>
  );
}
