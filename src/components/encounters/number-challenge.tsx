import type { Challenge } from '@/lib/types';
import type { ReactNode } from 'react';
import ChallengePrompt from './challenge-prompt';
import { Toolbox } from '../ui/panels';

export default function NumberChallenge({
  challenge,
  value,
  onChange,
  narration,
  answerHintId,
  invalid = false,
}: {
  challenge: Extract<Challenge, { kind: 'number' }>;
  value: string;
  onChange: (value: string) => void;
  narration?: ReactNode;
  answerHintId?: string;
  invalid?: boolean;
}) {
  return (
    <Toolbox>
      <ChallengePrompt narration={narration}>{challenge.question}</ChallengePrompt>
      <label className="block text-xs" htmlFor="world-answer">
        Your answer
      </label>
      <input
        id="world-answer"
        className={`mt-2 block w-full border bg-[#fff9e7] px-3 py-2.5 font-story text-[1.5625rem] text-ink ${invalid ? 'border-[#8c4a36] ring-1 ring-[#8c4a36]' : 'border-[#89977f]'}`}
        type="text"
        inputMode="text"
        autoComplete="off"
        maxLength={160}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={invalid}
        aria-describedby={
          [answerHintId, invalid ? 'story-feedback' : undefined].filter(Boolean).join(' ') ||
          undefined
        }
      />
    </Toolbox>
  );
}
