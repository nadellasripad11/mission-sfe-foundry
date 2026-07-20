'use client';

import Link from 'next/link';
import Footer from '../../../components/Footer';
import { IconArrow } from '../../../components/icons';

export default function DisplayPage() {
  return (
    <div className="page">
      <section className="page-hero">
        <h1 className="ph-title">DISPLAY</h1>
        <p className="ph-lede">A wall of projects built by SFE Foundry members. Browse, get inspired, and rate the ones you love.</p>
      </section>

      <section className="band" style={{ borderTop: 'none', paddingTop: 0 }}>
        <div className="empty">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>// No projects yet</div>
          <h3 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.4rem', marginTop: 6, marginBottom: 10 }}>Be the first to ship.</h3>
          <p style={{ color: 'var(--muted)', fontSize: '.94rem', maxWidth: 460, margin: '0 auto 22px' }}>
            Add your first project to your account and it&apos;ll show up here for everyone to see and rate.
          </p>
          <Link href="/my-projects" className="btn-primary" style={{ display: 'inline-flex' }}>Add a Project <IconArrow size={17} /></Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
