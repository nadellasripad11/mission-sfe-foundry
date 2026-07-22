'use client';

import { usePathname } from 'next/navigation';

// Decorative floating "blueprint" annotations behind content (pointer-events: none).
const DOTS = (
  <svg width="46" height="46" viewBox="0 0 46 46" fill="currentColor">
    {[6, 18, 30, 42].map((y) => [6, 18, 30, 42].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" />))}
  </svg>
);

const PLUS = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M9 2v14M2 9h14" /></svg>
);

const RING = (
  <svg width="90" height="90" viewBox="0 0 90 90" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="45" cy="45" r="44" /></svg>
);

const ITEMS: { id: string; top?: string; bottom?: string; left?: string; right?: string; anim: string; cls?: string; node: React.ReactNode }[] = [
  { id: 'code-build', top: '7%', left: '3%', anim: 't-float', cls: 'tech-item', node: <pre>{`function build() {\n  ideas = validate();\n  build(ideas);\n  return impact;\n}`}</pre> },
  { id: 'strategy', top: '10%', left: '38%', anim: 't-drift', cls: 'tech-item tech-label', node: 'Strategy' },
  { id: 'growth', top: '13%', right: '22%', anim: 't-float', cls: 'tech-item tech-label', node: 'Growth' },
  { id: 'execution', top: '20%', right: '9%', anim: 't-drift', cls: 'tech-item tech-label', node: 'Execution' },
  { id: 'n07', top: '5%', left: '4.5%', anim: 't-float', cls: 'tech-item tech-num', node: '07' },
  { id: 'n04', top: '6%', right: '5%', anim: 't-drift', cls: 'tech-item tech-num', node: '04' },
  { id: 'n23', top: '18%', left: '37%', anim: 't-float', cls: 'tech-item tech-num', node: '23' },
  { id: 'coords', top: '30%', left: '4%', anim: 't-drift', cls: 'tech-item', node: <pre>{`34.0522° N\n84.3880° W`}</pre> },
  { id: 'n88', top: '48%', right: '11%', anim: 't-float', cls: 'tech-item tech-num tech-blue', node: '88' },
  { id: 'innovate', top: '58%', left: '9%', anim: 't-drift', cls: 'tech-item tech-label', node: 'Innovate' },
  { id: 'optimize', bottom: '20%', left: '18%', anim: 't-float', cls: 'tech-item tech-label', node: 'Optimize' },
  { id: 'scalability', bottom: '22%', left: '38%', anim: 't-drift', cls: 'tech-item tech-label', node: 'Scalability' },
  { id: 'iterate', bottom: '16%', right: '18%', anim: 't-float', cls: 'tech-item tech-label', node: 'Iterate' },
  { id: 'n10101', bottom: '10%', left: '20%', anim: 't-drift', cls: 'tech-item tech-num tech-orange', node: '10101' },
  { id: 'n01010', bottom: '8%', right: '20%', anim: 't-float', cls: 'tech-item tech-num', node: '01010' },
  { id: 'codeslash', top: '46%', left: '46%', anim: 't-drift', cls: 'tech-item tech-blue', node: '</>' },
  { id: 'vision-code', bottom: '28%', right: '8%', anim: 't-float', cls: 'tech-item', node: <pre>{`const vision = {\n  build: true,\n  scale: true,\n  impact: true\n}`}</pre> },
  { id: 'x10cubed', top: '34%', right: '5%', anim: 't-float', cls: 'tech-item tech-num', node: '× 10³' },
  { id: 'dots-bl', bottom: '30%', left: '5%', anim: 't-spin tech-item', cls: 'tech-item', node: DOTS },
  { id: 'dots-tr', top: '14%', right: '13%', anim: 't-spin', cls: 'tech-item', node: DOTS },
  { id: 'plus-tl', top: '12%', left: '22%', anim: 't-float', cls: 'tech-item tech-blue', node: PLUS },
  { id: 'plus-tr', top: '28%', right: '30%', anim: 't-drift', cls: 'tech-item tech-orange', node: PLUS },
  { id: 'plus-bm', bottom: '18%', left: '48%', anim: 't-float', cls: 'tech-item', node: PLUS },
  { id: 'ring-tl', top: '30%', left: '20%', anim: 't-spin', cls: 'tech-item', node: RING },
  { id: 'ring-br', bottom: '24%', right: '34%', anim: 't-spin', cls: 'tech-item', node: RING },
  { id: 'n19', top: '40%', left: '2%', anim: 't-float', cls: 'tech-item tech-num', node: '19' },
  { id: 'n12', bottom: '36%', left: '42%', anim: 't-drift', cls: 'tech-item tech-num', node: '12' },
];

// These are precisely re-placed as a scoped cluster around the hero stripe graphic
// on the home page (see HeroDecor in page.tsx) — hide the global copies there to avoid duplicates.
const HOME_HERO_CLUSTER_IDS = ['execution', 'dots-tr', 'plus-tr', 'x10cubed', 'n88', 'vision-code', 'ring-tl', 'iterate'];

export default function TechBackground() {
  const pathname = usePathname();
  const strong = pathname === '/';
  const items = strong ? ITEMS.filter((it) => !HOME_HERO_CLUSTER_IDS.includes(it.id)) : ITEMS;
  return (
    <div className={`techbg${strong ? ' techbg-strong' : ''}`} aria-hidden="true">
      {items.map((it, i) => (
        <div
          key={it.id}
          className={`${it.cls} ${it.anim}`}
          style={{ top: it.top, bottom: it.bottom, left: it.left, right: it.right, animationDelay: `${(i % 6) * 0.7}s` }}
        >
          {it.node}
        </div>
      ))}
    </div>
  );
}

export { DOTS, PLUS, RING };
