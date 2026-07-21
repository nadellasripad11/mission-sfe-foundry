'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { LogoMark } from './Logo';

export default function Sidebar() {
  const pathname = usePathname();
  const { user, openAuth } = useAuth();

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + '/');

  const navItems = [
    { href: '/dashboard', icon: IconHome, label: 'Home', emoji: '🚀' },
    { href: '/display', icon: IconEye, label: 'Display', emoji: '👁️' },
    { href: '/rate', icon: IconTrophy, label: 'Rate', emoji: '⭐' },
    { href: '/mission', icon: IconTarget, label: 'Missions', emoji: '📋' },
    { href: '/shop', icon: IconShoppingCart, label: 'Shop', emoji: '🛒' },
    { href: '/resources', icon: IconCode, label: 'Resources', emoji: '💻' },
    { href: '/my-projects', icon: IconUser, label: 'My Projects', emoji: '👤' },
  ];

  return (
    <aside className="sidebar">
      {/* Logo */}
      <Link href="/dashboard" className="sidebar-logo">
        <LogoMark />
      </Link>

      {/* Nav items */}
      <nav className="sidebar-nav">
        {navItems.map(({ href, label, emoji }) => (
          <Link
            key={href}
            href={href}
            className={`sidebar-link ${isActive(href) ? 'active' : ''}`}
            title={label}
          >
            <span style={{ fontSize: '1.3rem', display: 'flex', alignItems: 'center' }}>{emoji}</span>
            <span className="sidebar-label">{label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer with user */}
      <div className="sidebar-footer">
        {user ? (
          <div className="sidebar-user">
            <div className="user-avatar">{user.email?.[0]?.toUpperCase() || 'U'}</div>
            <div className="user-info">
              <div className="user-name">{user.name || 'User'}</div>
              <div className="user-email">{user.email}</div>
            </div>
          </div>
        ) : (
          <button className="btn-sm-primary" onClick={() => openAuth('signin')}>
            Sign In
          </button>
        )}
      </div>
    </aside>
  );
}
