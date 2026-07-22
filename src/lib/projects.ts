import { supabase } from './supabaseClient';

export type SocialBuzz = {
  inspiration: string;
  how_built: string;
  biggest_challenge: string;
  proud_of: string;
};

export type Project = {
  id: string;
  user_id: string;
  author_name: string | null;
  title: string;
  description: string;
  url: string;
  screenshots: string[];
  tags: string[];
  buzz: SocialBuzz | null;
  created_at: string;
};

export type CategoryRating = {
  id: string;
  project_id: string;
  user_id: string;
  originality: number;
  technicality: number;
  usability: number;
  impact: number;
  feedback: string;
  created_at: string;
};

export type ProjectScores = {
  originality: number;
  technicality: number;
  usability: number;
  impact: number;
  overall: number;
  count: number;
};

export type ProjectWithRating = Project & ProjectScores;

// Compute aggregate scores from raw ratings
function aggregateScores(ratings: Pick<CategoryRating, 'originality' | 'technicality' | 'usability' | 'impact'>[]): ProjectScores {
  if (!ratings.length) return { originality: 0, technicality: 0, usability: 0, impact: 0, overall: 0, count: 0 };
  const n = ratings.length;
  const sum = ratings.reduce((acc, r) => ({
    originality: acc.originality + r.originality,
    technicality: acc.technicality + r.technicality,
    usability: acc.usability + r.usability,
    impact: acc.impact + r.impact,
  }), { originality: 0, technicality: 0, usability: 0, impact: 0 });
  const orig = sum.originality / n;
  const tech = sum.technicality / n;
  const use = sum.usability / n;
  const imp = sum.impact / n;
  return { originality: orig, technicality: tech, usability: use, impact: imp, overall: (orig + tech + use + imp) / 4, count: n };
}

export async function getProjects(): Promise<ProjectWithRating[]> {
  const [{ data: projects, error: pErr }, { data: ratings }] = await Promise.all([
    supabase.from('projects').select('*').order('created_at', { ascending: false }),
    supabase.from('ratings').select('project_id, originality, technicality, usability, impact'),
  ]);
  if (pErr) throw pErr;

  const ratingsByProject = new Map<string, typeof ratings>();
  (ratings ?? []).forEach((r: { project_id: string; originality: number; technicality: number; usability: number; impact: number }) => {
    const existing = ratingsByProject.get(r.project_id) ?? [];
    ratingsByProject.set(r.project_id, [...existing, r]);
  });

  return (projects ?? []).map((p: Project) => ({
    ...p,
    ...aggregateScores(ratingsByProject.get(p.id) ?? []),
  }));
}

export async function getProject(id: string): Promise<Project | null> {
  const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
  if (error) return null;
  return data;
}

export async function getProjectRatings(projectId: string): Promise<CategoryRating[]> {
  const { data } = await supabase
    .from('ratings')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });
  return data ?? [];
}

export async function getMyProjects(userId: string): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects').select('*').eq('user_id', userId).order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function createProject(input: {
  user_id: string; author_name: string | null;
  title: string; description: string; url: string;
  screenshots: string[]; tags: string[];
  buzz: SocialBuzz | null;
}) {
  const { error } = await supabase.from('projects').insert({
    user_id: input.user_id,
    author_name: input.author_name,
    title: input.title,
    description: input.description,
    url: input.url,
    screenshots: input.screenshots,
    tags: input.tags,
    buzz: input.buzz,
  });
  if (error) throw error;
}

export async function deleteProject(id: string, userId: string) {
  const { error } = await supabase.from('projects').delete().eq('id', id).eq('user_id', userId);
  if (error) throw error;
}

export async function submitRating(input: {
  project_id: string; user_id: string;
  originality: number; technicality: number; usability: number; impact: number;
  feedback: string;
}) {
  // Verify session is active
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated — please sign in again.');

  // Check if rating already exists
  const { data: existing, error: selectErr } = await supabase
    .from('ratings')
    .select('id')
    .eq('project_id', input.project_id)
    .eq('user_id', input.user_id)
    .maybeSingle();

  if (selectErr) throw new Error(`Select failed: ${selectErr.message} (${selectErr.code})`);

  if (existing) {
    const { error } = await supabase
      .from('ratings')
      .update({
        originality: input.originality,
        technicality: input.technicality,
        usability: input.usability,
        impact: input.impact,
        feedback: input.feedback,
      })
      .eq('project_id', input.project_id)
      .eq('user_id', input.user_id);
    if (error) throw new Error(`Update failed: ${error.message} (${error.code})`);
  } else {
    const { error } = await supabase
      .from('ratings')
      .insert(input);
    if (error) throw new Error(`Insert failed: ${error.message} (${error.code})`);
  }
}

export async function getMyRating(projectId: string, userId: string): Promise<CategoryRating | null> {
  const { data } = await supabase
    .from('ratings')
    .select('*')
    .eq('project_id', projectId)
    .eq('user_id', userId)
    .single();
  return data ?? null;
}

// Legacy helper kept for any callers that haven't migrated
export async function getMyRatings(userId: string): Promise<Record<string, number>> {
  const { data } = await supabase.from('ratings').select('project_id, originality, technicality, usability, impact').eq('user_id', userId);
  const map: Record<string, number> = {};
  (data ?? []).forEach((r: { project_id: string; originality: number; technicality: number; usability: number; impact: number }) => {
    map[r.project_id] = (r.originality + r.technicality + r.usability + r.impact) / 4;
  });
  return map;
}
