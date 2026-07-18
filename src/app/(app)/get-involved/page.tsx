'use client';

import { useAuth } from '../../../components/AuthProvider';
import Footer from '../../../components/Footer';

export default function GetInvolvedPage() {
  const { openAuth } = useAuth();

  return (
    <div className="page">
      <section className="page-hero">
        <div className="eyebrow">// Get Involved</div>
        <h1 className="ph-title">Join <span className="o">SFE Foundry</span></h1>
        <p className="ph-lede">
          There&apos;s a place for everyone — become a member, help run the club as staff, or partner with us as a sponsor.
        </p>
      </section>

      <section className="band">
        <div className="involve-grid">
          <button className="involve-card orange" onClick={() => openAuth('signup')}>
            <div className="involve-tag light">// Membership</div>
            <div className="involve-t light">Become a Member</div>
            <div className="involve-d light">Free for the school year. Get access to events, projects, and the community.</div>
            <div className="involve-cta light">Join now &gt;</div>
          </button>

          <a href="https://forms.cloud.microsoft/r/D92tQqsRta" target="_blank" rel="noopener noreferrer" className="involve-card">
            <div className="involve-tag">// Staff Application</div>
            <div className="involve-t">Join as Staff</div>
            <div className="involve-d">Help run events, workshops, and the community as part of the leadership team.</div>
            <div className="involve-cta">Apply now &gt;</div>
          </a>

          <a href="https://forms.cloud.microsoft/r/uMqhCpd6Bm" target="_blank" rel="noopener noreferrer" className="involve-card">
            <div className="involve-tag">// Sponsors</div>
            <div className="involve-t">Sponsor SFE</div>
            <div className="involve-d">Support the next generation of student builders and founders at AHS.</div>
            <div className="involve-cta">Learn more &gt;</div>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
