import Link from 'next/link';

export function LogoMark({ size = 30 }: { size?: number }) {
  const w = (size * 58) / 36;
  return (
    <svg width={w} height={size} viewBox="0 0 58 36" fill="none" aria-hidden="true" style={{ display: 'block' }}>
      <polygon points="0,36 12,36 22,0 10,0" fill="#1A1A2E" />
      <polygon points="18,36 30,36 40,0 28,0" fill="#1F9FD6" />
      <polygon points="36,36 48,36 58,0 46,0" fill="#F26522" />
    </svg>
  );
}

export default function Logo({ href = '/', onClick }: { href?: string; onClick?: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="logo-lockup" aria-label="SFE Foundry home">
      <LogoMark size={26} />
      <span className="logo-text">
        <span className="logo-name">SFE</span>
        <span className="logo-sub">FOUNDRY</span>
      </span>
    </Link>
  );
}
