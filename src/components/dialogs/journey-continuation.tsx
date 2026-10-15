'use client';
import { useState } from 'react';
import { nextPlayableWorld } from '@/content/worlds';
import type { Chapter, Progress } from '@/lib/types';
import Button from '../ui/button';
import Icon from '../icon';
import { Eyebrow, Muted } from '../ui/typography';

export default function JourneyContinuation({
  chapter,
  progress,
  onWorld,
  onFinale,
  onAtlas,
}: {
  chapter: Chapter;
  progress: Progress;
  onWorld: (id: string) => Promise<void>;
  onFinale: () => void;
  onAtlas: () => void;
}) {
  const [loading, setLoading] = useState(false),
    [error, setError] = useState('');
  if (!chapter.encounters.every((e) => progress.done.includes(e.id))) return null;
  const next = nextPlayableWorld(chapter.id);
  async function travel() {
    if (!next || loading) return;
    setLoading(true);
    setError('');
    try {
      await onWorld(next.id);
    } catch {
      setError('The next path could not be opened. Your discoveries are safe. Please try again.');
      setLoading(false);
    }
  }
  return (
    <section
      aria-label="Continue your journey"
      className="my-5 border border-[#909c8360] bg-[#dde1cf] p-4"
    >
      <Eyebrow tone="brown">
        {progress.ending
          ? next
            ? 'The road continues'
            : 'Every charted road'
          : 'One choice remains'}
      </Eyebrow>
      <h3 className="mt-2 font-story text-2xl">
        {!progress.ending
          ? 'Give this chapter its ending'
          : next
            ? next.chapter
            : 'Your journey is yours to revisit'}
      </h3>
      <Muted>
        {!progress.ending
          ? 'All discoveries are yours. Choose what this place will become before setting out.'
          : next
            ? `Your discoveries stay in your journal. ${next.teaser}`
            : 'You have reached the end of the six-world trail. Revisit a favorite place or explore any roads you have yet to travel.'}
      </Muted>
      <Button
        onClick={!progress.ending ? onFinale : next ? () => void travel() : onAtlas}
        disabled={loading}
      >
        {loading
          ? 'Opening the path…'
          : !progress.ending
            ? 'Choose this chapter’s ending'
            : next
              ? `Continue to ${next.title}`
              : 'Return to the world atlas'}
        <Icon name="arrow" />
      </Button>
      {error && (
        <p role="alert" className="mt-3 text-sm text-[#8c4a36]">
          {error}
        </p>
      )}
    </section>
  );
}
