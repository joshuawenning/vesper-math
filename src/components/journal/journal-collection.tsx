'use client';
import { useEffect, useState } from 'react';
import type { Chapter, Progress } from '@/lib/types';
import { loadChapter, worlds } from '@/content/worlds';
import { levelEncounter } from '@/lib/difficulty';
import CollectibleCard from './collectible-card';
export default function JournalCollection({
  chapter,
  progress,
}: {
  chapter: Chapter;
  progress: Progress;
}) {
  const [chapters, setChapters] = useState<Chapter[]>([chapter]);
  const [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    const earned = worlds.filter(
      (w) => w.id !== chapter.id && progress.journeys[w.id]?.done.length,
    );
    Promise.allSettled(earned.map((w) => loadChapter(w.id))).then((results) => {
      if (!active) return;
      setError(results.some((r) => r.status === 'rejected'));
      setChapters(
        [chapter, ...results.flatMap((r) => (r.status === 'fulfilled' ? [r.value] : []))].sort(
          (a, b) => (a.number ?? 1) - (b.number ?? 1),
        ),
      );
    });
    return () => {
      active = false;
    };
  }, [chapter.id, progress.history.length]);
  return (
    <section aria-label="Collected treasures">
      <h2 className="mt-6 font-story text-2xl">Your wayfarer’s satchel</h2>
      <p className="mt-2 text-xs leading-relaxed text-[#43533e]">
        Hover for a glimpse, or open an item to remember its story and the ideas you learned.
      </p>
      {chapters.map((world) => {
        const saved = world.id === progress.worldId ? progress : progress.journeys[world.id];
        const earned = world.encounters.filter((e) => saved?.done.includes(e.id));
        if (!earned.length) return null;
        return (
          <section key={world.id} className="mt-5">
            <h3 className="mb-3 text-xs uppercase tracking-wider text-[#775a26]">{world.region}</h3>
            <div className="grid grid-cols-2 gap-3">
              {earned.map((original) => {
                const level = saved.levels[original.id] ?? 'foundations';
                return (
                  <CollectibleCard
                    key={original.id}
                    encounter={levelEncounter(original, level)}
                    level={level}
                    fullPractice={progress.study[`${world.id}:${original.id}`]?.completed === 3}
                  />
                );
              })}
            </div>
          </section>
        );
      })}
      {error && (
        <p role="status" className="mt-4 text-sm">
          Some earlier treasures could not be loaded. Reopen your journal to try again; your
          collection is saved.
        </p>
      )}
    </section>
  );
}
