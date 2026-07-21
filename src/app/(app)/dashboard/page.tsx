'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../components/AuthProvider';
import { getProjects, getMyRatings, rateProject, type ProjectWithRating } from '../../../lib/projects';
import Stars from '../../../components/Stars';
import { IconArrow, IconMail } from '../../../components/icons';

const FILTERS = ['All', 'My Projects', 'Following', 'Popular', 'Newest'];

export default function DashboardPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<ProjectWithRating[]>([]);
  const [mine, setMine] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  const load = async () => {
    const p = await getProjects().catch(() => []);
    setProjects(p);
    if (user) setMine(await getMyRatings(user.id).catch(() => ({})));
    setLoading(false);
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

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name || 'Builder'}.</h1>
        <p>Here's what's happening at SFE Foundry.</p>
      </div>

      {/* Main feed area */}
      <div className="app-content">
        {/* Filters */}
        <div className="feed-filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`feed-filter${filter === f ? ' active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Feed */}
        {loading ? (
          <p style={{ color: 'var(--faint)', textAlign: 'center', padding: '40px' }}>Loading…</p>
        ) : projects.length === 0 ? (
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
                      <div className="widget-label">Rating</div>
                      <Stars value={p.avg} count={p.count} />
                    </div>
                    <div>
                      <div className="widget-label">Your rating</div>
                      <Stars interactive current={mine[p.id] ?? 0} onRate={(s) => handleRate(p.id, s)} />
                    </div>
                  </div>

                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm" style={{ marginTop: 4 }}>
                    Open <IconArrow size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Right sidebar */}
      <aside className="app-sidebar">
        {/* Search */}
        <div className="widget">
          <input type="text" className="widget-search" placeholder="Search projects..." />
        </div>

        {/* Stats */}
        <div className="widget">
          <div className="widget-title">Your Activity</div>
          <div style={{ paddingTop: 8 }}>
            <div className="widget-stat">{Object.keys(mine).length}</div>
            <div className="widget-substat">Projects rated</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="widget" style={{ background: `linear-gradient(135deg, rgba(242,101,34,.1) 0%, rgba(242,101,34,.05) 100%)` }}>
          <div className="widget-title">Ready to ship?</div>
          <p style={{ fontSize: '.9rem', color: 'var(--muted)', margin: '8px 0' }}>Share your project with the community.</p>
          <Link href="/my-projects" className="btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: 12, fontSize: '.85rem', padding: '10px' }}>
            Submit Project
          </Link>
        </div>

        {/* Contact */}
        <div className="widget">
          <div className="widget-title">Questions?</div>
          <a href="mailto:sfefoundryteam@gmail.com" className="btn-ghost btn-sm" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
            <IconMail size={16} /> Contact Us
          </a>
        </div>
      </aside>
    </div>
  );
}
