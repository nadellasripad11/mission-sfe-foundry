'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../../components/AuthProvider';
import Footer from '../../../../components/Footer';
import {
  getProject, getProjectRatings, submitRating, getMyRating,
  type Project, type CategoryRating,
} from '../../../../lib/projects';
import { IconArrow } from '../../../../components/icons';
import StarRating from '../../../../components/StarRating';

const BUZZ_QUESTIONS_KEYS = ['inspiration', 'how_built', 'biggest_challenge', 'proud_of'];

const CATEGORIES: { key: 'originality' | 'technicality' | 'usability' | 'impact'; label: string; desc: string }[] = [
  { key: 'originality', label: 'Originality', desc: 'How unique or creative is the core idea?' },
  { key: 'technicality', label: 'Technicality', desc: 'How impressive is the technical execution?' },
  { key: 'usability', label: 'Usability', desc: 'How easy and intuitive is it to use?' },
  { key: 'impact', label: 'Impact', desc: 'How meaningful is the problem it solves?' },
];

const BUZZ_LABELS: Record<string, string> = {
  inspiration: '💡 What sparked the idea',
  how_built: '🔧 How it was built',
  biggest_challenge: '🧗 Biggest challenge',
  proud_of: '🏆 Most proud of',
};

function ScoreBar({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="score-bar-wrap">
      <div className="score-bar-track">
        <div className="score-bar-fill" style={{ width: `${(value / max) * 100}%` }} />
      </div>
      <span className="score-bar-val">{value > 0 ? value.toFixed(1) : '—'}<span className="score-bar-max">/{max}</span></span>
    </div>
  );
}

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const { user, openAuth } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [ratings, setRatings] = useState<CategoryRating[]>([]);
  const [myRating, setMyRating] = useState<CategoryRating | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgIdx, setImgIdx] = useState(0);

  // Rating form state
  const [rating, setRating] = useState({ originality: 0, technicality: 0, usability: 0, impact: 0 });
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [rateErr, setRateErr] = useState('');
  const [rateDone, setRateDone] = useState(false);

  const load = async () => {
    const [p, r] = await Promise.all([
      getProject(id),
      getProjectRatings(id),
    ]);
    setProject(p);
    setRatings(r);
    if (user) {
      const mine = await getMyRating(id, user.id);
      if (mine) {
        setMyRating(mine);
        setRating({ originality: mine.originality, technicality: mine.technicality, usability: mine.usability, impact: mine.impact });
        setFeedback(mine.feedback ?? '');
        setRateDone(true);
      }
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, [id, user?.id]);

  const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

  const handleSubmitRating = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { openAuth('signin'); return; }
    if (!rating.originality || !rating.technicality || !rating.usability || !rating.impact) {
      return setRateErr('Please score all four categories.');
    }
    if (wordCount(feedback) < 15) {
      return setRateErr(`Feedback must be at least 15 words. You have ${wordCount(feedback)}.`);
    }
    setSubmitting(true); setRateErr('');
    try {
      await submitRating({ project_id: id, user_id: user.id, ...rating, feedback: feedback.trim() });
      const [r, mine] = await Promise.all([getProjectRatings(id), getMyRating(id, user.id)]);
      setRatings(r); setMyRating(mine); setRateDone(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : (err as { message?: string })?.message ?? JSON.stringify(err);
      setRateErr(msg || 'Something went wrong. Try again.');
    }
    finally { setSubmitting(false); }
  };

  // Aggregate scores
  const n = ratings.length;
  const avg = n > 0 ? {
    originality: ratings.reduce((s, r) => s + r.originality, 0) / n,
    technicality: ratings.reduce((s, r) => s + r.technicality, 0) / n,
    usability: ratings.reduce((s, r) => s + r.usability, 0) / n,
    impact: ratings.reduce((s, r) => s + r.impact, 0) / n,
  } : null;

  if (loading) return <div className="page"><p style={{ padding: 60, textAlign: 'center', color: 'var(--faint)' }}>Loading…</p></div>;
  if (!project) return <div className="page"><p style={{ padding: 60, textAlign: 'center', color: 'var(--muted)' }}>Project not found.</p></div>;

  const hasBuzz = project.buzz && Object.values(project.buzz).some(v => v?.trim());

  return (
    <div className="page">
      <section className="band proj-detail-band">
        {/* Breadcrumb */}
        <div className="proj-breadcrumb">
          <Link href="/display" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Display</Link>
          <span style={{ color: 'var(--faint)', margin: '0 6px' }}>/</span>
          <span style={{ color: 'var(--fg)' }}>{project.title}</span>
        </div>

        <div className="proj-detail-layout">
          {/* Left: screenshots + info */}
          <div className="proj-detail-left">
            {project.screenshots.length > 0 && (
              <div className="proj-gallery">
                <img src={project.screenshots[imgIdx]} alt={project.title} className="proj-gallery-main" />
                {project.screenshots.length > 1 && (
                  <div className="proj-gallery-thumbs">
                    {project.screenshots.map((s, i) => (
                      <button key={i} className={`proj-thumb${imgIdx === i ? ' on' : ''}`} onClick={() => setImgIdx(i)}>
                        <img src={s} alt="" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="proj-detail-meta">
              <h1 className="proj-detail-title">{project.title}</h1>
              <div className="proj-detail-author">by {project.author_name || 'Anonymous'}</div>
              <p className="proj-detail-desc">{project.description}</p>
              {project.tags.length > 0 && (
                <div className="tag-row" style={{ marginTop: 12 }}>
                  {project.tags.map(t => <span key={t} className="tag mini">#{t}</span>)}
                </div>
              )}
              {/^https?:\/\//.test(project.url) && (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-flex', marginTop: 16 }}>
                  Open Project <IconArrow size={16} />
                </a>
              )}
            </div>

            {/* Social Buzz */}
            {hasBuzz && (
              <div className="proj-buzz-section">
                <div className="proj-buzz-header">
                  <span className="proj-buzz-badge">Social Buzz</span>
                  <span className="proj-buzz-title">The builder&apos;s story</span>
                </div>
                <div className="proj-buzz-grid">
                  {BUZZ_QUESTIONS_KEYS.filter(k => (project.buzz as Record<string, string>)[k]?.trim()).map(k => (
                    <div key={k} className="proj-buzz-card">
                      <div className="proj-buzz-q">{BUZZ_LABELS[k]}</div>
                      <div className="proj-buzz-a">{(project.buzz as Record<string, string>)[k]}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Community feedback */}
            {ratings.filter(r => r.feedback?.trim()).length > 0 && (
              <div className="proj-feedback-section">
                <h3 className="proj-section-title">Community Feedback</h3>
                <div className="proj-feedback-list">
                  {ratings.filter(r => r.feedback?.trim()).map(r => (
                    <div key={r.id} className="proj-feedback-card">
                      <p className="proj-feedback-text">&ldquo;{r.feedback}&rdquo;</p>
                      <div className="proj-feedback-scores">
                        {CATEGORIES.map(c => (
                          <span key={c.key} className="proj-feedback-score">
                            {c.label}: <strong>{r[c.key]}/5</strong>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: scores + rating form */}
          <div className="proj-detail-right">
            {/* Aggregate scores */}
            <div className="proj-scores-card">
              <div className="proj-scores-head">
                <span className="proj-scores-title">Community Scores</span>
                <span className="proj-scores-count">{n} rating{n !== 1 ? 's' : ''}</span>
              </div>
              {avg ? (
                <div className="proj-scores-list">
                  {CATEGORIES.map(c => (
                    <div key={c.key} className="proj-score-row">
                      <div className="proj-score-label">{c.label}</div>
                      <ScoreBar value={avg[c.key]} />
                    </div>
                  ))}
                  <div className="proj-score-overall">
                    Overall <strong>{((avg.originality + avg.technicality + avg.usability + avg.impact) / 4).toFixed(1)}</strong>/5
                  </div>
                </div>
              ) : (
                <p style={{ color: 'var(--muted)', fontSize: '.88rem', marginTop: 8 }}>No ratings yet — be the first!</p>
              )}
            </div>

            {/* Rating form */}
            <div className="proj-rate-card">
              <h3 className="proj-rate-title">{rateDone ? 'Your Rating' : 'Rate This Project'}</h3>
              {!user ? (
                <div>
                  <p style={{ color: 'var(--muted)', fontSize: '.88rem', marginBottom: 12 }}>Sign in to leave a rating.</p>
                  <button className="btn-primary" style={{ width: '100%' }} onClick={() => openAuth('signin')}>Sign In <IconArrow size={15} /></button>
                </div>
              ) : (
                <form onSubmit={handleSubmitRating}>
                  {CATEGORIES.map(c => (
                    <div key={c.key} className="rate-cat-row">
                      <div className="rate-cat-head">
                        <span className="rate-cat-label">{c.label}</span>
                        <span className="rate-cat-score">{rating[c.key] > 0 ? `${rating[c.key]}/5` : '—/5'}</span>
                      </div>
                      <div className="rate-cat-desc">{c.desc}</div>
                      <StarRating value={rating[c.key]} onChange={v => setRating(r => ({ ...r, [c.key]: v }))} size={28} />
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
                      placeholder="Share your thoughts on this project — what worked, what could be better, what impressed you…"
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
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
