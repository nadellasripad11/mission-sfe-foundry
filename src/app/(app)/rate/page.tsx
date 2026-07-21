'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../components/AuthProvider';
import Footer from '../../../components/Footer';
import Stars from '../../../components/Stars';
import { getProjects, getMyRatings, rateProject, type ProjectWithRating } from '../../../lib/projects';
import { IconArrow } from '../../../components/icons';

export default function RatePage() {
  const { user, openAuth } = useAuth();
  const [projects, setProjects] = useState<ProjectWithRating[]>([]);
  const [mine, setMine] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const p = await getProjects().catch(() => []);
    setProjects(p);
    if (user) setMine(await getMyRatings(user.id).catch(() => ({})));
    setLoading(false);
  };
  useEffect(() => { load(); }, [user?.id]);

  const handleRate = async (projectId: string, stars: number) => {
    if (!user) { openAuth('signin'); return; }
    setMine((m) => ({ ...m, [projectId]: stars }));
    try { await rateProject(projectId, user.id, stars); await load(); } catch {}
  };

  return (
    <div className="page">
      <section className="page-hero">
        <h1 className="ph-title">RATE</h1>
        <p className="ph-lede">{user ? 'Give a star rating to projects the community has shipped.' : 'Sign in to rate what the community has shipped.'}</p>
      </section>

      <section className="band" style={{ borderTop: 'none', paddingTop: 0 }}>
        {!user ? (
          <div className="empty">
            <p style={{ color: 'var(--muted)', marginBottom: 16 }}>You need an account to rate projects.</p>
            <button className="btn-primary" onClick={() => openAuth('signin')}>Sign in <IconArrow size={17} /></button>
          </div>
        ) : loading ? (
          <p style={{ color: 'var(--faint)' }}>Loading…</p>
        ) : projects.length === 0 ? (
          <div className="empty">
            <p style={{ color: 'var(--muted)', marginBottom: 16 }}>No projects to rate yet.</p>
            <Link href="/my-projects" className="btn-primary" style={{ display: 'inline-flex' }}>Ship the first <IconArrow size={17} /></Link>
          </div>
        ) : (
          <div className="proj-grid">
            {projects.map((p) => (
              <article key={p.id} className="proj-card">
                {p.screenshots[0] && <div className="proj-shot"><img src={p.screenshots[0]} alt="" /></div>}
                <div className="proj-body">
                  <div className="proj-title">{p.title}</div>
                  <div className="proj-author">by {p.author_name || 'Anonymous'}</div>
                  <p className="proj-desc">{p.description}</p>
                  <div style={{ marginTop: 8 }}><Stars value={p.avg} count={p.count} /></div>
                  <div className="proj-actions" style={{ borderTop: '1px solid var(--line)', paddingTop: 12, marginTop: 12, flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '.68rem', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--muted)' }}>Your rating</span>
                    <Stars interactive current={mine[p.id] ?? 0} onRate={(s) => handleRate(p.id, s)} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
