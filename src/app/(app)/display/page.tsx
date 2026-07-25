'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import Footer from '../../../components/Footer';
import { useAuth } from '../../../components/AuthProvider';
import { getProjects, type ProjectWithRating } from '../../../lib/projects';
import { getSocialCounts, type SocialCounts } from '../../../lib/projectSocial';
import { IconArrow, IconHeart, IconComment, IconEye } from '../../../components/icons';

type SortKey = 'newest' | 'top-rated' | 'most-liked';

export default function DisplayPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<ProjectWithRating[]>([]);
  const [counts, setCounts] = useState<Record<string, SocialCounts>>({});
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [tag, setTag] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>('newest');

  useEffect(() => {
    getProjects().then(async (p) => {
      setProjects(p);
      setLoading(false);
      const c = await getSocialCounts(p.map(x => x.id), user?.id).catch(() => ({}));
      setCounts(c);
    }).catch(() => setLoading(false));
  }, [user?.id]);

  const allTags = useMemo(() => {
    const s = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, [projects]);

  const shown = useMemo(() => {
    const query = q.trim().toLowerCase();
    let list = projects.filter((p) => {
      if (tag && !p.tags.includes(tag)) return false;
      if (query && !(p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query))) return false;
      return true;
    });
    if (sort === 'top-rated') list = [...list].sort((a, b) => b.overall - a.overall);
    if (sort === 'most-liked') list = [...list].sort((a, b) => (counts[b.id]?.likes ?? 0) - (counts[a.id]?.likes ?? 0));
    return list;
  }, [projects, q, tag, sort, counts]);

  return (
    <div className="page">
      <section className="page-hero">
        <h1 className="ph-title">DISPLAY</h1>
        <p className="ph-lede">A wall of everything SFE Foundry members have shipped. Rate the ones you love on the <Link href="/rate" style={{ color: 'var(--orange)' }}>Rate</Link> page.</p>
      </section>

      <section className="band" style={{ borderTop: 'none', paddingTop: 0 }}>
        <div className="display-toolbar">
          <input className="input" style={{ margin: 0, maxWidth: 320, flex: 1 }} placeholder="Search projects…" value={q} onChange={(e) => setQ(e.target.value)} />
          <div className="display-sort">
            <label htmlFor="sort-select">Sort</label>
            <select id="sort-select" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
              <option value="newest">Newest</option>
              <option value="top-rated">Top rated</option>
              <option value="most-liked">Most liked</option>
            </select>
          </div>
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
            {shown.map((p) => {
              const c = counts[p.id] ?? { likes: 0, comments: 0, views: 0, likedByMe: false };
              const isTopRated = p.count >= 3 && p.overall >= 4.5;
              const initial = (p.author_name?.trim()?.[0] || '?').toUpperCase();
              return (
                <Link key={p.id} href={`/project/${p.id}`} style={{ textDecoration: 'none' }}>
                  <article className="proj-card submission-card rate-card-hover">
                    {isTopRated && <span className="submission-ribbon">TOP RATED</span>}
                    {p.screenshots[0] && <div className="proj-shot"><img src={p.screenshots[0]} alt="" /></div>}
                    <div className="proj-body">
                      <div className="proj-title">{p.title}</div>
                      <p className="proj-desc">{p.description}</p>
                      {p.tags.length > 0 && (
                        <div className="tag-row" style={{ marginTop: 4 }}>
                          {p.tags.map((t) => <span key={t} className="tag mini">#{t}</span>)}
                        </div>
                      )}
                      {p.buzz && <div className="display-buzz-hint">Builder story inside</div>}
                      <div className="submission-foot">
                        <div className="submission-avatar">{initial}</div>
                        <div className="submission-stats">
                          <span><IconHeart size={14} fill={c.likedByMe} /> {c.likes}</span>
                          <span><IconComment size={14} /> {c.comments}</span>
                          <span><IconEye size={14} /> {c.views}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
