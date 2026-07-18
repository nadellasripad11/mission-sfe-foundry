export type SfeEvent = {
  mon: string;
  day: string;
  title: string;
  desc: string;
  time: string;
  place: string;
  category: 'Competitions' | 'Workshops' | 'Social';
};

export const EVENTS: SfeEvent[] = [
  { mon: 'JUN', day: '7', title: 'Idea Sprint', desc: 'Turn a problem into a validated startup idea.', time: '9:00 AM – 1:00 PM', place: 'AHS Room TBD', category: 'Competitions' },
  { mon: 'JUN', day: '28', title: 'Market Blueprint', desc: 'Research your market and build a winning strategy.', time: '1:00 – 4:00 PM', place: 'AHS Room TBD', category: 'Workshops' },
  { mon: 'JUL', day: '19', title: 'Founders Pitch', desc: 'Pitch your solution to judges and win Seed Points.', time: '6:00 – 9:00 PM', place: 'AHS Auditorium', category: 'Competitions' },
  { mon: 'AUG', day: '2', title: 'Growth Challenge', desc: 'Grow your product and user base with limited resources.', time: '1:00 – 5:00 PM', place: 'AHS Room TBD', category: 'Competitions' },
];
