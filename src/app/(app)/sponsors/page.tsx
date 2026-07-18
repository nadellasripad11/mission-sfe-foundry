'use client';

import Placeholder from '../../../components/Placeholder';
import Footer from '../../../components/Footer';
import { IconArrow } from '../../../components/icons';

// Placeholder tiles — swap in real sponsor names/logos once confirmed.
const PARTNERS = ['Partner 01', 'Partner 02', 'Partner 03', 'Partner 04', 'Partner 05', 'Partner 06'];
const SUPPORTERS = ['Supporter 01', 'Supporter 02', 'Supporter 03', 'Supporter 04', 'Supporter 05', 'Supporter 06'];

function SponsorTile({ label }: { label: string }) {
  return (
    <div className="sponsor-tile">
      <span className="sponsor-tile-label">{label}</span>
    </div>
  );
}

export default function SponsorsPage() {
  return (
    <div className="page">
      <section className="page-hero">
        <h1 className="ph-title">OUR SPONSORS</h1>
        <p className="ph-lede">Thank you to the organizations and partners who support student innovation.</p>
      </section>

      <section className="band" style={{ borderTop: 'none', paddingTop: 0 }}>
        <div className="sponsor-group-label">Partner Sponsors</div>
        <div className="sponsor-grid">
          {PARTNERS.map((p) => <SponsorTile key={p} label={p} />)}
        </div>

        <div className="sponsor-group-label" style={{ marginTop: 40 }}>Supporter Sponsors</div>
        <div className="sponsor-grid">
          {SUPPORTERS.map((p) => <SponsorTile key={p} label={p} />)}
        </div>
      </section>

      <section className="band">
        <div className="sponsor-cta">
          <div className="sponsor-cta-body">
            <p className="sponsor-cta-text">
              Interested in becoming a sponsor? Partner with us and invest in the next generation of builders.
            </p>
            <a href="https://forms.cloud.microsoft/r/uMqhCpd6Bm" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Become a Sponsor <IconArrow size={18} />
            </a>
          </div>
          <div className="sponsor-cta-visual"><Placeholder label="Photo — a partnership handshake" h="100%" /></div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
