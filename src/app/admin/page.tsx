'use client';

import { useState, useEffect, useCallback } from 'react';

interface Signup { id: number; email: string; name: string; reason: string | null; created_at: string; }
interface PageView { id: number; page: string; session_id: string | null; referrer: string | null; created_at: string; }
interface AnalyticsEvent { id: number; event_type: string; page: string | null; metadata: Record<string, unknown> | null; created_at: string; }

interface AdminData {
  signups: Signup[];
  pageViews: PageView[];
  events: AnalyticsEvent[];
  topPages: { page: string; count: number }[];
  uniqueSessions: number;
  todaySignups: number;
  weekSignups: number;
  todayViews: number;
  fetchedAt: Date;
}

function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color: string }) {
  return (
    <div className="adm-stat">
      <div className="adm-stat-label">{label}</div>
      <div className="adm-stat-value" style={{ color }}>{value}</div>
      {sub && <div className="adm-stat-sub">{sub}</div>}
    </div>
  );
}

// ── Login screen ──────────────────────────────────────────────────────────────
function LoginScreen({ onAuth }: { onAuth: () => void }) {
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setErr('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      if (res.ok) {
        onAuth();
      } else {
        const { error } = await res.json();
        setErr(error || 'Incorrect passcode.');
        setCode('');
      }
    } catch {
      setErr('Connection error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adm-login-wrap">
      <div className="adm-login-box">
        <div className="adm-login-logo">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="10" fill="var(--orange)" opacity=".15" />
            <path d="M20 8L32 15v10L20 32 8 25V15L20 8z" stroke="var(--orange)" strokeWidth="2" fill="none" />
            <path d="M20 13L27 17v6L20 27l-7-4v-6L20 13z" fill="var(--orange)" opacity=".5" />
          </svg>
        </div>
        <h1 className="adm-login-title">Admin Panel</h1>
        <p className="adm-login-sub">SFE Foundry — restricted access</p>
        <form onSubmit={submit} style={{ width: '100%' }}>
          <div style={{ position: 'relative' }}>
            <input
              className="input"
              type={show ? 'text' : 'password'}
              placeholder="Enter passcode"
              value={code}
              onChange={(e) => { setCode(e.target.value); setErr(''); }}
              autoFocus
              disabled={loading}
              style={{ fontFamily: 'var(--mono)', letterSpacing: '0.05em', paddingRight: 44 }}
            />
            <button
              type="button"
              onClick={() => setShow(s => !s)}
              style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: 4 }}
            >
              {show ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              )}
            </button>
          </div>
          {err && <div className="msg-err" style={{ marginBottom: 0 }}>{err}</div>}
          <button type="submit" className="btn btn-solid btn-block" style={{ marginTop: 12, padding: 13 }} disabled={loading}>
            {loading ? 'Verifying…' : 'Unlock Panel'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Main dashboard ─────────────────────────────────────────────────────────────
function Dashboard({ onSignOut }: { onSignOut: () => void }) {
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'signups' | 'pageviews' | 'events'>('overview');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [countdown, setCountdown] = useState(30);

  const fetchData = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/admin/data');
      if (res.status === 401) { onSignOut(); return; }
      if (!res.ok) throw new Error('Failed to fetch');
      const { signups, pageViews, events } = await res.json();

      const now = Date.now();
      const day = 86400000;
      const week = 7 * day;

      const todaySignups = signups.filter((s: Signup) => now - new Date(s.created_at).getTime() < day).length;
      const weekSignups = signups.filter((s: Signup) => now - new Date(s.created_at).getTime() < week).length;
      const todayViews = pageViews.filter((v: PageView) => now - new Date(v.created_at).getTime() < day).length;
      const uniqueSessions = new Set(pageViews.map((v: PageView) => v.session_id).filter(Boolean)).size;

      const pageCounts: Record<string, number> = {};
      for (const v of pageViews as PageView[]) pageCounts[v.page] = (pageCounts[v.page] || 0) + 1;
      const topPages = Object.entries(pageCounts)
        .sort((a, b) => b[1] - a[1]).slice(0, 10)
        .map(([page, count]) => ({ page, count }));

      setData({ signups, pageViews, events, topPages, uniqueSessions, todaySignups, weekSignups, todayViews, fetchedAt: new Date() });
    } catch {
      setError('Failed to load data. Check connection.');
    } finally {
      setLoading(false);
    }
  }, [onSignOut]);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    if (!autoRefresh) { setCountdown(30); return; }
    const interval = setInterval(() => {
      setCountdown(c => { if (c <= 1) { fetchData(); return 30; } return c - 1; });
    }, 1000);
    return () => clearInterval(interval);
  }, [autoRefresh, fetchData]);

  // Sanitize CSV values to prevent formula injection
  const sanitizeCsv = (val: unknown): string => {
    const s = String(val ?? '').replace(/"/g, '""');
    // Strip leading =, +, -, @ which Excel treats as formulas
    const safe = s.replace(/^[=+\-@\t\r]+/, '');
    return `"${safe}"`;
  };

  const exportCSV = (rows: Record<string, unknown>[], name: string) => {
    if (!rows.length) return;
    const keys = Object.keys(rows[0]);
    const csv = [
      keys.map(k => `"${k}"`),
      ...rows.map(r => keys.map(k => sanitizeCsv(r[k]))),
    ].map(r => r.join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = `${name}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const signOut = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    onSignOut();
  };

  const fmt = (iso: string) => new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="adm-wrap">
      <div className="adm-header">
        <div className="adm-header-left">
          <div className="adm-logo-mark">
            <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
              <path d="M20 4L36 13v14L20 36 4 27V13L20 4z" stroke="var(--orange)" strokeWidth="2.5" fill="none" />
              <path d="M20 11L30 17v6L20 29l-10-6v-6L20 11z" fill="var(--orange)" opacity=".4" />
            </svg>
          </div>
          <div>
            <div className="adm-title">SFE Foundry Admin</div>
            <div className="adm-subtitle">
              {data ? `Updated ${data.fetchedAt.toLocaleTimeString()}` : 'Loading...'}
            </div>
          </div>
        </div>
        <div className="adm-header-right">
          <label className="adm-toggle-label">
            <input type="checkbox" checked={autoRefresh} onChange={e => setAutoRefresh(e.target.checked)} className="adm-toggle-input" />
            <span className="adm-toggle-track" />
          </label>
          <span className="adm-refresh-label">
            {autoRefresh ? `Auto-refresh (${countdown}s)` : 'Auto-refresh off'}
          </span>
          <button className="adm-btn" onClick={fetchData} disabled={loading}>
            {loading ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="adm-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"/></svg>
            )}
            Refresh
          </button>
          <button className="adm-btn adm-btn-danger" onClick={signOut}>Sign Out</button>
        </div>
      </div>

      {error && <div className="adm-error">{error}</div>}

      <div className="adm-tabs">
        {(['overview', 'signups', 'pageviews', 'events'] as const).map(t => (
          <button key={t} className={`adm-tab${activeTab === t ? ' on' : ''}`} onClick={() => setActiveTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
            {t === 'signups' && data && <span className="adm-tab-badge">{data.signups.length}</span>}
            {t === 'pageviews' && data && <span className="adm-tab-badge">{data.pageViews.length}</span>}
            {t === 'events' && data && <span className="adm-tab-badge">{data.events.length}</span>}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && data && (
        <div className="adm-content">
          <div className="adm-stats-grid">
            <StatCard label="Total Members" value={data.signups.length} sub="all time signups" color="var(--orange)" />
            <StatCard label="New Today" value={data.todaySignups} sub="signups in last 24h" color="#22c55e" />
            <StatCard label="This Week" value={data.weekSignups} sub="signups in last 7d" color="#3b82f6" />
            <StatCard label="Page Views Today" value={data.todayViews} sub="tracked page loads" color="#a855f7" />
            <StatCard label="Total Page Views" value={data.pageViews.length} sub="all recorded views" color="#f59e0b" />
            <StatCard label="Unique Sessions" value={data.uniqueSessions} sub="distinct visitors" color="#06b6d4" />
          </div>

          <div className="adm-two-col">
            <div className="adm-card">
              <div className="adm-card-head"><span className="adm-card-title">Top Pages</span></div>
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead><tr><th>Page</th><th>Views</th><th>Share</th></tr></thead>
                  <tbody>
                    {data.topPages.map(({ page, count }) => (
                      <tr key={page}>
                        <td className="adm-mono">{page}</td>
                        <td>{count}</td>
                        <td>
                          <div className="adm-bar-wrap">
                            <div className="adm-bar" style={{ width: `${(count / (data.topPages[0]?.count || 1)) * 100}%` }} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="adm-card">
              <div className="adm-card-head"><span className="adm-card-title">Recent Members</span></div>
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead><tr><th>Name</th><th>Email</th><th>Joined</th></tr></thead>
                  <tbody>
                    {data.signups.slice(0, 8).map(s => (
                      <tr key={s.id}>
                        <td>{s.name}</td>
                        <td className="adm-muted adm-mono">{s.email}</td>
                        <td className="adm-muted">{fmt(s.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {data.events.length > 0 && (
            <div className="adm-card" style={{ marginTop: 20 }}>
              <div className="adm-card-head"><span className="adm-card-title">Recent Events</span></div>
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead><tr><th>Type</th><th>Page</th><th>Data</th><th>When</th></tr></thead>
                  <tbody>
                    {data.events.slice(0, 10).map(e => (
                      <tr key={e.id}>
                        <td><span className="adm-badge">{e.event_type}</span></td>
                        <td className="adm-mono adm-muted">{e.page || '-'}</td>
                        <td className="adm-mono adm-muted" style={{ fontSize: '.75rem' }}>
                          {e.metadata ? JSON.stringify(e.metadata).slice(0, 60) : '-'}
                        </td>
                        <td className="adm-muted">{fmt(e.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'signups' && data && (
        <div className="adm-content">
          <div className="adm-card">
            <div className="adm-card-head">
              <span className="adm-card-title">All Members ({data.signups.length})</span>
              <button className="adm-btn" onClick={() => exportCSV(data.signups as unknown as Record<string, unknown>[], 'sfe-members')}>Export CSV</button>
            </div>
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Reason</th><th>Joined</th></tr></thead>
                <tbody>
                  {data.signups.map((s, i) => (
                    <tr key={s.id}>
                      <td className="adm-muted">{data.signups.length - i}</td>
                      <td>{s.name}</td>
                      <td className="adm-mono adm-muted">{s.email}</td>
                      <td className="adm-muted">{s.reason || '—'}</td>
                      <td className="adm-muted">{fmt(s.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {data.signups.length === 0 && <div className="adm-empty">No signups yet.</div>}
          </div>
        </div>
      )}

      {activeTab === 'pageviews' && data && (
        <div className="adm-content">
          <div className="adm-card">
            <div className="adm-card-head">
              <span className="adm-card-title">Page Views ({data.pageViews.length})</span>
              <button className="adm-btn" onClick={() => exportCSV(data.pageViews as unknown as Record<string, unknown>[], 'sfe-pageviews')}>Export CSV</button>
            </div>
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead><tr><th>Page</th><th>Session</th><th>Referrer</th><th>When</th></tr></thead>
                <tbody>
                  {data.pageViews.map(v => (
                    <tr key={v.id}>
                      <td className="adm-mono">{v.page}</td>
                      <td className="adm-mono adm-muted" style={{ fontSize: '.75rem' }}>{v.session_id?.slice(0, 10) || '—'}</td>
                      <td className="adm-muted" style={{ fontSize: '.8rem' }}>{v.referrer || '—'}</td>
                      <td className="adm-muted">{fmt(v.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {data.pageViews.length === 0 && (
              <div className="adm-empty">No page views recorded yet. Make sure the <code>page_views</code> table exists.</div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'events' && data && (
        <div className="adm-content">
          <div className="adm-card">
            <div className="adm-card-head">
              <span className="adm-card-title">Analytics Events ({data.events.length})</span>
              <button className="adm-btn" onClick={() => exportCSV(data.events as unknown as Record<string, unknown>[], 'sfe-events')}>Export CSV</button>
            </div>
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead><tr><th>Event</th><th>Page</th><th>Metadata</th><th>When</th></tr></thead>
                <tbody>
                  {data.events.map(e => (
                    <tr key={e.id}>
                      <td><span className="adm-badge">{e.event_type}</span></td>
                      <td className="adm-mono adm-muted">{e.page || '—'}</td>
                      <td className="adm-mono adm-muted" style={{ fontSize: '.75rem' }}>
                        {e.metadata ? JSON.stringify(e.metadata).slice(0, 80) : '—'}
                      </td>
                      <td className="adm-muted">{fmt(e.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {data.events.length === 0 && <div className="adm-empty">No events yet.</div>}
          </div>
        </div>
      )}

      {data && (data.pageViews.length === 0 || data.events.length === 0) && (
        <div className="adm-sql-notice">
          <strong>Supabase setup required</strong> — run this SQL in your Supabase dashboard:
          <pre>{`CREATE TABLE IF NOT EXISTS page_views (
  id BIGSERIAL PRIMARY KEY,
  page TEXT NOT NULL,
  session_id TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
-- Allow anonymous inserts only (no public reads — admin reads server-side)
CREATE POLICY "anon insert" ON page_views FOR INSERT TO anon WITH CHECK (true);

CREATE TABLE IF NOT EXISTS analytics_events (
  id BIGSERIAL PRIMARY KEY,
  event_type TEXT NOT NULL,
  page TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon insert" ON analytics_events FOR INSERT TO anon WITH CHECK (true);`}</pre>
        </div>
      )}
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetch('/api/admin/data')
      .then(r => { setAuthed(r.ok); setChecked(true); })
      .catch(() => setChecked(true));
  }, []);

  if (!checked) return null;
  if (!authed) return <LoginScreen onAuth={() => setAuthed(true)} />;
  return <Dashboard onSignOut={() => { setAuthed(false); }} />;
}
