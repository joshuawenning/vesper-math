import type { ReactNode } from 'react';
import { encounterStatus } from '@/lib/progress';
import type { Chapter, Progress } from '@/lib/types';
import Icon from '../icon';
import { Eyebrow } from '../ui/typography';

const positions = [
  { left: '23%', top: '58%' },
  { left: '78%', top: '51%' },
  { left: '90%', top: '35%' },
];

export default function ChapterScene({
  artwork,
  chapter,
  progress,
  onEncounter,
}: {
  artwork: ReactNode;
  chapter: Chapter;
  progress: Progress;
  onEncounter: (id: string) => void;
}) {
  return (
    <section
      className="relative border border-[#c5a66c77] bg-frame p-[6px] shadow-[0_10px_40px_#0003]"
      aria-label={`Explore ${chapter.title}`}
    >
      <div className="relative overflow-hidden bg-[#30443c] after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(180deg,#071c1b22,transparent_40%,#081c1ad9)]">
        {artwork}
        <div className="relative h-[240px] tablet:h-[clamp(220px,26vw,360px)]">
          <div className="absolute left-[18px] top-[17px] z-1 text-[8px] tracking-[2px] text-[#f2e8cf] [text-shadow:0_2px_7px_#000] tablet:left-[25px] tablet:top-[23px] tablet:text-[9px]">
            <Icon name="pin" className="mr-[6px] h-5 w-[14px]" /> {chapter.region.toUpperCase()} ·
            DUSKFALL
          </div>
          {chapter.encounters.map((encounter, index) => {
            const status = encounterStatus(encounter.id, progress, chapter);
            return (
              <button
                key={encounter.id}
                className={`group absolute z-2 -translate-x-1/2 grid size-[37px] place-items-center rounded-full border bg-[#142b25df] shadow-[0_0_0_6px_#ccb77818,0_4px_15px_#0007] transition-transform duration-200 hover:scale-[1.13] ${status === 'locked' ? 'border-[#6d7f70] text-[#b0b9a7]' : 'border-[#e7ce8f] text-[#f3d793]'}`}
                style={positions[index]}
                onClick={() => onEncounter(encounter.id)}
                aria-label={`${encounter.title}${status === 'locked' ? ' — explore the earlier path first' : ''}`}
              >
                <Icon name={status === 'done' ? 'check' : encounter.icon} />
                <span
                  className={`pointer-events-none absolute bottom-[45px] w-max max-w-[min(220px,calc(100vw-64px))] border border-[#b49c65] bg-[#172723ed] px-2.5 py-[7px] text-[10px] leading-[1.4] text-[#f5e6c9] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 ${index === 0 ? 'left-0' : 'right-0'}`}
                >
                  {encounter.title}
                </span>
              </button>
            );
          })}
        </div>
        <div className="relative z-1 px-[18px] pt-3 pb-[22px] tablet:px-[29px] tablet:pb-6 desktop:pr-[220px]">
          <Eyebrow small tone="illuminated">
            An adventure in curiosity
          </Eyebrow>
          <h1 className="my-2 max-w-[270px] font-story text-[35px] font-medium leading-[1.05] tracking-[-.5px] text-[#fff1d4] tablet:max-w-none tablet:text-[37px] desktop:text-[clamp(30px,3.8vw,53px)]">
            {chapter.title}
          </h1>
          <p className="max-w-[240px] font-story text-[15px] italic text-[#d2dbc7] tablet:max-w-none tablet:text-[17px]">
            {chapter.subtitle ?? 'Some doors open only to understanding.'}
          </p>
        </div>
        <div className="absolute bottom-7 right-[23px] z-1 hidden border border-[#d3bb7b66] bg-[#152722bb] px-3 py-[9px] text-[9px] tracking-[1px] text-[#d2c493] desktop:block">
          {progress.ending ? 'CHAPTER COMPLETE' : 'EXPLORE AT YOUR OWN PACE'}
        </div>
      </div>
    </section>
  );
}
