import type { Challenge, Support } from '@/lib/types';
import type { ReactNode } from 'react';
import { Toolbox } from '../ui/panels';
import { Eyebrow } from '../ui/typography';

export default function DivisionChallenge({
  challenge,
  route,
  value,
  support,
  onRoute,
  onValue,
  narration,
}: {
  challenge: Extract<Challenge, { kind: 'division' }>;
  route: string;
  value: string;
  support: Support;
  onRoute: (route: string) => void;
  onValue: (value: string) => void;
  narration?: ReactNode;
}) {
  const tactic = challenge.routes.find((r) => r.id === route) ?? challenge.routes[0];
  return (
    <Toolbox>
      <Eyebrow tone="sage" className="text-center">
        Guardian’s ward · {challenge.total} sparks
      </Eyebrow>
      <div
        className="mx-auto my-[18px] flex max-w-[255px] flex-wrap justify-center gap-[7px]"
        aria-hidden="true"
      >
        {Array.from({ length: challenge.total }, (_, i) => (
          <span
            className="size-[17px] bg-[#a18a4d] [clip-path:polygon(50%_0%,65%_35%,100%_50%,65%_65%,50%_100%,35%_65%,0%_50%,35%_35%)]"
            key={i}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {challenge.routes.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`border px-2.5 py-[14px] ${t.id === route ? 'border-[#334f41] bg-[#334f41] text-[#eee5ce]' : 'border-[#8e987b] bg-transparent text-[#4c5c46]'}`}
            aria-pressed={t.id === route}
            onClick={() => onRoute(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-[18px] flex items-center justify-between gap-2">
        <label className="min-w-0 flex-1 text-xs" htmlFor="answer">
          {tactic.question}
        </label>
        {narration}
      </div>
      <input
        id="answer"
        className="mt-[9px] mr-2 w-[90px] border border-[#89977f] bg-[#fff9e7] p-2.5 font-story text-[1.5625rem] text-[#253a2c]"
        type="number"
        min="0"
        step="1"
        inputMode="numeric"
        value={value}
        onChange={(event) => onValue(event.target.value)}
        aria-describedby="equation"
      />
      <span id="equation">
        {support === 'guided' ? `${challenge.total} ÷ ${tactic.groups} = ?` : 'sparks per group'}
      </span>
    </Toolbox>
  );
}
