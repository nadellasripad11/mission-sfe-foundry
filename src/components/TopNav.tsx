'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from './AuthProvider';
import Logo, { LogoMark } from './Logo';
import {
  IconHome, IconInfo, IconCalendar, IconUsers, IconTrophy, IconMegaphone, IconHelp,
  IconArrow, IconClose, IconMenu, IconDiscord, IconInstagram, IconMail,
} from './icons';

const NAV = [
  { href: '/', label: 'Home', Icon: IconHome },
  { href: '/about', label: 'About', Icon: IconInfo },
  { href: '/events', label: 'Events', Icon: IconCalendar },
  { href: '/community', label: 'Community', Icon: IconUsers },
  { href: '/sponsors', label: 'Sponsors', Icon: IconTrophy },
  { href: '/get-involved', label: 'Get Involved', Icon: IconMegaphone },
  { href: '/faq', label: 'FAQ', Icon: IconHelp },
  { href: '/contact', label: 'Contact', Icon: IconMail },
];

const SOCIALS = [
  { label: 'Discord', sub: 'discord.gg/3gjCGadM9a', href: 'https://discord.gg/3gjCGadM9a', Icon: IconDiscord, color: '#5865F2' },
  { label: 'Instagram', sub: '@sfefoundry', href: 'https://www.instagram.com/sfefoundry', Icon: IconInstagram, color: '#E1306C' },
  { label: 'Email', sub: 'sfefoundery@gmail.com', href: 'mailto:sfefoundery@gmail.com', Icon: IconMail, color: 'var(--orange)' },
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
          <IconMenu size={20} />
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
          <button className="drawer-x" onClick={close} aria-label="Close menu"><IconClose size={20} /></button>
        </div>

        <nav className="drawer-nav">
          {NAV.map(({ href, label, Icon }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} onClick={close} className={`drawer-link${active ? ' active' : ''}`}>
                <Icon size={19} className="drawer-link-ic" />{label}
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
              <Link href="/home" onClick={close} className="drawer-btn">Go to App <IconArrow size={17} /></Link>
              <button className="drawer-btn ghost" onClick={() => { signOut(); close(); }}>Sign out</button>
            </>
          ) : (
            <button className="drawer-btn" onClick={() => { openAuth('signup'); close(); }}>Join SFE <IconArrow size={17} /></button>
          )}
        </div>

        <div className="drawer-connect">
          <div className="drawer-label">Connect with us</div>
          {SOCIALS.map(({ label, sub, href, Icon, color }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="drawer-social">
              <span className="drawer-social-ic" style={{ color }}><Icon size={20} /></span>
              <span className="drawer-social-meta">
                <span className="drawer-social-name">{label}</span>
                <span className="drawer-social-sub">{sub}</span>
              </span>
            </a>
          ))}
        </div>

        <div className="drawer-foot">v1.0 <span style={{ color: 'var(--blue)' }}>•</span> AHS <span style={{ color: 'var(--blue)' }}>•</span> 2026</div>
      </aside>
    </>
  );
}
