'use client';

interface StarRatingProps {
  value: number;       // 0–5
  onChange?: (n: number) => void;
  disabled?: boolean;
  size?: number;
}

export default function StarRating({ value, onChange, disabled, size = 32 }: StarRatingProps) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          disabled={disabled}
          onClick={() => onChange?.(n)}
          aria-label={`${n} star${n !== 1 ? 's' : ''}`}
          style={{
            background: 'none',
            border: 'none',
            padding: 2,
            cursor: disabled ? 'default' : 'pointer',
            transform: 'scale(1)',
            transition: 'transform .12s',
            lineHeight: 1,
          }}
          onMouseEnter={e => { if (!disabled) (e.currentTarget as HTMLElement).style.transform = 'scale(1.18)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
        >
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              fill={n <= value ? '#F5A623' : 'none'}
              stroke={n <= value ? '#F5A623' : '#C9BFB0'}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ))}
    </div>
  );
}
