'use client';

import { useAuth } from '../../../components/AuthProvider';
import { useEffect, useState } from 'react';
import { getMyProjects } from '../../../lib/projects';
import Link from 'next/link';
import { IconArrow } from '../../../components/icons';
import {
  IconFirstProject,
  IconMultiProject,
  IconProlic,
  IconVoted,
  IconHundredVotes,
  IconHardware,
  IconAI,
  IconStreak,
  IconCommunity,
  IconFounder,
  IconMystery,
  IconLock,
} from '../../../components/AchievementIcons';

const ACHIEVEMENTS = [
  { id: 1, title: 'First Project', description: 'Ship your first project.', Icon: IconFirstProject, earned: false },
  { id: 2, title: '5 Projects', description: 'Ship 5 projects.', Icon: IconMultiProject, earned: false },
  { id: 3, title: 'Ultra Prolific', description: 'Ship 10 projects.', Icon: IconProlic, earned: false },
  { id: 4, title: 'Voted For', description: 'Get 5 votes on a project.', Icon: IconVoted, earned: false },
  { id: 5, title: '100 Votes', description: 'Get 100 total votes.', Icon: IconHundredVotes, earned: false },
  { id: 6, title: 'Hardware Builder', description: 'Ship a hardware project.', Icon: IconHardware, earned: false },
  { id: 7, title: 'AI Pioneer', description: 'Ship a project using AI.', Icon: IconAI, earned: false },
  { id: 8, title: '7-Day Streak', description: 'Contribute 7 days in a row.', Icon: IconStreak, earned: false },
  { id: 9, title: 'Community Champion', description: 'Rate 20 projects.', Icon: IconCommunity, earned: false },
  { id: 10, title: 'Founder', description: 'Ship in the SFE Foundry launch month.', Icon: IconFounder, earned: false },
  { id: 11, title: 'Mystery Badge', description: 'Unknown achievement unlocked...', Icon: IconMystery, earned: false },
];

export default function AchievementsPage() {
  const { user, ready } = useAuth();
  const [projectCount, setProjectCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !ready) return;
    getMyProjects(user.id)
      .then((p) => {
        setProjectCount(p.length);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user, ready]);

  if (!ready || !user) {
    return (
      <div style={{ padding: '40px 32px', textAlign: 'center' }}>
        <p style={{ color: 'var(--faint)' }}>Loading...</p>
      </div>
    );
  }

  const earnedCount = Math.min(projectCount > 0 ? 1 : 0, 11);

  return (
    <div style={{ padding: '40px 32px 60px' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '8px', letterSpacing: '-0.01em' }}>
          Achievements
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--faint)', marginBottom: '24px' }}>
          Complete challenges and unlock badges
        </p>

        {/* Progress Section */}
        <div style={{ background: 'var(--white)', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '.85rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--muted)' }}>
              Progress
            </span>
            <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--ink)' }}>
              {earnedCount} / 11
            </span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'var(--line)', borderRadius: '4px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, var(--orange), #FF7F50)',
                borderRadius: '4px',
                width: `${(earnedCount / 11) * 100}%`,
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {ACHIEVEMENTS.map((achievement) => {
          const isEarned = achievement.id === 1 && projectCount > 0;
          return (
            <div
              key={achievement.id}
              style={{
                background: isEarned ? 'var(--white)' : 'var(--panel)',
                border: isEarned ? '2px solid var(--orange)' : '1px solid var(--line)',
                borderRadius: '12px',
                padding: '24px',
                position: 'relative',
                opacity: isEarned ? 1 : 0.6,
                transition: 'all 0.18s',
              }}
            >
              <div style={{ position: 'relative', marginBottom: '12px', width: '48px', height: '48px', color: isEarned ? 'var(--orange)' : 'var(--muted)' }}>
                <achievement.Icon size={48} />
                {!isEarned && (
                  <div style={{ position: 'absolute', top: '-6px', right: '-6px', background: 'var(--ink)', color: 'var(--white)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--white)' }}>
                    <IconLock size={16} />
                  </div>
                )}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px', margin: 0 }}>
                {achievement.title}
              </h3>
              <p style={{ fontSize: '.9rem', color: 'var(--faint)', margin: 0, marginBottom: '16px' }}>
                {achievement.description}
              </p>

              {isEarned && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--orange)', fontFamily: 'var(--mono)', fontSize: '.8rem', fontWeight: 600 }}>
                  <span>✓ Earned</span>
                </div>
              )}

              {!isEarned && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '.8rem' }}>
                  <span>Locked</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Back Button */}
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <Link href="/my-projects" className="btn-ghost">
          ← Back to Projects
        </Link>
      </div>
    </div>
  );
}
