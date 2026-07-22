'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../components/AuthProvider';
import { getProjects, type ProjectWithRating } from '../../../lib/projects';
import { IconArrow } from '../../../components/icons';

const BUZZ_LABELS: Record<string, string> = {
  inspiration: 'What sparked this',
  how_built: 'How they built it',
  biggest_challenge: 'Biggest challenge',
  proud_of: 'Most proud of',
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<ProjectWithRating[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setError('');
      const p = await getProjects().catch(() => []);
      setProjects(p);
    } catch (err) {
      console.error('Dashboard load error:', err);
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (user) load(); }, [user?.id]);

  // Projects with Social Buzz for the buzz feed
  const buzzProjects = projects.filter(p => p.buzz && Object.values(p.buzz as Record<string, string>).some(v => v?.trim()));

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.name || 'Builder'}.</h1>
          <p>Here&apos;s what&apos;s happening at SFE Foundry.</p>
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
          <p>Here&apos;s what&apos;s happening at SFE Foundry.</p>
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
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name || 'Builder'}.</h1>
        <p>Here&apos;s what&apos;s happening at SFE Foundry.</p>
      </div>

      {/* ── Social Buzz Feed ── */}
      {buzzProjects.length > 0 && (
        <section className="buzz-feed-section">
          <div className="buzz-feed-head">
            <span className="buzz-feed-badge">Social Buzz</span>
            <h2 className="buzz-feed-title">Builder Stories</h2>
            <p className="buzz-feed-sub">Real stories from builders in your community.</p>
          </div>
          <div className="buzz-feed-list">
            {buzzProjects.slice(0, 6).map(p => {
              const buzzMap = p.buzz as Record<string, string>;
              const firstKey = ['inspiration', 'how_built', 'biggest_challenge', 'proud_of'].find(k => buzzMap[k]?.trim());
              if (!firstKey) return null;
              const snippet = buzzMap[firstKey];
              return (
                <Link key={p.id} href={`/project/${p.id}`} className="buzz-feed-card" style={{ textDecoration: 'none' }}>
                  {p.screenshots[0] && <img src={p.screenshots[0]} alt="" className="buzz-feed-img" />}
                  <div className="buzz-feed-content">
                    <div className="buzz-feed-project">{p.title}</div>
                    <div className="buzz-feed-by">by {p.author_name || 'Anonymous'}</div>
                    <div className="buzz-feed-q">{BUZZ_LABELS[firstKey]}</div>
                    <p className="buzz-feed-a">&ldquo;{snippet.length > 160 ? snippet.slice(0, 160) + '…' : snippet}&rdquo;</p>
                    <span className="buzz-feed-cta">Read full story <IconArrow size={12} /></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ── All Projects Feed ── */}
      <section>
        <div className="dash-section-head">
          <h2 className="dash-section-title">Latest Ships</h2>
          <Link href="/display" className="dash-section-link">See all <IconArrow size={14} /></Link>
        </div>
        {projects.length === 0 ? (
          <div className="empty">
            <p style={{ color: 'var(--muted)', marginBottom: 16 }}>No projects yet. Be the first to ship!</p>
            <Link href="/my-projects" className="btn-primary" style={{ display: 'inline-flex' }}>
              Ship Your Project <IconArrow size={17} />
            </Link>
          </div>
        ) : (
          <div className="proj-grid" style={{ marginTop: 16 }}>
            {projects.slice(0, 6).map((p) => (
              <Link key={p.id} href={`/project/${p.id}`} style={{ textDecoration: 'none' }}>
                <article className="proj-card rate-card-hover">
                  {p.screenshots[0] && <div className="proj-shot"><img src={p.screenshots[0]} alt="" /></div>}
                  <div className="proj-body">
                    <div className="proj-title">{p.title}</div>
                    <div className="proj-author">by {p.author_name || 'Anonymous'}</div>
                    <p className="proj-desc">{p.description}</p>
                    {p.buzz && <div className="display-buzz-hint">📖 Builder story inside</div>}
                    {p.count > 0 ? (
                      <div className="rate-card-scores" style={{ marginTop: 8 }}>
                        {(['originality', 'technicality', 'usability', 'impact'] as const).map(k => (
                          <div key={k} className="rate-card-score">
                            <span className="rate-card-score-label">{k.slice(0, 4).toUpperCase()}</span>
                            <span className="rate-card-score-val">{p[k].toFixed(1)}/9</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ color: 'var(--faint)', fontSize: '.82rem', marginTop: 8 }}>No ratings yet</div>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
