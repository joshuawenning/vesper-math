'use client';
import { useState } from 'react';
import type { Encounter, Progress } from '@/lib/types';
import { validateAnswer, answerFeedback, type Answer } from '@/lib/challenges';
import SumChallenge from './sum-challenge';
import FractionChallenge from './fraction-challenge';
import DivisionChallenge from './division-challenge';
import Icon from '../icon';
import NumberChallenge from './number-challenge';
import Button from '../ui/button';
import { Narrative } from '../ui/typography';
import { Actions, Feedback } from '../ui/panels';

export default function EncounterPanel({
  encounter,
  progress,
  onComplete,
}: {
  encounter: Encounter;
  progress: Progress;
  onComplete: (id: string) => void;
}) {
  const c = encounter.challenge;
  const [answer, setAnswer] = useState<Answer>(() => ({
    selected: [],
    fill: c.kind === 'fraction' ? c.start : 0,
    route: c.kind === 'division' ? c.routes[0].id : '',
    value: '',
  }));
  const [hint, setHint] = useState(0);
  const [feedback, setFeedback] = useState('');
  function update(patch: Partial<Answer>) {
    setAnswer((a) => ({ ...a, ...patch }));
    setFeedback('');
  }
  const action =
    c.kind === 'number'
      ? 'Put your idea to work'
      : c.kind === 'sum'
        ? 'Lay the crossing'
        : c.kind === 'fraction'
          ? 'Turn the mechanism'
          : (c.routes.find((r) => r.id === answer.route)?.action ?? 'Cast the spell');
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (validateAnswer(c, answer)) onComplete(encounter.id);
        else setFeedback(answerFeedback(c, answer));
      }}
    >
      <Narrative>{encounter[progress.reading]}</Narrative>
      {c.kind === 'number' && (
        <NumberChallenge
          challenge={c}
          value={answer.value ?? ''}
          onChange={(value) => update({ value })}
        />
      )}
      {c.kind === 'sum' && (
        <SumChallenge
          challenge={c}
          selected={answer.selected ?? []}
          onChange={(selected) => update({ selected })}
        />
      )}
      {c.kind === 'fraction' && (
        <FractionChallenge
          challenge={c}
          fill={answer.fill ?? c.start}
          support={progress.support}
          onChange={(fill) => update({ fill })}
        />
      )}
      {c.kind === 'division' && (
        <DivisionChallenge
          challenge={c}
          route={answer.route ?? c.routes[0].id}
          value={answer.value ?? ''}
          support={progress.support}
          onRoute={(route) => update({ route, value: '' })}
          onValue={(value) => update({ value })}
        />
      )}
      {feedback && <Feedback>{feedback}</Feedback>}
      {hint > 0 && (
        <div
          className="mt-[17px] border-l-2 border-[#ac9963] pl-[14px] font-story text-[18px] italic leading-[1.5]"
          aria-live="polite"
        >
          {encounter.hint[hint - 1]}
        </div>
      )}
      <Actions>
        <Button type="submit">
          {action}
          <Icon name="arrow" />
        </Button>
        <Button
          variant="secondary"
          onClick={() => setHint((n) => Math.min(encounter.hint.length, n + 1))}
        >
          {hint === encounter.hint.length
            ? 'Hint shown'
            : hint > 0
              ? 'Another hint'
              : 'Ask Elian for a hint'}
        </Button>
      </Actions>
    </form>
  );
}
