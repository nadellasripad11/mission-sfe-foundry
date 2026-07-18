'use client';

import Link from 'next/link';
import Placeholder from '../../../components/Placeholder';
import Footer from '../../../components/Footer';
import { LogoHero, IconTarget, IconEye, IconSpark, IconArrow } from '../../../components/icons';

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
        <div className="about-visual"><LogoHero size={400} rings /></div>
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
