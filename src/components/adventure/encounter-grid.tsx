import Image from 'next/image';
import { encounterStatus } from '@/lib/progress';
import type { Chapter, ChapterStatus, Encounter, Progress } from '@/lib/types';
import Icon from '../icon';

function EncounterCard({
  encounter,
  status,
  onClick,
}: {
  encounter: Encounter;
  status: ChapterStatus;
  onClick: () => void;
}) {
  return (
    <button
      className="group relative overflow-hidden border border-line bg-surface text-left text-body hover:border-gold hover:bg-surface-hover"
      aria-label={`${encounter.title} — ${status === 'done' ? 'Discovered' : status === 'current' ? 'Explore' : 'Further along the trail'}`}
      onClick={onClick}
    >
      <div className="relative h-28 overflow-hidden border-b border-line tablet:h-32">
        <Image
          src={encounter.artwork.src}
          alt={
            status === 'locked' ? 'An obscured glimpse of a later discovery' : encounter.artwork.alt
          }
          fill
          sizes="(max-width: 750px) 100vw, (max-width: 1100px) 70vw, 30vw"
          className={`object-cover object-[center_35%] ${status === 'locked' ? 'scale-110 blur-[6px] saturate-50' : 'transition-transform duration-300 group-hover:scale-105'}`}
        />
        {status === 'locked' && <div className="absolute inset-0 bg-night/25" />}
      </div>
      <div className="p-4 tablet:p-3 desktop:p-[18px]">
        <div className="flex min-h-5 items-center justify-between gap-3 text-gold">
          <Icon name={encounter.icon} className="size-4 tablet:size-5" />
          <small className="text-right text-[0.75rem] leading-5 uppercase tracking-[1.3px]">
            {status === 'done'
              ? 'Discovered'
              : status === 'current'
                ? 'Explore'
                : 'Further along the trail'}
          </small>
        </div>
        <h3 className="mt-3 mb-1 font-story text-[1.4375rem] font-medium leading-[1.2] tablet:mt-[13px] tablet:mb-[5px] tablet:text-xl desktop:text-[1.375rem]">
          {encounter.title}
        </h3>
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="text-[0.75rem] leading-[1.6] text-subtle">{encounter.skill}</p>
          <Icon name={status === 'done' ? 'check' : 'arrow'} className="size-5 text-gold" />
        </div>
      </div>
    </button>
  );
}

export default function EncounterGrid({
  chapter,
  progress,
  onEncounter,
}: {
  chapter: Chapter;
  progress: Progress;
  onEncounter: (id: string) => void;
}) {
  return (
    <section aria-labelledby="discoveries-heading">
      <div className="mt-[26px] mb-[13px] flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <h2 id="discoveries-heading" className="font-story text-[1.4375rem] font-medium text-body">
          Follow your curiosity
        </h2>
        <small className="text-[0.75rem] leading-5 tracking-[.6px] text-subtle tablet:text-[0.75rem]">
          THREE DISCOVERIES. ONE FORGOTTEN STORY.
        </small>
      </div>
      <div className="grid grid-cols-1 gap-[9px] desktop:grid-cols-3 tablet:gap-[13px]">
        {chapter.encounters.map((encounter) => (
          <EncounterCard
            key={encounter.id}
            encounter={encounter}
            status={encounterStatus(encounter.id, progress, chapter)}
            onClick={() => onEncounter(encounter.id)}
          />
        ))}
      </div>
    </section>
  );
}
