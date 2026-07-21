'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';
import SFELogo from './SFELogo';
import { IconRocket, IconBell, IconStar, IconCalendar, IconCart, IconCode, IconUser } from './SidebarIcons';

export default function Sidebar() {
  const pathname = usePathname();
  const { user, openAuth } = useAuth();

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + '/');

  const navItems = [
    { href: '/dashboard', label: 'Home', Icon: IconRocket },
    { href: '/display', label: 'Display', Icon: IconBell },
    { href: '/rate', label: 'Rate', Icon: IconStar },
    { href: '/mission', label: 'Missions', Icon: IconCalendar },
    { href: '/shop', label: 'Shop', Icon: IconCart },
    { href: '/resources', label: 'Resources', Icon: IconCode },
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
            <Icon size={24} />
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
