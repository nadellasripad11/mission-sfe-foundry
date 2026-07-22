import { supabase } from './supabaseClient';

export type ReferralProfile = {
  user_id: string;
  referral_code: string;
  referred_by: string | null;
  referral_count: number;
};

export type Badge = {
  id: string;
  title: string;
  description: string;
  requiredReferrals: number;
  color: string;
};

export const REFERRAL_BADGES: Badge[] = [
  { id: 'connector',   title: 'Connector',   description: 'Referred 1 person.',   requiredReferrals: 1,  color: '#7B61FF' },
  { id: 'networker',   title: 'Networker',   description: 'Referred 3 people.',   requiredReferrals: 3,  color: '#00B37E' },
  { id: 'evangelist',  title: 'Evangelist',  description: 'Referred 10 people.',  requiredReferrals: 10, color: '#FF4D2E' },
  { id: 'ambassador',  title: 'Ambassador',  description: 'Referred 25 people.',  requiredReferrals: 25, color: '#FFB800' },
];

export function earnedReferralBadges(count: number): Badge[] {
  return REFERRAL_BADGES.filter(b => count >= b.requiredReferrals);
}

export async function getOrCreateReferralProfile(userId: string): Promise<ReferralProfile | null> {
  const { data, error } = await supabase
    .from('referral_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (data) return data as ReferralProfile;
  if (error?.code !== 'PGRST116') return null; // unexpected error

  // Create one
  const code = generateCode();
  const { data: created, error: createErr } = await supabase
    .from('referral_profiles')
    .insert({ user_id: userId, referral_code: code, referral_count: 0 })
    .select()
    .single();

  if (createErr) return null;
  return created as ReferralProfile;
}

export async function getReferralProfileByCode(code: string): Promise<ReferralProfile | null> {
  const { data } = await supabase
    .from('referral_profiles')
    .select('*')
    .eq('referral_code', code.toUpperCase())
    .single();
  return data ?? null;
}

export async function claimReferral(newUserId: string, referralCode: string): Promise<boolean> {
  // Find referrer
  const referrer = await getReferralProfileByCode(referralCode);
  if (!referrer) return false;
  if (referrer.user_id === newUserId) return false; // can't refer yourself

  // Make sure new user doesn't already have a profile with referred_by set
  const { data: existing } = await supabase
    .from('referral_profiles')
    .select('referred_by')
    .eq('user_id', newUserId)
    .single();

  if (existing?.referred_by) return false; // already claimed

  // Set referred_by on new user
  await supabase
    .from('referral_profiles')
    .upsert({ user_id: newUserId, referral_code: generateCode(), referred_by: referrer.user_id, referral_count: 0 });

  // Increment referrer count
  await supabase.rpc('increment_referral_count', { target_user_id: referrer.user_id });

  return true;
}

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}
