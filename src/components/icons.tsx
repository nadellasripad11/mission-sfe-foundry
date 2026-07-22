import type { CSSProperties } from 'react';

type P = { size?: number; className?: string; style?: CSSProperties };

function S({ size = 22, className, style, children, fill = false }: P & { children: React.ReactNode; fill?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill ? 'currentColor' : 'none'}
      stroke={fill ? 'none' : 'currentColor'} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
      className={className} style={style} aria-hidden="true">{children}</svg>
  );
}

export const IconHome = (p: P) => <S {...p}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h5v-6h4v6h5V9.5" /></S>;
export const IconInfo = (p: P) => <S {...p}><circle cx="12" cy="12" r="9" /><path d="M12 11v5" /><circle cx="12" cy="7.5" r=".6" fill="currentColor" /></S>;
export const IconCalendar = (p: P) => <S {...p}><rect x="3.5" y="5" width="17" height="16" rx="2.5" /><path d="M3.5 9.5h17M8 3v4M16 3v4" /></S>;
export const IconUsers = (p: P) => <S {...p}><circle cx="9" cy="8" r="3.2" /><path d="M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5" /><path d="M16 5.2a3.2 3.2 0 0 1 0 5.9M17.5 14.6c2 .7 3.5 2.6 3.5 5.4" /></S>;
export const IconTrophy = (p: P) => <S {...p}><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" /><path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3" /><path d="M10 14.5V17h4v-2.5M8 21h8M9 21v-1.5a3 3 0 0 1 6 0V21" /></S>;
export const IconMegaphone = (p: P) => <S {...p}><path d="M4 10v4a1 1 0 0 0 1 1h2l7 4V5L7 9H5a1 1 0 0 0-1 1Z" /><path d="M17.5 9a4 4 0 0 1 0 6" /></S>;
export const IconHelp = (p: P) => <S {...p}><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 0 1 4.5 1.5c0 1.7-2.5 2-2.5 3.5" /><circle cx="12" cy="17" r=".6" fill="currentColor" /></S>;
export const IconBulb = (p: P) => <S {...p}><path d="M9 18h6M10 21h4" /><path d="M8 14a5 5 0 1 1 8 0c-.7.9-1.3 1.6-1.3 2.5H9.3c0-.9-.6-1.6-1.3-2.5Z" /></S>;
export const IconCode = (p: P) => <S {...p}><path d="m8.5 8-4 4 4 4M15.5 8l4 4-4 4M13.5 6l-3 12" /></S>;
export const IconLayers = (p: P) => <S {...p}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3.5 12 8.5 4.7L20.5 12M3.5 16 12 20.7 20.5 16" /></S>;
export const IconInfinity = (p: P) => <S {...p}><path d="M7 8.5a3.5 3.5 0 1 0 0 7c2.5 0 3.5-3.5 5-3.5s2.5 3.5 5 3.5a3.5 3.5 0 1 0 0-7c-2.5 0-3.5 3.5-5 3.5S9.5 8.5 7 8.5Z" /></S>;
export const IconTarget = (p: P) => <S {...p}><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r=".8" fill="currentColor" /></S>;
export const IconEye = (p: P) => <S {...p}><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="3" /></S>;
export const IconSpark = (p: P) => <S {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" /></S>;
export const IconArrow = (p: P) => <S {...p}><path d="M5 12h14M13 6l6 6-6 6" /></S>;
export const IconChevron = (p: P) => <S {...p}><path d="m9 6 6 6-6 6" /></S>;
export const IconClose = (p: P) => <S {...p}><path d="M6 6l12 12M18 6 6 18" /></S>;
export const IconMenu = (p: P) => <S {...p}><path d="M4 7h16M4 12h16M4 17h16" /></S>;
export const IconClock = (p: P) => <S {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></S>;
export const IconMail = (p: P) => <S {...p}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.5 7 8.5 6 8.5-6" /></S>;
export const IconShoppingCart = (p: P) => <S {...p}><circle cx="8" cy="21" r="1.5" fill="currentColor" /><circle cx="20" cy="21" r="1.5" fill="currentColor" /><path d="M2 4h2.5l1.8 9a2.5 2.5 0 0 0 2.4 2h10.4a2.5 2.5 0 0 0 2.3-1.6l2-7" /></S>;
export const IconUser = (p: P) => <S {...p}><circle cx="12" cy="9" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></S>;

export const IconDiscord = (p: P) => <S {...p} fill><path d="M19.3 5.4A17 17 0 0 0 15 4l-.3.5a12.6 12.6 0 0 1 3.6 1.8 15.9 15.9 0 0 0-12.6 0A12.6 12.6 0 0 1 9.3 4.5L9 4a17 17 0 0 0-4.3 1.4C2 9.3 1.3 13.1 1.6 16.8a17 17 0 0 0 5.2 2.6l.6-1a11 11 0 0 1-1.8-.9l.4-.3a12.1 12.1 0 0 0 10 0l.4.3c-.6.4-1.2.7-1.8.9l.6 1a17 17 0 0 0 5.2-2.6c.4-4.3-.6-8-2.7-11.4ZM8.5 14.6c-1 0-1.9-1-1.9-2.1 0-1.2.8-2.1 1.9-2.1s1.9 1 1.9 2.1c0 1.2-.9 2.1-1.9 2.1Zm7 0c-1 0-1.9-1-1.9-2.1 0-1.2.9-2.1 1.9-2.1s1.9 1 1.9 2.1c0 1.2-.8 2.1-1.9 2.1Z" /></S>;
export const IconInstagram = (p: P) => <S {...p}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="16.5" cy="7.5" r=".9" fill="currentColor" stroke="none" /></S>;

// 3D extruded three-slash logo mark
export function LogoHero({ size = 320, rings = false }: { size?: number; rings?: boolean }) {
  // each slash is a slanted bar; a darker offset copy fakes the extruded side
  // flat parallelogram stripes matching the real SFE Foundry mark
  const bars = [
    { x: 66, color: '#1C1C26' },
    { x: 134, color: '#1F9FD6' },
    { x: 202, color: '#F26522' },
  ];
  const W = 30, TOP = 78, BOT = 242, SLANT = 58;
  const pts = (x: number) => `${x},${BOT} ${x + W},${BOT} ${x + W + SLANT},${TOP} ${x + SLANT},${TOP}`;
  return (
    <svg width={size} height={size} viewBox="0 0 320 320" fill="none" aria-hidden="true" style={{ display: 'block', maxWidth: '100%' }}>
      <defs>
        <filter id="lh-shadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="3" dy="9" stdDeviation="8" floodColor="#1A1A1A" floodOpacity="0.20" />
        </filter>
      </defs>
      {rings && (
        <g stroke="var(--line)" strokeWidth="1" opacity="0.8">
          <circle cx="176" cy="160" r="150" strokeDasharray="2 7" />
          <circle cx="176" cy="160" r="112" strokeDasharray="2 7" />
          <circle cx="176" cy="160" r="74" strokeDasharray="2 7" />
        </g>
      )}
      <g filter="url(#lh-shadow)">
        {bars.map((b) => <polygon key={b.x} points={pts(b.x)} fill={b.color} />)}
      </g>
    </svg>
  );
}

// Flat parallelogram stripes with soft drop shadow — home hero visual
// Same proportions as the small header mark (Logo.tsx), scaled 8x.
export function LogoHero3D({ size = 400 }: { size?: number }) {
  const VW = 640, VH = 336;
  const W = 80, TOP = 16, BOT = 304, SLANT = 128;
  const bars = [
    { x: 16,  fill: '#1A1A1A' },
    { x: 200, fill: '#2684C6' },
    { x: 384, fill: '#EB5F27' },
  ];
  const pts = (x: number) => `${x},${BOT} ${x + W},${BOT} ${x + W + SLANT},${TOP} ${x + SLANT},${TOP}`;
  const h = Math.round(size * (VH / VW));
  return (
    <svg width={size} height={h} viewBox={`0 0 ${VW} ${VH}`} fill="none" aria-hidden="true" style={{ display: 'block', maxWidth: '100%' }}>
      <defs>
        <filter id="lh3d-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="6" dy="16" stdDeviation="10" floodColor="#1A1A1A" floodOpacity="0.22" />
        </filter>
      </defs>
      <g filter="url(#lh3d-shadow)">
        {bars.map((b) => <polygon key={b.x} points={pts(b.x)} fill={b.fill} />)}
      </g>
    </svg>
  );
}
