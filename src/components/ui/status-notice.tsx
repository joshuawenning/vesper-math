import type { ReactNode } from 'react';
import Icon from '../icon';

/** A quiet, non-blocking announcement that never moves keyboard focus. */
export default function StatusNotice({
  children,
  warning = false,
}: {
  children?: ReactNode;
  warning?: boolean;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed bottom-20 left-1/2 z-50 w-max max-w-[calc(100vw-32px)] -translate-x-1/2"
    >
      {children && (
        <span
          className={`flex items-center gap-2 border px-4 py-2.5 text-sm shadow-lg ${warning ? 'border-[#b49e70] bg-[#634632] text-[#fff5dc]' : 'border-[#b49e70] bg-[#243d33] text-[#fff5dc]'}`}
        >
          <Icon name={warning ? 'restart' : 'check'} className="size-4 shrink-0" />
          {children}
        </span>
      )}
    </div>
  );
}
