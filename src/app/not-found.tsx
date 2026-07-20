import Link from 'next/link';
import TopNav from '../components/TopNav';
import TechBackground from '../components/TechBackground';
import Footer from '../components/Footer';
import { IconArrow } from '../components/icons';

const LINKS = [
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/get-involved', label: 'Get Involved' },
  { href: '/contact', label: 'Contact' },
];

export default function NotFound() {
  return (
    <>
      <TechBackground />
      <TopNav />
      <main className="main-wrap">
        <div className="page">
          <section className="notfound">
            <div className="notfound-code">4<span className="o">0</span>4</div>
            <div className="eyebrow" style={{ justifyContent: 'center' }}>// Page not found</div>
            <h1 className="ph-title" style={{ textAlign: 'center' }}>This page doesn&apos;t exist.</h1>
            <p className="ph-lede" style={{ margin: '18px auto 0', textAlign: 'center' }}>
              The link may be broken or the page may have moved. Let&apos;s get you back on track.
            </p>
            <div className="notfound-actions">
              <Link href="/" className="btn-dark">Back Home <IconArrow size={18} /></Link>
            </div>
            <div className="notfound-links">
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="notfound-link">{l.label}</Link>
              ))}
            </div>
          </section>
          <Footer />
        </div>
      </main>
    </>
  );
}
