'use client';
import { useState } from 'react';
import type { Encounter, Progress } from '@/lib/types';
import { validateAnswer, answerFeedback, type Answer } from '@/lib/challenges';
import { lessons } from '@/content/tutor-lessons';
import ReadAloud from '../accessibility/read-aloud';
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
  const principle =
    c.kind === 'sum'
      ? 'Addition combines lengths measured in the same unit. Add each selected length once, then compare that sum with the gap. A total that is shorter or longer will not fit; equal totals describe the same distance.'
      : c.kind === 'fraction'
        ? lessons.fractions.why
        : c.kind === 'division'
          ? 'Division splits a total into equal groups. Multiplication checks your division: the number of groups times the amount in each group must equal the total.'
          : /solve|x =|x \+|× x/i.test(c.question)
            ? lessons.variables.why
            : /%|percent/.test(c.question)
              ? lessons.percentages.why
              : /area|perimeter/.test(c.question)
                ? lessons.geometry.why
                : /meter|centimeter|kilometer/.test(c.question)
                  ? lessons.measurement.why
                  : lessons.arithmetic.why;
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
      <ReadAloud
        settings={progress.speech}
        text={`${encounter.title}. ${encounter[progress.reading]}. ${c.kind === 'number' ? c.question : c.kind === 'sum' ? `Choose ${c.count} planks totaling ${c.target} ${c.unit}. Available lengths: ${c.planks.join(', ')}.` : c.kind === 'fraction' ? `The cistern starts at ${c.start}/${c.denominator}. Reach ${c.target}/${c.denominator} by adding or removing measures.` : `${c.total} sparks. ${c.routes.find((r) => r.id === answer.route)?.label}. ${c.routes.find((r) => r.id === answer.route)?.question}`}${
          hint > 0 ? ` Hint: ${encounter.hint[hint - 1]}. Why this works: ${principle}` : ''
        }`}
      />
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
          className="mt-[17px] border-l-2 border-[#ac9963] pl-[14px] font-story text-[1.125rem] italic leading-[1.5]"
          aria-live="polite"
        >
          {encounter.hint[hint - 1]}
          <p className="mt-3 font-sans text-sm not-italic leading-relaxed">
            Why this works: {principle}
          </p>
        </div>
      )}
      <Actions>
        <Button type="submit">
          {action}
          <Icon name="arrow" />
        </Button>
        <Button
          variant="secondary"
          disabled={hint === encounter.hint.length}
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
