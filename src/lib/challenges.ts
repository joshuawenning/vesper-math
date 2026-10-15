import type { Challenge } from './types';

export type Answer = { selected?: number[]; fill?: number; route?: string; value?: string };
export function validateAnswer(challenge: Challenge, answer: Answer): boolean {
  switch (challenge.kind) {
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
      const value = answer.value?.trim();
      return Boolean(
        route &&
        value &&
        Number.isFinite(Number(value)) &&
        Number(value) * route.groups === challenge.total,
      );
    }
  }
}

export function answerFeedback(challenge: Challenge, answer: Answer): string {
  if (challenge.kind === 'sum') {
    const selected = answer.selected ?? [];
    return `You have ${selected.length} planks spanning ${selected.reduce((a, b) => a + b, 0)} ${challenge.unit}. The supports need exactly ${challenge.count} planks and a total of ${challenge.target} ${challenge.unit}.`;
  }
  if (challenge.kind === 'fraction') {
    const fill = answer.fill ?? challenge.start;
    return `The water is at ${fill}/${challenge.denominator}. ${fill < challenge.target ? 'Add' : 'Remove'} quarter-measures to reach ${challenge.target}/${challenge.denominator}.`;
  }
  const route = challenge.routes.find((r) => r.id === answer.route);
  if (!answer.value?.trim() || !route || !Number.isFinite(Number(answer.value)))
    return 'Choose the number of sparks in each group before casting.';
  return `${Number(answer.value)} × ${route.groups} = ${Number(answer.value) * route.groups} sparks. The ward holds ${challenge.total}. Adjust the size of each group and try again.`;
}
