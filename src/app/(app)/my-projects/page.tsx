'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../components/AuthProvider';
import Footer from '../../../components/Footer';
import { createProject, deleteProject, getMyProjects, type Project } from '../../../lib/projects';
import { uploadImage } from '../../../lib/uploadImage';
import { IconArrow, IconClose } from '../../../components/icons';

export default function MyProjectsPage() {
  const { user, openAuth, ready } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

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
  useEffect(() => { load(); }, [user]);

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
      setTitle(''); setDescription(''); setUrl(''); setTags([]); setPending([]);
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
      <div className="page">
        <section className="page-hero">
          <h1 className="ph-title">MY PROJECTS</h1>
          <p className="ph-lede">Sign in to see and manage the projects you&apos;ve shipped.</p>
        </section>
        <section className="band">
          <div className="empty">
            <button className="btn-primary" onClick={() => openAuth('signin')}>Sign in <IconArrow size={17} /></button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <section className="page-hero">
        <h1 className="ph-title">MY PROJECTS</h1>
        <p className="ph-lede">Ship your work here and it lands on the public Display board for others to rate.</p>
        <div style={{ marginTop: 22 }}>
          <button className="btn-primary" onClick={() => setShowForm((s) => !s)}>
            {showForm ? 'Close form' : 'Add a Project'} <IconArrow size={17} />
          </button>
        </div>
      </section>

      {showForm && (
        <section className="band" style={{ borderTop: 'none', paddingTop: 0 }}>
          <form className="contact-form" onSubmit={submit} style={{ maxWidth: 800 }}>
            {/* Title */}
            <label className="label" htmlFor="p-title">Project Title *</label>
            <input id="p-title" className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Untitled" required />

            {/* Description */}
            <label className="label" htmlFor="p-desc">What does it do? *</label>
            <textarea id="p-desc" className="input" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} required placeholder="Describe your project…" style={{ resize: 'vertical', minHeight: 100 }} />

            {/* Project Type */}
            <label className="label">Project Type *</label>
            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
              {(['software', 'hardware'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`btn ${projectType === type ? 'btn-solid' : 'btn-ghost'}`}
                  onClick={() => setProjectType(type)}
                  style={{ textTransform: 'capitalize', padding: '10px 20px' }}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Links */}
            <label className="label" htmlFor="p-demo">Demo URL</label>
            <input id="p-demo" className="input" type="url" value={demoUrl} onChange={(e) => setDemoUrl(e.target.value)} placeholder="https://…" />

            <label className="label" htmlFor="p-github">GitHub / Source URL</label>
            <input id="p-github" className="input" type="url" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} placeholder="https://github.com/…" />

            {/* AI Usage */}
            <label className="label" htmlFor="p-ai">AI Usage Declaration</label>
            <textarea id="p-ai" className="input" value={aiUsage} onChange={(e) => setAiUsage(e.target.value)} rows={3} placeholder="How did you use AI? Write 'None' if you didn't." style={{ resize: 'vertical', minHeight: 80 }} />

            {/* Screenshots */}
            <label className="label">Screenshots * <span style={{ color: 'var(--faint)', fontWeight: 400 }}>(PNG/JPG/WebP, up to 6 MB each)</span></label>
            <input
              type="file" accept="image/png,image/jpeg,image/webp,image/gif" multiple
              onChange={(e) => setPending([...pending, ...Array.from(e.target.files ?? [])])}
              className="input" style={{ padding: 10 }}
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

            {/* Tags */}
            <label className="label" htmlFor="p-tag" style={{ marginTop: 12 }}>Tags * <span style={{ color: 'var(--faint)', fontWeight: 400 }}>(press Enter to add)</span></label>
            <input
              id="p-tag" className="input" value={tagInput}
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
            <button className="btn-primary" type="submit" disabled={saving} style={{ marginTop: 8 }}>
              {saving ? 'Publishing…' : <>Ship Project <IconArrow size={18} /></>}
            </button>
          </form>
        </section>
      )}

      <section className="band" style={{ borderTop: showForm ? '1px solid var(--line)' : 'none', paddingTop: showForm ? 40 : 0 }}>
        {loading ? (
          <p style={{ color: 'var(--faint)' }}>Loading…</p>
        ) : projects.length === 0 ? (
          <div className="empty">
            <p style={{ color: 'var(--muted)' }}>You haven&apos;t shipped anything yet. Click &ldquo;Add a Project&rdquo; above to ship your first.</p>
          </div>
        ) : (
          <div className="proj-grid">
            {projects.map((p) => <ProjectCard key={p.id} p={p} onDelete={() => remove(p.id)} />)}
          </div>
        )}
      </section>

      <Footer />
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
          <div className="tag-row" style={{ marginTop: 4 }}>
            {p.tags.map((t) => <span key={t} className="tag mini">#{t}</span>)}
          </div>
        )}
        <div className="proj-actions">
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm">Open</a>
          {onDelete && <button className="btn-ghost btn-sm danger" onClick={onDelete}>Delete</button>}
        </div>
      </div>
    </article>
  );
}
