import type {
  Progress,
  TrainingMode,
  TrainingOperation,
  TrainingProblem,
  TrainingProgress,
} from './types';
import { calculate, approximatelyEqual } from './math';

export const emptyTraining = (): TrainingProgress => ({
  sequence: 0,
  solved: 0,
  attempts: 0,
  pending: null,
});
export const trainingModes: { id: TrainingMode; label: string; description: string }[] = [
  {
    id: 'arithmetic',
    label: 'Add & subtract',
    description: 'Build confidence by joining and comparing quantities.',
  },
  { id: 'tables', label: 'Times tables', description: 'Practice one table, from 1 through 12.' },
  {
    id: 'dice',
    label: 'The dice circle',
    description: 'Roll two D20s and work with what they reveal.',
  },
];
export const operationSymbol = (op: TrainingOperation) =>
  op === 'add' ? '+' : op === 'subtract' ? '−' : '×';
export const trainingAnswer = (p: Pick<TrainingProblem, 'a' | 'b' | 'operation'>) =>
  p.operation === 'add' ? p.a + p.b : p.operation === 'subtract' ? p.a - p.b : p.a * p.b;
export function trainingGuidance(p: TrainingProblem): string {
  if (p.operation === 'add')
    return `Start at ${p.a} and count forward ${p.b}. You can split ${p.b} into smaller parts and add one part at a time.`;
  if (p.operation === 'subtract')
    return `Find the distance from ${p.b} up to ${p.a}. You can count up in small jumps. Check by adding your answer to ${p.b}.`;
  return `${p.a} × ${p.b} means ${p.a} equal groups of ${p.b}. Add ${p.b} repeatedly, or split the ${p.a} groups into smaller batches.`;
}
export function trainingExplanation(p: TrainingProblem): string {
  const answer = trainingAnswer(p);
  if (p.operation === 'add') {
    const tens = Math.floor(p.b / 10) * 10,
      ones = p.b % 10;
    return tens
      ? `Split ${p.b} into ${tens} and ${ones}: ${p.a} + ${tens} = ${p.a + tens}, then add ${ones} to reach ${answer}.`
      : `Count forward ${p.b} from ${p.a}: ${p.a} + ${p.b} = ${answer}. Addition joins the two quantities.`;
  }
  if (p.operation === 'subtract')
    return `${p.b} + ${answer} = ${p.a}, so ${p.a} − ${p.b} = ${answer}. The difference is the distance between the two numbers.`;
  const half = Math.floor(p.a / 2),
    rest = p.a - half;
  return p.a === 1
    ? `One group of ${p.b} contains ${p.b}. Multiplying by 1 leaves the quantity unchanged.`
    : `Split ${p.a} groups into ${half} and ${rest}: ${half} × ${p.b} = ${half * p.b}; ${rest} × ${p.b} = ${rest * p.b}. Add them: ${half * p.b} + ${rest * p.b} = ${answer}.`;
}
export type TrainingAction =
  | {
      kind: 'roll';
      mode: TrainingMode;
      operation: TrainingOperation;
      table: number;
      rolls: [number, number];
    }
  | { kind: 'submit'; id: number; value: string };
export function applyTrainingAction(progress: Progress, action: TrainingAction): Progress {
  if (action.kind === 'roll') {
    if (
      !trainingModes.some((m) => m.id === action.mode) ||
      !['add', 'subtract', 'multiply'].includes(action.operation)
    )
      return progress;
    if (action.rolls.length !== 2) return progress;
    const sides = action.mode === 'tables' ? 12 : 20;
    if (action.rolls.some((r) => !Number.isInteger(r) || r < 1 || r > sides)) return progress;
    if (
      action.mode === 'tables' &&
      (!Number.isInteger(action.table) || action.table < 1 || action.table > 12)
    )
      return progress;
    if (action.mode === 'arithmetic' && action.operation === 'multiply') return progress;
    let [a, b] = action.mode === 'tables' ? [action.table, action.rolls[1]] : action.rolls;
    if (action.operation === 'subtract' && a < b) [a, b] = [b, a];
    const id = progress.training.sequence + 1;
    return {
      ...progress,
      training: {
        ...progress.training,
        sequence: id,
        pending: {
          id,
          mode: action.mode,
          operation: action.mode === 'tables' ? 'multiply' : action.operation,
          a,
          b,
          solved: false,
          tried: [],
        },
      },
    };
  }
  const pending = progress.training.pending;
  if (!pending || pending.id !== action.id || pending.solved) return progress;
  const value = calculate(action.value);
  if (value === null || pending.tried.includes(value)) return progress;
  const solved = approximatelyEqual(value, trainingAnswer(pending));
  if (!solved && pending.tried.length >= 32) return progress;
  return {
    ...progress,
    resolve: Math.min(20, progress.resolve + (solved ? 3 : 0)),
    training: {
      ...progress.training,
      attempts: Math.min(1e6, progress.training.attempts + 1),
      solved: Math.min(1e6, progress.training.solved + (solved ? 1 : 0)),
      pending: { ...pending, solved, tried: [...pending.tried, value].slice(-32) },
    },
  };
}

export function normalizeTraining(value: unknown): TrainingProgress {
  const raw = value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
  const bounded = (n: unknown) =>
    typeof n === 'number' && Number.isSafeInteger(n) ? Math.max(0, Math.min(1e6, n)) : 0;
  const result: TrainingProgress = {
    sequence: bounded(raw.sequence),
    solved: bounded(raw.solved),
    attempts: bounded(raw.attempts),
    pending: null,
  };
  result.solved = Math.min(result.solved, result.attempts);
  const p = raw.pending as TrainingProblem | undefined;
  if (
    !p ||
    !trainingModes.some((m) => m.id === p.mode) ||
    !['add', 'subtract', 'multiply'].includes(p.operation)
  )
    return result;
  const maxA = p.mode === 'tables' ? 12 : 20,
    maxB = p.mode === 'tables' ? 12 : 20;
  if (
    ![p.a, p.b].every(Number.isInteger) ||
    p.a < 1 ||
    p.a > maxA ||
    p.b < 1 ||
    p.b > maxB ||
    (p.operation === 'subtract' && p.a < p.b) ||
    (p.mode === 'tables' && p.operation !== 'multiply') ||
    (p.mode === 'arithmetic' && p.operation === 'multiply')
  )
    return result;
  if (!Number.isSafeInteger(p.id) || p.id < 1 || p.id !== result.sequence) return result;
  result.pending = {
    id: p.id,
    mode: p.mode,
    operation: p.operation,
    a: p.a,
    b: p.b,
    solved: p.solved === true,
    tried: Array.isArray(p.tried)
      ? p.tried.filter((n) => typeof n === 'number' && Number.isFinite(n)).slice(0, 32)
      : [],
  };
  return result;
}

// Rejection sampling keeps all die faces equally likely; animation never chooses the result.
export function rollDie(sides: number): number {
  if (!Number.isInteger(sides) || sides < 2 || sides > 20) throw new Error('Unsupported die');
  const limit = Math.floor(0x100000000 / sides) * sides;
  const buffer = new Uint32Array(1);
  do {
    crypto.getRandomValues(buffer);
  } while (buffer[0] >= limit);
  return (buffer[0] % sides) + 1;
}
