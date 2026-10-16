import Image from 'next/image';
import type { Progress } from '@/lib/types';
import { trainingArt } from '@/content/training-art';
import Icon from '../icon';
export default function TrainingInvitation({
  progress,
  onTrain,
}: {
  progress: Progress;
  onTrain: () => void;
}) {
  return (
    <button
      onClick={onTrain}
      className="mt-6 mb-5 flex w-full items-center gap-4 border border-gold/30 bg-surface p-3 text-left hover:bg-surface-hover"
    >
      <span className="relative h-20 w-24 shrink-0 overflow-hidden border border-gold/20">
        <Image src={trainingArt.arithmetic.src} alt="" fill sizes="96px" className="object-cover" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs leading-relaxed text-gold">
          Before the next adventure · Resolve {progress.resolve}/20
        </span>
        <span className="mt-1 block font-story text-xl leading-tight text-body">
          {progress.resolve <= 0
            ? 'Gather your resolve with Elian'
            : 'The wayfarer’s training ground'}
        </span>
        <span className="mt-2 block text-xs leading-relaxed text-subtle">
          Addition, subtraction, times tables, and a little luck.
        </span>
      </span>
      <Icon name="arrow" className="size-5 text-gold" />
    </button>
  );
}
