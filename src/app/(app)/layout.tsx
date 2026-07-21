'use client';

import { useAuth } from '../../components/AuthProvider';
import Sidebar from '../../components/Sidebar';
import TopNav from '../../components/TopNav';
import TechBackground from '../../components/TechBackground';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { ready, user } = useAuth();

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
