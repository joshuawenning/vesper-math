import type { Chapter, Progress, StoryLearning } from './types';
import { calculate } from './math';
import { validateAnswer, type Answer } from './challenges';
import { levelEncounter } from './difficulty';
import { recordDiscovery } from './progress';
import { storySteps } from '@/content/story-lessons';

export type StudyAction =
  | { kind: 'submit'; step: number; answer: Answer }
  | { kind: 'continue'; step: number }
  | { kind: 'reflect'; step: number };
export const studyKey = (worldId: string, id: string) => `${worldId}:${id}`;
export function storyLearning(progress: Progress, id: string): StoryLearning {
  return (
    progress.study[studyKey(progress.worldId, id)] ?? {
      level: progress.skill,
      completed: 0,
      reviewing: false,
      attempted: [],
      recovered: false,
    }
  );
}
export function hasAnswer(answer: Answer, kind: string): boolean {
  if (kind === 'number' || kind === 'division') return calculate(answer.value ?? '') !== null;
  return kind === 'sum' ? Boolean(answer.selected?.length) : Number.isInteger(answer.fill);
}
export function applyStudyAction(
  progress: Progress,
  chapter: Chapter,
  id: string,
  action: StudyAction,
): Progress {
  const original = chapter.encounters.find((e) => e.id === id);
  if (
    progress.resolve <= 0 ||
    !original ||
    progress.worldId !== chapter.id ||
    progress.done.includes(id) ||
    chapter.encounters.find((e) => !progress.done.includes(e.id))?.id !== id
  )
    return progress;
  const current = storyLearning(progress, id);
  const expected = current.reviewing ? current.completed - 1 : current.completed;
  if (action.step !== expected || expected < 0 || expected > 2) return progress;
  const key = studyKey(chapter.id, id);
  const save = (state: StoryLearning, delta = 0): Progress => ({
    ...progress,
    resolve: Math.max(0, Math.min(20, progress.resolve + delta)),
    study: { ...progress.study, [key]: state },
  });
  if (action.kind === 'continue') {
    if (!current.reviewing) return progress;
    const updated = save({ ...current, reviewing: false, attempted: [], recovered: false });
    return current.completed === 3 ? recordDiscovery(updated, id, chapter) : updated;
  }
  if (current.reviewing || current.completed === 3) return progress;
  if (action.kind === 'reflect') {
    if (current.recovered || !current.attempted.length) return progress;
    return save({ ...current, recovered: true }, 1);
  }
  const challenge = storySteps(levelEncounter(original, current.level), current.level)[expected]
    .challenge;
  if (!hasAnswer(action.answer, challenge.kind)) return progress;
  if (validateAnswer(challenge, action.answer)) {
    return save({ ...current, completed: current.completed + 1, reviewing: true }, 2);
  }
  const fingerprint = JSON.stringify({
    value: calculate(action.answer.value ?? ''),
    selected: [...(action.answer.selected ?? [])].sort((a, b) => a - b),
    fill: action.answer.fill ?? null,
    route: action.answer.route ?? '',
  });
  if (current.attempted.includes(fingerprint) || current.attempted.length >= 32) return progress;
  return save({ ...current, attempted: [...current.attempted, fingerprint] }, -1);
}
