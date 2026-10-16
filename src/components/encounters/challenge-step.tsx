'use client';
import { useState } from 'react';
import type { Encounter, Progress } from '@/lib/types';
import { validateAnswer, answerFeedback, type Answer } from '@/lib/challenges';
import type { StoryStep } from '@/content/story-lessons';
import { storyLearning, hasAnswer, type StudyAction } from '@/lib/story-learning';
import { lessons } from '@/content/tutor-lessons';
import ReadAloud from '../accessibility/read-aloud';
import SumChallenge from './sum-challenge';
import FractionChallenge from './fraction-challenge';
import DivisionChallenge from './division-challenge';
import NumberChallenge from './number-challenge';
import Icon from '../icon';
import Button from '../ui/button';
import { Actions, Feedback } from '../ui/panels';

export default function ChallengeStep({
  encounter,
  step,
  index,
  progress,
  onStudy,
}: {
  encounter: Encounter;
  step: StoryStep;
  index: number;
  progress: Progress;
  onStudy: (id: string, action: StudyAction) => void;
}) {
  const c = step.challenge;
  const learning = storyLearning(progress, encounter.id);
  const principle =
    index !== 1
      ? step.hint[0]
      : c.kind === 'sum'
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
  const narration = (
    <ReadAloud
      compact
      settings={progress.speech}
      text={`${encounter.title}. ${index === 0 ? encounter[progress.reading] : ''} Challenge ${index + 1} of 3. ${index === 0 ? `Elian’s starting point: ${step.hint[0]}.` : ''} ${c.kind === 'number' ? c.question : c.kind === 'sum' ? `Choose ${c.count} planks totaling ${c.target} ${c.unit}. Available lengths: ${c.planks.join(', ')}.` : c.kind === 'fraction' ? `The cistern starts at ${c.start}/${c.denominator}. Reach ${c.target}/${c.denominator} by adding or removing measures.` : `${c.total} sparks. ${c.routes.find((r) => r.id === answer.route)?.label}. ${c.routes.find((r) => r.id === answer.route)?.question}`}${
        hint > 0 ? ` Hint: ${step.hint[hint - 1]}. Why this works: ${principle}` : ''
      }`}
    />
  );
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!hasAnswer(answer, c.kind)) {
          setFeedback(
            'Enter an answer first. A number, decimal, fraction, or short calculation is welcome. Resolve is unchanged.',
          );
          return;
        }
        if (!validateAnswer(c, answer)) {
          setFeedback(
            `${answerFeedback(c, answer)} ${principle} A new incorrect answer costs 1 Resolve; the same answer is never charged twice.`,
          );
        }
        onStudy(encounter.id, { kind: 'submit', step: index, answer });
      }}
    >
      {index === 0 && (
        <p className="mb-4 border-l-2 border-[#ac9963] pl-3 text-sm leading-relaxed text-[#43533e]">
          Elian’s starting point: {step.hint[0]}
        </p>
      )}
      {c.kind === 'number' && (
        <NumberChallenge
          narration={narration}
          challenge={c}
          value={answer.value ?? ''}
          onChange={(value) => update({ value })}
        />
      )}
      {c.kind === 'sum' && (
        <SumChallenge
          narration={narration}
          challenge={c}
          selected={answer.selected ?? []}
          onChange={(selected) => update({ selected })}
        />
      )}
      {c.kind === 'fraction' && (
        <FractionChallenge
          narration={narration}
          challenge={c}
          fill={answer.fill ?? c.start}
          support={progress.support}
          onChange={(fill) => update({ fill })}
        />
      )}
      {c.kind === 'division' && (
        <DivisionChallenge
          narration={narration}
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
          {step.hint[hint - 1]}
          <p className="mt-3 font-sans text-sm not-italic leading-relaxed">
            Why this works: {principle}
          </p>
        </div>
      )}
      {learning.attempted.length > 0 && (
        <p className="mt-4 text-sm leading-relaxed text-[#43533e]">
          {learning.recovered
            ? 'Reflection recovered 1 Resolve. Keep working; a correct answer restores 2 more.'
            : 'Work through Elian’s hint to recover 1 Resolve. Hints never cost Resolve.'}
        </p>
      )}
      <Actions>
        <Button type="submit">
          {action}
          <Icon name="arrow" />
        </Button>
        <Button
          variant="secondary"
          disabled={hint === step.hint.length && (!learning.attempted.length || learning.recovered)}
          onClick={() => {
            setHint((n) => Math.min(step.hint.length, n + 1));
            onStudy(encounter.id, { kind: 'reflect', step: index });
          }}
        >
          {hint === step.hint.length
            ? learning.attempted.length && !learning.recovered
              ? 'Reflect with Elian · +1 Resolve'
              : 'Explanation shown'
            : hint > 0
              ? 'Another hint'
              : 'Ask Elian for a hint'}
        </Button>
      </Actions>
    </form>
  );
}
