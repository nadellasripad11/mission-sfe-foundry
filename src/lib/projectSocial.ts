import { supabase } from './supabaseClient';

export type Comment = {
  id: string;
  project_id: string;
  user_id: string;
  display_name: string;
  body: string;
  created_at: string;
};

export type SocialCounts = { likes: number; comments: number; views: number; likedByMe: boolean };

export async function getSocialCounts(projectIds: string[], userId?: string): Promise<Record<string, SocialCounts>> {
  const out: Record<string, SocialCounts> = {};
  if (projectIds.length === 0) return out;
  projectIds.forEach(id => { out[id] = { likes: 0, comments: 0, views: 0, likedByMe: false }; });

  const [likesRes, commentsRes, viewsRes, myLikesRes] = await Promise.all([
    supabase.from('project_likes').select('project_id').in('project_id', projectIds),
    supabase.from('project_comments').select('project_id').in('project_id', projectIds),
    supabase.from('project_views').select('project_id, view_count').in('project_id', projectIds),
    userId
      ? supabase.from('project_likes').select('project_id').in('project_id', projectIds).eq('user_id', userId)
      : Promise.resolve({ data: [] as { project_id: string }[] }),
  ]);

  (likesRes.data ?? []).forEach((r: { project_id: string }) => { out[r.project_id].likes++; });
  (commentsRes.data ?? []).forEach((r: { project_id: string }) => { out[r.project_id].comments++; });
  (viewsRes.data ?? []).forEach((r: { project_id: string; view_count: number }) => { out[r.project_id].views = r.view_count; });
  (myLikesRes.data ?? []).forEach((r: { project_id: string }) => { out[r.project_id].likedByMe = true; });

  return out;
}

export async function toggleLike(projectId: string, userId: string, currentlyLiked: boolean): Promise<void> {
  if (currentlyLiked) {
    const { error } = await supabase.from('project_likes').delete().eq('project_id', projectId).eq('user_id', userId);
    if (error) throw error;
  } else {
    const { error } = await supabase.from('project_likes').insert({ project_id: projectId, user_id: userId });
    if (error && error.code !== '23505') throw error;
  }
}

export async function getComments(projectId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from('project_comments')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function addComment(projectId: string, userId: string, displayName: string, body: string): Promise<Comment> {
  const trimmed = body.trim();
  if (!trimmed) throw new Error('Comment cannot be empty.');
  const { data, error } = await supabase
    .from('project_comments')
    .insert({ project_id: projectId, user_id: userId, display_name: displayName, body: trimmed })
    .select('*')
    .single();
  if (error) throw error;
  return data;
}

export async function deleteComment(commentId: string, userId: string): Promise<void> {
  const { error } = await supabase.from('project_comments').delete().eq('id', commentId).eq('user_id', userId);
  if (error) throw error;
}

export async function incrementView(projectId: string): Promise<void> {
  await supabase.rpc('increment_project_view', { target_project_id: projectId });
}
