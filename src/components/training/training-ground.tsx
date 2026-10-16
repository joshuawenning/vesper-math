'use client';
import { useEffect, useRef, useState } from 'react';
import type { Progress, TrainingMode, TrainingOperation } from '@/lib/types';
import { calculate, approximatelyEqual } from '@/lib/math';
import {
  operationSymbol,
  rollDie,
  trainingAnswer,
  trainingExplanation,
  trainingGuidance,
  trainingModes,
  type TrainingAction,
} from '@/lib/training';
import PreferenceChoices from '../ui/preference-choices';
import ResolveMeter from '../profile/resolve-meter';
import { Muted, Narrative } from '../ui/typography';
import { Actions, Feedback } from '../ui/panels';
import Button from '../ui/button';
import Icon from '../icon';
import ReadAloud from '../accessibility/read-aloud';
import D20Dice from './d20-dice';
import TrainingModel from './training-model';

export default function TrainingGround({
  progress,
  onAction,
  onResume,
}: {
  progress: Progress;
  onAction: (action: TrainingAction) => void;
  onResume: () => void;
}) {
  const saved = progress.training.pending;
  const [mode, setMode] = useState<TrainingMode>(saved?.mode ?? 'arithmetic');
  const [operation, setOperation] = useState<TrainingOperation>(
    saved && saved.mode !== 'tables' ? saved.operation : 'add',
  );
  const [table, setTable] = useState(saved?.mode === 'tables' ? saved.a : 3);
  const [value, setValue] = useState('');
  const [feedback, setFeedback] = useState('');
  const [help, setHelp] = useState(false);
  const answer = useRef<HTMLInputElement>(null);
  const result = useRef<HTMLHeadingElement>(null);
  const problem =
    saved?.mode === mode &&
    (mode !== 'tables' || saved.a === table) &&
    (mode === 'tables' || saved.operation === operation)
      ? saved
      : null;
  useEffect(() => {
    setValue('');
    setFeedback('');
    setHelp(false);
  }, [problem?.id]);
  useEffect(() => {
    if (!problem) return;
    if (problem.solved) result.current?.focus({ preventScroll: true });
    else answer.current?.focus({ preventScroll: true });
  }, [problem?.id, problem?.solved]);
  function roll(index?: 0 | 1) {
    const sides = mode === 'tables' ? 12 : 20;
    const rolls: [number, number] = [rollDie(sides), rollDie(sides)];
    if (index !== undefined && problem)
      rolls[index === 0 ? 1 : 0] = index === 0 ? problem.b : problem.a;
    onAction({
      kind: 'roll',
      mode,
      operation: mode === 'tables' ? 'multiply' : operation,
      table,
      rolls,
    });
  }
  const greeting = progress.profile.name ? `${progress.profile.name}, a little` : 'A little';
  const prompt = problem ? `${problem.a} ${operationSymbol(problem.operation)} ${problem.b}` : '';
  return (
    <>
      <Narrative>
        “{greeting} practice makes the road feel shorter,” Elian says. “Let’s try an idea together
        before we set out.”
      </Narrative>
      <ResolveMeter value={progress.resolve} context="training" />
      <Muted>
        Training restores 3 Resolve for each solved round, up to 20. Mistakes here cost nothing.
        Take hints, try again, and build your confidence.
      </Muted>
      <PreferenceChoices
        label="Choose your training"
        value={mode}
        onChange={(nextMode) => {
          setMode(nextMode);
          if (nextMode === 'arithmetic' && operation === 'multiply') setOperation('add');
        }}
        options={trainingModes.map((m) => ({
          value: m.id,
          label: m.label,
          description: m.description,
        }))}
      />
      {mode === 'tables' ? (
        <fieldset className="my-5">
          <legend className="mb-2 text-sm font-medium">Choose a times table</legend>
          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
              <label key={n} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="times-table"
                  value={n}
                  checked={table === n}
                  onChange={() => setTable(n)}
                  className="peer sr-only"
                />
                <span className="flex min-h-11 items-center justify-center border border-[#6b795e] text-sm peer-checked:bg-[#243d33] peer-checked:text-[#fff5dc] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#775a26]">
                  ×{n}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : (
        <PreferenceChoices
          label="Operation"
          value={operation}
          onChange={setOperation}
          options={[
            { value: 'add', label: 'Addition +' },
            { value: 'subtract', label: 'Subtraction −' },
            ...(mode === 'dice' ? [{ value: 'multiply' as const, label: 'Multiply ×' }] : []),
          ]}
        />
      )}
      {!problem ? (
        <Button onClick={() => roll()}>
          {mode === 'dice' ? 'Roll the D20s' : 'Begin a practice round'}
          <Icon name="dice" />
        </Button>
      ) : (
        <>
          {mode === 'dice' && (
            <D20Dice a={problem.a} b={problem.b} round={problem.id} onRoll={roll} />
          )}
          {mode === 'dice' && operation === 'subtract' && (
            <Muted>For subtraction, we place the larger roll first.</Muted>
          )}
          <ReadAloud
            settings={progress.speech}
            text={`Elian’s training ground. What is ${prompt}? ${help ? trainingGuidance(problem) : ''} ${problem.solved ? trainingExplanation(problem) : ''}`}
          />
          {problem.solved ? (
            <section role="status" className="my-5 border-l-2 border-[#775a26] pl-4">
              <h3
                ref={result}
                tabIndex={-1}
                className="font-story text-2xl focus:outline-none focus:shadow-none"
              >
                {
                  ['Nicely reasoned.', 'There’s your footing.', 'A little clearer each time.'][
                    problem.id % 3
                  ]
                }
              </h3>
              <p className="my-3 font-story text-xl">
                {prompt} = {trainingAnswer(problem)}
              </p>
              <p className="text-sm leading-relaxed">{trainingExplanation(problem)}</p>
              <p className="mt-3 text-sm font-medium">+3 Resolve · up to 20</p>
            </section>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const entered = calculate(value);
                if (entered === null) {
                  setFeedback('Enter a number or a short calculation first.');
                  return;
                }
                if (!approximatelyEqual(entered, trainingAnswer(problem))) {
                  setFeedback(`Not quite, and no Resolve lost. ${trainingGuidance(problem)}`);
                  setHelp(true);
                }
                onAction({ kind: 'submit', id: problem.id, value });
              }}
            >
              <label htmlFor="training-answer" className="mt-5 block font-story text-[2rem]">
                {prompt} = ?
              </label>
              <input
                ref={answer}
                id="training-answer"
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                  setFeedback('');
                }}
                className="my-3 w-full border border-[#6b795e] bg-[#fff9e7] px-3 py-3 text-ink"
                type="text"
                inputMode="text"
                autoComplete="off"
                maxLength={160}
                aria-describedby="training-format"
              />
              <p id="training-format" className="mb-4 text-xs text-[#43533e]">
                Numbers, fractions, and short calculations are welcome.
              </p>
              {feedback && <Feedback>{feedback}</Feedback>}
              <Actions>
                <Button type="submit">
                  Check with Elian
                  <Icon name="check" />
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setHelp((shown) => !shown)}
                  aria-expanded={help}
                >
                  {help ? 'Hide the visual aid' : 'Work through it with Elian'}
                </Button>
              </Actions>
            </form>
          )}
          {help && (
            <>
              <p className="mt-4 text-sm leading-relaxed">{trainingGuidance(problem)}</p>
              <TrainingModel problem={problem} />
            </>
          )}
          <Button variant="secondary" className="mt-4" onClick={() => roll()}>
            {problem.solved
              ? 'Another practice round'
              : mode === 'dice'
                ? 'Roll both dice again'
                : 'Try a different question'}
            <Icon name="dice" />
          </Button>
        </>
      )}
      <div className="mt-6 border-t border-[#909c8350] pt-5">
        <p className="mb-3 text-sm text-[#43533e]">
          {progress.training.solved} training rounds solved.{' '}
          {progress.resolve > 0
            ? 'Your next adventure is waiting.'
            : 'Solve a training round to recover Resolve and reopen the trail.'}
        </p>
        <Button onClick={onResume} disabled={progress.resolve <= 0}>
          Return to exploration
          <Icon name="arrow" />
        </Button>
      </div>
    </>
  );
}
