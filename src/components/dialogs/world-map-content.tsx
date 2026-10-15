'use client';
import { useState } from 'react';
import Image from 'next/image';
import { worlds } from '@/content/worlds';
import { encounterStatus } from '@/lib/progress';
import type { Chapter, Progress } from '@/lib/types';
import Icon from '../icon';
import Button from '../ui/button';
import { Eyebrow, Narrative } from '../ui/typography';

export default function WorldMapContent({
  chapter,
  progress,
  onEncounter,
  onWorld,
}: {
  chapter: Chapter;
  progress: Progress;
  onEncounter: (id: string) => void;
  onWorld: (id: string) => Promise<void>;
}) {
  const [loading, setLoading] = useState(''),
    [error, setError] = useState('');
  async function visit(id: string) {
    setLoading(id);
    setError('');
    try {
      await onWorld(id);
    } catch {
      setError('The path could not be loaded. Please try again.');
      setLoading('');
    }
  }
  return (
    <>
      <Narrative>
        There is more than one path through this world. Choose where your next chapter begins.
      </Narrative>
      <div className="grid gap-3">
        {worlds
          .filter((world) => world.playable)
          .map((world) => {
            const journey = world.id === progress.worldId ? progress : progress.journeys[world.id];
            return (
              <button
                type="button"
                key={world.id}
                aria-current={world.id === progress.worldId ? 'location' : undefined}
                disabled={Boolean(loading)}
                onClick={() => void visit(world.id)}
                className="group overflow-hidden border border-[#909c8360] bg-[#e5dfcb] text-left aria-[current=location]:ring-2 aria-[current=location]:ring-[#775a26] disabled:opacity-50"
              >
                <div className="relative h-[140px]">
                  <Image
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    src={world.image!}
                    alt={`An illustrated glimpse of ${world.title}`}
                    fill
                    sizes="600px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11251acc] to-transparent" />
                  <span className="absolute bottom-3 left-4 text-[0.75rem] uppercase tracking-[2px] text-[#eee5d0]">
                    Chapter {world.number} ·{' '}
                    {world.id === progress.worldId
                      ? 'Your current trail'
                      : journey?.ending
                        ? 'Restored'
                        : 'Ready to explore'}
                  </span>
                </div>
                <span className="block p-4">
                  <strong className="flex items-center gap-2.5 font-story text-[1.6875rem] font-semibold">
                    <Icon name={world.icon} className="size-5 text-[#43533e]" />
                    {world.title}
                  </strong>
                  <span className="mt-1 block font-story text-[1.125rem] italic text-[#43533e]">
                    {world.teaser}
                  </span>
                  <span className="mt-3 block text-[0.75rem] text-[#43533e]">
                    {loading === world.id
                      ? 'Opening the path…'
                      : `${journey?.done.length ?? 0} / ${world.encounters.length} discoveries · Enter ${world.chapter}`}
                  </span>
                </span>
              </button>
            );
          })}
      </div>
      {error && (
        <p role="alert" className="my-3 text-xs text-[#8c4a36]">
          {error}
        </p>
      )}
      <div className="mt-7 border-t border-[#909c8340] pt-5">
        <Eyebrow tone="brown">Your trail in {chapter.region}</Eyebrow>
        <ol className="my-[14px] list-none p-0">
          {chapter.encounters.map((e) => {
            const status = encounterStatus(e.id, progress, chapter);
            return (
              <li
                className="flex items-center gap-[15px] border-b border-[#29382c22] py-4"
                key={e.id}
              >
                <Icon name={e.icon} />
                <div>
                  <strong className="block font-story text-[1.375rem] font-semibold">
                    {e.title}
                  </strong>
                  <p className="my-1 text-[0.75rem] text-[#43533e]">
                    {status === 'done'
                      ? 'Explored'
                      : status === 'current'
                        ? 'Your next destination'
                        : 'The path opens as you explore'}
                  </p>
                </div>
                <Button variant="secondary" className="ml-auto" onClick={() => onEncounter(e.id)}>
                  {status === 'locked' ? 'Inspect' : 'Visit'}
                </Button>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}
