import { endingText } from '@/lib/progress';
import type { Chapter, Progress } from '@/lib/types';
import Button from '../ui/button';
import Icon from '../icon';

export default function StoryStrip({
  chapter,
  progress,
  onContinue,
}: {
  chapter: Chapter;
  progress: Progress;
  onContinue: () => void;
}) {
  const next = chapter.encounters.find((e) => !progress.done.includes(e.id));
  const text = progress.ending
    ? endingText(progress.ending, chapter)
    : next
      ? chapter.intro[progress.reading]
      : (chapter.completion?.question ??
        'The star chart is yours. One decision remains: what will you do with the observatory’s light?');
  const action = progress.ending
    ? 'Read your discoveries'
    : next
      ? progress.started
        ? 'Continue the journey'
        : 'Begin the journey'
      : 'Choose your ending';
  return (
    <div className="relative grid grid-cols-1 items-center gap-4 bg-paper p-[19px] text-ink tablet:gap-6 tablet:px-[25px] tablet:py-[22px] desktop:grid-cols-[1fr_auto]">
      <p className="max-w-[690px] font-story text-[18px] leading-[1.45] first-letter:text-[30px] first-letter:leading-none first-letter:text-[#655730]">
        {text}
      </p>
      <Button className="justify-self-start" onClick={onContinue}>
        {action}
        <Icon name="arrow" />
      </Button>
    </div>
  );
}
