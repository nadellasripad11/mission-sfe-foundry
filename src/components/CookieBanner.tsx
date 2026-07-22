'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookie-consent')) setShow(true);
  }, []);

  const accept = () => { localStorage.setItem('cookie-consent', 'accepted'); setShow(false); };
  const decline = () => { localStorage.setItem('cookie-consent', 'declined'); setShow(false); };

  if (!show) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-inner">
        <p className="cookie-text">
          We use cookies to improve your experience and track site analytics.{' '}
          <Link href="/cookies" className="cookie-link">Cookie Policy</Link>
          {' · '}
          <Link href="/privacy" className="cookie-link">Privacy Policy</Link>
        </p>
        <div className="cookie-actions">
          <button className="cookie-btn-decline" onClick={decline}>Decline</button>
          <button className="cookie-btn-accept" onClick={accept}>Accept All</button>
        </div>
      </div>
    </div>
  );
}
