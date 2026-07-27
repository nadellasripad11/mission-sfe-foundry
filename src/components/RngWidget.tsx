'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from './AuthProvider';
import {
  rollForToday, rerollForToday, rollQuality,
  rerollCooldownRemaining, formatCooldown, type DailyRoll,
} from '../lib/dailyRoll';
import { IconLock } from './AchievementIcons';

export default function RngWidget() {
  const { user } = useAuth();
  const [roll, setRoll] = useState<DailyRoll | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [rerolling, setRerolling] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    rollForToday(user.id, user.name || user.email.split('@')[0], user.avatarUrl)
      .then(setRoll)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user?.id, user?.avatarUrl]);

  // Tick the cooldown countdown once a second.
  useEffect(() => {
    if (!roll) return;
    const tick = () => setRemaining(rerollCooldownRemaining(roll));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [roll]);

  const copyToShare = () => {
    if (!roll) return;
    navigator.clipboard.writeText(
      `I rolled ${roll.roll_value.toLocaleString()} today on SFE Foundry — ${rollQuality(roll.roll_value)}.`
    ).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const handleReroll = async () => {
    if (!user || rerolling) return;
    if (remaining > 0) {
      setNotice(`Wait ${formatCooldown(remaining)} to reroll.`);
      setTimeout(() => setNotice(''), 2500);
      return;
    }
    setRerolling(true);
    setNotice('');
    try {
      const next = await rerollForToday(user.id, user.name || user.email.split('@')[0], user.avatarUrl);
      setRoll(next);
    } catch (err) {
      setNotice(err instanceof Error ? err.message : 'Reroll failed.');
      setTimeout(() => setNotice(''), 2500);
    } finally {
      setRerolling(false);
    }
  };

  if (!user) return null;

  const canReroll = remaining <= 0;

  return (
    <div className="rng-widget">
      <div className="rng-label">rng</div>
      {loading ? (
        <div className="rng-value" style={{ opacity: .4 }}>—</div>
      ) : roll ? (
        <>
          <div className="rng-value">{roll.roll_value.toLocaleString()}</div>
          <div className="rng-quality">{rollQuality(roll.roll_value)}</div>
          <button className="rng-btn rng-btn-share" onClick={copyToShare}>
            {copied ? 'Copied!' : 'Copy to share'}
          </button>
          <button
            className={`rng-btn rng-btn-reroll${canReroll ? ' ready' : ''}`}
            onClick={handleReroll}
            disabled={rerolling}
            title={canReroll ? 'Reroll now' : `Reroll available in ${formatCooldown(remaining)}`}
          >
            {rerolling
              ? 'Rolling…'
              : canReroll
                ? 'Reroll'
                : <>Reroll in {formatCooldown(remaining)} <IconLock size={13} /></>}
          </button>
          {notice && <div className="rng-notice">{notice}</div>}
          <Link href="/leaderboard" className="rng-leaderboard-link">View full leaderboard →</Link>
        </>
      ) : (
        <div className="rng-value" style={{ opacity: .4 }}>—</div>
      )}
    </div>
  );
}
