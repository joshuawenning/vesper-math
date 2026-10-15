'use client';
import { useState } from 'react';
import { worlds } from '@/content/worlds';
import type { Chapter, Progress } from '@/lib/types';
import Icon from '../icon';

export default function WorldNavigator({
  chapter,
  progress,
  onWorld,
}: {
  chapter: Chapter;
  progress: Progress;
  onWorld: (id: string) => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  async function travel(id: string) {
    if (loading || id === progress.worldId) return;
    setLoading(true);
    setError('');
    try {
      await onWorld(id);
    } catch {
      setError('This road could not be opened. Please try again.');
    } finally {
      setLoading(false);
    }
  }
  return (
    <section
      aria-label="Your current adventure"
      className="mb-2 border border-line bg-surface p-3 tablet:p-4"
    >
      <div className="flex flex-col gap-3 desktop:flex-row desktop:items-center desktop:justify-between">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-xs leading-relaxed text-gold">
            <Icon
              name={worlds.find((world) => world.id === chapter.id)?.icon ?? 'map'}
              className="size-4"
            />
            Chapter {chapter.number ?? 1} of {worlds.length} ·{' '}
            {progress.ending ? 'Complete' : 'Your current trail'}
          </p>
          <p className="mt-1 font-story text-xl leading-snug">{chapter.title}</p>
        </div>
        <label className="block w-full desktop:max-w-[290px]">
          <span className="mb-1 block text-xs leading-5 text-subtle">Travel to a world</span>
          <span className="relative block">
            <select
              value={progress.worldId}
              disabled={loading}
              onChange={(event) => void travel(event.target.value)}
              className="min-h-11 w-full appearance-none border border-line bg-night py-2 pl-3 pr-10 text-body disabled:opacity-60"
            >
              {worlds
                .filter((world) => world.playable)
                .map((world) => (
                  <option key={world.id} value={world.id}>
                    {world.number}. {world.title}
                  </option>
                ))}
            </select>
            <svg
              viewBox="0 0 14 10"
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 h-2.5 w-3 -translate-y-1/2 fill-none stroke-current text-gold"
            >
              <path d="m2 3 5 5 5-5" strokeWidth="1.5" />
            </svg>
          </span>
        </label>
      </div>
      {loading && (
        <p role="status" className="mt-2 text-sm text-subtle">
          Opening the path…
        </p>
      )}
      {error && (
        <p role="alert" className="mt-2 text-sm text-gold">
          {error}
        </p>
      )}
    </section>
  );
}
