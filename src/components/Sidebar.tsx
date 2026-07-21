'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { LogoMark } from './Logo';
import { IconHome, IconEye, IconTrophy, IconTarget, IconShoppingCart, IconCode, IconUsers } from './icons';

export default function Sidebar() {
  const pathname = usePathname();
  const { user, openAuth } = useAuth();

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + '/');

  const navItems = [
    { href: '/dashboard', icon: IconHome, label: 'Home' },
    { href: '/display', icon: IconEye, label: 'Display' },
    { href: '/rate', icon: IconTrophy, label: 'Rate' },
    { href: '/mission', icon: IconTarget, label: 'Missions' },
    { href: '/shop', icon: IconShoppingCart, label: 'Shop' },
    { href: '/resources', icon: IconCode, label: 'Resources' },
    { href: '/my-projects', icon: IconUsers, label: 'My Projects' },
  ];

  return (
    <aside className="sidebar">
      {/* Logo */}
      <Link href="/dashboard" className="sidebar-logo">
        <LogoMark />
      </Link>

      {/* Nav items */}
      <nav className="sidebar-nav">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`sidebar-link ${isActive(href) ? 'active' : ''}`}
            title={label}
          >
            <Icon size={20} />
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
