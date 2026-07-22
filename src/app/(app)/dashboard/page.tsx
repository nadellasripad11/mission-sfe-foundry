'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../components/AuthProvider';
import { getProjects, getMyRatings, rateProject, type ProjectWithRating } from '../../../lib/projects';
import Stars from '../../../components/Stars';
import { IconArrow } from '../../../components/icons';

export default function DashboardPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<ProjectWithRating[]>([]);
  const [mine, setMine] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setError('');
      const p = await getProjects().catch(() => []);
      setProjects(p);
      if (user) setMine(await getMyRatings(user.id).catch(() => ({})));
    } catch (err) {
      console.error('Dashboard load error:', err);
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    load();
  }, [user?.id]);

  const handleRate = async (projectId: string, stars: number) => {
    setMine((m) => ({ ...m, [projectId]: stars }));
    try {
      await rateProject(projectId, user!.id, stars);
      await load();
    } catch {}
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.name || 'Builder'}.</h1>
          <p>Here's what's happening at SFE Foundry.</p>
        </div>
        <p style={{ color: 'var(--faint)' }}>Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.name || 'Builder'}.</h1>
          <p>Here's what's happening at SFE Foundry.</p>
        </div>
        <div className="empty">
          <p style={{ color: '#E74C3C', marginBottom: 16 }}>{error}</p>
          <button onClick={load} className="btn-primary">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name || 'Builder'}.</h1>
        <p>Here's what's happening at SFE Foundry.</p>
      </div>

      {/* Feed */}
      {projects.length === 0 ? (
        <div className="empty">
          <p style={{ color: 'var(--muted)', marginBottom: 16 }}>No projects yet. Be the first to ship!</p>
          <Link href="/my-projects" className="btn-primary" style={{ display: 'inline-flex' }}>
            Ship Your Project <IconArrow size={17} />
          </Link>
        </div>
      ) : (
        <div className="feed">
          {projects.map((p) => (
            <article key={p.id} className="feed-item">
              {p.screenshots[0] && (
                <div className="feed-image">
                  <img src={p.screenshots[0]} alt="" />
                </div>
              )}
              <div className="feed-body">
                <div className="feed-title">{p.title}</div>
                <div className="feed-author">by {p.author_name || 'Anonymous'}</div>
                <p className="feed-desc">{p.description}</p>

                <div className="feed-meta">
                  <div>
                    <span style={{ fontSize: '.75rem', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 600 }}>Rating</span>
                    <div style={{ marginTop: 4 }}>
                      <Stars value={p.avg} count={p.count} />
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '.75rem', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 600 }}>Your rating</span>
                    <div style={{ marginTop: 4 }}>
                      <Stars interactive current={mine[p.id] ?? 0} onRate={(s) => handleRate(p.id, s)} />
                    </div>
                  </div>
                </div>

                {/^https?:\/\//.test(p.url) && (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm">
                    Open <IconArrow size={14} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
