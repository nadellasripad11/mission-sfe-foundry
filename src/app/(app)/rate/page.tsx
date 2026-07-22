'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../components/AuthProvider';
import Footer from '../../../components/Footer';
import {
  getProjects, getProjectRatings, submitRating, getMyRating,
  type ProjectWithRating, type CategoryRating,
} from '../../../lib/projects';
import { IconArrow } from '../../../components/icons';
import StarRating from '../../../components/StarRating';

const CATEGORIES = [
  { key: 'originality'  as const, label: 'Originality',  desc: 'How unique or creative is the core idea?' },
  { key: 'technicality' as const, label: 'Technicality', desc: 'How impressive is the technical execution?' },
  { key: 'usability'    as const, label: 'Usability',    desc: 'How easy and intuitive is it to use?' },
  { key: 'impact'       as const, label: 'Impact',       desc: 'How meaningful is the problem it solves?' },
];

function wordCount(s: string) { return s.trim().split(/\s+/).filter(Boolean).length; }

export default function RatePage() {
  const { user, openAuth } = useAuth();
  const [projects, setProjects] = useState<ProjectWithRating[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ProjectWithRating | null>(null);

  // Rating state
  const [ratings, setRatings] = useState<CategoryRating[]>([]);
  const [myRating, setMyRating] = useState<CategoryRating | null>(null);
  const [score, setScore] = useState({ originality: 0, technicality: 0, usability: 0, impact: 0 });
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [rateErr, setRateErr] = useState('');
  const [rateDone, setRateDone] = useState(false);
  const [loadingRating, setLoadingRating] = useState(false);

  useEffect(() => {
    getProjects()
      .then(p => { setProjects(p); setLoading(false); })
      .catch(() => setLoading(false));
  }, [user?.id]);

  const selectProject = async (p: ProjectWithRating) => {
    setSelected(p);
    setRateErr(''); setRateDone(false);
    setScore({ originality: 0, technicality: 0, usability: 0, impact: 0 });
    setFeedback('');
    setMyRating(null);
    setLoadingRating(true);
    const [r, mine] = await Promise.all([
      getProjectRatings(p.id),
      user ? getMyRating(p.id, user.id) : Promise.resolve(null),
    ]);
    setRatings(r);
    if (mine) {
      setMyRating(mine);
      setScore({ originality: mine.originality, technicality: mine.technicality, usability: mine.usability, impact: mine.impact });
      setFeedback(mine.feedback ?? '');
      setRateDone(true);
    }
    setLoadingRating(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { openAuth('signin'); return; }
    if (!selected) return;
    if (!score.originality || !score.technicality || !score.usability || !score.impact) {
      return setRateErr('Score all four categories.');
    }
    if (wordCount(feedback) < 15) {
      return setRateErr(`Feedback must be at least 15 words. You have ${wordCount(feedback)}.`);
    }
    setSubmitting(true); setRateErr('');
    try {
      await submitRating({ project_id: selected.id, user_id: user.id, ...score, feedback: feedback.trim() });
      const [r, mine] = await Promise.all([getProjectRatings(selected.id), getMyRating(selected.id, user.id)]);
      setRatings(r); setMyRating(mine); setRateDone(true);
    } catch (err: unknown) {
      console.error('submitRating error:', err);
      const msg = err instanceof Error ? err.message : JSON.stringify(err);
      setRateErr(`Error: ${msg}`);
    }
    finally { setSubmitting(false); }
  };

  // Aggregate for selected project
  const n = ratings.length;
  const avg = n > 0 ? {
    originality:  ratings.reduce((s,r) => s + r.originality,  0) / n,
    technicality: ratings.reduce((s,r) => s + r.technicality, 0) / n,
    usability:    ratings.reduce((s,r) => s + r.usability,    0) / n,
    impact:       ratings.reduce((s,r) => s + r.impact,       0) / n,
  } : null;

  return (
    <div className="page">
      <section className="page-hero">
        <h1 className="ph-title">RATE</h1>
        <p className="ph-lede">Pick a project, score it across four categories, and leave written feedback.</p>
      </section>

      <section className="band" style={{ borderTop: 'none', paddingTop: 0, paddingBottom: 0 }}>
        {!user ? (
          <div className="empty" style={{ padding: '60px 0' }}>
            <p style={{ color: 'var(--muted)', marginBottom: 16 }}>Sign in to rate projects.</p>
            <button className="btn-primary" onClick={() => openAuth('signin')}>Sign In <IconArrow size={17} /></button>
          </div>
        ) : loading ? (
          <p style={{ color: 'var(--faint)', padding: '40px 0' }}>Loading…</p>
        ) : projects.length === 0 ? (
          <div className="empty" style={{ padding: '60px 0' }}>
            <p style={{ color: 'var(--muted)', marginBottom: 16 }}>No projects to rate yet.</p>
            <Link href="/my-projects" className="btn-primary" style={{ display: 'inline-flex' }}>Ship the first <IconArrow size={17} /></Link>
          </div>
        ) : (
          <div className="rate-layout">

            {/* ── Left: project picker ── */}
            <div className="rate-picker">
              <div className="rate-picker-head">Projects</div>
              {projects.map(p => (
                <button
                  key={p.id}
                  className={`rate-picker-item${selected?.id === p.id ? ' active' : ''}`}
                  onClick={() => selectProject(p)}
                >
                  {p.screenshots[0] && (
                    <img src={p.screenshots[0]} alt="" className="rate-picker-thumb" />
                  )}
                  <div className="rate-picker-info">
                    <div className="rate-picker-title">{p.title}</div>
                    <div className="rate-picker-author">by {p.author_name || 'Anonymous'}</div>
                    {p.count > 0
                      ? <div className="rate-picker-score">{'★'.repeat(Math.round(p.overall))} {p.overall.toFixed(1)}/5</div>
                      : <div className="rate-picker-unrated">No ratings yet</div>
                    }
                  </div>
                </button>
              ))}
            </div>

            {/* ── Center: project detail ── */}
            {selected ? (
              <div className="rate-detail">
                {selected.screenshots[0] && (
                  <img src={selected.screenshots[0]} alt={selected.title} className="rate-detail-img" />
                )}
                <h2 className="rate-detail-title">{selected.title}</h2>
                <div className="rate-detail-author">by {selected.author_name || 'Anonymous'}</div>
                <p className="rate-detail-desc">{selected.description}</p>
                {selected.tags.length > 0 && (
                  <div className="tag-row" style={{ marginTop: 10 }}>
                    {selected.tags.map(t => <span key={t} className="tag mini">#{t}</span>)}
                  </div>
                )}
                {/^https?:\/\//.test(selected.url) && (
                  <a href={selected.url} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm" style={{ display: 'inline-flex', marginTop: 14 }}>
                    Open Project <IconArrow size={13} />
                  </a>
                )}

                {/* Community scores */}
                {avg && (
                  <div className="rate-detail-scores">
                    <div className="rate-detail-scores-title">{n} community rating{n !== 1 ? 's' : ''}</div>
                    {CATEGORIES.map(c => (
                      <div key={c.key} className="rate-detail-score-row">
                        <span className="rate-detail-score-label">{c.label}</span>
                        <div className="rate-detail-bar-wrap">
                          <div className="rate-detail-bar" style={{ width: `${(avg[c.key] / 5) * 100}%` }} />
                        </div>
                        <span className="rate-detail-score-val">{avg[c.key].toFixed(1)}/5</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="rate-detail rate-detail-empty">
                <div style={{ color: 'var(--faint)', fontSize: '1rem' }}>← Select a project to view and rate it</div>
              </div>
            )}

            {/* ── Right: rating form ── */}
            <div className="rate-form-col">
              {!selected ? (
                <div className="rate-form-card" style={{ color: 'var(--faint)', fontSize: '.9rem', textAlign: 'center', padding: '48px 24px' }}>
                  Select a project first
                </div>
              ) : loadingRating ? (
                <div className="rate-form-card" style={{ color: 'var(--faint)', fontSize: '.9rem', textAlign: 'center', padding: '48px 24px' }}>
                  Loading…
                </div>
              ) : (
                <div className="rate-form-card">
                  <h3 className="rate-form-title">{rateDone ? 'Your Rating' : 'Rate This Project'}</h3>
                  <form onSubmit={handleSubmit}>
                    {CATEGORIES.map(c => (
                      <div key={c.key} className="rate-cat-row">
                        <div className="rate-cat-head">
                          <span className="rate-cat-label">{c.label}</span>
                          <span className="rate-cat-score">{score[c.key] > 0 ? `${score[c.key]}/5` : '—/5'}</span>
                        </div>
                        <div className="rate-cat-desc">{c.desc}</div>
                        <StarRating value={score[c.key]} onChange={v => setScore(s => ({ ...s, [c.key]: v }))} size={28} />
                      </div>
                    ))}

                    <div className="rate-feedback-row">
                      <label className="rate-feedback-label">
                        Written Feedback *
                        <span className={`rate-word-count${wordCount(feedback) >= 15 ? ' ok' : ''}`}>
                          {wordCount(feedback)}/15 words min
                        </span>
                      </label>
                      <textarea
                        className="form-input"
                        rows={4}
                        value={feedback}
                        onChange={e => setFeedback(e.target.value)}
                        placeholder="Share your thoughts — what worked, what could improve, what impressed you…"
                        style={{ resize: 'vertical', marginTop: 6 }}
                      />
                    </div>

                    {rateErr && <div className="msg-err">{rateErr}</div>}

                    <button
                      type="submit"
                      className="btn-primary"
                      style={{ width: '100%', marginTop: 12 }}
                      disabled={submitting}
                    >
                      {submitting ? 'Submitting…' : rateDone ? 'Update Rating' : 'Submit Rating'}
                    </button>

                    {rateDone && myRating && (
                      <p style={{ color: 'var(--muted)', fontSize: '.8rem', marginTop: 8, textAlign: 'center' }}>
                        You rated this on {new Date(myRating.created_at).toLocaleDateString()}
                      </p>
                    )}
                  </form>
                </div>
              )}
            </div>

          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
