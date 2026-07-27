'use client';

import { useState } from 'react';
import { updateProject, type Project, type SocialBuzz } from '../lib/projects';
import { IconClose, IconArrow } from './icons';

const BUZZ_QUESTIONS: { key: keyof SocialBuzz; label: string; placeholder: string }[] = [
  { key: 'inspiration', label: 'What made you think of this idea?', placeholder: 'The spark that started it all…' },
  { key: 'how_built', label: 'How did you build it? What tools or tech did you use?', placeholder: 'Walk us through your process and stack…' },
  { key: 'biggest_challenge', label: 'What was the biggest challenge you faced?', placeholder: 'The hardest part of building this…' },
  { key: 'proud_of', label: "What's one thing you're most proud of?", placeholder: 'The feature or moment that made it worth it…' },
];

export default function EditProjectModal({
  project, userId, onClose, onSaved,
}: {
  project: Project; userId: string; onClose: () => void; onSaved: (p: Project) => void;
}) {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [url, setUrl] = useState(project.url);
  const [tags, setTags] = useState<string[]>(project.tags);
  const [tagInput, setTagInput] = useState('');
  const [buzz, setBuzz] = useState<SocialBuzz>(project.buzz ?? { inspiration: '', how_built: '', biggest_challenge: '', proud_of: '' });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const addTag = () => {
    const t = tagInput.trim().replace(/^#/, '').toLowerCase();
    if (!t || tags.includes(t) || tags.length >= 8) return;
    setTags([...tags, t]); setTagInput('');
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    if (!title.trim() || !description.trim() || !url.trim()) return setErr('Title, description and link are required.');
    if (tags.length === 0) return setErr('Add at least one tag.');
    setSaving(true);
    try {
      const filled = BUZZ_QUESTIONS.filter(q => buzz[q.key].trim().length > 0);
      const finalBuzz = filled.length === BUZZ_QUESTIONS.length ? buzz : null;
      await updateProject(project.id, userId, { title: title.trim(), description: description.trim(), url: url.trim(), tags, buzz: finalBuzz });
      onSaved({ ...project, title: title.trim(), description: description.trim(), url: url.trim(), tags, buzz: finalBuzz });
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="buzz-modal-scrim" onClick={onClose}>
      <div className="buzz-modal" onClick={(e) => e.stopPropagation()}>
        <button className="buzz-modal-close" onClick={onClose} aria-label="Close"><IconClose size={18} /></button>
        <div className="buzz-modal-body">
          <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.4rem', marginBottom: 18 }}>Edit Project</h2>
          <form onSubmit={save}>
            <label className="form-label">Title *</label>
            <input className="form-input" value={title} onChange={e => setTitle(e.target.value)} required />
            <label className="form-label">Description *</label>
            <textarea className="form-input" value={description} onChange={e => setDescription(e.target.value)} rows={4} required style={{ resize: 'vertical' }} />
            <label className="form-label">Project URL *</label>
            <input className="form-input" type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://…" required />
            <label className="form-label">Tags * <span style={{ color: 'var(--faint)', fontWeight: 400 }}>(press Enter)</span></label>
            <input className="form-input" value={tagInput} onChange={e => setTagInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }} placeholder="ai, web, hackathon…" />
            {tags.length > 0 && (
              <div className="tag-row" style={{ marginTop: 6 }}>
                {tags.map(t => (
                  <span key={t} className="tag">#{t}
                    <button type="button" className="tag-x" onClick={() => setTags(tags.filter(x => x !== t))}><IconClose size={12} /></button>
                  </span>
                ))}
              </div>
            )}

            <div className="buzz-badge" style={{ marginTop: 22, marginBottom: 8 }}>Social Buzz</div>
            {BUZZ_QUESTIONS.map(q => (
              <div key={q.key}>
                <label className="form-label buzz-q">{q.label}</label>
                <textarea
                  className="form-input buzz-textarea"
                  rows={2}
                  placeholder={q.placeholder}
                  value={buzz[q.key]}
                  onChange={e => setBuzz(b => ({ ...b, [q.key]: e.target.value }))}
                  style={{ resize: 'vertical' }}
                />
              </div>
            ))}

            {err && <div className="msg-err">{err}</div>}
            <div className="form-actions" style={{ marginTop: 16 }}>
              <button type="button" className="btn-ghost" onClick={onClose}>Cancel</button>
              <button className="btn-primary" type="submit" disabled={saving}>
                {saving ? 'Saving…' : <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>Save changes <IconArrow size={14} /></span>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
