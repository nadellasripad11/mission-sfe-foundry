'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Footer from '../../../components/Footer';
import { CATEGORIES } from '../../../lib/products';
import { IconArrow } from '../../../components/icons';

function requestMailto(name: string) {
  const subject = encodeURIComponent(`Shop request: ${name}`);
  const body = encodeURIComponent(
    `Hi SFE Foundry team,\n\nI'd like to request the following item:\n\n• ${name}\n\nName:\nSize (if apparel):\nQuantity:\n\nThanks!`
  );
  return `mailto:sfefoundryteam@gmail.com?subject=${subject}&body=${body}`;
}

export default function Shop() {
  const [active, setActive] = useState('all');
  const [q, setQ] = useState('');

  const shown = useMemo(() => {
    const query = q.trim().toLowerCase();
    return CATEGORIES
      .flatMap((c) => (active === 'all' || active === c.slug ? c.items.map((it) => ({ ...it, category: c.name })) : []))
      .filter((it) => (query ? it.name.toLowerCase().includes(query) : true));
  }, [active, q]);

  return (
    <div className="page">
      <section className="page-hero" style={{ paddingBottom: 20 }}>
        <h1 className="ph-title">SHOP</h1>
        <p className="ph-lede">Merch, stickers, and collectibles from the SFE Foundry crew.</p>
      </section>

      <section className="band" style={{ borderTop: 'none', paddingTop: 8 }}>
        <div className="shop-toolbar">
          <input
            className="input"
            style={{ margin: 0, maxWidth: 320 }}
            placeholder="Search products…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <div className="filter-row" style={{ marginTop: 18 }}>
          <button className={`filter-pill${active === 'all' ? ' on' : ''}`} onClick={() => setActive('all')}>All</button>
          {CATEGORIES.map((c) => (
            <button key={c.slug} className={`filter-pill${active === c.slug ? ' on' : ''}`} onClick={() => setActive(c.slug)}>{c.name}</button>
          ))}
        </div>

        <div className="shop-grid">
          {shown.map((it) => (
            <a key={it.name} href={requestMailto(it.name)} className="shop-card">
              <div className="shop-card-img">
                <img src={it.image} alt={it.name} className="shop-card-photo" />
              </div>
              <div className="shop-card-body">
                <div className="shop-card-cat">{it.category}</div>
                <div className="shop-card-name">{it.name}</div>
                {it.description && <div className="shop-card-desc">{it.description}</div>}
                <div className="shop-card-meta">
                  {it.price && <span className="shop-card-price">{it.price} pts</span>}
                  {it.tag && <span className="shop-card-tag">{it.tag}</span>}
                </div>
                <div className="shop-card-cta">Request <IconArrow size={13} /></div>
              </div>
            </a>
          ))}
        </div>

        {shown.length === 0 && <div className="ev-empty">No products match &ldquo;{q}&rdquo;.</div>}

        <p style={{ marginTop: 24, color: 'var(--muted)', fontSize: '.82rem', textAlign: 'center' }}>
          Store isn&apos;t live yet — items open an email to the team. <Link href="/contact" style={{ color: 'var(--orange)' }}>Contact us</Link> to reserve or ask about pricing.
        </p>
      </section>

      <Footer />
    </div>
  );
}
