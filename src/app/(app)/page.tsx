'use client';

import Link from 'next/link';
import { useAuth } from '../../components/AuthProvider';

function Ph({ label, h = 160 }: { label: string; h?: number }) {
  return <div className="ph" style={{ height: h, width: '100%' }}>{label}</div>;
}

const EXPERIENCE = [
  { n: '01', t: 'Build', d: 'Create websites, apps, AI tools, and startup ideas.' },
  { n: '02', t: 'Compete', d: 'Participate in hackathons, startup competitions, and pitch events.' },
  { n: '03', t: 'Learn', d: 'Workshops, guest speakers, founders, engineers, and industry pros.' },
  { n: '04', t: 'Connect', d: 'Meet students who love building as much as you do.' },
  { n: '05', t: 'Launch', d: 'Take your projects beyond school and bring ideas to life.' },
  { n: '06', t: 'Lead', d: 'Lead teams, organize events, and help grow the community.' },
];

const JOURNEY = [
  { n: '01', t: 'Join', d: 'Become a member and get involved.' },
  { n: '02', t: 'Meet Your Team', d: 'Find your people and form a team.' },
  { n: '03', t: 'Learn', d: 'Build skills through workshops and mentorship.' },
  { n: '04', t: 'Build', d: 'Create, prototype, and iterate on your ideas.' },
  { n: '05', t: 'Compete', d: 'Join hackathons and pitch your projects.' },
  { n: '06', t: 'Launch', d: 'Ship your project and make an impact.' },
  { n: '07', t: 'Lead', d: 'Mentor others and shape the future of SFE.' },
];

const EVENTS = [
  { t: 'Fall Hackathon', d: 'Build your first project with a team.', date: 'Sep 20–21, 2025' },
  { t: 'Startup Sprint', d: 'Validate ideas and pitch your startup.', date: 'Oct 18 – Nov 8, 2025' },
  { t: 'Build Nights', d: 'Weekly collaborative coding sessions.', date: 'Every Thursday' },
  { t: 'Founder Talks', d: 'Learn from founders, engineers, and designers.', date: 'All semester' },
  { t: 'Demo Day', d: 'Present your work to judges.', date: 'May 2026' },
];

const STATS = [
  ['100+', 'Students'], ['15+', 'Projects'], ['7+', 'Hackathons'], ['10+', 'Guest Speakers'], ['1', 'Mission'],
];

const PARTNERS = ['GitHub', 'Vercel', 'Replit', 'Figma', 'MongoDB'];

const FAQ = [
  { q: 'Do I need experience?', a: 'No. Anyone willing to learn and build is welcome.' },
  { q: 'Do I need to know how to code?', a: 'No. We need designers, marketers, founders, developers, and more.' },
  { q: 'How much does membership cost?', a: 'Free for the school year.' },
  { q: 'Can beginners join?', a: 'Absolutely. We’ll help you learn and grow.' },
  { q: 'When do meetings happen?', a: 'Every other week after school.' },
];

export default function HomePage() {
  const { openAuth } = useAuth();
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="lp" id="top">
      {/* ── Hero ── */}
      <section className="lp-sec first">
        <div className="hero-grid">
          <div className="reveal">
            <h1 className="hero-head">Where students <span className="o">build</span> what&apos;s next.</h1>
            <p className="page-sub" style={{ marginTop: 20 }}>
              SFE Foundry is Alpharetta High School&apos;s community for founders, builders, and innovators. Build real
              projects, compete in hackathons, launch ideas, and meet ambitious students.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 26, flexWrap: 'wrap' }}>
              <button className="btn btn-blue" style={{ background: 'var(--orange)', boxShadow: '0 4px 14px rgba(242,101,34,.28)' }} onClick={() => openAuth('signup')}>&gt; Join SFE</button>
              <button className="btn btn-outline" onClick={() => scrollTo('about')}>&gt; Learn more</button>
            </div>
            <div className="mono-accent" style={{ marginTop: 22, fontSize: '.72rem', letterSpacing: '.1em', color: 'var(--muted)', textTransform: 'uppercase' }}>
              AHS <span style={{ color: 'var(--blue)' }}>•</span> Founded 2026 <span style={{ color: 'var(--blue)' }}>•</span> Student-led
            </div>
          </div>
          <div className="reveal"><Ph label="Photo — students building together" h={280} /></div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="lp-sec">
        <div className="sec-label">What is SFE?</div>
        <div className="hero-grid">
          <div>
            <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 'clamp(1.5rem,3vw,2.1rem)', lineHeight: 1.15 }}>
              Most clubs teach ideas.<br /><span style={{ color: 'var(--orange)' }} className="mono-accent">We help you build them. _</span>
            </h2>
          </div>
          <div>
            <p style={{ color: 'var(--muted)', fontSize: '.98rem', lineHeight: 1.7, marginBottom: 18 }}>
              Whether you&apos;re interested in coding, startups, AI, product design, or entrepreneurship, SFE Foundry
              gives you the people, projects, and opportunities to turn ideas into reality.
            </p>
            <Ph label="Photo — a workshop session" h={190} />
          </div>
        </div>
      </section>

      {/* ── Programs / Build Your Experience ── */}
      <section id="programs" className="lp-sec">
        <div className="sec-label">Build Your Experience</div>
        <div className="grid grid-3">
          {EXPERIENCE.map((c) => (
            <div key={c.n} className="exp-card reveal">
              <Ph label={`Photo — ${c.t}`} h={130} />
              <div style={{ padding: 18 }}>
                <div className="exp-num">{c.n}</div>
                <h3 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '.02em', margin: '4px 0 8px' }}>{c.t}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '.86rem', lineHeight: 1.6 }}>{c.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Your Journey (text only, no icons) ── */}
      <section className="lp-sec">
        <div className="sec-label">Your Journey</div>
        <div className="journey-grid">
          {JOURNEY.map((s) => (
            <div key={s.n} className="journey-step">
              <div className="jn">{s.n}</div>
              <h4>{s.t}</h4>
              <p style={{ color: 'var(--muted)', fontSize: '.82rem', lineHeight: 1.55 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Events / This Year ── */}
      <section id="events" className="lp-sec">
        <div className="sec-label">This Year</div>
        <div className="grid grid-3">
          {EVENTS.map((e) => (
            <div key={e.t} className="event-card reveal">
              <Ph label={`Photo — ${e.t}`} h={120} />
              <div style={{ padding: 16 }}>
                <h3 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '.95rem', textTransform: 'uppercase', letterSpacing: '.02em', marginBottom: 6 }}>{e.t}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '.84rem', lineHeight: 1.55, marginBottom: 10 }}>{e.d}</p>
                <div className="mono-accent" style={{ fontSize: '.7rem', color: 'var(--blue)', letterSpacing: '.06em', textTransform: 'uppercase' }}>{e.date}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Community / Built Together ── */}
      <section id="community" className="lp-sec">
        <div className="sec-label">Built Together</div>
        <p style={{ color: 'var(--muted)', fontSize: '.98rem', lineHeight: 1.7, maxWidth: 420, marginBottom: 22 }}>
          SFE Foundry is more than a club. It&apos;s a community of ambitious students building together.
        </p>
        <div className="stat-grid" style={{ marginBottom: 22 }}>
          {STATS.map(([n, l]) => (
            <div key={l} className="stat-cell">
              <div className="sn">{n}</div>
              <div className="st">{l}</div>
            </div>
          ))}
        </div>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))' }}>
          {[1, 2, 3, 4, 5].map((i) => <Ph key={i} label="Photo" h={110} />)}
        </div>
      </section>

      {/* ── Partners ── */}
      <section id="partners" className="lp-sec">
        <div className="sec-label">Partners</div>
        <div className="hero-grid">
          <p style={{ color: 'var(--muted)', fontSize: '.95rem', lineHeight: 1.7 }}>
            We&apos;re building relationships with local companies, founders, and organizations that believe in student innovation.
          </p>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: 12 }}>
            {PARTNERS.map((p) => <div key={p} className="partner-logo">{p}</div>)}
            <button className="partner-logo mono-accent" style={{ cursor: 'pointer', fontSize: '.7rem', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--muted)' }} onClick={() => openAuth('signup')}>Become a Partner</button>
          </div>
        </div>
      </section>

      {/* ── FAQ / Questions ── */}
      <section id="faq" className="lp-sec">
        <div className="sec-label">Questions</div>
        <div className="faq-grid">
          {FAQ.map((f) => (
            <div key={f.q} className="faq-item">
              <h4>{f.q}</h4>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="lp-sec">
        <div className="cta-band">
          <div>
            <h2 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 'clamp(1.5rem,3vw,2rem)', textTransform: 'uppercase' }}>Ready to build?</h2>
            <p style={{ color: 'var(--muted)', fontSize: '.92rem', lineHeight: 1.6, marginTop: 8, maxWidth: 420 }}>
              Join a community of students building projects, competing in hackathons, and creating what&apos;s next.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
            <button className="btn" style={{ background: 'var(--orange)', color: '#fff', padding: '13px 24px', borderRadius: 9, boxShadow: '0 4px 14px rgba(242,101,34,.3)' }} onClick={() => openAuth('signup')}>&gt; Join SFE Today</button>
            <span className="mono-accent" style={{ color: 'var(--orange)', fontSize: '.72rem', letterSpacing: '.08em', textTransform: 'uppercase' }}>Let&apos;s build. Together.</span>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="lp-foot">
        <div><span style={{ color: 'var(--blue)' }}>///</span>SFE FOUNDRY — Building the next generation of founders.</div>
        <div style={{ display: 'flex', gap: 16 }}>
          <Link href="/projects" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Projects</Link>
          <a href="mailto:sfefoundery@gmail.com" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Email</a>
          <span>© 2026 SFE Foundry</span>
        </div>
      </footer>
    </div>
  );
}
