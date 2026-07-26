'use client';

import { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import { getOrCreateReferralProfile, type ReferralProfile } from '../lib/referrals';

export default function ReferralCard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ReferralProfile | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user) return;
    getOrCreateReferralProfile(user.id).then(setProfile).catch(() => {});
  }, [user?.id]);

  if (!user || !profile) return null;

  const referralLink = `${typeof window !== 'undefined' ? window.location.origin : 'https://sfe-foundery.vercel.app'}/join?ref=${profile.referral_code}`;

  const copy = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div className="referral-card">
      <div className="referral-card-label">Your referral code</div>
      <div className="referral-card-code">{profile.referral_code}</div>
      <button className="referral-card-btn" onClick={copy}>{copied ? 'Copied!' : 'Copy invite link'}</button>
      <div className="referral-card-count">{profile.referral_count} referred so far</div>
    </div>
  );
}
