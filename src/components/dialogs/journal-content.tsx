import type { ReactNode } from 'react';
import { endingText } from '@/lib/progress';
import { levelEncounter } from '@/lib/difficulty';
import type { Chapter, Progress } from '@/lib/types';
import { Muted, Narrative, Tag } from '../ui/typography';

function JournalEntry({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="border-b border-[#24392e22] py-[17px]">
      <Tag>{label}</Tag>
      <h3 className="mb-[7px] font-story text-2xl font-semibold">{title}</h3>
      <p className="font-story text-[1.0625rem] leading-[1.5]">{children}</p>
    </article>
  );
}

export default function JournalContent({
  chapter,
  progress,
}: {
  chapter: Chapter;
  progress: Progress;
}) {
  return (
    <>
      <Narrative>A record of places opened, ideas understood, and things worth keeping.</Narrative>
      {progress.done.length ? (
        chapter.encounters
          .filter((e) => progress.done.includes(e.id))
          .map((original) =>
            levelEncounter(original, progress.levels[original.id] ?? 'foundations'),
          )
          .map((e) => (
            <JournalEntry key={e.id} label={`${e.skill} · ${e.reward}`} title={e.title}>
              {e.lesson}
            </JournalEntry>
          ))
      ) : (
        <Muted>
          Your pages are waiting. Explore the broken crossing to make your first discovery.
        </Muted>
      )}
      {progress.ending && (
        <>
          <JournalEntry
            label="Chapter complete"
            title={
              chapter.completion?.choices.find((c) => c.id === progress.ending)?.title ??
              (progress.ending === 'beacon' ? 'A beacon on the mere' : 'A refuge in the wood')
            }
          >
            {endingText(progress.ending, chapter)}
          </JournalEntry>
          <Muted>
            Your chapter is complete. Visit the world atlas for another adventure, revisit your
            discoveries, or start a fresh journey in Settings.
          </Muted>
        </>
      )}
    </>
  );
}
