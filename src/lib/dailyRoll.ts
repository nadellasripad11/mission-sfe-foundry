import { supabase } from './supabaseClient';

export type DailyRoll = {
  id: string;
  user_id: string;
  display_name: string;
  avatar_url: string | null;
  roll_value: number;
  roll_date: string;
  created_at: string;
  updated_at: string;
};

const MAX_ROLL = 99_999_999;
export const REROLL_COOLDOWN_MS = 10 * 60 * 60 * 1000; // 10 hours

/** Milliseconds left before this roll can be rerolled, or 0 if it's ready now. */
export function rerollCooldownRemaining(roll: DailyRoll): number {
  const last = new Date(roll.updated_at ?? roll.created_at).getTime();
  const remaining = REROLL_COOLDOWN_MS - (Date.now() - last);
  return remaining > 0 ? remaining : 0;
}

/** Formats a millisecond duration as "9h 42m" or "3m 12s". */
export function formatCooldown(ms: number): string {
  const totalSec = Math.ceil(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export function rollQuality(value: number): string {
  if (value >= 10_000_000) return 'legendary';
  if (value >= 1_000_000) return 'insane';
  if (value >= 100_000) return 'impressive';
  if (value >= 10_000) return 'pretty good';
  if (value >= 1_000) return 'not bad';
  if (value >= 100) return 'kinda solid';
  if (value >= 10) return 'meh';
  return 'rough';
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function getMyRollToday(userId: string): Promise<DailyRoll | null> {
  const { data } = await supabase
    .from('daily_rolls')
    .select('*')
    .eq('user_id', userId)
    .eq('roll_date', todayStr())
    .maybeSingle();
  return data ?? null;
}

export async function rollForToday(userId: string, displayName: string, avatarUrl: string | null = null): Promise<DailyRoll> {
  const existing = await getMyRollToday(userId);
  if (existing) {
    // Keep today's row's profile info fresh if the user updated their name/avatar since rolling.
    if (existing.display_name !== displayName || existing.avatar_url !== avatarUrl) {
      const { data } = await supabase
        .from('daily_rolls')
        .update({ display_name: displayName, avatar_url: avatarUrl })
        .eq('id', existing.id)
        .select('*')
        .single();
      if (data) return data;
    }
    return existing;
  }

  const roll_value = Math.floor(Math.random() * MAX_ROLL) + 1;
  const { data, error } = await supabase
    .from('daily_rolls')
    .insert({ user_id: userId, display_name: displayName, avatar_url: avatarUrl, roll_value, roll_date: todayStr() })
    .select('*')
    .single();

  if (error) {
    // Unique constraint hit (e.g. two tabs rolling at once) — someone already rolled, fetch it.
    if (error.code === '23505') {
      const row = await getMyRollToday(userId);
      if (row) return row;
    }
    throw new Error(`Roll failed: ${error.message} (${error.code})`);
  }
  return data;
}

/** Reroll today's number. Throws with the remaining time if the 10-hour cooldown hasn't elapsed. */
export async function rerollForToday(userId: string, displayName: string, avatarUrl: string | null = null): Promise<DailyRoll> {
  const existing = await getMyRollToday(userId);
  if (!existing) {
    // Nothing to reroll yet — treat as a first roll.
    return rollForToday(userId, displayName, avatarUrl);
  }

  const remaining = rerollCooldownRemaining(existing);
  if (remaining > 0) {
    throw new Error(`Reroll available in ${formatCooldown(remaining)}.`);
  }

  const roll_value = Math.floor(Math.random() * MAX_ROLL) + 1;
  const { data, error } = await supabase
    .from('daily_rolls')
    .update({ roll_value, display_name: displayName, avatar_url: avatarUrl, updated_at: new Date().toISOString() })
    .eq('id', existing.id)
    .select('*')
    .single();
  if (error) throw new Error(`Reroll failed: ${error.message} (${error.code})`);
  return data;
}

export async function getRankToday(rollValue: number, date = todayStr()): Promise<number> {
  const { count } = await supabase
    .from('daily_rolls')
    .select('id', { count: 'exact', head: true })
    .eq('roll_date', date)
    .gt('roll_value', rollValue);
  return (count ?? 0) + 1;
}

export async function getLeaderboard(date = todayStr()): Promise<{ rolls: DailyRoll[]; total: number }> {
  const { data, count } = await supabase
    .from('daily_rolls')
    .select('*', { count: 'exact' })
    .eq('roll_date', date)
    .order('roll_value', { ascending: false })
    .limit(100);
  return { rolls: data ?? [], total: count ?? 0 };
}
