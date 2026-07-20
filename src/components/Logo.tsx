import Link from 'next/link';

export function LogoMark({ size = 30 }: { size?: number }) {
  // matches the hero stripes: spaced parallelograms with a thin depth edge
  const VW = 80, VH = 42;
  const w = (size * VW) / VH;
  const W = 10, TOP = 2, BOT = 38, SLANT = 16, DX = 2.6, DY = 2.6;
  const bars = [
    { x: 2, top: '#20202A', edge: '#0E0E16' },
    { x: 25, top: '#2684C6', edge: '#1A5C8E' },
    { x: 48, top: '#EB5F27', edge: '#B4451A' },
  ];
  const top = (x: number) => `${x},${BOT} ${x + W},${BOT} ${x + W + SLANT},${TOP} ${x + SLANT},${TOP}`;
  const depth = (x: number) =>
    `${x},${BOT} ${x + W},${BOT} ${x + W + SLANT},${TOP} ${x + W + SLANT + DX},${TOP + DY} ${x + W + DX},${BOT + DY} ${x + DX},${BOT + DY}`;
  return (
    <svg width={w} height={size} viewBox={`0 0 ${VW} ${VH}`} fill="none" aria-hidden="true" style={{ display: 'block' }}>
      {bars.map((b) => (
        <g key={b.x}>
          <polygon points={depth(b.x)} fill={b.edge} />
          <polygon points={top(b.x)} fill={b.top} />
        </g>
      ))}
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
