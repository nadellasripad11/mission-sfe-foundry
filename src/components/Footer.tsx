import Link from 'next/link';
import { LogoMark } from './Logo';

const LINKS = [
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/community', label: 'Community' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/get-involved', label: 'Get Involved' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/sfefoundry' },
  { label: 'Discord', href: 'https://discord.gg/3gjCGadM9a' },
  { label: 'Email', href: 'mailto:sfefoundryteam@gmail.com' },
];

export default function Footer() {
  return (
    <footer className="site-foot">
      <div className="site-foot-top">
        <div className="site-foot-brand">
          <LogoMark size={26} />
          <div>
            <div className="site-foot-name">SFE FOUNDRY</div>
            <div className="site-foot-tag">Building the next generation of founders.</div>
          </div>
        </div>
        <div className="site-foot-cols">
          <div className="site-foot-col">
            <div className="site-foot-h">Explore</div>
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href}>{l.label}</Link>
            ))}
          </div>
          <div className="site-foot-col">
            <div className="site-foot-h">Connect</div>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="site-foot-bottom">
        <span>© 2026 SFE Foundry — Alpharetta High School</span>
        <span className="site-foot-legal">
          <Link href="/privacy">Privacy</Link>
          <span style={{ color: 'var(--muted)' }}>·</span>
          <Link href="/terms">Terms</Link>
          <span style={{ color: 'var(--muted)' }}>·</span>
          <Link href="/cookies">Cookies</Link>
        </span>
      </div>
    </footer>
  );
}
