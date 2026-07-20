'use client';

import { useState } from 'react';
import Footer from '../../../components/Footer';
import { MISSIONS } from '../../../lib/missions';

export default function MissionsPage() {
  const [open, setOpen] = useState<string | null>(MISSIONS[0]?.slug ?? null);

  return (
    <div className="page">
      <section className="page-hero">
        <h1 className="ph-title">MISSIONS</h1>
        <p className="ph-lede">Guides for every SFE Foundry competition and workshop — what it is, how to prepare, and how to win.</p>
      </section>

      <section className="band" style={{ borderTop: 'none', paddingTop: 0 }}>
        <div className="mission-list">
          {MISSIONS.map((m) => {
            const isOpen = open === m.slug;
            return (
              <article key={m.slug} className={`mission${isOpen ? ' open' : ''}`}>
                <button className="mission-head" onClick={() => setOpen(isOpen ? null : m.slug)}>
                  <div className="mission-date">{m.date}</div>
                  <div className="mission-head-body">
                    <div className="mission-cat">{m.category}</div>
                    <div className="mission-title">{m.title}</div>
                    <div className="mission-tag">{m.tagline}</div>
                  </div>
                  <span className="faq-plus" aria-hidden="true">+</span>
                </button>
                {isOpen && (
                  <div className="mission-body">
                    {m.guide.map((g) => (
                      <div key={g.heading} className="mission-section">
                        <div className="mission-h">{g.heading}</div>
                        <p>{g.body}</p>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
