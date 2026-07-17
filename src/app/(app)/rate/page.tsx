'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../../components/AuthProvider';
import Stars from '../../../components/Stars';
import { getProjects, getMyRatings, rateProject, type ProjectWithRating } from '../../../lib/projects';

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
  useEffect(() => { load(); }, [user]);

  const handleRate = async (projectId: string, stars: number) => {
    if (!user) { openAuth('signin'); return; }
    setMine((m) => ({ ...m, [projectId]: stars }));
    try { await rateProject(projectId, user.id, stars); await load(); } catch {}
  };

  return (
    <div className="container">
      <div className="page-eyebrow">Feedback</div>
      <h1 className="page-title">Rate projects</h1>
      <p className="page-sub" style={{ marginBottom: 28 }}>
        {user ? 'Give a star rating to what the community has built.' : 'Sign in to rate what the community has built.'}
      </p>

      {!user && (
        <div className="empty" style={{ marginBottom: 28 }}>
          <p style={{ color: 'var(--muted)', marginBottom: 16 }}>You need an account to rate projects.</p>
          <button className="btn btn-solid" onClick={() => openAuth('signin')}>Sign in</button>
        </div>
      )}

      {loading ? (
        <p style={{ color: 'var(--faint)' }}>Loading…</p>
      ) : projects.length === 0 ? (
        <div className="empty"><p style={{ color: 'var(--muted)' }}>No projects to rate yet.</p></div>
      ) : (
        <div className="grid grid-2">
          {projects.map((p) => (
            <div key={p.id} className="card reveal">
              <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 4 }}>{p.title}</h3>
              <p style={{ color: 'var(--faint)', fontSize: '.8rem', marginBottom: 12 }}>by {p.author_name || 'Anonymous'}</p>
              <div style={{ marginBottom: 12 }}><Stars value={p.avg} count={p.count} /></div>
              <div style={{ borderTop: '1px solid var(--line)', paddingTop: 12, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: '.82rem', color: 'var(--muted)', fontWeight: 600 }}>
                  {mine[p.id] ? 'Your rating:' : 'Your rating:'}
                </span>
                <Stars interactive current={mine[p.id] ?? 0} onRate={(s) => handleRate(p.id, s)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
