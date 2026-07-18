'use client';

import Placeholder from '../../../components/Placeholder';
import Footer from '../../../components/Footer';

const STATS = [
  ['100+', 'Students'], ['15+', 'Projects'], ['7+', 'Hackathons'], ['10+', 'Guest Speakers'], ['1', 'Mission'],
];

export default function CommunityPage() {
  return (
    <div className="page">
      <section className="page-hero">
        <div className="eyebrow">// Community</div>
        <h1 className="ph-title">Built <span className="o">Together</span></h1>
        <p className="ph-lede">
          SFE Foundry is more than a club — it&apos;s a community of ambitious students building, competing, and growing together.
        </p>
      </section>

      <section className="band">
        <div className="stat-strip wide">
          {STATS.map(([n, l]) => (
            <div key={l} className="stat-box">
              <div className="stat-box-n">{n}</div>
              <div className="stat-box-l">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="band">
        <div className="eyebrow">// Moments</div>
        <h2 className="band-title" style={{ marginBottom: 22 }}>Life at the Foundry</h2>
        <div className="photo-grid">
          {['Hackathon night', 'Pitch day', 'Workshop', 'Team build', 'Demo day', 'Meetup'].map((label) => (
            <Placeholder key={label} label={label} h={150} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
