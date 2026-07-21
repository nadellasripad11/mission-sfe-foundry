import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

export const runtime = 'nodejs';

const ALLOWED = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif']);
const MAX_BYTES = 6 * 1024 * 1024; // 6 MB per file

function client() {
  const endpoint = process.env.B2_ENDPOINT;
  const keyId = process.env.B2_KEY_ID;
  const appKey = process.env.B2_APP_KEY;
  if (!endpoint || !keyId || !appKey) return null;
  return new S3Client({
    region: 'auto',
    endpoint,
    credentials: { accessKeyId: keyId, secretAccessKey: appKey },
    forcePathStyle: true,
  });
}

export async function POST(req: NextRequest) {
  const s3 = client();
  const bucket = process.env.B2_BUCKET;
  const publicBase = process.env.B2_PUBLIC_BASE;
  if (!s3 || !bucket || !publicBase) {
    return NextResponse.json({ error: 'Storage not configured. Set B2_* env vars.' }, { status: 500 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form body' }, { status: 400 });
  }

  const file = form.get('file');
  if (!(file instanceof File)) return NextResponse.json({ error: 'Missing file' }, { status: 400 });
  if (!ALLOWED.has(file.type)) return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: 'File too large (max 6 MB)' }, { status: 400 });

  const ext = file.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'bin';
  const key = `projects/${new Date().toISOString().slice(0, 7)}/${randomUUID()}.${ext}`;
  const bytes = new Uint8Array(await file.arrayBuffer());

  try {
    await s3.send(new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: bytes,
      ContentType: file.type,
    }));
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Upload failed';
    return NextResponse.json({ error: msg }, { status: 502 });
  }

  const url = `${publicBase.replace(/\/$/, '')}/${key}`;
  return NextResponse.json({ url });
}
