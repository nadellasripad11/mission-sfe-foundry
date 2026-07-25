'use client';

import { useState } from 'react';
import { useAuth } from './AuthProvider';
import { toggleLike, type SocialCounts } from '../lib/projectSocial';
import { IconHeart, IconComment, IconEye } from './icons';

export default function SocialBar({
  projectId,
  counts,
  onCountsChange,
  onOpenComments,
}: {
  projectId: string;
  counts: SocialCounts;
  onCountsChange: (c: SocialCounts) => void;
  onOpenComments?: () => void;
}) {
  const { user, openAuth } = useAuth();
  const [liking, setLiking] = useState(false);

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

  const handleComments = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onOpenComments?.();
  };

  return (
    <div className="social-bar" onClick={(e) => e.stopPropagation()}>
      <button className="social-btn" onClick={handleComments} aria-label="Comments">
        <IconComment size={18} /> {counts.comments}
      </button>
      <button className={`social-btn${counts.likedByMe ? ' liked' : ''}`} onClick={handleLike} aria-label="Like">
        <IconHeart size={18} fill={counts.likedByMe} /> {counts.likes}
      </button>
      <span className="social-views"><IconEye size={18} /> {counts.views}</span>
    </div>
  );
}
