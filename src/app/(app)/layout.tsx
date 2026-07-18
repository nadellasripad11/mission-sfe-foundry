import TopNav from '../../components/TopNav';
import TechBackground from '../../components/TechBackground';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TechBackground />
      <TopNav />
      <main className="main-wrap">{children}</main>
    </>
  );
}
