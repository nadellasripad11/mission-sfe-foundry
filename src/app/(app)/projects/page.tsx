'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../../components/AuthProvider';
import Stars from '../../../components/Stars';
import { getProjects, createProject, type ProjectWithRating } from '../../../lib/projects';

export default function ProjectsPage() {
  const { user, openAuth } = useAuth();
  const [projects, setProjects] = useState<ProjectWithRating[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const load = () => getProjects().then((p) => { setProjects(p); setLoading(false); }).catch(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !title.trim()) return;
    setSaving(true); setErr('');
    try {
      await createProject({
        user_id: user.id, author_name: user.name || user.email,
        title: title.trim(), description, url, repo_url: repoUrl, image_url: imageUrl,
      });
      setTitle(''); setDescription(''); setUrl(''); setRepoUrl(''); setImageUrl('');
      setShowForm(false);
      load();
    } catch (e: any) {
      setErr(e?.message || 'Failed to ship project.');
    } finally { setSaving(false); }
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap', marginBottom: 28 }}>
        <div>
          <div className="page-eyebrow">Gallery</div>
          <h1 className="page-title">Projects</h1>
          <p className="page-sub">Everything shipped by the community. Ship yours and it shows up here for everyone.</p>
        </div>
        {user
          ? <button className="btn btn-solid" onClick={() => setShowForm(true)}>+ Ship a project</button>
          : <button className="btn btn-solid" onClick={() => openAuth('signup')}>Sign up to ship</button>}
      </div>

      {loading ? (
        <p style={{ color: 'var(--faint)' }}>Loading projects…</p>
      ) : projects.length === 0 ? (
        <div className="empty">
          <p style={{ color: 'var(--muted)', marginBottom: 16 }}>No projects shipped yet. Be the first!</p>
          {user
            ? <button className="btn btn-solid" onClick={() => setShowForm(true)}>Ship a project</button>
            : <button className="btn btn-solid" onClick={() => openAuth('signup')}>Sign up to ship</button>}
        </div>
      ) : (
        <div className="grid grid-2">
          {projects.map((p) => (
            <div key={p.id} className="card card-hover reveal" style={{ display: 'flex', flexDirection: 'column' }}>
              {p.image_url && (
                <img src={p.image_url} alt="" style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 10, marginBottom: 14 }}
                     onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              )}
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 4 }}>{p.title}</h3>
              <p style={{ color: 'var(--faint)', fontSize: '.8rem', marginBottom: 10 }}>by {p.author_name || 'Anonymous'}</p>
              {p.description && <p style={{ color: 'var(--muted)', fontSize: '.9rem', lineHeight: 1.6, marginBottom: 14 }}>{p.description}</p>}
              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
                <Stars value={p.avg} count={p.count} />
                <div style={{ display: 'flex', gap: 8 }}>
                  {p.url && <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">Live</a>}
                  {p.repo_url && <a href={p.repo_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">Code</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && user && (
        <div className="overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-x" onClick={() => setShowForm(false)} aria-label="Close">×</button>
            <h2 style={{ fontWeight: 800, fontSize: '1.35rem', marginBottom: 18 }}>Ship a project</h2>
            {err && <div className="msg-err">{err}</div>}
            <form onSubmit={submit}>
              <label className="label">Title *</label>
              <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="My awesome project" required disabled={saving} />
              <label className="label">Description</label>
              <textarea className="input" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What is it? What did you build?" rows={3} disabled={saving} style={{ resize: 'none', fontFamily: 'Inter, sans-serif' }} />
              <label className="label">Live / demo link</label>
              <input className="input" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://…" disabled={saving} />
              <label className="label">Code / repo link</label>
              <input className="input" value={repoUrl} onChange={(e) => setRepoUrl(e.target.value)} placeholder="https://github.com/…" disabled={saving} />
              <label className="label">Image URL (optional)</label>
              <input className="input" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://…/screenshot.png" disabled={saving} />
              <button type="submit" className="btn btn-solid btn-block" style={{ padding: 13, marginTop: 6 }} disabled={saving || !title.trim()}>
                {saving ? 'Shipping…' : 'Ship it 🚀'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
