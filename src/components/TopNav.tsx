'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from './AuthProvider';
import Logo, { LogoMark } from './Logo';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/community', label: 'Community' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/get-involved', label: 'Get Involved' },
  { href: '/faq', label: 'FAQ' },
];

const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/sfefoundry' },
  { label: 'Discord', href: 'https://discord.gg/3gjCGadM9a' },
  { label: 'Email', href: 'mailto:sfefoundery@gmail.com' },
];

export default function TopNav() {
  const pathname = usePathname();
  const { user, openAuth, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <header className="topbar">
        <Logo onClick={close} />
        <button className="nav-toggle" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </header>

      {open && <div className="nav-scrim" onClick={close} />}

      <aside className={`drawer${open ? ' open' : ''}`}>
        <div className="drawer-head">
          <div className="logo-lockup">
            <LogoMark size={24} />
            <span className="logo-text">
              <span className="logo-name">SFE</span>
              <span className="logo-sub">FOUNDRY</span>
            </span>
          </div>
          <button className="drawer-x" onClick={close} aria-label="Close menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        <nav className="drawer-nav">
          {NAV.map((n) => {
            const active = pathname === n.href;
            return (
              <Link key={n.href} href={n.href} onClick={close} className={`drawer-link${active ? ' active' : ''}`}>
                <span className="drawer-link-mark">/</span>{n.label}
              </Link>
            );
          })}
        </nav>

        <div className="drawer-cta">
          {user ? (
            <>
              <div className="drawer-user">
                <div className="drawer-avatar">{(user.name?.trim()?.[0] || user.email[0] || '?').toUpperCase()}</div>
                <div className="drawer-user-meta">
                  {user.name && <div className="drawer-user-name">{user.name}</div>}
                  <div className="drawer-user-mail">{user.email}</div>
                </div>
              </div>
              <Link href="/home" onClick={close} className="drawer-btn">&gt; Go to App</Link>
              <button className="drawer-btn ghost" onClick={() => { signOut(); close(); }}>Sign out</button>
            </>
          ) : (
            <button className="drawer-btn" onClick={() => { openAuth('signup'); close(); }}>&gt; Join SFE</button>
          )}
        </div>

        <div className="drawer-connect">
          <div className="drawer-label">Connect</div>
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="drawer-social">
              <span style={{ color: 'var(--blue)' }}>▹</span>{s.label}
            </a>
          ))}
        </div>

        <div className="drawer-foot">v1.0 <span style={{ color: 'var(--blue)' }}>•</span> AHS <span style={{ color: 'var(--blue)' }}>•</span> 2026</div>
      </aside>
    </>
  );
}
