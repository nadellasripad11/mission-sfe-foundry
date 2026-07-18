'use client';

import Link from 'next/link';
import Placeholder from '../../../components/Placeholder';
import Footer from '../../../components/Footer';

const JOURNEY = [
  { n: '01', t: 'Join', d: 'Become a member and get involved.' },
  { n: '02', t: 'Meet Your Team', d: 'Find your people and form a team.' },
  { n: '03', t: 'Learn', d: 'Build skills through workshops and mentorship.' },
  { n: '04', t: 'Build', d: 'Create, prototype, and iterate on your ideas.' },
  { n: '05', t: 'Compete', d: 'Join hackathons and pitch your projects.' },
  { n: '06', t: 'Launch', d: 'Ship your project and make an impact.' },
];

export default function AboutPage() {
  return (
    <div className="page">
      <section className="page-hero">
        <div className="eyebrow">// About</div>
        <h1 className="ph-title">Most clubs teach ideas.<br /><span className="o">We help you build them.</span></h1>
        <p className="ph-lede">
          SFE Foundry is Alpharetta High School&apos;s community for founders, builders, and innovators — a place to
          turn ideas into real projects alongside ambitious students.
        </p>
      </section>

      <section className="band">
        <div className="split">
          <div>
            <div className="eyebrow">// Our mission</div>
            <h2 className="band-title">Build. Compete. Launch.</h2>
            <p className="band-text">
              Whether you&apos;re interested in coding, startups, AI, product design, or entrepreneurship, SFE Foundry
              gives you the people, projects, and opportunities to bring ideas to life. We&apos;re student-led and
              open to anyone willing to learn and build.
            </p>
          </div>
          <Placeholder label="Photo — a workshop session" h={230} />
        </div>
      </section>

      <section className="band">
        <div className="band-head center">
          <div>
            <div className="eyebrow" style={{ justifyContent: 'center' }}>// The path</div>
            <h2 className="band-title">Your Journey</h2>
          </div>
        </div>
        <div className="journey-row">
          {JOURNEY.map((s) => (
            <div key={s.n} className="journey-card">
              <div className="journey-n">{s.n}</div>
              <div className="journey-t">{s.t}</div>
              <div className="journey-d">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="band">
        <div className="cta">
          <h2 className="cta-title">Come build with us.</h2>
          <p className="cta-text">Get involved as a member or apply to join the team.</p>
          <Link href="/get-involved" className="btn-primary">&gt; Get Involved</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
