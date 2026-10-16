import { calculate, approximatelyEqual } from './math';
import type { Challenge } from './types';

export type Answer = { selected?: number[]; fill?: number; route?: string; value?: string };
export function validateAnswer(challenge: Challenge, answer: Answer): boolean {
  switch (challenge.kind) {
    case 'number': {
      const value = calculate(answer.value ?? '');
      return value !== null && approximatelyEqual(value, challenge.answer);
    }
    case 'sum': {
      const selected = answer.selected ?? [];
      return (
        selected.length === challenge.count &&
        new Set(selected).size === selected.length &&
        selected.every((n) => challenge.planks.includes(n)) &&
        selected.reduce((sum, n) => sum + n, 0) === challenge.target
      );
    }
    case 'fraction':
      return Number.isInteger(answer.fill) && answer.fill === challenge.target;
    case 'division': {
      const route = challenge.routes.find((r) => r.id === answer.route);
      const value = calculate(answer.value ?? '');
      return Boolean(
        route && value !== null && approximatelyEqual(value * route.groups, challenge.total),
      );
    }
  }
}

export function answerFeedback(challenge: Challenge, answer: Answer): string {
  if (challenge.kind === 'number')
    return 'That does not quite fit yet. Try working through one step at a time, or ask Elian for a hint. Fractions such as 1/2 are welcome.';
  if (challenge.kind === 'sum') {
    const selected = answer.selected ?? [];
    return `You have ${selected.length} planks spanning ${selected.reduce((a, b) => a + b, 0)} ${challenge.unit}. The supports need exactly ${challenge.count} planks and a total of ${challenge.target} ${challenge.unit}.`;
  }
  if (challenge.kind === 'fraction') {
    const fill = answer.fill ?? challenge.start;
    return `The water is at ${fill}/${challenge.denominator}. ${fill < challenge.target ? 'Add' : 'Remove'} equal measures to reach ${challenge.target}/${challenge.denominator}.`;
  }
  const route = challenge.routes.find((r) => r.id === answer.route);
  if (calculate(answer.value ?? '') === null || !route)
    return 'Choose the number of sparks in each group before casting.';
  return `${calculate(answer.value ?? '')!} × ${route.groups} = ${calculate(answer.value ?? '')! * route.groups} sparks. The ward holds ${challenge.total}. Adjust the size of each group and try again.`;
}

export function describeChallenge(challenge: Challenge): string {
  if (challenge.kind === 'number') return challenge.question;
  if (challenge.kind === 'sum')
    return `Choose exactly ${challenge.count} timbers whose lengths total ${challenge.target} ${challenge.unit}.`;
  if (challenge.kind === 'fraction')
    return `Fill the cistern from ${challenge.start}/${challenge.denominator} to ${challenge.target}/${challenge.denominator} in equal measures.`;
  return `Share ${challenge.total} sparks equally: ${challenge.routes.map((r) => `${r.groups} groups`).join(' or ')}. How many sparks belong in each group?`;
}
