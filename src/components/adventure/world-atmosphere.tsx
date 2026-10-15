import type { CSSProperties, ReactNode } from 'react';
import { getAtmosphere } from '@/content/atmospheres';

export default function WorldAtmosphere({
  worldId,
  children,
}: {
  worldId: string;
  children: ReactNode;
}) {
  const dark = getAtmosphere(worldId, 'dark');
  const light = getAtmosphere(worldId, 'light');
  return (
    <div
      data-world={worldId}
      className="relative isolate min-h-screen bg-night [--canvas:var(--paper-dark)] [--wash:var(--wash-dark)] [--undertone:var(--undertone-dark)] [[data-theme=light]_&]:[--canvas:var(--paper-light)] [[data-theme=light]_&]:[--wash:var(--wash-light)] [[data-theme=light]_&]:[--undertone:var(--undertone-light)]"
      style={
        {
          '--paper-dark': dark.canvas,
          '--paper-light': light.canvas,
          '--wash-dark': dark.glow,
          '--wash-light': light.glow,
          '--undertone-dark': dark.undertone,
          '--undertone-light': light.undertone,
        } as CSSProperties
      }
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 65% 0%, var(--wash), transparent 65%), radial-gradient(ellipse at 10% 85%, var(--undertone), transparent 70%)',
        }}
      >
        <div className="absolute inset-0 bg-[url('/textures/paper-grain.svg')] bg-repeat opacity-[.09] mix-blend-soft-light" />
      </div>
      {children}
    </div>
  );
}
