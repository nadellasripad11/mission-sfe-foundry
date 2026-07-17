'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '../../components/AuthProvider';
import { getProjects, type ProjectWithRating } from '../../lib/projects';
import Stars from '../../components/Stars';

export default function HomePage() {
  const { user, openAuth } = useAuth();
  const [projects, setProjects] = useState<ProjectWithRating[]>([]);

  useEffect(() => { getProjects().then(setProjects).catch(() => {}); }, []);
  const recent = projects.slice(0, 3);

  return (
    <div className="container">
      {/* Hero */}
      <section className="reveal" style={{ padding: '30px 0 44px' }}>
        <div className="page-eyebrow">Student Innovation &amp; Entrepreneurship</div>
        <h1 style={{ fontWeight: 900, fontSize: 'clamp(2.2rem,5vw,3.6rem)', lineHeight: 1.05, margin: '16px 0 16px', color: 'var(--ink)' }}>
          Build cool things.<br /><span style={{ color: 'var(--blue)' }}>Ship them here.</span>
        </h1>
        <p className="page-sub" style={{ fontSize: '1.08rem' }}>
          SFE Foundry is a community of students who build projects and share them. Ship what you make,
          get feedback, and rate what others build.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 26, flexWrap: 'wrap' }}>
          {user
            ? <Link href="/projects" className="btn btn-solid">Ship a project</Link>
            : <button className="btn btn-solid" onClick={() => openAuth('signup')}>Get started</button>}
          <Link href="/projects" className="btn btn-outline">Browse projects</Link>
        </div>

        <div className="stat-row" style={{ marginTop: 44 }}>
          <div><div className="stat-n">{projects.length}</div><div className="stat-l">Projects shipped</div></div>
          <div><div className="stat-n">{new Set(projects.map((p) => p.user_id)).size}</div><div className="stat-l">Builders</div></div>
          <div><div className="stat-n">{projects.reduce((s, p) => s + p.count, 0)}</div><div className="stat-l">Ratings given</div></div>
        </div>
      </section>

      {/* What you can do */}
      <section className="reveal" style={{ marginBottom: 44 }}>
        <h2 style={{ fontWeight: 800, fontSize: '1.4rem', marginBottom: 18 }}>How it works</h2>
        <div className="grid grid-3">
          {[
            { t: 'Build', d: 'Make something — a web app, a tool, a game, anything you\'re proud of.' },
            { t: 'Ship', d: 'Post it to the Projects gallery with a link so everyone can see it.' },
            { t: 'Rate', d: 'Give feedback and star-rate what other members have built.' },
          ].map((c, i) => (
            <div key={c.t} className="card">
              <div style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.8rem', color: '#E2E8F0', lineHeight: 1, marginBottom: 14 }}>{String(i + 1).padStart(2, '0')}</div>
              <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 6 }}>{c.t}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '.9rem', lineHeight: 1.6 }}>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent projects */}
      <section className="reveal">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <h2 style={{ fontWeight: 800, fontSize: '1.4rem' }}>Recently shipped</h2>
          <Link href="/projects" className="btn btn-outline btn-sm">View all</Link>
        </div>
        {recent.length === 0 ? (
          <div className="empty">
            <p style={{ color: 'var(--muted)', marginBottom: 16 }}>No projects yet — be the first to ship one!</p>
            {user
              ? <Link href="/projects" className="btn btn-solid">Ship a project</Link>
              : <button className="btn btn-solid" onClick={() => openAuth('signup')}>Sign up to ship</button>}
          </div>
        ) : (
          <div className="grid grid-3">
            {recent.map((p) => (
              <div key={p.id} className="card card-hover">
                <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 6 }}>{p.title}</h3>
                <p style={{ color: 'var(--faint)', fontSize: '.8rem', marginBottom: 10 }}>by {p.author_name || 'Anonymous'}</p>
                <Stars value={p.avg} count={p.count} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
