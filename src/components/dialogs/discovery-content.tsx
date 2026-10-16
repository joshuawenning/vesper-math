import type { Encounter } from '@/lib/types';
import Image from 'next/image';
import { treasureArt } from '@/content/treasures';
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
        <span className="mr-3 inline-block size-16 overflow-hidden border border-[#9a855d60] align-middle">
          <Image
            src={treasureArt[encounter.id]}
            alt={encounter.reward}
            width={64}
            height={64}
            className="size-full object-contain"
          />
        </span>
        {encounter.reward}
      </Reward>
      <Muted>Added to your journal. Your discovery and its reward are yours to keep.</Muted>
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
