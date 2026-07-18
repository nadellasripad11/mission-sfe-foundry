'use client';

import Placeholder from '../../../components/Placeholder';
import Footer from '../../../components/Footer';

const EVENTS = [
  { date: 'JUN 7', t: 'Idea Sprint', d: 'Turn a spark into a working prototype in a single day. Form a team, pick a problem, and ship something real.', tag: 'Hackathon' },
  { date: 'JUN 28', t: 'Market Blueprint', d: 'Validate your idea and map out a real business model with mentors and founders.', tag: 'Workshop' },
  { date: 'JUL 19', t: 'Founders Pitch', d: 'Pitch your project to a panel of judges, get feedback, and compete for prizes.', tag: 'Competition' },
  { date: 'AUG 2', t: 'Growth Challenge', d: 'Take your build further — scale it, refine it, and compete for the top spot.', tag: 'Hackathon' },
];

export default function EventsPage() {
  return (
    <div className="page">
      <section className="page-hero">
        <div className="eyebrow">// Events</div>
        <h1 className="ph-title">This Year at <span className="o">SFE Foundry</span></h1>
        <p className="ph-lede">
          Hackathons, workshops, and pitch competitions throughout the year. Everyone&apos;s welcome — no experience needed.
        </p>
      </section>

      <section className="band">
        <div className="event-grid">
          {EVENTS.map((e) => (
            <article key={e.t} className="event-card2">
              <Placeholder label={`Photo — ${e.t}`} h={150} />
              <div className="event-card2-body">
                <div className="event-card2-meta">
                  <span className="event-card2-date">{e.date}</span>
                  <span className="event-card2-tag">{e.tag}</span>
                </div>
                <h3 className="event-card2-t">{e.t}</h3>
                <p className="event-card2-d">{e.d}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
