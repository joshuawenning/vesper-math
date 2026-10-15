import { chapter } from '@/content/merewood';
import { encounterStatus } from '@/lib/progress';
import type { Progress } from '@/lib/types';
import Icon from '../icon';
import Button from '../ui/button';
import { Muted, Narrative } from '../ui/typography';

export default function WorldMapContent({
  progress,
  onEncounter,
}: {
  progress: Progress;
  onEncounter: (id: string) => void;
}) {
  return (
    <>
      <Narrative>A narrow path follows the light across the water.</Narrative>
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
                <strong className="block font-story text-[22px] font-semibold">{e.title}</strong>
                <p className="my-1 text-[11px] text-[#677361]">
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
      <Muted>
        Beyond the Merewood lie the foundry, the merchant coast, and the northern archives. These
        regions await a future chapter.
      </Muted>
    </>
  );
}
