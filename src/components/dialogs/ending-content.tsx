import type { Ending } from '@/lib/types';
import { endingText } from '@/lib/progress';
import Icon from '../icon';
import Button from '../ui/button';
import { Reward } from '../ui/panels';
import { Muted, Narrative } from '../ui/typography';

const choices: { ending: Ending; title: string; description: string }[] = [
  {
    ending: 'beacon',
    title: 'Raise a beacon',
    description: 'Guide lost travelers across the water. The light will shine beyond the forest.',
  },
  {
    ending: 'refuge',
    title: 'Make a refuge',
    description: 'Keep a warm light beneath the dome. This place will shelter those who need rest.',
  },
];

export function EndingChoice({ onEnding }: { onEnding: (ending: Ending) => void }) {
  return (
    <>
      <Narrative>
        The chart reveals safe paths through the mere. Elian looks toward the darkening shore. “The
        observatory is awake. What shall its light become?”
      </Narrative>
      <div className="grid gap-2.5">
        {choices.map((choice) => (
          <button
            key={choice.ending}
            className="border border-[#7e886b80] bg-transparent px-[15px] py-3 text-left font-story text-xl leading-[1.4] text-[#384a3b] hover:bg-[#c4c6ad55]"
            onClick={() => onEnding(choice.ending)}
          >
            {choice.title}
            <small className="mt-[5px] block font-sans text-xs leading-[1.5]">
              {choice.description}
            </small>
          </button>
        ))}
      </div>
      <Muted>Both choices complete the chapter. Your choice becomes part of its story.</Muted>
    </>
  );
}

export function ChapterComplete({
  ending,
  onJournal,
}: {
  ending: Ending | null;
  onJournal: () => void;
}) {
  return (
    <>
      <Narrative>{endingText(ending)}</Narrative>
      <Reward>
        <Icon name="star" /> &nbsp; Keeper of the mere
      </Reward>
      <Muted>
        Three discoveries. A crossing restored. An ancient keeper at peace. Your first chapter is
        complete.
      </Muted>
      <Button onClick={onJournal}>
        Open your journal
        <Icon name="book" />
      </Button>
    </>
  );
}
