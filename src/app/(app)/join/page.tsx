'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../../../components/AuthProvider';

function JoinInner() {
  const params = useSearchParams();
  const router = useRouter();
  const { openAuth, user } = useAuth();

  useEffect(() => {
    const ref = params.get('ref');
    if (ref) {
      localStorage.setItem('sfe_ref', ref.toUpperCase());
    }
    if (user) {
      router.replace('/dashboard');
    } else {
      openAuth('signup');
      router.replace('/');
    }
  }, []);

  return null;
}

export default function JoinPage() {
  return (
    <Suspense>
      <JoinInner />
    </Suspense>
  );
}
