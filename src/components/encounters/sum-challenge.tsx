import type { Challenge } from '@/lib/types';
import { Meter, Toolbox } from '../ui/panels';

export default function SumChallenge({
  challenge,
  selected,
  onChange,
}: {
  challenge: Extract<Challenge, { kind: 'sum' }>;
  selected: number[];
  onChange: (selected: number[]) => void;
}) {
  return (
    <Toolbox>
      <div className="flex flex-wrap justify-center gap-[9px]">
        {challenge.planks.map((length) => (
          <button
            type="button"
            key={length}
            className={`h-[47px] border border-[#826e46] bg-[linear-gradient(0deg,#a68a57,#d5b57a)] font-story text-[19px] font-semibold text-[#312c20] shadow-[inset_0_0_0_3px_#f3d7a12a] ${selected.includes(length) ? '-translate-y-1 outline-3 outline-offset-2 outline-[#346657]' : ''}`}
            style={{ width: 45 + length * 9 }}
            aria-pressed={selected.includes(length)}
            onClick={() =>
              onChange(
                selected.includes(length)
                  ? selected.filter((n) => n !== length)
                  : selected.length < challenge.count
                    ? [...selected, length]
                    : selected,
              )
            }
          >
            {length} ft
          </button>
        ))}
      </div>
      <Meter>
        {selected.length} of {challenge.count} planks ·{' '}
        <strong>
          {selected.reduce((a, b) => a + b, 0)} / {challenge.target} {challenge.unit}
        </strong>
      </Meter>
    </Toolbox>
  );
}
