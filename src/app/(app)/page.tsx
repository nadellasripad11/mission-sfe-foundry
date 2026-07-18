'use client';

import Link from 'next/link';
import { useAuth } from '../../components/AuthProvider';
import Placeholder from '../../components/Placeholder';
import Footer from '../../components/Footer';
import { EVENTS } from '../../lib/events';
import {
  LogoHero, IconBulb, IconCode, IconTrophy, IconUsers, IconArrow,
  IconLayers, IconInfinity,
} from '../../components/icons';

const FEATURES = [
  { Icon: IconBulb, t: 'Entrepreneurship', d: 'Learn, launch, and lead with real-world impact.' },
  { Icon: IconCode, t: 'Technology', d: 'Use AI and modern tools to build smarter solutions.' },
  { Icon: IconTrophy, t: 'Competition', d: 'Compete in structured challenges and earn Seed Points.' },
  { Icon: IconUsers, t: 'Community', d: 'Collaborate with driven students and mentors who inspire you.' },
];

const STATS = [
  { Icon: IconLayers, n: '3', l: 'Pillars' },
  { Icon: IconTrophy, n: '7+', l: 'Competitions' },
  { Icon: IconUsers, n: '100+', l: 'Members' },
  { Icon: IconInfinity, n: '∞', l: 'Opportunities' },
];

export default function HomePage() {
  const { openAuth } = useAuth();

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
        <div className="hero-visual"><LogoHero size={380} /></div>
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

      {/* ── Upcoming events ── */}
      <section className="band">
        <div className="band-head">
          <h2 className="band-title">Upcoming Events</h2>
          <Link href="/events" className="band-link">View all events <IconArrow size={15} /></Link>
        </div>
        <div className="ev-card-grid">
          {EVENTS.map((e) => (
            <article key={e.title} className="ev-card">
              <div className="ev-card-top">
                <div className="ev-date"><span className="ev-mon">{e.mon}</span><span className="ev-day">{e.day}</span></div>
                <div>
                  <div className="ev-card-t">{e.title}</div>
                  <div className="ev-card-d">{e.desc}</div>
                </div>
              </div>
              <div className="ev-card-meta"><span>{e.time}</span><span>{e.place}</span></div>
              <Placeholder label={`Photo — ${e.title}`} h={150} />
            </article>
          ))}
        </div>
      </section>

      {/* ── What is SFE ── */}
      <section className="band">
        <div className="split">
          <div>
            <h2 className="band-title">What is SFE Foundry?</h2>
            <p className="band-text">
              We&apos;re a student-run organization that brings together entrepreneurs, builders, and problem solvers.
              Through competitions, workshops, and projects, we create a space where students can build the future—together.
            </p>
            <Link href="/about" className="btn-dark" style={{ marginTop: 24 }}>Our Story <IconArrow size={18} /></Link>
            <div style={{ marginTop: 26 }}><Placeholder label="Photo — the SFE Foundry team" h={210} /></div>
          </div>
          <div className="stat-rows">
            {STATS.map(({ Icon, n, l }) => (
              <div key={l} className="stat-row-item">
                <span className="stat-row-ic"><Icon size={26} /></span>
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
        <div className="cta dark">
          <h2 className="cta-title light">Ready to build?</h2>
          <p className="cta-text light">Join a community of students shipping projects and competing in hackathons.</p>
          <button className="btn-primary" onClick={() => openAuth('signup')}>Join SFE Today <IconArrow size={18} /></button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
