'use client';
import { useEffect, useRef, useState } from 'react';
import Icon from '../icon';

/** Announce actual Resolve changes, without replaying rewards when a saved view opens. */
export default function ResolveNotice({ value }: { value: number }) {
  const previous = useRef(value);
  const [notice, setNotice] = useState<{ delta: number } | null>(null);

  useEffect(() => {
    const delta = value - previous.current;
    previous.current = value;
    if (delta) setNotice({ delta });
  }, [value]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 2800);
    return () => window.clearTimeout(timer);
  }, [notice]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed bottom-20 left-1/2 z-50 w-max max-w-[calc(100vw-32px)] -translate-x-1/2"
    >
      {notice && (
        <span
          className={`flex items-center gap-2 border px-4 py-2.5 text-sm shadow-lg ${notice.delta > 0 ? 'border-[#b49e70] bg-[#243d33] text-[#fff5dc]' : 'border-[#b49e70] bg-[#634632] text-[#fff5dc]'}`}
        >
          <Icon name={notice.delta > 0 ? 'check' : 'restart'} className="size-4" />
          {notice.delta > 0 ? '+' : '−'}
          {Math.abs(notice.delta)} Resolve
        </span>
      )}
    </div>
  );
}
