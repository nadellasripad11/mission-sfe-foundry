'use client';

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z" />
    </svg>
  );
}

export default function Stars({
  value = 0,
  count,
  interactive = false,
  current,
  onRate,
}: {
  value?: number;
  count?: number;
  interactive?: boolean;
  current?: number;
  onRate?: (stars: number) => void;
}) {
  const rounded = Math.round(value);
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <span className="stars">
        {[1, 2, 3, 4, 5].map((i) => {
          const on = interactive ? (current ?? 0) >= i : rounded >= i;
          return interactive ? (
            <button
              key={i}
              type="button"
              className={`star interactive${on ? ' on' : ''}`}
              onClick={() => onRate?.(i)}
              aria-label={`Rate ${i} star${i > 1 ? 's' : ''}`}
            >
              <StarIcon filled={on} />
            </button>
          ) : (
            <span key={i} className={on ? 'star-static' : 'star'}>
              <StarIcon filled={on} />
            </span>
          );
        })}
      </span>
      {!interactive && (
        <span style={{ fontSize: '.82rem', color: 'var(--faint)', fontWeight: 600 }}>
          {count && count > 0 ? `${value.toFixed(1)} (${count})` : 'No ratings yet'}
        </span>
      )}
    </div>
  );
}
