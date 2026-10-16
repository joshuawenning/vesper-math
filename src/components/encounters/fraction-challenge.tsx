import type { Challenge, Support } from '@/lib/types';
import type { ReactNode } from 'react';
import ChallengePrompt from './challenge-prompt';
import Button from '../ui/button';
import { Actions, Meter, Toolbox } from '../ui/panels';

export default function FractionChallenge({
  challenge,
  fill,
  support,
  onChange,
  narration,
}: {
  challenge: Extract<Challenge, { kind: 'fraction' }>;
  fill: number;
  support: Support;
  onChange: (fill: number) => void;
  narration?: ReactNode;
}) {
  return (
    <Toolbox>
      <ChallengePrompt narration={narration}>
        The cistern is {challenge.start}/{challenge.denominator} full. Reach {challenge.target}/
        {challenge.denominator} using measures of 1/{challenge.denominator}.
      </ChallengePrompt>
      <div className="flex flex-col items-center justify-center gap-[25px] min-[480px]:flex-row">
        <div
          className="relative flex h-40 w-[95px] shrink-0 flex-col-reverse overflow-hidden rounded-[4px_4px_28px_28px] border-2 border-[#6b8074] bg-[#eee8d5]"
          role="img"
          aria-label={`Cistern ${fill} of ${challenge.denominator} equal parts full`}
        >
          {Array.from({ length: challenge.denominator }, (_, i) => (
            <div
              key={i}
              className={`border-t border-dashed border-[#556e6b55] ${i < fill ? 'bg-[#528d8e99]' : 'bg-transparent'}`}
              style={{ height: `${100 / challenge.denominator}%` }}
            />
          ))}
          <div
            className="absolute inset-x-0 border-t-2 border-[#a47e3e]"
            style={{ top: `${100 - (challenge.target / challenge.denominator) * 100}%` }}
          />
        </div>
        <div>
          <div className="font-story text-[2.5rem] font-medium" aria-live="polite">
            {fill}/{challenge.denominator}
            <small className="mt-[7px] block font-sans text-[0.75rem] font-normal text-[#4b5e49]">
              Target: {challenge.target}/{challenge.denominator} full
            </small>
          </div>
          <Actions>
            <Button
              variant="secondary"
              disabled={fill === 0}
              aria-label={challenge.denominator === 4 ? 'Remove one quarter' : 'Remove one measure'}
              onClick={() => onChange(fill - 1)}
            >
              − 1/{challenge.denominator}
            </Button>
            <Button
              variant="secondary"
              disabled={fill === challenge.denominator}
              aria-label={challenge.denominator === 4 ? 'Add one quarter' : 'Add one measure'}
              onClick={() => onChange(fill + 1)}
            >
              + 1/{challenge.denominator}
            </Button>
          </Actions>
        </div>
      </div>
      {support === 'guided' && (
        <Meter>
          {challenge.denominator} equal parts make one whole. The gold line marks {challenge.target}
          /{challenge.denominator}.
        </Meter>
      )}
    </Toolbox>
  );
}
