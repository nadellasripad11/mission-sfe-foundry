'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../components/AuthProvider';
import { getProjects, type ProjectWithRating } from '../../../lib/projects';
import { IconArrow } from '../../../components/icons';
import RngWidget from '../../../components/RngWidget';
import ReferralCard from '../../../components/ReferralCard';
import SocialBar from '../../../components/SocialBar';
import BuzzModal from '../../../components/BuzzModal';
import { getSocialCounts, type SocialCounts } from '../../../lib/projectSocial';

const BUZZ_KEYS = ['inspiration', 'how_built', 'biggest_challenge', 'proud_of'] as const;
const BODY_PREVIEW_LEN = 260;
const EMPTY_COUNTS: SocialCounts = { likes: 0, comments: 0, views: 0, likedByMe: false };

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function buzzParagraph(p: ProjectWithRating): string {
  const buzzMap = p.buzz as Record<string, string>;
  return BUZZ_KEYS.map(k => buzzMap[k]?.trim()).filter(Boolean).join(' ');
}

function BuzzPost({
  p, counts, onCountsChange, onOpen,
}: {
  p: ProjectWithRating; counts: SocialCounts; onCountsChange: (c: SocialCounts) => void; onOpen: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  const paragraph = buzzParagraph(p);
  const isLong = paragraph.length > BODY_PREVIEW_LEN;
  const shown = expanded || !isLong ? paragraph : paragraph.slice(0, BODY_PREVIEW_LEN).trimEnd() + '…';
  const initial = (p.author_name?.trim()?.[0] || '?').toUpperCase();

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a, button, input')) return;
    onOpen();
  };

  return (
    <article className="buzz-post" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="buzz-post-head">
        <div className="buzz-post-avatar">{initial}</div>
        <div className="buzz-post-meta">
          <span className="buzz-post-user">{p.author_name || 'Anonymous'}</span> on{' '}
          <Link href={`/project/${p.id}`} className="buzz-post-project-link">{p.title}</Link>
          <span className="buzz-post-time"> · {timeAgo(p.created_at)}</span>
        </div>
      </div>

      <h3 className="buzz-post-title">{p.title}</h3>
      <hr className="buzz-post-divider" />

      <p className="buzz-post-body">{shown}</p>
      {isLong && (
        <button className="buzz-post-readmore" onClick={(e) => { e.stopPropagation(); setExpanded(x => !x); }}>
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}

      {p.screenshots.length > 0 && (
        <div className="buzz-post-carousel">
          <img src={p.screenshots[imgIndex]} alt="" />
          {p.screenshots.length > 1 && (
            <div className="buzz-post-dots">
              {p.screenshots.map((_, i) => (
                <button
                  key={i}
                  className={`buzz-post-dot${i === imgIndex ? ' on' : ''}`}
                  onClick={(e) => { e.stopPropagation(); setImgIndex(i); }}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="buzz-post-footer">
        <Link href={`/project/${p.id}`} className="buzz-post-link">View project <IconArrow size={13} /></Link>
      </div>
      <SocialBar projectId={p.id} counts={counts} onCountsChange={onCountsChange} onOpenComments={onOpen} />
    </article>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<ProjectWithRating[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [socialCounts, setSocialCounts] = useState<Record<string, SocialCounts>>({});
  const [openPostId, setOpenPostId] = useState<string | null>(null);

  const load = async () => {
    try {
      setError('');
      const p = await getProjects().catch(() => []);
      setProjects(p);
    } catch (err) {
      console.error('Dashboard load error:', err);
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (user) load(); }, [user?.id]);

  // Projects with Social Buzz for the buzz feed
  const buzzProjects = projects.filter(p => p.buzz && Object.values(p.buzz as Record<string, string>).some(v => v?.trim()));

  useEffect(() => {
    if (buzzProjects.length === 0) return;
    getSocialCounts(buzzProjects.map(p => p.id), user?.id).then(setSocialCounts).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects.length, user?.id]);

  const updateCounts = (id: string, c: SocialCounts) => setSocialCounts(prev => ({ ...prev, [id]: c }));
  const openPost = openPostId ? buzzProjects.find(p => p.id === openPostId) ?? null : null;

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.name || 'Builder'}.</h1>
          <p>Here&apos;s what&apos;s happening at SFE Foundry.</p>
        </div>
        <p style={{ color: 'var(--faint)' }}>Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.name || 'Builder'}.</h1>
          <p>Here&apos;s what&apos;s happening at SFE Foundry.</p>
        </div>
        <div className="empty">
          <p style={{ color: '#E74C3C', marginBottom: 16 }}>{error}</p>
          <button onClick={load} className="btn-primary">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name || 'Builder'}.</h1>
        <p>Here&apos;s what&apos;s happening at SFE Foundry.</p>
      </div>

      {/* ── Social Buzz Feed + RNG widget ── */}
      <section className="buzz-feed-section">
        <div className="buzz-feed-head">
          <span className="buzz-feed-badge">Social Buzz</span>
          <h2 className="buzz-feed-title">Builder Stories</h2>
          <p className="buzz-feed-sub">Real stories from builders in your community.</p>
        </div>
        <div className="dashboard-buzz-row">
          <div className="buzz-post-list">
            {buzzProjects.length === 0 ? (
              <div className="empty">
                <p style={{ color: 'var(--muted)' }}>No builder stories yet — be the first to share one.</p>
              </div>
            ) : (
              buzzProjects.slice(0, 6).map(p => (
                <BuzzPost
                  key={p.id}
                  p={p}
                  counts={socialCounts[p.id] ?? EMPTY_COUNTS}
                  onCountsChange={(c) => updateCounts(p.id, c)}
                  onOpen={() => setOpenPostId(p.id)}
                />
              ))
            )}
          </div>
          <div className="dashboard-side-col">
            <ReferralCard />
            <RngWidget />
          </div>
        </div>
      </section>

      {/* ── All Projects Feed ── */}
      <section>
        <div className="dash-section-head">
          <h2 className="dash-section-title">Latest Ships</h2>
          <Link href="/display" className="dash-section-link">See all <IconArrow size={14} /></Link>
        </div>
        {projects.length === 0 ? (
          <div className="empty">
            <p style={{ color: 'var(--muted)', marginBottom: 16 }}>No projects yet. Be the first to ship!</p>
            <Link href="/my-projects" className="btn-primary" style={{ display: 'inline-flex' }}>
              Ship Your Project <IconArrow size={17} />
            </Link>
          </div>
        ) : (
          <div className="proj-grid" style={{ marginTop: 16 }}>
            {projects.slice(0, 6).map((p) => (
              <Link key={p.id} href={`/project/${p.id}`} style={{ textDecoration: 'none' }}>
                <article className="proj-card rate-card-hover">
                  {p.screenshots[0] && <div className="proj-shot"><img src={p.screenshots[0]} alt="" /></div>}
                  <div className="proj-body">
                    <div className="proj-title">{p.title}</div>
                    <div className="proj-author">by {p.author_name || 'Anonymous'}</div>
                    <p className="proj-desc">{p.description}</p>
                    {p.buzz && <div className="display-buzz-hint">Builder story inside</div>}
                    {p.count > 0 ? (
                      <div className="rate-card-scores" style={{ marginTop: 8 }}>
                        {(['originality', 'technicality', 'usability', 'impact'] as const).map(k => (
                          <div key={k} className="rate-card-score">
                            <span className="rate-card-score-label">{k.slice(0, 4).toUpperCase()}</span>
                            <span className="rate-card-score-val">{p[k].toFixed(1)}/5</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ color: 'var(--faint)', fontSize: '.82rem', marginTop: 8 }}>No ratings yet</div>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>

      {openPost && (
        <BuzzModal
          post={openPost}
          paragraph={buzzParagraph(openPost)}
          counts={socialCounts[openPost.id] ?? EMPTY_COUNTS}
          onCountsChange={(c) => updateCounts(openPost.id, c)}
          onClose={() => setOpenPostId(null)}
        />
      )}
    </div>
  );
}
