'use client';
import { useEffect, useRef, useState } from 'react';
import StatusNotice from '../ui/status-notice';

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
    <StatusNotice warning={!!notice && notice.delta < 0}>
      {notice && `${notice.delta > 0 ? '+' : '−'}${Math.abs(notice.delta)} Resolve`}
    </StatusNotice>
  );
}
