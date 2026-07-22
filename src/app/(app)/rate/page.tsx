'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../components/AuthProvider';
import Footer from '../../../components/Footer';
import {
  getProjects, submitRating, getMyRating,
  type ProjectWithRating,
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

type Phase = 'loading' | 'ready' | 'submitting' | 'success' | 'done';

export default function RatePage() {
  const { user, openAuth } = useAuth();

  const [queue, setQueue] = useState<ProjectWithRating[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [current, setCurrent] = useState<ProjectWithRating | null>(null);
  const [phase, setPhase] = useState<Phase>('loading');
  const [visible, setVisible] = useState(false); // controls fade-in

  const [score, setScore] = useState({ originality: 0, technicality: 0, usability: 0, impact: 0 });
  const [feedback, setFeedback] = useState('');
  const [rateErr, setRateErr] = useState('');
  const [rated, setRated] = useState(0); // count rated this session

  // Load projects and filter out ones the user already rated
  useEffect(() => {
    if (!user) { setPageLoading(false); return; }
    (async () => {
      const all = await getProjects().catch(() => []);
      // Filter out own projects and already-rated
      const checks = await Promise.all(
        all
          .filter(p => p.user_id !== user.id)
          .map(async p => {
            const mine = await getMyRating(p.id, user.id);
            return mine ? null : p;
          })
      );
      const unrated = checks.filter(Boolean) as ProjectWithRating[];
      // Shuffle
      for (let i = unrated.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [unrated[i], unrated[j]] = [unrated[j], unrated[i]];
      }
      setQueue(unrated);
      setPageLoading(false);
    })();
  }, [user?.id]);

  // Pick next project from queue with fade-in animation
  const showNext = useCallback((q: ProjectWithRating[]) => {
    if (q.length === 0) { setCurrent(null); setPhase('done'); return; }
    const [next, ...rest] = q;
    setQueue(rest);
    setVisible(false);
    setScore({ originality: 0, technicality: 0, usability: 0, impact: 0 });
    setFeedback('');
    setRateErr('');
    setCurrent(next);
    setPhase('ready');
    setTimeout(() => setVisible(true), 50);
  }, []);

  useEffect(() => {
    if (!pageLoading && queue.length > 0 && !current) {
      showNext(queue);
    }
  }, [pageLoading, queue.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { openAuth('signin'); return; }
    if (!current) return;
    if (!score.originality || !score.technicality || !score.usability || !score.impact) {
      return setRateErr('Score all four categories.');
    }
    if (wordCount(feedback) < 15) {
      return setRateErr(`Feedback must be at least 15 words. You have ${wordCount(feedback)}.`);
    }
    setPhase('submitting'); setRateErr('');
    try {
      await submitRating({ project_id: current.id, user_id: user.id, ...score, feedback: feedback.trim() });
      setRated(r => r + 1);
      setPhase('success');
      setVisible(false);
      // After success animation, load next
      setTimeout(() => showNext(queue), 900);
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message ?? 'Something went wrong. Try again.';
      setRateErr(msg);
      setPhase('ready');
    }
  };

  const handleSkip = () => {
    setVisible(false);
    setTimeout(() => showNext(queue), 350);
  };

  if (!user) return (
    <div className="page">
      <section className="page-hero">
        <h1 className="ph-title">RATE</h1>
        <p className="ph-lede">Sign in to rate what the community has shipped.</p>
      </section>
      <section className="band" style={{ borderTop: 'none', paddingTop: 0 }}>
        <div className="empty">
          <p style={{ color: 'var(--muted)', marginBottom: 16 }}>You need an account to rate projects.</p>
          <button className="btn-primary" onClick={() => openAuth('signin')}>Sign In <IconArrow size={17} /></button>
        </div>
      </section>
      <Footer />
    </div>
  );

  return (
    <div className="page">
      <section className="page-hero">
        <h1 className="ph-title">RATE</h1>
        <p className="ph-lede">Score projects on Originality, Technicality, Usability &amp; Impact. Leave real feedback.</p>
      </section>

      <section className="band" style={{ borderTop: 'none', paddingTop: 0, paddingBottom: 60 }}>

        {/* Session counter */}
        {rated > 0 && (
          <div className="rate-session-badge">
            {rated} rated this session
          </div>
        )}

        {pageLoading ? (
          <div className="rate-card-shell rate-card-loading">
            <div className="rate-spinner" />
            <p style={{ color: 'var(--faint)', marginTop: 16 }}>Finding projects…</p>
          </div>

        ) : phase === 'done' || !current ? (
          <div className="rate-card-shell rate-all-done">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ marginBottom: 16 }}><circle cx="24" cy="24" r="22" stroke="var(--orange)" strokeWidth="2"/><path d="M14 24l7 7 13-13" stroke="var(--orange)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.6rem', marginBottom: 8 }}>All caught up!</h2>
            <p style={{ color: 'var(--muted)', marginBottom: 24 }}>
              {rated > 0 ? `You rated ${rated} project${rated !== 1 ? 's' : ''} this session. Come back when new ones are shipped.` : 'No unrated projects left. Check back after more projects are shipped.'}
            </p>
            <Link href="/display" className="btn-primary" style={{ display: 'inline-flex' }}>Browse all projects <IconArrow size={16} /></Link>
          </div>

        ) : (
          <div
            className={`rate-swipe-card${visible ? ' rate-card-in' : ''}${phase === 'success' ? ' rate-card-out' : ''}`}
          >
            {/* Project info */}
            <div className="rate-swipe-left">
              {current.screenshots[0] && (
                <img src={current.screenshots[0]} alt={current.title} className="rate-swipe-img" />
              )}
              <h2 className="rate-swipe-title">{current.title}</h2>
              <div className="rate-swipe-author">by {current.author_name || 'Anonymous'}</div>
              <p className="rate-swipe-desc">{current.description}</p>
              {current.tags.length > 0 && (
                <div className="tag-row" style={{ marginTop: 10, flexWrap: 'wrap' }}>
                  {current.tags.map(t => <span key={t} className="tag mini">#{t}</span>)}
                </div>
              )}
              {/^https?:\/\//.test(current.url) && (
                <a href={current.url} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm" style={{ display: 'inline-flex', marginTop: 16 }}>
                  Open project <IconArrow size={13} />
                </a>
              )}
            </div>

            {/* Rating form */}
            <div className="rate-swipe-right">
              <div className="rate-swipe-form-head">Rate this project</div>

              <form onSubmit={handleSubmit}>
                {CATEGORIES.map(c => (
                  <div key={c.key} className="rate-cat-row">
                    <div className="rate-cat-head">
                      <span className="rate-cat-label">{c.label}</span>
                      <span className="rate-cat-score">{score[c.key] > 0 ? `${score[c.key]}/5` : '—/5'}</span>
                    </div>
                    <div className="rate-cat-desc">{c.desc}</div>
                    <StarRating
                      value={score[c.key]}
                      onChange={v => setScore(s => ({ ...s, [c.key]: v }))}
                      size={30}
                      disabled={phase === 'submitting'}
                    />
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
                    placeholder="What worked well? What could improve? What impressed you?"
                    style={{ resize: 'vertical', marginTop: 6 }}
                    disabled={phase === 'submitting'}
                  />
                </div>

                {rateErr && <div className="msg-err">{rateErr}</div>}

                <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                  <button
                    type="button"
                    className="btn-ghost"
                    style={{ flex: 1 }}
                    onClick={handleSkip}
                    disabled={phase === 'submitting'}
                  >
                    Skip
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ flex: 2 }}
                    disabled={phase === 'submitting'}
                  >
                    {phase === 'submitting' ? 'Submitting…' : 'Submit Rating'}
                  </button>
                </div>
              </form>

              {queue.length > 0 && (
                <p style={{ color: 'var(--faint)', fontSize: '.78rem', textAlign: 'center', marginTop: 14 }}>
                  {queue.length} more project{queue.length !== 1 ? 's' : ''} to rate
                </p>
              )}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
