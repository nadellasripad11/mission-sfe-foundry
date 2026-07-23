'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../components/AuthProvider';
import Sidebar from '../../components/Sidebar';
import TopNav from '../../components/TopNav';
import TechBackground from '../../components/TechBackground';

// Pages using the brighter background get their route added here one at a time.
const BRIGHT_BG_ROUTES = new Set(['/']);

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { ready, user } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.toggle('bg-bright', BRIGHT_BG_ROUTES.has(pathname ?? ''));
    return () => { document.body.classList.remove('bg-bright'); };
  }, [pathname]);

  // Show sidebar only for authenticated users; traditional layout for guests
  const showSidebar = ready && user;

  return (
    <>
      <TechBackground />
      {showSidebar ? (
        <div className="app-container">
          <Sidebar />
          <main className="app-main">{children}</main>
        </div>
      ) : (
        <>
          <TopNav />
          <main className="main-wrap">{children}</main>
        </>
      )}
    </>
  );
}
