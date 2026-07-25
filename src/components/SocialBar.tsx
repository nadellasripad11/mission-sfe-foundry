'use client';

import { useState } from 'react';
import { useAuth } from './AuthProvider';
import { toggleLike, getComments, addComment, type Comment, type SocialCounts } from '../lib/projectSocial';
import { IconHeart, IconComment, IconEye } from './icons';

export default function SocialBar({
  projectId,
  counts,
  onCountsChange,
}: {
  projectId: string;
  counts: SocialCounts;
  onCountsChange: (c: SocialCounts) => void;
}) {
  const { user, openAuth } = useAuth();
  const [liking, setLiking] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [commentText, setCommentText] = useState('');
  const [posting, setPosting] = useState(false);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { openAuth('signin'); return; }
    if (liking) return;
    setLiking(true);
    const nextLiked = !counts.likedByMe;
    onCountsChange({ ...counts, likedByMe: nextLiked, likes: counts.likes + (nextLiked ? 1 : -1) });
    try {
      await toggleLike(projectId, user.id, counts.likedByMe);
    } catch {
      onCountsChange(counts); // revert on failure
    } finally {
      setLiking(false);
    }
  };

  const openComments = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowComments(s => !s);
    if (!comments) {
      const c = await getComments(projectId).catch(() => []);
      setComments(c);
    }
  };

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { openAuth('signin'); return; }
    if (!commentText.trim() || posting) return;
    setPosting(true);
    try {
      const c = await addComment(projectId, user.id, user.name || user.email.split('@')[0], commentText);
      setComments(prev => [c, ...(prev ?? [])]);
      onCountsChange({ ...counts, comments: counts.comments + 1 });
      setCommentText('');
    } catch {
      // no-op, keep text so user can retry
    } finally {
      setPosting(false);
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div className="social-bar">
        <button className={`social-btn${counts.likedByMe ? ' liked' : ''}`} onClick={handleLike} aria-label="Like">
          <IconHeart size={17} fill={counts.likedByMe} /> {counts.likes}
        </button>
        <button className="social-btn" onClick={openComments} aria-label="Comments">
          <IconComment size={17} /> {counts.comments}
        </button>
        <span className="social-views"><IconEye size={17} /> {counts.views}</span>
      </div>

      {showComments && (
        <div className="social-comments">
          <form onSubmit={submitComment} className="social-comment-form">
            <input
              className="input" style={{ margin: 0, flex: 1 }}
              placeholder={user ? 'Add a comment…' : 'Sign in to comment'}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              disabled={!user || posting}
            />
            <button type="submit" className="btn-sm-primary" disabled={!user || posting}>Post</button>
          </form>
          {comments === null ? (
            <p style={{ color: 'var(--faint)', fontSize: '.85rem', marginTop: 8 }}>Loading…</p>
          ) : comments.length === 0 ? (
            <p style={{ color: 'var(--faint)', fontSize: '.85rem', marginTop: 8 }}>No comments yet.</p>
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
        </div>
      )}
    </div>
  );
}
