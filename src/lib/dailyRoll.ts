import { supabase } from './supabaseClient';

export type DailyRoll = {
  id: string;
  user_id: string;
  display_name: string;
  roll_value: number;
  roll_date: string;
  created_at: string;
};

const MAX_ROLL = 99_999_999;

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

export async function rollForToday(userId: string, displayName: string): Promise<DailyRoll> {
  const existing = await getMyRollToday(userId);
  if (existing) return existing;

  const roll_value = Math.floor(Math.random() * MAX_ROLL) + 1;
  const { data, error } = await supabase
    .from('daily_rolls')
    .insert({ user_id: userId, display_name: displayName, roll_value, roll_date: todayStr() })
    .select('*')
    .single();
  if (error) throw error;
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
