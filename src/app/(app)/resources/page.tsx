'use client';

import Footer from '../../../components/Footer';
import { RESOURCE_GROUPS } from '../../../lib/resources';
import { IconArrow } from '../../../components/icons';

export default function ResourcesPage() {
  return (
    <div className="page">
      <section className="page-hero">
        <h1 className="ph-title">RESOURCES</h1>
        <p className="ph-lede">Hand-picked guides for building with AI, shipping code, and designing like a pro.</p>
      </section>

      <section className="band" style={{ borderTop: 'none', paddingTop: 0 }}>
        {RESOURCE_GROUPS.map((g) => (
          <div key={g.slug} className="resource-group">
            <h2 className="resource-group-h">{g.name}</h2>
            <div className="resource-grid">
              {g.items.map((r) => (
                <a
                  key={r.title}
                  href={r.href}
                  target={r.external ? '_blank' : undefined}
                  rel={r.external ? 'noopener noreferrer' : undefined}
                  className="resource-card"
                >
                  <div className="resource-title">{r.title}</div>
                  <p className="resource-desc">{r.description}</p>
                  <div className="resource-cta">Open <IconArrow size={13} /></div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
