import type { ComponentType } from 'react';
import {
  IconFirstProject, IconMultiProject, IconProlic, IconVoted, IconHundredVotes,
  IconHardware, IconAI, IconStreak, IconCommunity, IconFounder, IconMystery,
} from '../components/AchievementIcons';
import { getProjects, getMyRatings, type ProjectWithRating } from './projects';
import { REFERRAL_BADGES, earnedReferralBadges } from './referrals';

export type AchievementCtx = {
  projectCount: number;
  referralCount: number;
  maxRatingsOnProject: number;
  totalRatingsReceived: number;
  votesCast: number;
  hasHardwareTag: boolean;
  hasAiTag: boolean;
};

export type AchievementDef = {
  id: number;
  title: string;
  description: string;
  Icon: ComponentType<{ size?: number }>;
  check: (ctx: AchievementCtx) => boolean;
};

export const ACHIEVEMENTS: AchievementDef[] = [
  { id: 1,  title: 'First Project',      description: 'Ship your first project.',        Icon: IconFirstProject,  check: ({ projectCount }) => projectCount >= 1 },
  { id: 2,  title: '5 Projects',         description: 'Ship 5 projects.',                Icon: IconMultiProject,  check: ({ projectCount }) => projectCount >= 5 },
  { id: 3,  title: 'Ultra Prolific',     description: 'Ship 10 projects.',               Icon: IconProlic,        check: ({ projectCount }) => projectCount >= 10 },
  { id: 4,  title: 'Voted For',          description: 'Get 5 ratings on a project.',     Icon: IconVoted,         check: ({ maxRatingsOnProject }) => maxRatingsOnProject >= 5 },
  { id: 5,  title: '100 Votes',          description: 'Get 100 total ratings.',          Icon: IconHundredVotes,  check: ({ totalRatingsReceived }) => totalRatingsReceived >= 100 },
  { id: 6,  title: 'Hardware Builder',   description: 'Ship a hardware project.',        Icon: IconHardware,      check: ({ hasHardwareTag }) => hasHardwareTag },
  { id: 7,  title: 'AI Pioneer',         description: 'Ship a project using AI.',        Icon: IconAI,            check: ({ hasAiTag }) => hasAiTag },
  { id: 8,  title: '7-Day Streak',       description: 'Contribute 7 days in a row.',     Icon: IconStreak,        check: () => false },
  { id: 9,  title: 'Community Champion', description: 'Rate 20 projects.',               Icon: IconCommunity,     check: ({ votesCast }) => votesCast >= 20 },
  { id: 10, title: 'Founder',            description: 'Ship in the SFE launch month.',   Icon: IconFounder,       check: () => false },
  { id: 11, title: 'Mystery Badge',      description: 'Unknown achievement unlocked...', Icon: IconMystery,       check: () => false },
];

export const TOTAL_BADGES = ACHIEVEMENTS.length + REFERRAL_BADGES.length;

export function countEarned(ctx: AchievementCtx): number {
  const earnedMain = ACHIEVEMENTS.filter(a => a.check(ctx)).length;
  const earnedRef = earnedReferralBadges(ctx.referralCount).length;
  return earnedMain + earnedRef;
}

/** Fetches everything needed to build an AchievementCtx (excluding referralCount, which callers already have via getOrCreateReferralProfile). */
export async function buildAchievementCtx(userId: string, referralCount: number): Promise<AchievementCtx> {
  const [allProjects, myRatings] = await Promise.all([
    getProjects().catch((): ProjectWithRating[] => []),
    getMyRatings(userId).catch((): Record<string, number> => ({})),
  ]);
  const own = allProjects.filter(p => p.user_id === userId);
  const tags = own.flatMap(p => p.tags.map(t => t.toLowerCase()));
  return {
    projectCount: own.length,
    referralCount,
    maxRatingsOnProject: own.reduce((max, p) => Math.max(max, p.count), 0),
    totalRatingsReceived: own.reduce((sum, p) => sum + p.count, 0),
    votesCast: Object.keys(myRatings).length,
    hasHardwareTag: tags.includes('hardware'),
    hasAiTag: tags.includes('ai'),
  };
}
