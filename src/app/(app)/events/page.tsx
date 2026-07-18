'use client';

import { useState } from 'react';
import Footer from '../../../components/Footer';
import { EVENTS } from '../../../lib/events';
import { IconChevron, IconArrow } from '../../../components/icons';

const FILTERS = ['All', 'Competitions', 'Workshops', 'Social'] as const;

export default function EventsPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');
  const shown = filter === 'All' ? EVENTS : EVENTS.filter((e) => e.category === filter);

  return (
    <div className="page">
      <section className="page-hero">
        <h1 className="ph-title">EVENTS</h1>
        <p className="ph-lede">Compete. Learn. Connect.</p>
      </section>

      <section className="band" style={{ borderTop: 'none', paddingTop: 0 }}>
        <div className="filter-row">
          {FILTERS.map((f) => (
            <button key={f} className={`filter-pill${filter === f ? ' on' : ''}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>

        <div className="ev-list">
          {shown.map((e) => (
            <div key={e.title} className="ev-row">
              <div className="ev-date"><span className="ev-mon">{e.mon}</span><span className="ev-day">{e.day}</span></div>
              <div className="ev-row-body">
                <div className="ev-row-t">{e.title}</div>
                <div className="ev-row-d">{e.desc}</div>
              </div>
              <div className="ev-row-when">
                <div>{e.time}</div>
                <div className="ev-row-place">{e.place}</div>
              </div>
              <IconChevron size={20} className="ev-row-chev" />
            </div>
          ))}
          {shown.length === 0 && <div className="ev-empty">No {filter.toLowerCase()} scheduled yet — check back soon.</div>}
        </div>

        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <a href="mailto:sfefoundery@gmail.com" className="btn-ghost">View Full Calendar <IconArrow size={17} /></a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
