export type Mission = {
  slug: string;
  title: string;
  date: string;
  tagline: string;
  category: 'Competition' | 'Workshop';
  guide: { heading: string; body: string }[];
};

export const MISSIONS: Mission[] = [
  {
    slug: 'idea-sprint',
    title: 'Idea Sprint',
    date: 'JUN 7',
    category: 'Competition',
    tagline: 'Turn a problem into a validated startup idea in one day.',
    guide: [
      { heading: 'What it is', body: 'A one-day competition to go from a rough problem to a validated startup idea. You work in teams of 2–4 and pitch at the end.' },
      { heading: 'What to bring', body: 'A laptop, a notebook, and one problem you actually care about. We supply food, drinks, and mentors.' },
      { heading: 'Timeline', body: '9:00 kickoff • 9:30 team formation • 10:00 problem framing • 11:30 solution sketch • 12:30 pitch prep • 1:00 pitches + winners.' },
      { heading: 'How you win', body: 'Judges score on problem clarity, market fit, feasibility, and pitch. Prizes go to the top 3 teams.' },
    ],
  },
  {
    slug: 'market-blueprint',
    title: 'Market Blueprint',
    date: 'JUN 28',
    category: 'Workshop',
    tagline: 'Research your market and build a winning business model.',
    guide: [
      { heading: 'What it is', body: 'A guided workshop that walks you through customer discovery, competitor mapping, and business model design for the idea you brought (or one you\'ll pick on the spot).' },
      { heading: 'Prereqs', body: 'None — bring a laptop and an open mind. If you\'ve got an existing project, bring notes on your users.' },
      { heading: 'What you\'ll leave with', body: 'A one-page market blueprint (segment, pain, solution, differentiation, monetization) for your project.' },
    ],
  },
  {
    slug: 'founders-pitch',
    title: 'Founders Pitch',
    date: 'JUL 19',
    category: 'Competition',
    tagline: 'Pitch your solution to judges and win Seed Points.',
    guide: [
      { heading: 'What it is', body: 'A pitch night. Present your project (idea, prototype, or launched product) in 5 minutes with 2 minutes of Q&A.' },
      { heading: 'What to prepare', body: 'A 5-slide deck: problem, solution, market, traction, ask. A live demo counts as bonus points.' },
      { heading: 'Judging', body: 'A panel of founders, teachers, and student judges scores on clarity, feasibility, and delivery. Winners take home Seed Points and prizes.' },
    ],
  },
  {
    slug: 'growth-challenge',
    title: 'Growth Challenge',
    date: 'AUG 2',
    category: 'Competition',
    tagline: 'Grow your product and user base with limited resources.',
    guide: [
      { heading: 'What it is', body: 'Take a launched product (yours or one we assign) and grow it as much as possible in a fixed time window. Metrics: users, revenue, retention, or virality — you pick your goal.' },
      { heading: 'Rules', body: 'No paid ads beyond a $10 budget. All growth tactics must be honest. Document everything for the final report.' },
      { heading: 'Winning', body: 'The team with the biggest verifiable delta on their chosen metric takes the top prize.' },
    ],
  },
];
