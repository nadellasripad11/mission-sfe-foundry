'use client';

import { useMemo, useRef, useState } from 'react';

export default function MentionTextarea({
  value,
  onChange,
  suggestions,
  className,
  placeholder,
  maxLength,
  rows,
}: {
  value: string;
  onChange: (v: string) => void;
  suggestions: string[];
  className?: string;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [query, setQuery] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const matches = useMemo(() => {
    if (query === null) return [];
    const q = query.toLowerCase();
    return suggestions.filter(s => s.toLowerCase().startsWith(q)).slice(0, 6);
  }, [query, suggestions]);

  const detectMention = (text: string, caret: number) => {
    const upToCaret = text.slice(0, caret);
    const at = upToCaret.lastIndexOf('@');
    if (at === -1) return setQuery(null);
    const between = upToCaret.slice(at + 1);
    if (/\s/.test(between)) return setQuery(null); // typed past the mention word
    setQuery(between);
    setActiveIndex(0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    detectMention(e.target.value, e.target.selectionStart ?? e.target.value.length);
  };

  const insertMention = (name: string) => {
    const el = ref.current;
    if (!el) return;
    const caret = el.selectionStart ?? value.length;
    const upToCaret = value.slice(0, caret);
    const at = upToCaret.lastIndexOf('@');
    const before = value.slice(0, at);
    const after = value.slice(caret);
    const next = `${before}@${name} ${after}`;
    onChange(next);
    setQuery(null);
    requestAnimationFrame(() => {
      const pos = before.length + name.length + 2;
      el.focus();
      el.setSelectionRange(pos, pos);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (query === null || matches.length === 0) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex(i => (i + 1) % matches.length); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex(i => (i - 1 + matches.length) % matches.length); }
    else if (e.key === 'Enter' || e.key === 'Tab') { e.preventDefault(); insertMention(matches[activeIndex]); }
    else if (e.key === 'Escape') { setQuery(null); }
  };

  return (
    <div style={{ position: 'relative' }}>
      <textarea
        ref={ref}
        className={className}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={() => setTimeout(() => setQuery(null), 150)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
      />
      {query !== null && matches.length > 0 && (
        <div className="mention-dropdown">
          {matches.map((name, i) => (
            <button
              key={name}
              type="button"
              className={`mention-option${i === activeIndex ? ' active' : ''}`}
              onMouseDown={(e) => { e.preventDefault(); insertMention(name); }}
            >
              @{name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
