import type { IconName } from '@/lib/types';

export default function Icon({
  name,
  className = 'size-5',
}: {
  name: IconName;
  className?: string;
}) {
  const shapes = {
    download: <path d="M12 3v12m-5-5 5 5 5-5M3 15v6h18v-6" />,
    upload: <path d="M12 15V3m-5 5 5-5 5 5M3 15v6h18v-6" />,
    restart: <path d="M4 9a8 8 0 1 1 0 7M4 3v6h6" />,
    speaker: (
      <>
        <path d="m11 4-6 5H2v6h3l6 5Z" />
        <path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" />
      </>
    ),
    stop: <rect x="6" y="6" width="12" height="12" rx="1" />,
    star: (
      <>
        <path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    owl: (
      <>
        <path d="M5 9 3 3l7 3h4l7-3-2 6v6c0 4-4 6-7 7-3-1-7-3-7-7Z" />
        <circle cx="8.5" cy="11" r="2.5" />
        <circle cx="15.5" cy="11" r="2.5" />
        <path d="m10 15 2 3 2-3M8 19l-1 2m9-2 1 2" />
      </>
    ),
    balance: <path d="M12 3v18M8 21h8M4 7h16M6 7l-4 8h8Zm12 0-4 8h8Z" />,
    gear: (
      <>
        <path
          d="m10 2-.5 3-2 .9L5 4 2 7l2 2.5-.9 2L1 12v4l3 .5.9 2L4 21l3 2 2.5-2 2 .9L12 24"
          transform="translate(1 -1) scale(.9)"
        />
        <path
          d="m14 2 .5 3 2 .9L19 4l3 3-2 2.5.9 2L23 12v4l-3 .5-.9 2L20 21l-3 2-2.5-2-2 .9L12 24"
          transform="translate(1 -1) scale(.9)"
        />
        <circle cx="12" cy="11" r="4" />
      </>
    ),
    mosaic: (
      <>
        <path d="m12 2 10 10-10 10L2 12Zm0 0v20M2 12h20M7 7l10 10M17 7 7 17" />
      </>
    ),
    coins: (
      <>
        <ellipse cx="9" cy="7" rx="7" ry="3" />
        <path d="M2 7v5c0 1.7 3.1 3 7 3m7-8v4M2 12v5c0 1.7 3.1 3 7 3" />
        <circle cx="16" cy="16" r="6" />
        <path d="M16 13v6m-2-3h4" />
      </>
    ),
    ruler: <path d="m3 17 14-14 4 4L7 21Zm11-11 2 2m-5 1 3 3m-6 0 2 2m-5 1 3 3" />,
    lantern: (
      <path d="M9 5V4a3 3 0 0 1 6 0v1M7 6h10l3 4H4Zm-2 4 2 11h10l2-11M12 12v6m-2-2h4M6 23h12" />
    ),
    crystal: (
      <path d="m12 2 6 5 3 8-9 7-9-7 3-8Zm0 0L9 8l3 14 3-14ZM6 7l3 1h6l3-1M3 15l6-7m6 0 6 7" />
    ),
    snowflake: (
      <path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7M9 4l3 3 3-3M9 20l3-3 3 3M3.5 10l4-1-1-4m14 9-4 1 1 4M3.5 14l4 1-1 4m14-9-4-1 1-4" />
    ),
    orbit: (
      <>
        <circle cx="12" cy="12" r="3" />
        <ellipse cx="12" cy="12" rx="11" ry="5" transform="rotate(-35 12 12)" />
        <ellipse cx="12" cy="12" rx="5" ry="11" transform="rotate(-35 12 12)" />
      </>
    ),
    flame: <path d="M13 2c2 6-4 7-1 11 1-3 3-4 5-5 0 4 4 5 3 9a8 8 0 0 1-16-1c0-5 6-7 9-14Z" />,
    waves: (
      <path d="M2 6q2.5-4 5 0t5 0 5 0 5 0M2 12q2.5-4 5 0t5 0 5 0 5 0M2 18q2.5-4 5 0t5 0 5 0 5 0" />
    ),
    moon: <path d="M19 15a8 8 0 0 1-10-10 8 8 0 1 0 10 10Z" />,
    bridge: <path d="M2 17h20M4 17V7m16 10V7M4 9q8 7 16 0M8 12v5m4-4v4m4-5v5" />,
    book: <path d="M3 4q5-2 9 1 4-3 9-1v15q-5-2-9 1-4-3-9-1Z M12 5v15" />,
    map: <path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2Zm6-2v16m6-14v16" />,
    settings: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2" />
      </>
    ),
    leaf: <path d="M4 20Q-1 3 21 3q0 20-17 17Zm0 0L16 8" />,
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    pin: (
      <>
        <path d="M19 9c0 6-7 12-7 12S5 15 5 9a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="9" r="2" />
      </>
    ),
    check: <path d="m5 12 5 5L20 6" />,
  };
  return (
    <svg
      className={`inline-block shrink-0 fill-none stroke-current align-middle [stroke-width:1.4] [stroke-linecap:round] [stroke-linejoin:round] ${className}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {shapes[name]}
    </svg>
  );
}
