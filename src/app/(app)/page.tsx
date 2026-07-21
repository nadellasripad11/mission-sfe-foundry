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
  const { user, ready, openAuth } = useAuth();

  useEffect(() => {
    if (ready && user) router.push('/dashboard');
  }, [ready, user, router]);

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
