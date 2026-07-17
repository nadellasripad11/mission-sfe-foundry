'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from './AuthProvider';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/programs', label: 'Programs' },
  { href: '/events', label: 'Events' },
  { href: '/community', label: 'Community' },
  { href: '/partners', label: 'Partners' },
  { href: '/faq', label: 'FAQ' },
];

const APP = [
  { href: '/projects', label: 'Projects' },
  { href: '/rate', label: 'Rate' },
  { href: '/my-projects', label: 'My Projects' },
];

const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/sfefoundry' },
  { label: 'Discord', href: 'https://discord.gg/3gjCGadM9a' },
  { label: 'Email', href: 'mailto:sfefoundery@gmail.com' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, openAuth, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <button className="hamburger" onClick={() => setOpen((o) => !o)} aria-label="Menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
      </button>
      {open && <div onClick={close} style={{ position: 'fixed', inset: 0, background: 'rgba(26,26,26,.35)', zIndex: 94 }} />}

      <aside className={`sidebar${open ? ' open' : ''}`}>
        <Link href="/" className="brand2" onClick={close}>
          <div className="brand-mark"><span className="sl">///</span>SFE</div>
          <div className="brand-foundry">FOUNDRY</div>
        </Link>

        <nav>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={close}
              className={`side-link${n.href === '/' && pathname === '/' ? ' active' : ''}`}>
              {n.label}
            </Link>
          ))}
        </nav>

        {user ? (
          <div style={{ margin: '10px 0 4px' }}>
            <div className="side-user">
              <div className="side-avatar">{(user.name?.trim()?.[0] || user.email[0] || '?').toUpperCase()}</div>
              <div className="side-user-meta">
                {user.name && <div className="side-user-name">{user.name}</div>}
                <div className="side-user-mail">{user.email}</div>
              </div>
            </div>
          </div>
        ) : (
          <button className="join-btn" onClick={() => { openAuth('signup'); close(); }}>&gt; Join SFE</button>
        )}

        <div className="side-divider" />
        <nav>
          {APP.map((n) => (
            <Link key={n.href} href={n.href} onClick={close}
              className={`side-link${pathname.startsWith(n.href) ? ' active' : ''}`}>
              {n.label}
            </Link>
          ))}
          {user && <button className="side-link" onClick={() => { signOut(); close(); }}>Sign out</button>}
        </nav>

        <div className="side-spacer" />

        <div className="side-divider" />
        {SOCIALS.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="side-social">
            <span style={{ color: 'var(--blue)' }}>▹</span>{s.label}
          </a>
        ))}

        <div className="side-divider" />
        <div className="side-meta">
          Build <span className="dot">◦</span><br />
          Launch <span className="dot">◦</span><br />
          Scale <span className="dot">◦</span>
        </div>
        <div className="side-meta" style={{ marginTop: 8 }}>v 1.0<br />AHS <span className="dot">•</span> 2026</div>
      </aside>
    </>
  );
}
