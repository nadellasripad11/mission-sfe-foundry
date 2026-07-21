import { supabase } from './supabaseClient';

const BUCKET = 'projects';
const ALLOWED = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif']);
const MAX_BYTES = 6 * 1024 * 1024; // 6 MB per file

// Upload one image directly to Supabase Storage from the browser.
// Returns the public URL. RLS requires the user to be signed in.
export async function uploadImage(file: File, userId: string): Promise<string> {
  if (!ALLOWED.has(file.type)) throw new Error(`Unsupported file type: ${file.type}`);
  if (file.size > MAX_BYTES) throw new Error('File too large (max 6 MB).');

  const ext = file.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'bin';
  const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
