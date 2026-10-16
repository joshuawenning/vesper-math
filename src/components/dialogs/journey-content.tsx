import type { Chapter, Progress } from '@/lib/types';
import Preferences from '../preferences';
import Icon from '../icon';
import Button from '../ui/button';
import { Actions } from '../ui/panels';
import { Muted, Narrative } from '../ui/typography';

export function WelcomeContent({
  chapter,
  progress,
  onChange,
  onStart,
}: {
  chapter: Chapter;
  progress: Progress;
  onChange: (progress: Progress) => void;
  onStart: () => void;
}) {
  return (
    <>
      <Narrative>
        {progress.profile.name
          ? `Welcome back, ${progress.profile.name}.`
          : 'You are a wayfarer with a curious mind.'}{' '}
        Beside you walks Elian, a cartographer following the next light on the horizon.
      </Narrative>
      <Muted>
        Explore the painting or use the encounter cards below it. Work with objects, try ideas, and
        ask for a hint whenever you need one.
      </Muted>
      <Preferences progress={progress} onChange={onChange} />
      <Actions>
        <Button onClick={onStart}>
          Enter {chapter.region}
          <Icon name="arrow" />
        </Button>
      </Actions>
    </>
  );
}

export function RestartContent({
  onRestart,
  onDismiss,
}: {
  onRestart: () => void;
  onDismiss: () => void;
}) {
  return (
    <>
      <Narrative>
        Start a new journey from the beginning. This clears your character, all worlds’ discoveries,
        collected items, training and quiz history, and preferences. Resolve returns to 7, and
        you’ll choose your character and preferences again.
      </Narrative>
      <Actions>
        <Button onClick={onRestart}>Start fresh</Button>
        <Button variant="secondary" onClick={onDismiss}>
          Keep my journey
        </Button>
      </Actions>
    </>
  );
}
