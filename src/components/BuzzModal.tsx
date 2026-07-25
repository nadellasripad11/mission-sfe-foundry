'use client';

import { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import { getComments, addComment, type Comment, type SocialCounts } from '../lib/projectSocial';
import { IconClose } from './icons';
import SocialBar from './SocialBar';

type BuzzPostLike = {
  id: string;
  title: string;
  author_name: string | null;
  screenshots: string[];
};

export default function BuzzModal({
  post,
  paragraph,
  counts,
  onCountsChange,
  onClose,
}: {
  post: BuzzPostLike;
  paragraph: string;
  counts: SocialCounts;
  onCountsChange: (c: SocialCounts) => void;
  onClose: () => void;
}) {
  const { user, openAuth } = useAuth();
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [commentText, setCommentText] = useState('');
  const [posting, setPosting] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    getComments(post.id).then(setComments).catch(() => setComments([]));
  }, [post.id]);

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { openAuth('signin'); return; }
    if (!commentText.trim() || posting) return;
    setPosting(true);
    try {
      const c = await addComment(post.id, user.id, user.name || user.email.split('@')[0], commentText);
      setComments(prev => [c, ...(prev ?? [])]);
      onCountsChange({ ...counts, comments: counts.comments + 1 });
      setCommentText('');
    } catch {
      // keep text so user can retry
    } finally {
      setPosting(false);
    }
  };

  const initial = (user?.name?.trim()?.[0] || user?.email[0] || '?').toUpperCase();

  return (
    <div className="buzz-modal-scrim" onClick={onClose}>
      <div className="buzz-modal" onClick={(e) => e.stopPropagation()}>
        <button className="buzz-modal-close" onClick={onClose} aria-label="Close"><IconClose size={18} /></button>

        <div className="buzz-modal-body">
          <div className="buzz-post-head">
            <div className="buzz-post-avatar">{(post.author_name?.trim()?.[0] || '?').toUpperCase()}</div>
            <div className="buzz-post-meta">
              <span className="buzz-post-user">{post.author_name || 'Anonymous'}</span> on{' '}
              <span className="buzz-post-project-link">{post.title}</span>
            </div>
          </div>

          <h3 className="buzz-post-title">{post.title}</h3>
          <hr className="buzz-post-divider" />
          <p className="buzz-post-body">{paragraph}</p>

          {post.screenshots.length > 0 && (
            <div className="buzz-post-carousel">
              <img src={post.screenshots[imgIndex]} alt="" />
              {post.screenshots.length > 1 && (
                <div className="buzz-post-dots">
                  {post.screenshots.map((_, i) => (
                    <button key={i} className={`buzz-post-dot${i === imgIndex ? ' on' : ''}`} onClick={() => setImgIndex(i)} aria-label={`Image ${i + 1}`} />
                  ))}
                </div>
              )}
            </div>
          )}

          <SocialBar projectId={post.id} counts={counts} onCountsChange={onCountsChange} />

          <div className="buzz-modal-comments">
            <div className="buzz-modal-comments-head">
              Comments <span className="buzz-modal-comments-count">{counts.comments}</span>
            </div>

            {comments === null ? (
              <p style={{ color: 'var(--faint)', fontSize: '.88rem' }}>Loading…</p>
            ) : comments.length === 0 ? (
              <p style={{ color: 'var(--faint)', fontSize: '.88rem' }}>No comments yet. Be the first!</p>
            ) : (
              <div className="social-comment-list">
                {comments.map(c => (
                  <div key={c.id} className="social-comment">
                    <span className="social-comment-name">{c.display_name}</span>
                    <span className="social-comment-body">{c.body}</span>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={submitComment} className="buzz-modal-comment-form">
              <div className="buzz-post-avatar" style={{ width: 34, height: 34, fontSize: '.8rem' }}>{initial}</div>
              <input
                className="input" style={{ margin: 0, flex: 1 }}
                placeholder={user ? 'Add a comment…' : 'Sign in to comment'}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                disabled={!user || posting}
              />
              <button type="submit" className="btn-sm-primary" disabled={!user || posting}>Comment</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
