'use client';

import Link from 'next/link';

export default function Mission() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '.7rem', letterSpacing: '.14em', color: 'var(--orange)', textTransform: 'uppercase', marginBottom: 12 }}>// Mission</div>
        <h1 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '2rem', color: 'var(--ink)', marginBottom: 16 }}>Coming soon.</h1>
        <Link href="/home" style={{ color: 'var(--muted)', fontSize: '.74rem', letterSpacing: '.08em', textTransform: 'uppercase' }}>&lt; Back to home</Link>
      </div>
    </div>
  );
}
