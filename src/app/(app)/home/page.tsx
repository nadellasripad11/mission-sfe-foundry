'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../../components/AuthProvider';

const APP_NAV = [
  { href: '/home', label: 'Home' },
  { href: '/display', label: 'Display' },
  { href: '/rate', label: 'Rate' },
  { href: '/mission', label: 'Missions' },
  { href: '/shop', label: 'Shop' },
  { href: '/resources', label: 'Resources' },
  { href: '/my-projects', label: 'My Projects' },
];

export default function AppHome() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', fontFamily: 'var(--mono)' }}>

      {/* Inner app nav */}
      <nav style={{ background: 'var(--white)', borderBottom: '1px solid var(--line)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', height: 52, display: 'flex', alignItems: 'center', gap: 4 }}>
          <Link href="/" style={{ fontFamily: 'Outfit', fontWeight: 900, fontStyle: 'italic', fontSize: '1rem', color: 'var(--ink)', textDecoration: 'none', marginRight: 20, flexShrink: 0 }}>
            <span style={{ color: 'var(--blue)' }}>///</span>SFE
          </Link>
          <div style={{ display: 'flex', gap: 2, flex: 1 }}>
            {APP_NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                style={{
                  padding: '6px 12px', borderRadius: 6, fontSize: '.72rem', letterSpacing: '.08em',
                  textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500,
                  color: pathname === n.href ? 'var(--orange)' : 'var(--ink-soft)',
                  background: pathname === n.href ? 'rgba(242,101,34,.08)' : 'none',
                  transition: 'color .15s, background .15s',
                }}
              >
                {n.label}
              </Link>
            ))}
          </div>
          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <div style={{ fontSize: '.72rem', color: 'var(--muted)', letterSpacing: '.04em' }}>{user.name || user.email}</div>
              <button onClick={signOut} style={{ fontSize: '.68rem', color: 'var(--muted)', background: 'none', border: '1px solid var(--line)', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', letterSpacing: '.06em', textTransform: 'uppercase' }}>
                Sign out
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Dashboard content */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '.7rem', letterSpacing: '.14em', color: 'var(--orange)', textTransform: 'uppercase', marginBottom: 8 }}>// Dashboard</div>
          <h1 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 'clamp(1.8rem,3vw,2.4rem)', color: 'var(--ink)', marginBottom: 8 }}>
            Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}.
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '.9rem', lineHeight: 1.6 }}>Here&apos;s what&apos;s happening at SFE Foundry.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
          {APP_NAV.slice(1).map((n) => (
            <Link
              key={n.href}
              href={n.href}
              style={{
                display: 'block', padding: '22px 20px', background: 'var(--white)',
                border: '1px solid var(--line)', borderRadius: 12, textDecoration: 'none',
                transition: 'transform .18s, box-shadow .18s, border-color .18s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 24px rgba(0,0,0,.08)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--orange)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = ''; (e.currentTarget as HTMLAnchorElement).style.boxShadow = ''; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--line)'; }}
            >
              <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1rem', color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '.02em', marginBottom: 4 }}>{n.label}</div>
              <div style={{ color: 'var(--orange)', fontSize: '.7rem', letterSpacing: '.08em' }}>&gt; Open</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
