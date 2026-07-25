'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from './AuthProvider';
import { rollForToday, rollQuality, type DailyRoll } from '../lib/dailyRoll';
import { IconLock } from './AchievementIcons';

export default function RngWidget() {
  const { user } = useAuth();
  const [roll, setRoll] = useState<DailyRoll | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    rollForToday(user.id, user.name || user.email.split('@')[0])
      .then(setRoll)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user?.id]);

  const copyToShare = () => {
    if (!roll) return;
    navigator.clipboard.writeText(
      `I rolled ${roll.roll_value.toLocaleString()} today on SFE Foundry — ${rollQuality(roll.roll_value)}.`
    ).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  if (!user) return null;

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
          <button className="rng-btn rng-btn-reroll" disabled title="Reroll unlocks soon">
            Reroll <IconLock size={13} />
          </button>
          <Link href="/leaderboard" className="rng-leaderboard-link">View full leaderboard →</Link>
        </>
      ) : (
        <div className="rng-value" style={{ opacity: .4 }}>—</div>
      )}
    </div>
  );
}
