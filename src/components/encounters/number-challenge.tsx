import type { Challenge } from '@/lib/types';
import type { ReactNode } from 'react';
import ChallengePrompt from './challenge-prompt';
import { Toolbox } from '../ui/panels';

export default function NumberChallenge({
  challenge,
  value,
  onChange,
  narration,
}: {
  challenge: Extract<Challenge, { kind: 'number' }>;
  value: string;
  onChange: (value: string) => void;
  narration?: ReactNode;
}) {
  return (
    <Toolbox>
      <ChallengePrompt narration={narration}>{challenge.question}</ChallengePrompt>
      <label className="block text-xs" htmlFor="world-answer">
        Your answer
      </label>
      <input
        id="world-answer"
        className="mt-2 block w-full border border-[#89977f] bg-[#fff9e7] px-3 py-2.5 font-story text-[1.5625rem] text-ink"
        type="text"
        inputMode="text"
        autoComplete="off"
        maxLength={160}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby="answer-format"
      />
      <p id="answer-format" className="mt-2 text-[0.75rem] text-[#43533e]">
        Use a number, decimal, or fraction such as 1/2. No units needed.
      </p>
    </Toolbox>
  );
}
