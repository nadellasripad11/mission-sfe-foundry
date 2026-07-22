'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../components/AuthProvider';
import Footer from '../../../components/Footer';
import { getProjects, type ProjectWithRating } from '../../../lib/projects';
import { IconArrow } from '../../../components/icons';

export default function RatePage() {
  const { user, openAuth } = useAuth();
  const [projects, setProjects] = useState<ProjectWithRating[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects().then(p => { setProjects(p); setLoading(false); }).catch(() => setLoading(false));
  }, [user?.id]);

  return (
    <div className="page">
      <section className="page-hero">
        <h1 className="ph-title">RATE</h1>
        <p className="ph-lede">
          {user
            ? 'Score projects across four categories and leave written feedback.'
            : 'Sign in to rate what the community has shipped.'}
        </p>
      </section>

      <section className="band" style={{ borderTop: 'none', paddingTop: 0 }}>
        {!user ? (
          <div className="empty">
            <p style={{ color: 'var(--muted)', marginBottom: 16 }}>You need an account to rate projects.</p>
            <button className="btn-primary" onClick={() => openAuth('signin')}>Sign in <IconArrow size={17} /></button>
          </div>
        ) : loading ? (
          <p style={{ color: 'var(--faint)' }}>Loading…</p>
        ) : projects.length === 0 ? (
          <div className="empty">
            <p style={{ color: 'var(--muted)', marginBottom: 16 }}>No projects to rate yet.</p>
            <Link href="/my-projects" className="btn-primary" style={{ display: 'inline-flex' }}>Ship the first <IconArrow size={17} /></Link>
          </div>
        ) : (
          <>
            <p style={{ color: 'var(--muted)', fontSize: '.9rem', marginBottom: 24 }}>
              Click a project to open its page where you can score it on Originality, Technicality, Usability, and Impact (each /9) and leave written feedback.
            </p>
            <div className="proj-grid">
              {projects.map((p) => (
                <Link key={p.id} href={`/project/${p.id}`} style={{ textDecoration: 'none' }}>
                  <article className="proj-card rate-card-hover">
                    {p.screenshots[0] && <div className="proj-shot"><img src={p.screenshots[0]} alt="" /></div>}
                    <div className="proj-body">
                      <div className="proj-title">{p.title}</div>
                      <div className="proj-author">by {p.author_name || 'Anonymous'}</div>
                      <p className="proj-desc">{p.description}</p>
                      {p.count > 0 ? (
                        <div className="rate-card-scores">
                          {(['originality', 'technicality', 'usability', 'impact'] as const).map(k => (
                            <div key={k} className="rate-card-score">
                              <span className="rate-card-score-label">{k.slice(0, 4).toUpperCase()}</span>
                              <span className="rate-card-score-val">{p[k].toFixed(1)}/9</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div style={{ color: 'var(--faint)', fontSize: '.82rem', marginTop: 10 }}>No ratings yet</div>
                      )}
                      <div className="proj-actions" style={{ marginTop: 12 }}>
                        <span className="btn-ghost btn-sm">Rate this project <IconArrow size={13} /></span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}
