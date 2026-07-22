'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '../../../components/AuthProvider';

export default function JoinPage() {
  const params = useSearchParams();
  const router = useRouter();
  const { openAuth, user } = useAuth();

  useEffect(() => {
    const ref = params.get('ref');
    if (ref) {
      localStorage.setItem('sfe_ref', ref.toUpperCase());
    }
    if (user) {
      // Already signed in — go to dashboard
      router.replace('/dashboard');
    } else {
      // Open signup modal
      openAuth('signup');
      router.replace('/');
    }
  }, []);

  return null;
}
