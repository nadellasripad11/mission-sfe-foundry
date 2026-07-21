'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../components/AuthProvider';
import { createProject, deleteProject, getMyProjects, type Project } from '../../../lib/projects';
import { uploadImage } from '../../../lib/uploadImage';
import { LogoHero } from '../../../components/icons';
import { IconArrow, IconClose } from '../../../components/icons';

export default function MyProjectsPage() {
  const { user, openAuth, ready } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [tab, setTab] = useState<'projects' | 'feed'>('projects');
  const [myProjectsCount, setMyProjectsCount] = useState(0);

  const [title, setTitle] = useState('Untitled');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [projectType, setProjectType] = useState<'software' | 'hardware'>('software');
  const [aiUsage, setAiUsage] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [pending, setPending] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const load = () => {
    if (!user) { setLoading(false); return; }
    getMyProjects(user.id).then((p) => { setProjects(p); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(() => { load(); }, [user?.id]);

  const addTag = () => {
    const t = tagInput.trim().replace(/^#/, '').toLowerCase();
    if (!t || tags.includes(t) || tags.length >= 8) return;
    setTags([...tags, t]);
    setTagInput('');
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setErr('');
    if (!title.trim() || !description.trim() || !url.trim()) return setErr('Title, description and link are all required.');
    if (pending.length === 0) return setErr('Add at least one screenshot.');
    if (tags.length === 0) return setErr('Add at least one tag.');
    setSaving(true);
    try {
      const urls: string[] = [];
      for (const f of pending) urls.push(await uploadImage(f, user.id));
      await createProject({
        user_id: user.id,
        author_name: user.name ?? user.email,
        title: title.trim(),
        description: description.trim(),
        url: url.trim(),
        screenshots: urls,
        tags,
      });
      setTitle('Untitled'); setDescription(''); setUrl(''); setTags([]); setPending([]);
      setShowForm(false);
      load();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    try { await deleteProject(id); setProjects((p) => p.filter((x) => x.id !== id)); } catch {}
  };

  if (ready && !user) {
    return (
      <div className="my-projects-page">
        <div className="empty">
          <p style={{ color: 'var(--muted)', marginBottom: 16 }}>Sign in to manage your projects.</p>
          <button className="btn-primary" onClick={() => openAuth('signin')}>Sign In <IconArrow size={17} /></button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-projects-page">
      <div>
        {/* Profile Card - Stardance Style */}
        <div className="profile-card stardance">
          {/* Large Banner */}
          <div className="profile-banner large">
            <div className="profile-banner-content">
              <LogoHero size={280} />
            </div>
          </div>

          {/* Profile Info Overlay */}
          <div className="profile-overlay">
            <div className="profile-info-overlay">
              <div className="profile-avatar">{(user?.name?.trim()?.[0] || user?.email[0] || '?').toUpperCase()}</div>

              <div className="profile-meta">
                <h1 className="profile-username">@{user?.name?.toLowerCase().replace(/\s+/g, '') || user?.email.split('@')[0]}</h1>
                <p className="profile-joined">Joined {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="profile-bio">Building cool things</p>
              </div>

              <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Close' : 'Ship Project'} <IconArrow size={16} />
              </button>
            </div>

            {/* Stats Row - Horizontal */}
            <div className="profile-stats-inline">
              <div className="stat-inline">
                <div className="stat-num">{projects.length}</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat-inline">
                <div className="stat-num">0</div>
                <div className="stat-label">Devlogs</div>
              </div>
              <div className="stat-inline">
                <div className="stat-num">0</div>
                <div className="stat-label">Ships</div>
              </div>
              <div className="stat-inline">
                <div className="stat-num">0</div>
                <div className="stat-label">Votes</div>
              </div>
            </div>
          </div>
        </div>

      {/* Form */}
      {showForm && (
        <div className="project-form-section">
          <form className="project-form" onSubmit={submit}>
            <h2>Ship Your Project</h2>

            <label className="form-label">Project Title *</label>
            <input className="form-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Untitled" required />

            <label className="form-label">Description *</label>
            <textarea className="form-input" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="What does it do?" required style={{ resize: 'vertical', minHeight: 100 }} />

            <label className="form-label">Project Type *</label>
            <div className="type-selector">
              {(['software', 'hardware'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`type-btn${projectType === type ? ' active' : ''}`}
                  onClick={() => setProjectType(type)}
                >
                  {type === 'software' ? '💻 Software' : '⚙️ Hardware'}
                </button>
              ))}
            </div>

            <label className="form-label">Demo URL</label>
            <input className="form-input" type="url" value={demoUrl} onChange={(e) => setDemoUrl(e.target.value)} placeholder="https://…" />

            <label className="form-label">GitHub URL</label>
            <input className="form-input" type="url" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} placeholder="https://github.com/…" />

            <label className="form-label">AI Usage Declaration</label>
            <textarea className="form-input" value={aiUsage} onChange={(e) => setAiUsage(e.target.value)} rows={3} placeholder="How did you use AI?" style={{ resize: 'vertical', minHeight: 80 }} />

            <label className="form-label">Screenshots * <span style={{ color: 'var(--faint)', fontWeight: 400 }}>(PNG/JPG/WebP)</span></label>
            <input
              type="file" accept="image/png,image/jpeg,image/webp,image/gif" multiple
              onChange={(e) => setPending([...pending, ...Array.from(e.target.files ?? [])])}
              className="form-input" style={{ padding: 10 }}
            />
            {pending.length > 0 && (
              <div className="tag-row" style={{ marginTop: 4 }}>
                {pending.map((f, i) => (
                  <span key={i} className="tag">
                    {f.name}
                    <button type="button" className="tag-x" onClick={() => setPending(pending.filter((_, j) => j !== i))}><IconClose size={12} /></button>
                  </span>
                ))}
              </div>
            )}

            <label className="form-label">Tags * <span style={{ color: 'var(--faint)', fontWeight: 400 }}>(press Enter)</span></label>
            <input
              className="form-input" value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
              placeholder="ai, web, hackathon…"
            />
            {tags.length > 0 && (
              <div className="tag-row">
                {tags.map((t) => (
                  <span key={t} className="tag">#{t}
                    <button type="button" className="tag-x" onClick={() => setTags(tags.filter((x) => x !== t))}><IconClose size={12} /></button>
                  </span>
                ))}
              </div>
            )}

            {err && <div className="msg-err">{err}</div>}
            <button className="btn-primary" type="submit" disabled={saving} style={{ marginTop: 16, width: '100%' }}>
              {saving ? 'Publishing…' : 'Ship Project →'}
            </button>
          </form>
        </div>
      )}

        {/* Tabs - Feed and Projects */}
        <div className="project-tabs">
          <button className={`project-tab${tab === 'feed' ? ' active' : ''}`} onClick={() => setTab('feed')}>
            Feed
          </button>
          <button className={`project-tab${tab === 'projects' ? ' active' : ''}`} onClick={() => setTab('projects')}>
            Projects ({projects.length})
          </button>
        </div>

        {/* Projects/Feed Section */}
        <div className="projects-section">
          {tab === 'projects' && (
            <>
              {loading ? (
                <p style={{ color: 'var(--faint)', textAlign: 'center', padding: '40px' }}>Loading…</p>
              ) : projects.length === 0 ? (
                <div className="empty">
                  <p style={{ color: 'var(--muted)', marginBottom: 16 }}>No projects yet. Ship your first!</p>
                </div>
              ) : (
                <div className="proj-grid">
                  {projects.map((p) => <ProjectCard key={p.id} p={p} onDelete={() => remove(p.id)} />)}
                </div>
              )}
            </>
          )}
          {tab === 'feed' && (
            <div className="empty">
              <p style={{ color: 'var(--muted)', marginBottom: 16 }}>Feed coming soon</p>
            </div>
          )}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="profile-achievements">
        <h3 className="achievements-title">Achievements</h3>
        <div className="achievements-count">0 / 11 earned</div>
        <div className="achievements-grid">
          <div className="achievement-badge" title="First Project">🚀</div>
          <div className="achievement-badge" title="5 Projects">⭐</div>
          <div className="achievement-badge" title="100 Votes">🏆</div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ p, onDelete }: { p: Project; onDelete?: () => void }) {
  return (
    <article className="proj-card">
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
          {onDelete && <button className="btn-ghost btn-sm danger" onClick={onDelete}>Delete</button>}
        </div>
      </div>
    </article>
  );
}
