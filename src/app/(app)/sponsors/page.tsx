'use client';

import Footer from '../../../components/Footer';

const PERKS = [
  { t: 'Reach students', d: 'Get your brand in front of the next generation of builders and founders.' },
  { t: 'Fuel innovation', d: 'Directly support hackathons, workshops, and student projects.' },
  { t: 'Grow together', d: 'Mentor, recruit, and connect with ambitious young talent.' },
];

export default function SponsorsPage() {
  return (
    <div className="page">
      <section className="page-hero">
        <div className="eyebrow">// Sponsors</div>
        <h1 className="ph-title">Back the next generation of <span className="o">builders</span></h1>
        <p className="ph-lede">
          We&apos;re building relationships with local companies, founders, and organizations that believe in
          student innovation. Partner with SFE Foundry to make it happen.
        </p>
        <a href="https://forms.cloud.microsoft/r/uMqhCpd6Bm" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: 24, display: 'inline-flex' }}>
          &gt; Become a Sponsor
        </a>
      </section>

      <section className="band">
        <div className="pill-row">
          {PERKS.map((p, i) => (
            <div key={p.t} className="pill">
              <div className="pill-num">0{i + 1}</div>
              <div className="pill-t">{p.t}</div>
              <div className="pill-d">{p.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="band">
        <div className="cta">
          <h2 className="cta-title">Let&apos;s partner up.</h2>
          <p className="cta-text">Fill out the sponsor form and we&apos;ll reach out to talk details.</p>
          <a href="https://forms.cloud.microsoft/r/uMqhCpd6Bm" target="_blank" rel="noopener noreferrer" className="btn-primary">&gt; Become a Sponsor</a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
