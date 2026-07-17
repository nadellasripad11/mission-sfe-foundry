'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';

const NAV = [
  { href: '/#about', label: 'About' },
  { href: '/#programs', label: 'Programs' },
  { href: '/#events', label: 'Events' },
  { href: '/#community', label: 'Community' },
  { href: '/projects', label: 'Projects' },
  { href: '/#faq', label: 'FAQ' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, openAuth, signOut } = useAuth();

  return (
    <header className="topnav">
      <div className="topnav-inner">
        <Link href="/" className="brand2" style={{ textDecoration: 'none' }}>
          <div className="brand-mark"><span className="sl">///</span>SFE</div>
          <div className="brand-foundry">FOUNDRY</div>
        </Link>

        <nav className="topnav-links">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`topnav-link${pathname === n.href ? ' active' : ''}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="topnav-actions">
          {user ? (
            <>
              <div className="side-avatar" style={{ width: 32, height: 32, fontSize: '.8rem' }}>
                {(user.name?.trim()?.[0] || user.email[0] || '?').toUpperCase()}
              </div>
              <button className="topnav-link" onClick={signOut} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                Sign out
              </button>
            </>
          ) : (
            <button className="join-btn" style={{ width: 'auto', padding: '8px 16px', margin: 0 }} onClick={() => openAuth('signup')}>
              &gt; Join SFE
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
