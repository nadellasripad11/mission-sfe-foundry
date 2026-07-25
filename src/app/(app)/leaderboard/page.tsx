'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../components/AuthProvider';
import { getLeaderboard, type DailyRoll } from '../../../lib/dailyRoll';
import { IconArrow, IconChevron } from '../../../components/icons';

function dateOffset(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function formatDay(dateStr: string): string {
  if (dateStr === dateOffset(0)) return 'Today';
  if (dateStr === dateOffset(-1)) return 'Yesterday';
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function Avatar({ name, avatarUrl }: { name: string; avatarUrl?: string | null }) {
  const initial = (name.trim()[0] || '?').toUpperCase();
  return <div className="lb-avatar">{avatarUrl ? <img src={avatarUrl} alt="" /> : initial}</div>;
}

export default function LeaderboardPage() {
  const { user, ready, openAuth } = useAuth();
  const [offset, setOffset] = useState(0);
  const [rolls, setRolls] = useState<DailyRoll[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const date = dateOffset(offset);

  useEffect(() => {
    setLoading(true);
    getLeaderboard(date).then(({ rolls, total }) => {
      setRolls(rolls);
      setTotal(total);
    }).finally(() => setLoading(false));
  }, [date]);

  if (!ready) return null;

  if (!user) {
    return (
      <div style={{ padding: '60px 32px', textAlign: 'center' }}>
        <p style={{ color: 'var(--faint)', marginBottom: 16 }}>Sign in to see the leaderboard.</p>
        <button className="btn-primary" onClick={() => openAuth('signin')}>Sign In</button>
      </div>
    );
  }

  const [first, second, third, ...rest] = rolls;

  return (
    <div style={{ padding: '40px 32px 80px', maxWidth: 720, margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>Daily Random Number</h1>
      <p style={{ color: 'var(--faint)', marginBottom: 28 }}>Get a random number each day. Biggest number wins.</p>

      <div className="lb-daynav">
        <button className="lb-daynav-btn" onClick={() => setOffset(o => o - 1)} aria-label="Previous day">
          <IconChevron size={18} style={{ transform: 'rotate(180deg)' }} />
        </button>
        <div style={{ textAlign: 'center' }}>
          <div className="lb-daynav-title">{formatDay(date)}</div>
          <div className="lb-daynav-sub">{total} roll{total === 1 ? '' : 's'}</div>
        </div>
        <button className="lb-daynav-btn" onClick={() => setOffset(o => o + 1)} disabled={offset >= 0} aria-label="Next day">
          <IconChevron size={18} />
        </button>
      </div>

      {loading ? (
        <p style={{ color: 'var(--faint)', textAlign: 'center', marginTop: 40 }}>Loading…</p>
      ) : rolls.length === 0 ? (
        <p style={{ color: 'var(--faint)', textAlign: 'center', marginTop: 40 }}>No rolls yet for this day.</p>
      ) : (
        <>
          {first && (
            <div className="lb-first-card">
              <span className="lb-star">★</span>
              <Avatar name={first.display_name} avatarUrl={first.avatar_url} />
              <div className="lb-first-name">{first.display_name}</div>
              <div className="lb-first-value">{first.roll_value.toLocaleString()}</div>
            </div>
          )}

          {(second || third) && (
            <div className="lb-podium-row">
              {second && (
                <div className="lb-podium-card">
                  <div className="lb-rank">#2</div>
                  <Avatar name={second.display_name} avatarUrl={second.avatar_url} />
                  <div className="lb-podium-name">{second.display_name}</div>
                  <div className="lb-podium-value">{second.roll_value.toLocaleString()}</div>
                </div>
              )}
              {third && (
                <div className="lb-podium-card">
                  <div className="lb-rank">#3</div>
                  <Avatar name={third.display_name} avatarUrl={third.avatar_url} />
                  <div className="lb-podium-name">{third.display_name}</div>
                  <div className="lb-podium-value">{third.roll_value.toLocaleString()}</div>
                </div>
              )}
            </div>
          )}

          {rest.length > 0 && (
            <div className="lb-list">
              {rest.map((r, i) => (
                <div key={r.id} className="lb-row">
                  <span className="lb-row-rank">#{i + 4}</span>
                  <Avatar name={r.display_name} avatarUrl={r.avatar_url} />
                  <span className="lb-row-name">{r.display_name}</span>
                  <span className="lb-row-value">{r.roll_value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <Link href="/dashboard" className="band-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 32 }}>
        <IconArrow size={14} style={{ transform: 'rotate(180deg)' }} /> Back to dashboard
      </Link>
    </div>
  );
}
