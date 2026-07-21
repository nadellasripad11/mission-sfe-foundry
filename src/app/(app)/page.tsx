'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../components/AuthProvider';
import Footer from '../../components/Footer';
import { LogoHero3D, IconBulb, IconCode, IconTrophy, IconUsers, IconArrow } from '../../components/icons';

const FEATURES = [
  { Icon: IconBulb, t: 'Entrepreneurship', d: 'Learn, launch, and lead with real-world impact.' },
  { Icon: IconCode, t: 'Technology', d: 'Use AI and modern tools to build smarter solutions.' },
  { Icon: IconTrophy, t: 'Competition', d: 'Compete in structured challenges and earn Seed Points.' },
  { Icon: IconUsers, t: 'Community', d: 'Collaborate with driven students and mentors who inspire you.' },
];

export default function HomePage() {
  const router = useRouter();
  const { user, ready, openAuth, configError } = useAuth();

  useEffect(() => {
    if (ready && user) {
      router.push('/dashboard');
    }
  }, [ready, user?.id]);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  // Don't render anything if user is redirecting
  if (ready && user) {
    return null;
  }

  // Show configuration error if Supabase isn't set up
  if (configError) {
    return (
      <div className="page">
        <section className="hero">
          <div className="hero-inner" style={{ maxWidth: '600px', textAlign: 'center' }}>
            <h1 className="hero-title" style={{ color: '#E74C3C' }}>⚙️ Configuration Required</h1>
            <p className="hero-lede" style={{ color: '#C0392B' }}>
              {configError}
            </p>
            <div style={{ background: '#FADBD8', border: '1px solid #E74C3C', borderRadius: '8px', padding: '20px', marginTop: '20px', textAlign: 'left', fontFamily: 'var(--mono)', fontSize: '0.9rem' }}>
              <p style={{ marginBottom: '10px' }}>Create a file called <code style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px' }}>.env.local</code> in the project root:</p>
              <pre style={{ background: '#fff', padding: '12px', borderRadius: '4px', overflow: 'auto' }}>
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
              </pre>
              <p style={{ marginTop: '10px', fontSize: '0.85rem' }}>Then restart the dev server.</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-eyebrow">// Student innovation · Alpharetta High School</div>
          <h1 className="hero-title">BUILD IDEAS.<br />COMPETE.<br /><span className="o">CREATE IMPACT.</span></h1>
          <p className="hero-lede">
            SFE Foundry is Alpharetta High School&apos;s entrepreneurship and technology organization. We help students
            turn ideas into impact through competitions, workshops, and a community of builders.
          </p>
          <div className="hero-actions">
            <button className="btn-dark" onClick={() => openAuth('signup')}>Join SFE <IconArrow size={18} /></button>
            <Link href="/about" className="btn-ghost">Learn More</Link>
          </div>
        </div>
        <div className="hero-visual"><LogoHero3D size={420} /></div>
      </section>

      {/* ── Feature columns ── */}
      <section className="feature-strip">
        {FEATURES.map(({ Icon, t, d }) => (
          <div key={t} className="feature-col">
            <span className="feature-ic"><Icon size={30} /></span>
            <div className="feature-t">{t}</div>
            <div className="feature-d">{d}</div>
          </div>
        ))}
      </section>

      {/* ── CTA ── */}
      <section className="band">
        <div className="cta">
          <h2 className="cta-title">Ready to build?</h2>
          <p className="cta-text">Join a community of students shipping projects and competing in hackathons.</p>
          <button className="btn-primary" onClick={() => openAuth('signup')}>Join SFE Today <IconArrow size={18} /></button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
