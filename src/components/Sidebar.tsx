'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';

const NAV = [
  { href: '/', label: 'Home', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></svg>
  ) },
  { href: '/projects', label: 'Projects', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M8 4v5" /></svg>
  ) },
  { href: '/rate', label: 'Rate', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z" /></svg>
  ) },
  { href: '/resources', label: 'Resources', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5a2 2 0 0 1 2-2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" /><path d="M14 3v5h5" /></svg>
  ) },
  { href: '/my-projects', label: 'My Projects', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0 1 12 0v1" /></svg>
  ) },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, openAuth, signOut } = useAuth();

  return (
    <aside className="sidebar">
      <Link href="/" className="brand-row">
        <img src="/logo.svg" alt="" />
        <span>SFE Foundry</span>
      </Link>

      <nav>
        {NAV.map((n) => {
          const active = n.href === '/' ? pathname === '/' : pathname.startsWith(n.href);
          return (
            <Link key={n.href} href={n.href} className={`side-link${active ? ' active' : ''}`}>
              {n.icon}{n.label}
            </Link>
          );
        })}
      </nav>

      <div className="side-spacer" />

      <div className="side-auth">
        {user ? (
          <>
            <div className="side-user">
              <div className="side-avatar">{(user.name?.trim()?.[0] || user.email[0] || '?').toUpperCase()}</div>
              <div className="side-user-meta">
                {user.name && <div className="side-user-name">{user.name}</div>}
                <div className="side-user-mail">{user.email}</div>
              </div>
            </div>
            <button className="side-link" style={{ marginTop: 4 }} onClick={signOut}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5M21 12H9" /></svg>
              Sign out
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button className="btn btn-solid btn-block btn-sm" onClick={() => openAuth('signup')}>Sign Up</button>
            <button className="side-link" style={{ justifyContent: 'center' }} onClick={() => openAuth('signin')}>Sign In</button>
          </div>
        )}
      </div>
    </aside>
  );
}
