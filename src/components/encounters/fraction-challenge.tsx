import type { Challenge, Support } from '@/lib/types';
import Button from '../ui/button';
import { Actions, Meter, Toolbox } from '../ui/panels';

export default function FractionChallenge({
  challenge,
  fill,
  support,
  onChange,
}: {
  challenge: Extract<Challenge, { kind: 'fraction' }>;
  fill: number;
  support: Support;
  onChange: (fill: number) => void;
}) {
  return (
    <Toolbox>
      <div className="flex items-center justify-center gap-[25px]">
        <div
          className="relative flex h-40 w-[95px] flex-col-reverse overflow-hidden rounded-[4px_4px_28px_28px] border-2 border-[#6b8074] bg-[#eee8d5]"
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
          <div className="font-story text-[40px] font-medium" aria-live="polite">
            {fill}/{challenge.denominator}
            <small className="mt-[7px] block font-sans text-[11px] font-normal text-[#677765]">
              Target: {challenge.target}/{challenge.denominator} full
            </small>
          </div>
          <Actions>
            <Button
              variant="secondary"
              disabled={fill === 0}
              aria-label="Remove one quarter"
              onClick={() => onChange(fill - 1)}
            >
              − ¼
            </Button>
            <Button
              variant="secondary"
              disabled={fill === challenge.denominator}
              aria-label="Add one quarter"
              onClick={() => onChange(fill + 1)}
            >
              + ¼
            </Button>
          </Actions>
        </div>
      </div>
      {support === 'guided' && (
        <Meter>Four equal parts make one whole. The gold line marks ¾.</Meter>
      )}
    </Toolbox>
  );
}
