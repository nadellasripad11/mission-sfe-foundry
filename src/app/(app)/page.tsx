'use client';

import Link from 'next/link';
import { useAuth } from '../../components/AuthProvider';
import Placeholder from '../../components/Placeholder';
import Footer from '../../components/Footer';

const PILLS = [
  { t: 'Build', d: 'Websites, apps, AI tools, and startups.' },
  { t: 'Compete', d: 'Hackathons and pitch competitions.' },
  { t: 'Learn', d: 'Workshops with founders and engineers.' },
  { t: 'Connect', d: 'Meet students who love building.' },
];

const EVENTS = [
  { date: 'JUN 7', t: 'Idea Sprint', d: 'Turn a spark into a working prototype in one day.' },
  { date: 'JUN 28', t: 'Market Blueprint', d: 'Validate your idea and map out a real business model.' },
  { date: 'JUL 19', t: 'Founders Pitch', d: 'Pitch your project to judges and win prizes.' },
  { date: 'AUG 2', t: 'Growth Challenge', d: 'Scale your build and compete for the top spot.' },
];

const STATS = [
  ['100+', 'Students'], ['15+', 'Projects'], ['7+', 'Hackathons'], ['10+', 'Speakers'],
];

export default function HomePage() {
  const { openAuth } = useAuth();

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
            SFE Foundry is a student community for founders, builders, and innovators. Build real projects,
            compete in hackathons, and launch ideas that matter.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => openAuth('signup')}>&gt; Join SFE</button>
            <Link href="/about" className="btn-ghost">&gt; Learn more</Link>
          </div>
        </div>
        <div className="hero-visual"><Placeholder label="Photo — students building together" h="100%" /></div>
      </section>

      {/* ── Feature pills ── */}
      <section className="band">
        <div className="pill-row">
          {PILLS.map((p, i) => (
            <div key={p.t} className="pill">
              <div className="pill-num">0{i + 1}</div>
              <div className="pill-t">{p.t}</div>
              <div className="pill-d">{p.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Upcoming events preview ── */}
      <section className="band">
        <div className="band-head">
          <div>
            <div className="eyebrow">// Upcoming</div>
            <h2 className="band-title">This Year</h2>
          </div>
          <Link href="/events" className="band-link">All events &gt;</Link>
        </div>
        <div className="event-list">
          {EVENTS.map((e) => (
            <div key={e.t} className="event-row">
              <div className="event-date">{e.date}</div>
              <div className="event-body">
                <div className="event-name">{e.t}</div>
                <div className="event-desc">{e.d}</div>
              </div>
              <div className="event-arrow">&gt;</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What is SFE ── */}
      <section className="band">
        <div className="split">
          <div>
            <div className="eyebrow">// About</div>
            <h2 className="band-title">What is SFE Foundry?</h2>
            <p className="band-text">
              Most clubs teach ideas. We help you build them. Whether you&apos;re into coding, startups, AI, or
              design, SFE Foundry gives you the people, projects, and opportunities to turn ideas into reality.
            </p>
            <Link href="/about" className="btn-ghost" style={{ marginTop: 20 }}>&gt; Our mission</Link>
          </div>
          <div className="stat-strip">
            {STATS.map(([n, l]) => (
              <div key={l} className="stat-box">
                <div className="stat-box-n">{n}</div>
                <div className="stat-box-l">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="band">
        <div className="cta">
          <h2 className="cta-title">Ready to build?</h2>
          <p className="cta-text">Join a community of students shipping projects and competing in hackathons.</p>
          <button className="btn-primary" onClick={() => openAuth('signup')}>&gt; Join SFE Today</button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
