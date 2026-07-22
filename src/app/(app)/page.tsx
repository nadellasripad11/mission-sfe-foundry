'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../components/AuthProvider';
import Footer from '../../components/Footer';
import {
  LogoHero3D, IconBulb, IconCode, IconTrophy, IconUsers, IconArrow,
  IconLayers, IconInfinity,
} from '../../components/icons';

const FEATURES = [
  { Icon: IconBulb,   t: 'Entrepreneurship', d: 'Learn, build, and launch with real-world impact.' },
  { Icon: IconCode,   t: 'Technology',        d: 'Use AI and modern tools to build smarter solutions.' },
  { Icon: IconTrophy, t: 'Competition',       d: 'Compete in structured challenges and earn Seed Points.' },
  { Icon: IconUsers,  t: 'Community',         d: 'Collaborate with driven students and mentors who inspire you.' },
];

const EVENTS = [
  { mon: 'Jun', day: '7',  title: 'Idea Sprint',       desc: 'Turn a problem into a validated startup idea.', time: '9:00 AM – 1:00 PM', place: 'AHS Room TBD' },
  { mon: 'Jun', day: '28', title: 'Market Blueprint',  desc: 'Research your market and build a winning strategy.', time: '1:00 – 4:00 PM', place: 'AHS Room TBD' },
  { mon: 'Jul', day: '19', title: 'Founders Pitch',    desc: 'Pitch your solution to judges and win Seed Points.', time: '6:00 – 9:00 PM', place: 'AHS Auditorium' },
  { mon: 'Aug', day: '2',  title: 'Growth Challenge',  desc: 'Grow your product and user base with limited resources.', time: '1:00 – 5:00 PM', place: 'AHS Room TBD' },
];

const STATS = [
  { Icon: IconLayers,   n: '3',    l: 'Pillars' },
  { Icon: IconBulb,     n: '7+',   l: 'Competitions' },
  { Icon: IconUsers,    n: '100+', l: 'Members' },
  { Icon: IconInfinity, n: '∞',    l: 'Opportunities' },
];

export default function HomePage() {
  const router = useRouter();
  const { user, ready, openAuth, configError } = useAuth();

  useEffect(() => {
    if (ready && user) {
      router.replace('/dashboard');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, user?.id]);

  if (!ready || user) return null;

  if (configError) {
    return (
      <div className="page">
        <section className="hero">
          <div className="hero-inner" style={{ maxWidth: '600px', textAlign: 'center' }}>
            <h1 className="hero-title" style={{ color: '#E74C3C' }}>Configuration Required</h1>
            <p className="hero-lede" style={{ color: '#C0392B' }}>{configError}</p>
            <div style={{ background: '#FADBD8', border: '1px solid #E74C3C', borderRadius: '8px', padding: '20px', marginTop: '20px', textAlign: 'left', fontFamily: 'var(--mono)', fontSize: '0.9rem' }}>
              <p style={{ marginBottom: '10px' }}>Create <code style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px' }}>.env.local</code> in the project root with your Supabase keys, then restart.</p>
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
          <h1 className="hero-title">
            BUILD IDEAS.<br />COMPETE.<br /><span className="o">CREATE IMPACT.</span>
          </h1>
          <p className="hero-lede">
            SFE Foundry is Alpharetta High School&apos;s entrepreneurship and technology organization.
            We help students build real solutions, compete in startup-style challenges, and grow together.
          </p>
          <div className="hero-actions">
            <button className="btn-dark" onClick={() => openAuth('signup')}>JOIN SFE <IconArrow size={18} /></button>
            <Link href="/about" className="btn-ghost">LEARN MORE</Link>
          </div>
        </div>
        <div className="hero-visual"><LogoHero3D size={380} /></div>
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

      {/* ── Upcoming Events ── */}
      <section className="band">
        <div className="band-head">
          <h2 className="band-title">Upcoming Events</h2>
          <Link href="/events" className="band-link">View all events <IconArrow size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /></Link>
        </div>
        <div className="ev-card-grid">
          {EVENTS.map((e) => (
            <div key={e.title} className="ev-card">
              <div className="ev-card-top">
                <div className="ev-home-date">
                  <span className="ev-home-mon">{e.mon}</span>
                  <span className="ev-home-day">{e.day}</span>
                </div>
                <div>
                  <div className="ev-card-t">{e.title}</div>
                  <div className="ev-card-d">{e.desc}</div>
                </div>
              </div>
              <div className="ev-card-meta">
                <span>{e.time}</span>
                <span>{e.place}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What is SFE Foundry ── */}
      <section className="band">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
          {/* Left */}
          <div>
            <h2 className="band-title" style={{ marginBottom: 16, textTransform: 'uppercase' }}>What is SFE Foundry?</h2>
            <p className="band-text" style={{ marginTop: 0 }}>
              We&apos;re a student-run organization that brings together entrepreneurs, builders, and problem solvers.
              Through competitions, workshops, and projects, we create a space where students can build the future—together.
            </p>
            <div className="ph" style={{ marginTop: 24, height: 260, borderRadius: 14, fontSize: '.8rem' }}>
              Team photo coming soon
            </div>
          </div>

          {/* Right — stats */}
          <div className="stat-rows">
            {STATS.map(({ Icon, n, l }) => (
              <div key={l} className="stat-row-item">
                <div className="stat-row-ic"><Icon size={22} /></div>
                <div>
                  <div className="stat-row-n">{n}</div>
                  <div className="stat-row-l">{l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="band">
        <div className="cta">
          <h2 className="cta-title">Ready to Build?</h2>
          <p className="cta-text">Join a community of students shipping projects and competing in hackathons.</p>
          <button className="btn-primary" onClick={() => openAuth('signup')}>JOIN SFE TODAY <IconArrow size={18} /></button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
