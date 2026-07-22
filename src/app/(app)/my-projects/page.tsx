'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../components/AuthProvider';
import { supabase } from '../../../lib/supabaseClient';
import { createProject, deleteProject, getMyProjects, type Project, type SocialBuzz } from '../../../lib/projects';
import { uploadImage } from '../../../lib/uploadImage';
import { IconArrow, IconClose } from '../../../components/icons';

// ── Helpers ──────────────────────────────────────────────────────────────────
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB

async function uploadProfileFile(file: File, userId: string, kind: 'avatar' | 'banner') {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) throw new Error('Only JPEG, PNG, WebP, or GIF images are allowed.');
  if (file.size > MAX_UPLOAD_BYTES) throw new Error('Image must be 5 MB or smaller.');
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const path = `${userId}/${kind}-${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from('projects').upload(path, file, { contentType: file.type, upsert: true });
  if (error) throw error;
  return supabase.storage.from('projects').getPublicUrl(path).data.publicUrl;
}

function formatJoined(iso?: string) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// ── Edit overlay (Stardance style) ────────────────────────────────────────────
function EditProfile({
  initialBio, initialBanner, initialAvatar, avatarLetter, username, joinedAt, projectCount,
  onSave, onCancel,
}: {
  initialBio: string; initialBanner: string; initialAvatar: string; avatarLetter: string;
  username: string; joinedAt: string; projectCount: number;
  onSave: (bio: string, bannerUrl: string, avatarUrl: string) => void;
  onCancel: () => void;
}) {
  const [bio, setBio] = useState(initialBio);
  const [bannerUrl, setBannerUrl] = useState(initialBanner);
  const [avatarUrl, setAvatarUrl] = useState(initialAvatar);
  const [savingBanner, setSavingBanner] = useState(false);
  const [savingAvatar, setSavingAvatar] = useState(false);
  const [verifiedDismissed, setVerifiedDismissed] = useState(false);
  const { user } = useAuth();
  const bannerRef = useRef<HTMLInputElement>(null);
  const avatarRef = useRef<HTMLInputElement>(null);

  const pickBanner = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f || !user) return;
    setSavingBanner(true);
    try { setBannerUrl(await uploadProfileFile(f, user.id, 'banner')); } catch {}
    setSavingBanner(false);
  };

  const pickAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f || !user) return;
    setSavingAvatar(true);
    try { setAvatarUrl(await uploadProfileFile(f, user.id, 'avatar')); } catch {}
    setSavingAvatar(false);
  };

  return (
    <div className="ep-overlay">
      {/* ── Banner ── */}
      <div
        className="ep-banner"
        onClick={() => bannerRef.current?.click()}
        style={bannerUrl ? { backgroundImage: `url(${bannerUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      >
        {/* Back button inside banner, top-left */}
        <button className="ep-back" onClick={(e) => { e.stopPropagation(); onCancel(); }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>

        {/* "Upload banner" centered label */}
        <div className="ep-banner-label">
          {savingBanner ? 'Uploading…' : bannerUrl ? 'Click to change banner' : 'Upload banner'}
        </div>

        <input ref={bannerRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={pickBanner} />
      </div>

      {/* ── Profile panel ── */}
      <div className="ep-panel">
        {/* Avatar + username row */}
        <div className="ep-profile-row">
          <div className="ep-avatar-wrap" onClick={() => avatarRef.current?.click()}>
            {avatarUrl
              ? <img src={avatarUrl} alt="avatar" className="ep-avatar-img" />
              : <div className="ep-avatar-letter">{avatarLetter}</div>
            }
            <div className="ep-avatar-overlay">
              {savingAvatar
                ? <span style={{ fontSize: '.75rem' }}>…</span>
                : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
              }
            </div>
            <input ref={avatarRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={pickAvatar} />
          </div>

          <div className="ep-user-info">
            <div className="ep-username">@{username}</div>
            {joinedAt && <div className="ep-joined">Joined {joinedAt}</div>}
          </div>
        </div>

        {/* Stats */}
        <div className="ep-stats">
          <div className="ep-stat"><span className="ep-stat-n">0</span><span className="ep-stat-l">Devlogs</span></div>
          <div className="ep-stat"><span className="ep-stat-n">{projectCount}</span><span className="ep-stat-l">Projects</span></div>
          <div className="ep-stat"><span className="ep-stat-n">0</span><span className="ep-stat-l">Ships</span></div>
          <div className="ep-stat"><span className="ep-stat-n">0</span><span className="ep-stat-l">Votes</span></div>
        </div>

        {/* Bio textarea */}
        <textarea
          className="ep-bio-input"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell people about yourself…"
          maxLength={200}
        />
        <div className="ep-bio-hint">
          Type <kbd>@</kbd> to mention a user, <kbd>$</kbd> to link a project.
        </div>

        {/* Verified badge */}
        {!verifiedDismissed && (
          <div className="ep-verified">
            You&apos;re verified — your work is now public!{' '}
            <button onClick={() => setVerifiedDismissed(true)} className="ep-verified-x">×</button>
          </div>
        )}

        {/* Footer: following + actions */}
        <div className="ep-footer">
          <div className="ep-follow-counts">
            <span><strong>0</strong> following</span>
            <span><strong>0</strong> followers</span>
          </div>
          <div className="ep-actions">
            <button className="ep-btn-cancel" onClick={onCancel}>Cancel</button>
            <button className="ep-btn-save" onClick={() => onSave(bio, bannerUrl, avatarUrl)}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Ship project form ─────────────────────────────────────────────────────────
const BUZZ_QUESTIONS: { key: keyof SocialBuzz; label: string; placeholder: string }[] = [
  { key: 'inspiration', label: 'What made you think of this idea?', placeholder: 'The spark that started it all…' },
  { key: 'how_built', label: 'How did you build it? What tools or tech did you use?', placeholder: 'Walk us through your process and stack…' },
  { key: 'biggest_challenge', label: 'What was the biggest challenge you faced?', placeholder: 'The hardest part of building this…' },
  { key: 'proud_of', label: "What's one thing you're most proud of?", placeholder: 'The feature or moment that made it worth it…' },
];

function ShipForm({ userId, authorName, onDone }: { userId: string; authorName: string; onDone: () => void }) {
  const [step, setStep] = useState<'details' | 'buzz'>('details');
  const [title, setTitle] = useState('Untitled');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [pending, setPending] = useState<File[]>([]);
  const [buzz, setBuzz] = useState<SocialBuzz>({ inspiration: '', how_built: '', biggest_challenge: '', proud_of: '' });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const addTag = () => {
    const t = tagInput.trim().replace(/^#/, '').toLowerCase();
    if (!t || tags.includes(t) || tags.length >= 8) return;
    setTags([...tags, t]); setTagInput('');
  };

  const goToBuzz = (e: React.FormEvent) => {
    e.preventDefault(); setErr('');
    if (!title.trim() || !description.trim() || !url.trim()) return setErr('Title, description and link are required.');
    if (pending.length === 0) return setErr('Add at least one screenshot.');
    if (tags.length === 0) return setErr('Add at least one tag.');
    setStep('buzz');
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setErr('');
    const filledBuzz = BUZZ_QUESTIONS.filter(q => buzz[q.key].trim().length > 0);
    const finalBuzz = filledBuzz.length === BUZZ_QUESTIONS.length ? buzz : null;
    setSaving(true);
    try {
      const urls: string[] = [];
      for (const f of pending) urls.push(await uploadImage(f, userId));
      await createProject({ user_id: userId, author_name: authorName, title: title.trim(), description: description.trim(), url: url.trim(), screenshots: urls, tags, buzz: finalBuzz });
      onDone();
    } catch (e: unknown) { setErr(e instanceof Error ? e.message : 'Something went wrong.'); }
    finally { setSaving(false); }
  };

  if (step === 'buzz') {
    return (
      <form className="project-form" onSubmit={submit}>
        <div className="buzz-header">
          <div className="buzz-badge">Social Buzz</div>
          <h2>Tell your story</h2>
          <p className="buzz-sub">These answers appear on your project page and the homepage feed. All optional — but the community loves reading them.</p>
        </div>
        {BUZZ_QUESTIONS.map(q => (
          <div key={q.key}>
            <label className="form-label buzz-q">{q.label}</label>
            <textarea
              className="form-input buzz-textarea"
              rows={3}
              placeholder={q.placeholder}
              value={buzz[q.key]}
              onChange={e => setBuzz(b => ({ ...b, [q.key]: e.target.value }))}
              style={{ resize: 'vertical' }}
            />
          </div>
        ))}
        {err && <div className="msg-err">{err}</div>}
        <div className="form-actions">
          <button type="button" className="btn-ghost" onClick={() => setStep('details')} style={{display:'inline-flex',alignItems:'center',gap:6}}><IconArrow size={14} style={{transform:'rotate(180deg)'}}/> Back</button>
          <button className="btn-primary" type="submit" disabled={saving}>
            {saving ? 'Publishing…' : <span style={{display:'inline-flex',alignItems:'center',gap:6}}>Ship Project <IconArrow size={14}/></span>}
          </button>
        </div>
        <p className="buzz-skip-hint">Skip any questions you prefer not to answer — they won&apos;t be shown if empty.</p>
      </form>
    );
  }

  return (
    <form className="project-form" onSubmit={goToBuzz}>
      <h2>Ship Your Project</h2>
      <label className="form-label">Title *</label>
      <input className="form-input" value={title} onChange={e => setTitle(e.target.value)} required />
      <label className="form-label">Description *</label>
      <textarea className="form-input" value={description} onChange={e => setDescription(e.target.value)} rows={4} required style={{ resize: 'vertical' }} />
      <label className="form-label">Project URL *</label>
      <input className="form-input" type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://…" required />
      <label className="form-label">Screenshots * <span style={{ color: 'var(--faint)', fontWeight: 400 }}>(PNG/JPG/WebP)</span></label>
      <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" multiple
        onChange={e => setPending([...pending, ...Array.from(e.target.files ?? [])])} className="form-input" style={{ padding: 10 }} />
      {pending.length > 0 && (
        <div className="tag-row" style={{ marginTop: 4 }}>
          {pending.map((f, i) => (
            <span key={i} className="tag">{f.name}
              <button type="button" className="tag-x" onClick={() => setPending(pending.filter((_, j) => j !== i))}><IconClose size={12} /></button>
            </span>
          ))}
        </div>
      )}
      <label className="form-label">Tags * <span style={{ color: 'var(--faint)', fontWeight: 400 }}>(press Enter)</span></label>
      <input className="form-input" value={tagInput} onChange={e => setTagInput(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }} placeholder="ai, web, hackathon…" />
      {tags.length > 0 && (
        <div className="tag-row">
          {tags.map(t => (
            <span key={t} className="tag">#{t}
              <button type="button" className="tag-x" onClick={() => setTags(tags.filter(x => x !== t))}><IconClose size={12} /></button>
            </span>
          ))}
        </div>
      )}
      {err && <div className="msg-err">{err}</div>}
      <button className="btn-primary" type="submit" style={{ marginTop: 16, width: '100%' }}>
        <span style={{display:'inline-flex',alignItems:'center',gap:6}}>Next: Tell Your Story <IconArrow size={14}/></span>
      </button>
    </form>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function MyProjectsPage() {
  const { user, openAuth, ready } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'projects' | 'feed'>('projects');
  const [editing, setEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Profile fields (persisted in Supabase user_metadata)
  const [bio, setBio] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [joinedAt, setJoinedAt] = useState('');

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    // Load profile from user metadata
    supabase.auth.getUser().then(({ data }) => {
      const meta = data.user?.user_metadata ?? {};
      setBio(meta.bio || '');
      setBannerUrl(meta.banner_url || '');
      setAvatarUrl(meta.avatar_url || '');
      setJoinedAt(data.user?.created_at || '');
    });
    getMyProjects(user.id).then(p => setProjects(p)).catch(() => {}).finally(() => setLoading(false));
  }, [user?.id]);

  const saveProfile = async (newBio: string, newBanner: string, newAvatar: string) => {
    setBio(newBio); setBannerUrl(newBanner); setAvatarUrl(newAvatar);
    setEditing(false);
    await supabase.auth.updateUser({ data: { bio: newBio, banner_url: newBanner, avatar_url: newAvatar } });
  };

  const username = user?.name?.toLowerCase().replace(/\s+/g, '') || user?.email?.split('@')[0] || 'user';
  const avatarLetter = (user?.name?.trim()?.[0] || user?.email?.[0] || '?').toUpperCase();

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
      <div className="mp-main">
        {/* Profile card — switches between view and edit mode inline */}
        <div className="mp-profile-card">
        {editing ? (
          <EditProfile
            initialBio={bio} initialBanner={bannerUrl} initialAvatar={avatarUrl} avatarLetter={avatarLetter}
            username={username} joinedAt={formatJoined(joinedAt)} projectCount={projects.length}
            onSave={saveProfile} onCancel={() => setEditing(false)}
          />
        ) : (<>
          {/* Banner */}
          <div className="mp-banner" onClick={() => setEditing(true)}
            style={bannerUrl ? { backgroundImage: `url(${bannerUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
            {!bannerUrl && <div className="mp-banner-default"><span>Click to add banner</span></div>}
          </div>

          {/* Profile row */}
          <div className="mp-profile-row">
            <div className="mp-avatar" onClick={() => setEditing(true)}>
              {avatarUrl ? <img src={avatarUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} /> : avatarLetter}
            </div>
            <div className="mp-profile-info">
              <div className="mp-username">@{username}</div>
              {joinedAt && <div className="mp-joined">Joined {formatJoined(joinedAt)}</div>}
              {bio && <div className="mp-bio">{bio}</div>}
            </div>
          </div>

          {/* Stats */}
          <div className="mp-stats">
            <div className="mp-stat"><span className="mp-stat-n">{projects.length}</span><span className="mp-stat-l">Projects</span></div>
            <div className="mp-stat"><span className="mp-stat-n">0</span><span className="mp-stat-l">Devlogs</span></div>
            <div className="mp-stat"><span className="mp-stat-n">0</span><span className="mp-stat-l">Ships</span></div>
            <div className="mp-stat"><span className="mp-stat-n">0</span><span className="mp-stat-l">Votes</span></div>
          </div>

          {/* Edit profile link */}
          <button className="mp-edit-link" onClick={() => setEditing(true)}>Edit profile</button>
        </>)}
        </div>

        {/* Ship form */}
        {showForm && (
          <div className="project-form-section">
            <ShipForm userId={user?.id ?? ''} authorName={user?.name ?? user?.email ?? ''} onDone={() => { setShowForm(false); getMyProjects(user!.id).then(setProjects); }} />
          </div>
        )}

        {/* Tabs + New Project */}
        <div className="project-tabs">
          <button className={`project-tab${tab === 'feed' ? ' active' : ''}`} onClick={() => setTab('feed')}>Feed</button>
          <button className={`project-tab${tab === 'projects' ? ' active' : ''}`} onClick={() => setTab('projects')}>
            Projects ({projects.length})
          </button>
          <button className="mp-new-project-btn" onClick={() => { setTab('projects'); setShowForm(s => !s); }}>
            {showForm ? '✕ Close' : '+ New Project'}
          </button>
        </div>

        {/* Content */}
        {tab === 'projects' && (
          loading ? <p style={{ color: 'var(--faint)', textAlign: 'center', padding: 40 }}>Loading…</p>
          : projects.length === 0 ? (
            <div className="empty"><p style={{ color: 'var(--muted)' }}>No projects yet. Ship your first!</p></div>
          ) : (
            <div className="proj-grid">
              {projects.map(p => <ProjectCard key={p.id} p={p} onDelete={async () => { if (!user) return; await deleteProject(p.id, user.id); setProjects(projects.filter(x => x.id !== p.id)); }} />)}
            </div>
          )
        )}
        {tab === 'feed' && <div className="empty"><p style={{ color: 'var(--muted)' }}>Feed coming soon</p></div>}
      </div>

      {/* Achievements sidebar */}
      <div className="profile-achievements">
        <h3 className="achievements-title">Achievements</h3>
        <div className="achievements-progress">
          <div className="achievements-count">{projects.length > 0 ? '1' : '0'} / 11 earned</div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${(Math.min(projects.length, 11) / 11) * 100}%` }} /></div>
        </div>
        <Link href="/achievements" className="achievements-link" style={{display:'inline-flex',alignItems:'center',gap:4}}>See all achievements <IconArrow size={12}/></Link>
      </div>
    </div>
  );
}

function ProjectCard({ p, onDelete }: { p: Project; onDelete?: () => void }) {
  return (
    <article className="proj-card">
      {p.screenshots[0] && <div className="proj-shot"><img src={p.screenshots[0]} alt="" /></div>}
      <div className="proj-body">
        <div className="proj-title">{p.title}</div>
        <p className="proj-desc">{p.description}</p>
        {p.tags.length > 0 && (
          <div className="tag-row" style={{ marginTop: 8 }}>
            {p.tags.map(t => <span key={t} className="tag mini">#{t}</span>)}
          </div>
        )}
        <div className="proj-actions" style={{ marginTop: 12 }}>
          {/^https?:\/\//.test(p.url) && (
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm">Open</a>
          )}
          {onDelete && <button className="btn-ghost btn-sm danger" onClick={onDelete}>Delete</button>}
        </div>
      </div>
    </article>
  );
}
