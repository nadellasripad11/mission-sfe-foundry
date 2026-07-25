'use client';

import { useAuth } from '../../../components/AuthProvider';
import { useEffect, useState } from 'react';
import { getOrCreateReferralProfile, earnedReferralBadges, REFERRAL_BADGES, type ReferralProfile } from '../../../lib/referrals';
import { ACHIEVEMENTS, TOTAL_BADGES, buildAchievementCtx, type AchievementCtx } from '../../../lib/achievements';
import {
  IconConnector, IconNetworker, IconEvangelist, IconAmbassador, IconLock,
} from '../../../components/AchievementIcons';

const REFERRAL_BADGE_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  connector:  IconConnector,
  networker:  IconNetworker,
  evangelist: IconEvangelist,
  ambassador: IconAmbassador,
};

const EMPTY_CTX: AchievementCtx = {
  projectCount: 0, referralCount: 0, maxRatingsOnProject: 0, totalRatingsReceived: 0, votesCast: 0, hasHardwareTag: false, hasAiTag: false,
};

export default function AchievementsPage() {
  const { user, ready, openAuth } = useAuth();
  const [ctx, setCtx] = useState<AchievementCtx>(EMPTY_CTX);
  const [profile, setProfile] = useState<ReferralProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user || !ready) return;
    getOrCreateReferralProfile(user.id).catch(() => null).then(async (rp) => {
      setProfile(rp);
      const c = await buildAchievementCtx(user.id, rp?.referral_count ?? 0);
      setCtx(c);
    }).finally(() => setLoading(false));
  }, [user?.id, ready]);

  if (!ready) return null;

  if (!user) {
    return (
      <div style={{ padding: '60px 32px', textAlign: 'center' }}>
        <p style={{ color: 'var(--faint)', marginBottom: 16 }}>Sign in to see your achievements.</p>
        <button className="btn-primary" onClick={() => openAuth('signin')}>Sign In</button>
      </div>
    );
  }

  const earnedMain = ACHIEVEMENTS.filter(a => a.check(ctx));
  const earnedRef = earnedReferralBadges(ctx.referralCount);
  const totalEarned = earnedMain.length + earnedRef.length;
  const totalBadges = TOTAL_BADGES;

  const referralLink = profile
    ? `${typeof window !== 'undefined' ? window.location.origin : 'https://sfe-foundery.vercel.app'}/join?ref=${profile.referral_code}`
    : '';

  const copyLink = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ padding: '40px 32px 80px', maxWidth: 900, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--ink)', marginBottom: 8, letterSpacing: '-0.01em' }}>
          Achievements
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--faint)', marginBottom: 24 }}>
          Complete challenges and unlock badges
        </p>

        {/* Progress bar */}
        <div style={{ background: 'var(--white)', border: '1px solid var(--line)', borderRadius: 12, padding: 20, marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '.85rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--muted)' }}>Progress</span>
            <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--ink)' }}>{totalEarned} / {totalBadges}</span>
          </div>
          <div style={{ width: '100%', height: 8, background: 'var(--line)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: 'linear-gradient(90deg, var(--orange), #FF7F50)', borderRadius: 4, width: `${(totalEarned / totalBadges) * 100}%`, transition: 'width 0.3s ease' }} />
          </div>
        </div>
      </div>

      {/* ── Referral Section ── */}
      <div style={{ background: 'var(--white)', border: '2px solid var(--orange)', borderRadius: 16, padding: 28, marginBottom: 48 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '.75rem', fontWeight: 700, textTransform: 'uppercase', background: 'var(--orange)', color: '#fff', padding: '2px 10px', borderRadius: 99 }}>Referrals</span>
          <span style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--ink)' }}>Invite builders, earn badges</span>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '.9rem', marginBottom: 20 }}>
          Share your link. Every person who joins using it counts toward referral badges. You have referred <strong style={{ color: 'var(--ink)' }}>{ctx.referralCount}</strong> {ctx.referralCount === 1 ? 'person' : 'people'} so far.
        </p>

        {/* Referral link box */}
        {loading ? (
          <div style={{ color: 'var(--faint)', fontSize: '.9rem' }}>Loading your link…</div>
        ) : referralLink ? (
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200, background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 8, padding: '10px 14px', fontFamily: 'var(--mono)', fontSize: '.82rem', color: 'var(--ink)', wordBreak: 'break-all' }}>
              {referralLink}
            </div>
            <button
              className="btn-primary"
              onClick={copyLink}
              style={{ whiteSpace: 'nowrap', minWidth: 110 }}
            >
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        ) : null}

        {/* Referral badge progress */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14, marginTop: 24 }}>
          {REFERRAL_BADGES.map(badge => {
            const earned = ctx.referralCount >= badge.requiredReferrals;
            const Icon = REFERRAL_BADGE_ICONS[badge.id];
            const progress = Math.min(ctx.referralCount / badge.requiredReferrals, 1);
            return (
              <div
                key={badge.id}
                style={{
                  background: earned ? 'var(--white)' : 'var(--panel)',
                  border: earned ? `2px solid ${badge.color}` : '1px solid var(--line)',
                  borderRadius: 12,
                  padding: '18px 16px',
                  opacity: earned ? 1 : 0.65,
                  transition: 'all 0.18s',
                  position: 'relative',
                }}
              >
                <div style={{ color: earned ? badge.color : 'var(--muted)', marginBottom: 10, position: 'relative', display: 'inline-block' }}>
                  <Icon size={40} />
                  {!earned && (
                    <div style={{ position: 'absolute', top: -6, right: -6, background: 'var(--ink)', color: 'var(--white)', width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--white)' }}>
                      <IconLock size={12} />
                    </div>
                  )}
                </div>
                <div style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '.95rem', marginBottom: 4 }}>{badge.title}</div>
                <div style={{ fontSize: '.8rem', color: 'var(--faint)', marginBottom: 10 }}>{badge.requiredReferrals} referral{badge.requiredReferrals > 1 ? 's' : ''}</div>
                {!earned && (
                  <div style={{ width: '100%', height: 4, background: 'var(--line)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: badge.color, width: `${progress * 100}%`, borderRadius: 2 }} />
                  </div>
                )}
                {earned && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '.78rem', fontWeight: 600, color: badge.color, fontFamily: 'var(--mono)' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Earned
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Main Achievements ── */}
      <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--ink)', marginBottom: 20 }}>All Achievements</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {ACHIEVEMENTS.map(achievement => {
          const isEarned = achievement.check(ctx);
          return (
            <div
              key={achievement.id}
              style={{
                background: isEarned ? 'var(--white)' : 'var(--panel)',
                border: isEarned ? '2px solid var(--orange)' : '1px solid var(--line)',
                borderRadius: 12,
                padding: 24,
                opacity: isEarned ? 1 : 0.6,
                transition: 'all 0.18s',
              }}
            >
              <div style={{ position: 'relative', marginBottom: 12, width: 48, height: 48, color: isEarned ? 'var(--orange)' : 'var(--muted)' }}>
                <achievement.Icon size={48} />
                {!isEarned && (
                  <div style={{ position: 'absolute', top: -6, right: -6, background: 'var(--ink)', color: 'var(--white)', width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--white)' }}>
                    <IconLock size={14} />
                  </div>
                )}
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{achievement.title}</h3>
              <p style={{ fontSize: '.88rem', color: 'var(--faint)', marginBottom: 12 }}>{achievement.description}</p>
              {isEarned
                ? <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '.8rem', fontWeight: 600, color: 'var(--orange)', fontFamily: 'var(--mono)' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Earned
                  </div>
                : <div style={{ fontSize: '.8rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>Locked</div>
              }
            </div>
          );
        })}
      </div>
    </div>
  );
}
