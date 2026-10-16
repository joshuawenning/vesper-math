import JourneyContinuation from './journey-continuation';
import type { Chapter, Ending, Progress } from '@/lib/types';
import { endingText } from '@/lib/progress';
import Icon from '../icon';
import Button from '../ui/button';
import { Reward } from '../ui/panels';
import { Narrative } from '../ui/typography';

export function ChapterComplete({
  chapter,
  ending,
  onJournal,
  progress,
  onWorld,
  onAtlas,
}: {
  chapter: Chapter;
  ending: Ending | null;
  onJournal: () => void;
  progress: Progress;
  onWorld: (id: string) => Promise<void>;
  onAtlas: () => void;
}) {
  return (
    <>
      <Narrative>{endingText(ending, chapter)}</Narrative>
      <Reward>
        <Icon name="star" /> &nbsp; Keeper of the path
      </Reward>
      <JourneyContinuation
        chapter={chapter}
        progress={progress}
        onWorld={onWorld}
        onAtlas={onAtlas}
      />
      <Button variant="secondary" onClick={onJournal}>
        Open your journal
        <Icon name="book" />
      </Button>
    </>
  );
}
