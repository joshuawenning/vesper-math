'use client';
import { useEffect, useRef, useState } from 'react';
import type { Progress, TrainingMode, TrainingOperation } from '@/lib/types';
import { calculate, approximatelyEqual } from '@/lib/math';
import {
  operationSymbol,
  rollDie,
  trainingAnswer,
  trainingGuidance,
  trainingModes,
  type TrainingAction,
} from '@/lib/training';
import Button from '../ui/button';
import Icon from '../icon';
import ReadAloud from '../accessibility/read-aloud';
import D20Dice from './d20-dice';
import TrainingModel from './training-model';

export default function TrainingGround({
  progress,
  onAction,
  onResume,
  onModeChange,
}: {
  progress: Progress;
  onAction: (action: TrainingAction) => void;
  onResume: () => void;
  onModeChange?: (mode: TrainingMode) => void;
}) {
  const saved = progress.training.pending;
  const [mode, setMode] = useState<TrainingMode>(saved?.mode ?? 'arithmetic');
  const [operation, setOperation] = useState<TrainingOperation>(
    saved?.mode === 'tables' ? 'add' : (saved?.operation ?? 'add'),
  );
  const [table, setTable] = useState(saved?.mode === 'tables' ? saved.a : 3);
  const [value, setValue] = useState('');
  const [feedback, setFeedback] = useState('');
  const [help, setHelp] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const next = useRef<HTMLButtonElement>(null);
  const locked = Boolean(saved && !saved.solved);
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
    if (problem?.solved) next.current?.focus({ preventScroll: true });
    else if (problem) input.current?.focus({ preventScroll: true });
  }, [problem?.id, problem?.solved]);
  useEffect(() => {
    onModeChange?.(mode);
  }, [mode]);
  function begin() {
    const sides = mode === 'tables' ? 12 : 20;
    onAction({
      kind: 'roll',
      mode,
      operation: mode === 'tables' ? 'multiply' : operation,
      table,
      rolls: [rollDie(sides), rollDie(sides)],
    });
  }
  const prompt = problem ? `${problem.a} ${operationSymbol(problem.operation)} ${problem.b}` : '';
  return (
    <>
      <fieldset disabled={locked} className="mb-5 disabled:opacity-70">
        <legend className="mb-2 text-xs font-medium uppercase tracking-wider text-[#43533e]">
          Practice
        </legend>
        <div className="grid grid-cols-3 gap-2">
          {trainingModes.map((m) => (
            <label key={m.id} className="relative cursor-pointer">
              <input
                type="radio"
                name="training-mode"
                value={m.id}
                checked={mode === m.id}
                onChange={() => {
                  setMode(m.id);
                  if (m.id === 'arithmetic' && operation === 'multiply') setOperation('add');
                }}
                className="peer sr-only"
              />
              <span className="flex min-h-12 items-center justify-center border border-[#6b795e] px-2 py-2 text-center text-xs peer-checked:bg-[#243d33] peer-checked:text-[#fff5dc] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#775a26]">
                {m.label}
              </span>
            </label>
          ))}
        </div>
        {mode === 'tables' ? (
          <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label="Times table">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
              <button
                type="button"
                key={n}
                onClick={() => setTable(n)}
                aria-pressed={table === n}
                className={`min-h-11 min-w-11 border px-2 text-sm ${table === n ? 'border-[#243d33] bg-[#243d33] text-[#fff5dc]' : 'border-[#909c83] text-[#43533e]'}`}
              >
                ×{n}
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Operation">
            {(
              ['add', 'subtract', ...(mode === 'dice' ? ['multiply'] : [])] as TrainingOperation[]
            ).map((op) => (
              <button
                key={op}
                type="button"
                onClick={() => setOperation(op)}
                aria-pressed={operation === op}
                className={`min-h-11 min-w-14 border px-3 text-lg ${operation === op ? 'border-[#243d33] bg-[#243d33] text-[#fff5dc]' : 'border-[#909c83] text-[#43533e]'}`}
              >
                {operationSymbol(op)}
              </button>
            ))}
          </div>
        )}
      </fieldset>
      {locked && (
        <p className="mb-4 text-xs text-[#43533e]">
          Finish this question before changing your practice.
        </p>
      )}
      {!problem ? (
        <Button onClick={begin}>
          {mode === 'dice' ? 'Cast your first roll' : 'Begin practice'}
          <Icon name="arrow" />
        </Button>
      ) : (
        <>
          {mode === 'dice' && <D20Dice a={problem.a} b={problem.b} round={problem.id} />}
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-xs text-[#43533e]">Elian’s challenge</p>
            <ReadAloud
              compact
              label="Read training question aloud"
              settings={progress.speech}
              text={
                problem.solved
                  ? `Correct. ${prompt} equals ${trainingAnswer(problem)}.`
                  : `What is ${prompt}? ${help ? trainingGuidance(problem) : ''}`
              }
            />
          </div>
          {problem.solved ? (
            <section role="status">
              <div className="mb-4 border-l-2 border-[#385a48] bg-[#dce3cf] p-4 text-[#243d33]">
                <p className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <Icon name="check" className="size-5" /> Correct
                </p>
                <h3 className="font-story text-3xl">
                  {prompt} = {trainingAnswer(problem)}
                </h3>
              </div>
              <Button ref={next} onClick={begin}>
                Next question
                <Icon name="arrow" />
              </Button>
            </section>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const result = calculate(value);
                if (result === null) {
                  setFeedback('Enter a number, fraction, or short calculation.');
                  input.current?.focus({ preventScroll: true });
                  return;
                }
                if (!approximatelyEqual(result, trainingAnswer(problem))) {
                  setFeedback('Not quite. Try again, or open a hint.');
                  input.current?.focus({ preventScroll: true });
                  input.current?.select();
                }
                onAction({ kind: 'submit', id: problem.id, value });
              }}
            >
              <label
                htmlFor="training-answer"
                className="mb-4 block font-story text-[clamp(2rem,5vw,3rem)]"
              >
                {prompt} = ?
              </label>
              <div className="flex items-stretch gap-2">
                <input
                  id="training-answer"
                  ref={input}
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    setFeedback('');
                  }}
                  autoComplete="off"
                  maxLength={160}
                  inputMode="text"
                  aria-label="Your training answer"
                  aria-invalid={Boolean(feedback)}
                  aria-describedby={feedback ? 'training-feedback' : undefined}
                  className={`min-w-0 flex-1 border bg-[#fff9e7] px-3 py-3 text-xl text-ink ${feedback ? 'border-[#8c4a36] ring-1 ring-[#8c4a36]' : 'border-[#6b795e]'}`}
                />
                <Button type="submit" aria-label={feedback ? 'Try again' : 'Check answer'}>
                  <Icon name={feedback ? 'restart' : 'arrow'} />
                </Button>
              </div>
              {feedback && (
                <p
                  id="training-feedback"
                  role="status"
                  className="mt-3 border-l-2 border-[#8c4a36] bg-[#ead9c7] px-3 py-2 text-sm font-medium text-[#683d2d]"
                >
                  {feedback}
                </p>
              )}
              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setHelp((v) => !v)}
                  aria-expanded={help}
                  aria-controls="training-hint"
                  className="min-h-11 px-2 text-sm text-[#775a26] underline decoration-[#775a2660] underline-offset-4"
                >
                  {help ? 'Hide hint' : 'Hint'}
                </button>
              </div>
            </form>
          )}
          {help && !problem.solved && (
            <div id="training-hint">
              <p className="mt-3 text-sm leading-relaxed">{trainingGuidance(problem)}</p>
              <TrainingModel problem={problem} />
            </div>
          )}
        </>
      )}
      <div className="mt-6 border-t border-[#909c8350] pt-4 text-xs leading-relaxed text-[#43533e]">
        <p>{progress.training.solved} rounds solved.</p>
        <button
          type="button"
          onClick={onResume}
          disabled={progress.resolve <= 0}
          className="mt-2 min-h-11 py-2 text-sm text-[#775a26] underline underline-offset-4 disabled:opacity-40"
        >
          {progress.resolve <= 0
            ? 'Solve a round to reopen the trail'
            : 'Return to your adventure →'}
        </button>
      </div>
    </>
  );
}
