'use client';

import Link from 'next/link';

const RESOURCES = [
  { t: 'Getting started with Git & GitHub', d: 'Version control basics every builder needs.', href: 'https://docs.github.com/en/get-started' },
  { t: 'Next.js docs', d: 'Build full-stack React apps with the framework this site uses.', href: 'https://nextjs.org/docs' },
  { t: 'Supabase docs', d: 'Auth, database, and storage — the backend behind this site.', href: 'https://supabase.com/docs' },
  { t: 'Figma', d: 'Design your project before you build it.', href: 'https://www.figma.com/' },
  { t: 'freeCodeCamp', d: 'Free, project-based coding courses.', href: 'https://www.freecodecamp.org/' },
  { t: 'Deploy on Vercel', d: 'Ship your project live in minutes.', href: 'https://vercel.com/docs' },
];

export default function ResourcesPage() {
  return (
    <div className="container">
      <div className="page-eyebrow">Learn</div>
      <h1 className="page-title">Resources</h1>
      <p className="page-sub" style={{ marginBottom: 28 }}>Hand-picked guides and tools to help you build and ship.</p>

      <div className="grid grid-3">
        {RESOURCES.map((r) => (
          <a key={r.t} href={r.href} target="_blank" rel="noopener noreferrer" className="card card-hover reveal" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <h3 style={{ fontWeight: 700, fontSize: '1.02rem', marginBottom: 6, color: 'var(--ink)' }}>{r.t}</h3>
            <p style={{ color: 'var(--muted)', fontSize: '.88rem', lineHeight: 1.6 }}>{r.d}</p>
            <div style={{ marginTop: 14, color: 'var(--blue)', fontWeight: 600, fontSize: '.82rem' }}>Open →</div>
          </a>
        ))}
      </div>

      <div style={{ marginTop: 32 }}>
        <Link href="/faq" className="btn btn-outline">Read the FAQ →</Link>
      </div>
    </div>
  );
}
