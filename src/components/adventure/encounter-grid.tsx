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
      className="relative min-h-[95px] border border-line bg-surface px-[17px] py-[14px] text-left text-body hover:border-gold hover:bg-surface-hover tablet:min-h-[128px] tablet:px-3 tablet:py-[15px] desktop:px-[18px] desktop:py-[17px]"
      onClick={onClick}
    >
      <div className="absolute right-4 top-[15px] flex items-center justify-between text-gold tablet:static">
        <Icon name={encounter.icon} className="hidden size-5 tablet:inline-block" />
        <small className="text-[8px] uppercase tracking-[1.3px]">
          {status === 'done'
            ? 'Discovered'
            : status === 'current'
              ? 'Explore'
              : 'Further along the trail'}
        </small>
      </div>
      <h3 className="mt-2 mb-1 font-story text-[23px] font-medium tablet:mt-[13px] tablet:mb-[5px] tablet:text-xl desktop:text-[22px]">
        {encounter.title}
      </h3>
      <p className="text-[9px] text-subtle">{encounter.skill}</p>
      <span className="absolute right-4 bottom-[15px] text-gold tablet:bottom-[18px]">
        <Icon name={status === 'done' ? 'check' : 'arrow'} />
      </span>
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
      <div className="mt-[26px] mb-[13px] flex items-center justify-between">
        <h2 id="discoveries-heading" className="font-story text-[23px] font-medium text-body">
          Follow your curiosity
        </h2>
        <small className="text-[8px] tracking-[.6px] text-subtle tablet:text-[9px]">
          THREE DISCOVERIES. ONE FORGOTTEN STORY.
        </small>
      </div>
      <div className="grid grid-cols-1 gap-[9px] tablet:grid-cols-3 tablet:gap-[13px]">
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
