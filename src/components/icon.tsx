import type { IconName } from '@/lib/types';

export default function Icon({ name }: { name: IconName }) {
  const shapes = {
    star: <><path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z"/><circle cx="12" cy="12" r="3"/></>,
    moon: <path d="M19 15a8 8 0 0 1-10-10 8 8 0 1 0 10 10Z"/>,
    bridge: <path d="M2 17h20M4 17V7m16 10V7M4 9q8 7 16 0M8 12v5m4-4v4m4-5v5"/>,
    book: <path d="M3 4q5-2 9 1 4-3 9-1v15q-5-2-9 1-4-3-9-1Z M12 5v15"/>,
    map: <path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2Zm6-2v16m6-14v16"/>,
    settings: <><circle cx="12" cy="12" r="4"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2"/></>,
    leaf: <path d="M4 20Q-1 3 21 3q0 20-17 17Zm0 0L16 8"/>,
    arrow: <path d="M4 12h16m-6-6 6 6-6 6"/>,
    pin: <><path d="M19 9c0 6-7 12-7 12S5 15 5 9a7 7 0 1 1 14 0Z"/><circle cx="12" cy="9" r="2"/></>,
    check: <path d="m5 12 5 5L20 6"/>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{shapes[name]}</svg>;
}
