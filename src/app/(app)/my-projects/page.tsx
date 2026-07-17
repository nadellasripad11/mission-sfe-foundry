'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../components/AuthProvider';
import { getMyProjects, deleteProject, type Project } from '../../../lib/projects';

export default function MyProjectsPage() {
  const { user, openAuth, ready } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    if (!user) { setLoading(false); return; }
    getMyProjects(user.id).then((p) => { setProjects(p); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(() => { load(); }, [user]);

  const remove = async (id: string) => {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    try { await deleteProject(id); setProjects((p) => p.filter((x) => x.id !== id)); } catch {}
  };

  if (ready && !user) {
    return (
      <div className="container">
        <h1 className="page-title">My Projects</h1>
        <div className="empty" style={{ marginTop: 20 }}>
          <p style={{ color: 'var(--muted)', marginBottom: 16 }}>Sign in to see the projects you&apos;ve shipped.</p>
          <button className="btn btn-solid" onClick={() => openAuth('signin')}>Sign in</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
        <div>
          <div className="page-eyebrow">Your work</div>
          <h1 className="page-title">My Projects</h1>
          <p className="page-sub">Everything you&apos;ve shipped.</p>
        </div>
        <Link href="/projects" className="btn btn-solid">+ Ship a project</Link>
      </div>

      {loading ? (
        <p style={{ color: 'var(--faint)' }}>Loading…</p>
      ) : projects.length === 0 ? (
        <div className="empty">
          <p style={{ color: 'var(--muted)', marginBottom: 16 }}>You haven&apos;t shipped anything yet.</p>
          <Link href="/projects" className="btn btn-solid">Ship your first project</Link>
        </div>
      ) : (
        <div className="grid grid-2">
          {projects.map((p) => (
            <div key={p.id} className="card reveal" style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 6 }}>{p.title}</h3>
              {p.description && <p style={{ color: 'var(--muted)', fontSize: '.9rem', lineHeight: 1.6, marginBottom: 14 }}>{p.description}</p>}
              <div style={{ marginTop: 'auto', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {p.url && <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">Live</a>}
                {p.repo_url && <a href={p.repo_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">Code</a>}
                <button className="btn btn-outline btn-sm" style={{ color: '#DC2626', borderColor: '#FECACA', marginLeft: 'auto' }} onClick={() => remove(p.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
