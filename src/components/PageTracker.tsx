'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function getSession() {
  if (typeof sessionStorage === 'undefined') return null;
  let s = sessionStorage.getItem('sfe-sid');
  if (!s) { s = crypto.randomUUID(); sessionStorage.setItem('sfe-sid', s); }
  return s;
}

export default function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith('/admin')) return;
    const consent = localStorage.getItem('cookie-consent');
    if (consent === 'declined') return;

    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'pageview',
        page: pathname,
        session_id: getSession(),
        referrer: document.referrer || null,
      }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}
