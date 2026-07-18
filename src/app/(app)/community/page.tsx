'use client';

import Placeholder from '../../../components/Placeholder';
import Footer from '../../../components/Footer';
import { IconUsers, IconBulb, IconSpark } from '../../../components/icons';

const PILLARS = [
  { Icon: IconUsers, t: 'Collaborate', d: 'Work with students across all grades and interests.' },
  { Icon: IconBulb, t: 'Learn', d: 'Gain insights from mentors, alumni, and industry leaders.' },
  { Icon: IconSpark, t: 'Grow Together', d: 'Build lifelong friendships and create impact as a team.' },
];

export default function CommunityPage() {
  return (
    <div className="page">
      <section className="page-hero">
        <h1 className="ph-title">OUR COMMUNITY</h1>
        <p className="ph-lede">Surround yourself with driven students, mentors, and alumni who push you to grow.</p>
      </section>

      <section className="feature-strip cols-3">
        {PILLARS.map(({ Icon, t, d }) => (
          <div key={t} className="feature-col">
            <span className="feature-ic"><Icon size={30} /></span>
            <div className="feature-t">{t}</div>
            <div className="feature-d">{d}</div>
          </div>
        ))}
      </section>

      <section className="band" style={{ borderTop: 'none' }}>
        <Placeholder label="Photo — the SFE Foundry community" h={300} />
        <div className="photo-duo">
          <Placeholder label="Photo — team working" h={220} />
          <Placeholder label="Photo — a talk / presentation" h={220} />
        </div>
      </section>

      <section className="band">
        <blockquote className="quote cited">
          <span className="quote-mark">&ldquo;</span>
          <p>Alone we can do so little; together we can do so much.</p>
          <cite>— Helen Keller</cite>
          <span className="quote-mark close">&rdquo;</span>
        </blockquote>
      </section>

      <Footer />
    </div>
  );
}
