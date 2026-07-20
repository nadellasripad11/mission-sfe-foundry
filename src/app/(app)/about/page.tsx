'use client';

import Link from 'next/link';
import Placeholder from '../../../components/Placeholder';
import Footer from '../../../components/Footer';
import { LogoHero3D, IconTarget, IconEye, IconSpark, IconArrow } from '../../../components/icons';

const PILLARS = [
  { Icon: IconTarget, t: 'Our Mission', d: 'Empower students to build innovative solutions, launch ideas, and create lasting impact.' },
  { Icon: IconEye, t: 'Our Vision', d: 'To be the leading student organization preparing the next generation of builders and leaders.' },
  { Icon: IconSpark, t: 'Our Values', d: 'Integrity, curiosity, collaboration, excellence, and action.' },
];

export default function AboutPage() {
  return (
    <div className="page">
      <section className="about-hero">
        <div>
          <h1 className="ph-title">ABOUT<br />SFE FOUNDRY</h1>
          <p className="ph-lede">
            SFE Foundry is where ambition meets opportunity. We empower students to turn ideas into impact through
            entrepreneurship, technology, and real-world experience.
          </p>
          <div className="pillar-list">
            {PILLARS.map(({ Icon, t, d }) => (
              <div key={t} className="pillar">
                <span className="pillar-ic"><Icon size={24} /></span>
                <div>
                  <div className="pillar-t">{t}</div>
                  <div className="pillar-d">{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="about-visual"><LogoHero3D size={420} /></div>
      </section>

      <section className="band">
        <h2 className="band-title">What is SFE Foundry?</h2>
        <p className="band-text" style={{ maxWidth: 680 }}>
          We&apos;re a student-run organization that brings together entrepreneurs, builders, and problem solvers.
          Through competitions, workshops, and projects, we create a space where students can build the future—together.
        </p>
        <div style={{ marginTop: 26 }}><Placeholder label="Photo — the SFE Foundry team" h={300} /></div>
      </section>

      <section className="band">
        <blockquote className="quote">
          <span className="quote-mark">&ldquo;</span>
          <p>We believe the future belongs to builders and thinkers who never stop growing.</p>
        </blockquote>
        <div style={{ marginTop: 20 }}><Placeholder label="Photo — the SFE Foundry team" h={260} /></div>
      </section>

      <section className="band">
        <div className="cta">
          <h2 className="cta-title">Come build with us.</h2>
          <p className="cta-text">Get involved as a member or apply to join the team.</p>
          <Link href="/get-involved" className="btn-primary">Get Involved <IconArrow size={18} /></Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
