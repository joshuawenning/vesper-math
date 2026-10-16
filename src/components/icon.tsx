import type { IconName } from '@/lib/types';

export default function Icon({
  name,
  className = 'size-5',
}: {
  name: IconName;
  className?: string;
}) {
  const shapes = {
    monitor: (
      <>
        <rect x="3" y="3" width="18" height="13" rx="2" />
        <path d="M12 16v5m-5 0h10" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </>
    ),
    hive: (
      <path d="m8 3 4-2 4 2 1 4 3 3 1 5-2 6H5l-2-6 1-5 3-3Zm-1 4h10M4 11h16M3 15h18M9 21v-3a3 3 0 0 1 6 0v3" />
    ),
    snail: (
      <>
        <circle cx="10" cy="11" r="7" />
        <path d="M10 8a3 3 0 1 1-3 3M3 18c0 3 7 4 13 3 4-1 5-4 4-7m0 0-3-4m3 4 3-3M4 21h18" />
      </>
    ),
    seed: (
      <path d="M12 21C-2 15 3 3 12 3s14 12 0 18Zm0-15v15M8 9l4 3 4-3m-7 5 3 2 3-2M9 3 8 1m7 2 1-2" />
    ),
    orchard: (
      <path d="M12 22V10m0 8-5-4m5 1 5-4M7 14C0 15 0 7 5 6 3 0 12 0 12 5c4-7 12-2 8 3 6 5-1 10-5 7M7 22h10" />
    ),
    droplet: <path d="M12 2C10 6 4 10 4 15a8 8 0 0 0 16 0c0-5-6-9-8-13ZM8 15c0 3 2 4 4 4" />,
    scarab: (
      <>
        <ellipse cx="12" cy="13" rx="5" ry="8" />
        <path d="M12 5v16M9 6 7 2m8 4 2-4M7 9 3 6m4 7H2m5 4-4 4M17 9l4-3m-4 7h5m-5 4 4 4M8 11h8" />
      </>
    ),
    prism: <path d="m12 2 10 19H2Zm0 0v19M2 21l10-6 10 6M3 8h4m10 0h4M1 12h4m14 0h4" />,
    hourglass: (
      <path d="M5 2h14M5 22h14M7 2v4c0 3 5 6 5 6s5-3 5-6V2M7 22v-4c0-3 5-6 5-6s5 3 5 6v4M9 6h6m-6 13 3-3 3 3" />
    ),
    quill: <path d="M3 21 17 7M5 17C2 8 12 1 22 2c0 10-7 20-16 17M9 13h6m-2-4h6" />,
    antlers: (
      <path d="M9 22v-8L4 9V3m5 19h6V14l5-5V3M4 7 1 4m3 5 4-4m12 2 3-3m-3 5-4-4M9 15l3-3 3 3M9 18h6" />
    ),
    ferry: <path d="M2 14h20l-4 6H6Zm10 0V2m0 0-8 9h8M3 23q3-2 6 0t6 0 6 0" />,
    orrery: (
      <>
        <path d="M12 4v16m-5 2h10M3 13q9 6 18 0" />
        <ellipse cx="12" cy="10" rx="10" ry="4" />
        <circle cx="12" cy="10" r="2" />
        <circle cx="19" cy="7" r="2" />
      </>
    ),
    comet: (
      <>
        <path d="m14 3-8 8m14-6-8 8m10-3-8 8" />
        <circle cx="7" cy="17" r="5" />
        <path d="m5 17 2-2 2 2-2 2Z" />
      </>
    ),
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
        <path d="M19.36 9.75 L21.85 10.26 L21.85 13.74 L19.36 14.25 L18.80 15.61 L20.19 17.74 L17.74 20.19 L15.61 18.80 L14.25 19.36 L13.74 21.85 L10.26 21.85 L9.75 19.36 L8.39 18.80 L6.26 20.19 L3.81 17.74 L5.20 15.61 L4.64 14.25 L2.15 13.74 L2.15 10.26 L4.64 9.75 L5.20 8.39 L3.81 6.26 L6.26 3.81 L8.39 5.20 L9.75 4.64 L10.26 2.15 L13.74 2.15 L14.25 4.64 L15.61 5.20 L17.74 3.81 L20.19 6.26 L18.80 8.39 Z" />
        <circle cx="12" cy="12" r="3.25" />
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
      {shapes[name === 'settings' ? 'gear' : name]}
    </svg>
  );
}
