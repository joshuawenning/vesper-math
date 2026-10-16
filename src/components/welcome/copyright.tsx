'use client';
import { useEffect, useState } from 'react';

export default function Copyright() {
  const [year, setYear] = useState<number | null>(null);
  // Refresh on the device so the date stays current even when the page was built last year.
  useEffect(() => setYear(new Date().getFullYear()), []);
  return (
    <span>
      © {year}{' '}
      <a
        href="https://joshuawenning.com"
        className="underline decoration-current/40 underline-offset-4 hover:text-gold"
      >
        @joshuawenning
      </a>
    </span>
  );
}
