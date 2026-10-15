import type { Encounter } from '@/lib/types';
import Icon from '../icon';
import Button from '../ui/button';
import { Actions, Feedback, Reward } from '../ui/panels';
import { Eyebrow, Muted, Narrative } from '../ui/typography';

export default function DiscoveryContent({
  encounter,
  action,
  onNext,
  onDismiss,
}: {
  encounter: Encounter;
  action: string;
  onNext: () => void;
  onDismiss: () => void;
}) {
  return (
    <>
      <Eyebrow tone="moss">Discovery recorded</Eyebrow>
      <Narrative className="mt-[14px]">{encounter.discovery}</Narrative>
      <Feedback success>{encounter.lesson}</Feedback>
      <Reward>
        <Icon name={encounter.icon} /> &nbsp; {encounter.reward}
      </Reward>
      <Muted>Added to your journal. Hints and retries never reduce your rewards.</Muted>
      <Actions>
        <Button onClick={onNext}>
          {action}
          <Icon name="arrow" />
        </Button>
        <Button variant="secondary" onClick={onDismiss}>
          Return to the scene
        </Button>
      </Actions>
    </>
  );
}
