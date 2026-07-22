'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import Footer from '../../../components/Footer';
import { getProjects, type ProjectWithRating } from '../../../lib/projects';
import { IconArrow } from '../../../components/icons';

export default function DisplayPage() {
  const [projects, setProjects] = useState<ProjectWithRating[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [tag, setTag] = useState<string | null>(null);

  useEffect(() => {
    getProjects().then((p) => { setProjects(p); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const allTags = useMemo(() => {
    const s = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, [projects]);

  const shown = useMemo(() => {
    const query = q.trim().toLowerCase();
    return projects.filter((p) => {
      if (tag && !p.tags.includes(tag)) return false;
      if (query && !(p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query))) return false;
      return true;
    });
  }, [projects, q, tag]);

  return (
    <div className="page">
      <section className="page-hero">
        <h1 className="ph-title">DISPLAY</h1>
        <p className="ph-lede">A wall of everything SFE Foundry members have shipped. Rate the ones you love on the <Link href="/rate" style={{ color: 'var(--orange)' }}>Rate</Link> page.</p>
      </section>

      <section className="band" style={{ borderTop: 'none', paddingTop: 0 }}>
        <div className="shop-toolbar">
          <input className="input" style={{ margin: 0, maxWidth: 320 }} placeholder="Search projects…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        {allTags.length > 0 && (
          <div className="filter-row" style={{ marginTop: 18 }}>
            <button className={`filter-pill${tag === null ? ' on' : ''}`} onClick={() => setTag(null)}>All</button>
            {allTags.map((t) => (
              <button key={t} className={`filter-pill${tag === t ? ' on' : ''}`} onClick={() => setTag(t)}>#{t}</button>
            ))}
          </div>
        )}

        {loading ? (
          <p style={{ color: 'var(--faint)', marginTop: 30 }}>Loading…</p>
        ) : shown.length === 0 ? (
          <div className="empty" style={{ marginTop: 22 }}>
            <div className="eyebrow" style={{ justifyContent: 'center' }}>// Empty</div>
            <h3 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.3rem', marginTop: 6, marginBottom: 10 }}>No projects yet.</h3>
            <p style={{ color: 'var(--muted)', maxWidth: 420, margin: '0 auto 22px' }}>Be the first to ship — add a project from your dashboard.</p>
            <Link href="/my-projects" className="btn-primary" style={{ display: 'inline-flex' }}>Add a Project <IconArrow size={17} /></Link>
          </div>
        ) : (
          <div className="proj-grid" style={{ marginTop: 22 }}>
            {shown.map((p) => (
              <Link key={p.id} href={`/project/${p.id}`} style={{ textDecoration: 'none' }}>
                <article className="proj-card rate-card-hover">
                  {p.screenshots[0] && <div className="proj-shot"><img src={p.screenshots[0]} alt="" /></div>}
                  <div className="proj-body">
                    <div className="proj-title">{p.title}</div>
                    <div className="proj-author">by {p.author_name || 'Anonymous'}</div>
                    <p className="proj-desc">{p.description}</p>
                    {p.tags.length > 0 && (
                      <div className="tag-row" style={{ marginTop: 4 }}>
                        {p.tags.map((t) => <span key={t} className="tag mini">#{t}</span>)}
                      </div>
                    )}
                    {p.buzz && <div className="display-buzz-hint">Builder story inside</div>}
                    <div className="proj-actions">
                      {p.count > 0
                        ? <span className="proj-rating">Overall {p.overall.toFixed(1)}/5 <span style={{ color: 'var(--faint)' }}>({p.count})</span></span>
                        : <span style={{ color: 'var(--faint)', fontSize: '.82rem' }}>No ratings yet</span>
                      }
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
