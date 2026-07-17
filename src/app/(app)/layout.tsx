import Sidebar from '../../components/Sidebar';
import TechBackground from '../../components/TechBackground';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TechBackground />
      <Sidebar />
      <main className="main">{children}</main>
    </>
  );
}
