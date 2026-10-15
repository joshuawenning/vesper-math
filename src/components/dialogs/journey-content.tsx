import type { Encounter, Progress } from '@/lib/types';
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
        You are a wayfarer with a curious mind. Beside you walks Elian, a cartographer following a
        light through the trees.
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

export function CompanionContent({
  next,
  onContinue,
}: {
  next?: Encounter;
  onContinue: () => void;
}) {
  return (
    <>
      <Narrative>
        “
        {next
          ? 'There is no hurry. Look closely, try an idea, and see what changes. If you get stuck, I will help you find the next step.'
          : 'You have given this place a future. That is a good day’s work for any traveler.'}
        ”
      </Narrative>
      <Muted>
        {next
          ? `Next: ${next.subtitle}. ${next.skill}.`
          : 'Your discoveries are preserved in the journal.'}
      </Muted>
      <Button onClick={onContinue}>
        {next ? 'Follow the light' : 'Read the journal'}
        <Icon name="arrow" />
      </Button>
    </>
  );
}

export function LockedContent({ id, onContinue }: { id: string; onContinue: () => void }) {
  return (
    <>
      <Narrative>
        {id === 'cistern'
          ? 'Repair the crossing to reach the moonwater cistern.'
          : 'Wake the moonwater mechanism to reach the chart chamber.'}
      </Narrative>
      <Button onClick={onContinue}>
        Follow the path
        <Icon name="arrow" />
      </Button>
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
