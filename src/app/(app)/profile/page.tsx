'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../components/AuthProvider';
import { getMyProjects, type Project } from '../../../lib/projects';
import { IconArrow } from '../../../components/icons';

export default function ProfilePage() {
  const { user, ready } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'feed' | 'projects'>('feed');

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    getMyProjects(user.id).then((p) => { setProjects(p); setLoading(false); }).catch(() => setLoading(false));
  }, [user]);

  if (ready && !user) {
    return (
      <div className="page">
        <div className="empty">
          <p style={{ color: 'var(--muted)', marginBottom: 16 }}>Sign in to view your profile.</p>
          <Link href="/" className="btn-primary">Back Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Banner */}
      <div className="profile-banner" style={{ background: 'linear-gradient(135deg, var(--blue) 0%, var(--orange) 100%)' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', textAlign: 'center', color: 'var(--faint)', fontSize: '.85rem' }}>
          Upload banner to customize
        </div>
      </div>

      {/* Profile info */}
      <div className="profile-info">
        <div className="profile-avatar">{(user?.name?.trim()?.[0] || user?.email[0] || '?').toUpperCase()}</div>
        <div className="profile-meta">
          <h1 className="profile-name">@{user?.name?.replace(/\s+/g, '') || user?.email.split('@')[0]}</h1>
          <p className="profile-join">Joined {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <Link href="/my-projects" className="btn-primary" style={{ marginLeft: 'auto' }}>Edit Profile</Link>
      </div>

      {/* Stats */}
      <div className="profile-stats">
        <div className="stat">
          <div className="stat-value">{projects.length}</div>
          <div className="stat-label">Projects</div>
        </div>
        <div className="stat">
          <div className="stat-value">0</div>
          <div className="stat-label">Devlogs</div>
        </div>
        <div className="stat">
          <div className="stat-value">0</div>
          <div className="stat-label">Ships</div>
        </div>
        <div className="stat">
          <div className="stat-value">0</div>
          <div className="stat-label">Votes</div>
        </div>
      </div>

      {/* Bio */}
      <div className="profile-bio">
        <p>Share your story here</p>
      </div>

      {/* Tabs */}
      <div className="profile-tabs">
        <button
          className={`profile-tab${tab === 'feed' ? ' active' : ''}`}
          onClick={() => setTab('feed')}
        >
          Feed
        </button>
        <button
          className={`profile-tab${tab === 'projects' ? ' active' : ''}`}
          onClick={() => setTab('projects')}
        >
          Projects ({projects.length})
        </button>
      </div>

      {/* Content */}
      <div className="profile-content">
        {tab === 'feed' ? (
          <div className="empty">
            <p style={{ color: 'var(--muted)' }}>No posts yet</p>
          </div>
        ) : (
          <div className="proj-grid">
            {loading ? (
              <p style={{ color: 'var(--faint)' }}>Loading…</p>
            ) : projects.length === 0 ? (
              <div className="empty">
                <p style={{ color: 'var(--muted)', marginBottom: 16 }}>You haven't shipped anything yet.</p>
                <Link href="/my-projects" className="btn-primary">Ship Your First Project</Link>
              </div>
            ) : (
              projects.map((p) => (
                <article key={p.id} className="proj-card">
                  {p.screenshots[0] && (
                    <div className="proj-shot"><img src={p.screenshots[0]} alt="" /></div>
                  )}
                  <div className="proj-body">
                    <div className="proj-title">{p.title}</div>
                    <p className="proj-desc">{p.description}</p>
                    {p.tags.length > 0 && (
                      <div className="tag-row" style={{ marginTop: 8 }}>
                        {p.tags.map((t) => <span key={t} className="tag mini">#{t}</span>)}
                      </div>
                    )}
                    <div className="proj-actions" style={{ marginTop: 12 }}>
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm">Open</a>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        )}
      </div>

      {/* Right sidebar - achievements */}
      <aside className="profile-sidebar">
        <div className="widget">
          <div className="widget-title">Your Achievements</div>
          <div className="widget-stat">0 / 5</div>
          <div className="widget-substat">earned</div>
          <Link href="#" style={{ display: 'block', marginTop: 12, color: 'var(--orange)', textDecoration: 'none', fontSize: '.9rem', fontWeight: 600 }}>
            See all achievements →
          </Link>
        </div>
      </aside>
    </div>
  );
}
