import type { Progress } from '@/lib/types';
import Preferences from '../preferences';
import Icon from '../icon';
import Button from '../ui/button';
import { Actions } from '../ui/panels';
import { Muted, Narrative } from '../ui/typography';

export function WelcomeContent({
  progress,
  onChange,
  onStart,
}: {
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
          Enter the Merewood
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
        Starting again clears this chapter’s discoveries and ending on this device. Your reading
        preferences will stay.
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
