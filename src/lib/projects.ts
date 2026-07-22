import { supabase } from './supabaseClient';

export type Project = {
  id: string;
  user_id: string;
  author_name: string | null;
  title: string;
  description: string;
  url: string;
  screenshots: string[];
  tags: string[];
  created_at: string;
};

export type ProjectWithRating = Project & { avg: number; count: number };

// Fetch all shipped projects with aggregated ratings (averaged client-side).
export async function getProjects(): Promise<ProjectWithRating[]> {
  const [{ data: projects, error: pErr }, { data: ratings }] = await Promise.all([
    supabase.from('projects').select('*').order('created_at', { ascending: false }),
    supabase.from('ratings').select('project_id, stars'),
  ]);
  if (pErr) throw pErr;
  const agg = new Map<string, { sum: number; count: number }>();
  (ratings ?? []).forEach((r: { project_id: string; stars: number }) => {
    const a = agg.get(r.project_id) ?? { sum: 0, count: 0 };
    a.sum += r.stars; a.count += 1;
    agg.set(r.project_id, a);
  });
  return (projects ?? []).map((p: Project) => {
    const a = agg.get(p.id);
    return { ...p, avg: a ? a.sum / a.count : 0, count: a ? a.count : 0 };
  });
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
}) {
  const { error } = await supabase.from('projects').insert({
    user_id: input.user_id,
    author_name: input.author_name,
    title: input.title,
    description: input.description,
    url: input.url,
    screenshots: input.screenshots,
    tags: input.tags,
  });
  if (error) throw error;
}

export async function deleteProject(id: string, userId: string) {
  const { error } = await supabase.from('projects').delete().eq('id', id).eq('user_id', userId);
  if (error) throw error;
}

// Upsert the current user's rating for a project (1–5 stars).
export async function rateProject(projectId: string, userId: string, stars: number) {
  const { error } = await supabase
    .from('ratings')
    .upsert({ project_id: projectId, user_id: userId, stars }, { onConflict: 'project_id,user_id' });
  if (error) throw error;
}

export async function getMyRatings(userId: string): Promise<Record<string, number>> {
  const { data } = await supabase.from('ratings').select('project_id, stars').eq('user_id', userId);
  const map: Record<string, number> = {};
  (data ?? []).forEach((r: { project_id: string; stars: number }) => { map[r.project_id] = r.stars; });
  return map;
}
