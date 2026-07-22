'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';
import SFELogo from './SFELogo';
import { IconRocket, IconBell, IconRate, IconCalendar, IconCart, IconResources, IconUser } from './SidebarIcons';
import { useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const { user, openAuth, signOut } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + '/');

  const navItems = [
    { href: '/dashboard', label: 'Home', Icon: IconRocket },
    { href: '/display', label: 'Display', Icon: IconBell },
    { href: '/rate', label: 'Rate', Icon: IconRate },
    { href: '/mission', label: 'Missions', Icon: IconCalendar },
    { href: '/shop', label: 'Shop', Icon: IconCart },
    { href: '/resources', label: 'Resources', Icon: IconResources },
    { href: '/my-projects', label: 'My Projects', Icon: IconUser },
  ];

  return (
    <aside className="sidebar">
      {/* Logo */}
      <Link href="/dashboard" className="sidebar-logo">
        <SFELogo size={100} />
      </Link>

      {/* Nav items */}
      <nav className="sidebar-nav">
        {navItems.map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            className={`sidebar-link ${isActive(href) ? 'active' : ''}`}
            title={label}
          >
            <span className="sidebar-icon"><Icon size={26} /></span>
            <span className="sidebar-label">{label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer with user */}
      <div className="sidebar-footer">
        {user ? (
          <div className="sidebar-user-profile">
            <div className="sidebar-user-main" onClick={() => setShowMenu(!showMenu)}>
              <div className="user-avatar">{user.email?.[0]?.toUpperCase() || 'U'}</div>
              <div className="user-info">
                <div className="user-name">{user.name || 'User'}</div>
                <div className="user-email">@{user.name?.toLowerCase().replace(/\s+/g, '') || user.email.split('@')[0]}</div>
              </div>
            </div>
            <div className="sidebar-user-actions">
              <button type="button" className="sidebar-action-btn" title="Settings" aria-label="Settings">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24" />
                </svg>
              </button>
              <button type="button" className="sidebar-action-btn danger" title="Sign Out" aria-label="Sign Out" onClick={signOut}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                </svg>
              </button>
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
