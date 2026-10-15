import { encounterStatus } from '@/lib/progress';
import type { Chapter, Progress } from '@/lib/types';
import { CompanionCard } from './adventure/companion-card';
import { Eyebrow } from './ui/typography';

function ChapterProgress({ progress, chapter }: { progress: Progress; chapter: Chapter }) {
  return (
    <>
      <div
        className="mt-[22px] mb-2 h-[3px] bg-track"
        role="progressbar"
        aria-label="Chapter discoveries"
        aria-valuenow={progress.done.length}
        aria-valuemin={0}
        aria-valuemax={chapter.encounters.length}
      >
        <span
          className="block h-full bg-gold transition-[width] duration-500"
          style={{ width: `${(progress.done.length / chapter.encounters.length) * 100}%` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-subtle">
        <span>Chapter discoveries</span>
        <span>
          {progress.done.length} / {chapter.encounters.length}
        </span>
      </div>
      <ol className="my-[30px] list-none p-0">
        {chapter.encounters.map((encounter, index) => {
          const status = encounterStatus(encounter.id, progress, chapter);
          const colors = {
            done: 'text-body',
            current: 'text-body',
            locked: 'text-subtle',
          };
          return (
            <li key={encounter.id} className={`mb-[25px] flex gap-[13px] ${colors[status]}`}>
              <div
                className={`grid size-[26px] shrink-0 place-items-center rounded-full border font-story text-[15px] ${status === 'current' ? 'border-gold text-gold shadow-[0_0_0_4px_#ceb47b0a]' : 'border-line'}`}
              >
                {status === 'done' ? '✓' : index + 1}
              </div>
              <div>
                <strong className="mt-[3px] block text-[11px] font-medium">
                  {encounter.title}
                </strong>
                <small className="mt-[5px] block text-[9px] text-subtle">
                  {status === 'done'
                    ? 'Discovered'
                    : status === 'current'
                      ? 'Ready to explore'
                      : 'Further along the path'}
                </small>
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}

export default function ChapterSidebar({
  chapter,
  progress,
  onCompanion,
}: {
  chapter: Chapter;
  progress: Progress;
  onCompanion: () => void;
}) {
  return (
    <aside className="hidden pt-[5px] tablet:block">
      <Eyebrow className="flex items-center gap-2 before:h-px before:w-[23px] before:bg-gold">
        Chapter {chapter.number ?? 1}
      </Eyebrow>
      <h2 className="mt-[14px] mb-3 font-story text-[28px] font-medium leading-[1.1]">
        {chapter.heading ?? 'The light across the mere'}
      </h2>
      <p className="my-4 font-story text-base leading-[1.5] text-subtle">
        A forgotten place.
        <br />A small beginning.
      </p>
      <ChapterProgress chapter={chapter} progress={progress} />
      <CompanionCard
        complete={progress.done.length === chapter.encounters.length}
        onSpeak={onCompanion}
      />
    </aside>
  );
}
