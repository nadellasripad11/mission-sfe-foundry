'use client';

import Link from 'next/link';
import Footer from '../../../components/Footer';
import { IconArrow } from '../../../components/icons';

export default function ThankYouPage() {
  return (
    <div className="page">
      <section className="thanks">
        <div className="thanks-check" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <div className="eyebrow" style={{ justifyContent: 'center' }}>// Message sent</div>
        <h1 className="ph-title" style={{ textAlign: 'center' }}>Thank you!</h1>
        <p className="ph-lede" style={{ margin: '18px auto 0', textAlign: 'center' }}>
          Your message is on its way to the SFE Foundry team. We&apos;ll get back to you at the email you provided — usually within a few days.
        </p>
        <div className="thanks-actions">
          <Link href="/" className="btn-dark">Back Home <IconArrow size={18} /></Link>
          <Link href="/events" className="btn-ghost">See Events</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
