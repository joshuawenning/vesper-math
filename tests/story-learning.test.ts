import test from 'node:test';
import assert from 'node:assert/strict';
import { worlds, loadChapter } from '../src/content/worlds';
import { chapter } from '../src/content/merewood';
import { storySteps } from '../src/content/story-lessons';
import { levelEncounter } from '../src/lib/difficulty';
import { normalizeProgress, restartCurrentJourney, switchWorld } from '../src/lib/progress';
import { applyStudyAction, storyLearning } from '../src/lib/story-learning';
import { validateAnswer } from '../src/lib/challenges';

// Independently calculated preparation and transfer answers, in skill order.
const solutions: Record<string, number[][]> = {
  bridge: [
    [5, 9],
    [20, 30],
    [33, 57],
  ],
  cistern: [
    [1 / 2, 1 / 2],
    [3 / 8, 3 / 8],
    [5 / 12, 1 / 3],
  ],
  guardian: [
    [12, 4],
    [32, 8],
    [63, 9],
  ],
  'copper-lift': [
    [6, 6],
    [44, 44],
    [15, 15],
  ],
  gearworks: [
    [12, 4],
    [42, 7],
    [15, 60],
  ],
  'forge-floor': [
    [6, 16],
    [30, 28],
    [4, 6],
  ],
  'harbor-trade': [
    [7, 7],
    [10, 56],
    [18, 119],
  ],
  'tidal-mark': [
    [300, 3.5],
    [50, 1],
    [750, 1.25],
  ],
  'lantern-garden': [
    [1 / 2, 1 / 2],
    [2 / 3, 1 / 3],
    [5, 7],
  ],
  'mirrors-well': [
    [4, 4],
    [1 / 2, 1 / 2],
    [7 / 4, 3 / 2],
  ],
  'scarab-caravan': [
    [15, 5],
    [6, 42],
    [28, 65],
  ],
  'prism-gate': [
    [9, 3],
    [15, 22],
    [25, 27],
  ],
  'borrowed-hours': [
    [15, 35],
    [35, 75],
    [4, 1],
  ],
  'frostbound-index': [
    [6, 7],
    [24, 9],
    [50, 33],
  ],
  'door-of-thaw': [
    [10, 5],
    [24, 26],
    [5, 7],
  ],
  'starless-ferry': [
    [10, 13],
    [7, 7],
    [3.75, 3.75],
  ],
  'orrery-keeper': [
    [18, 6],
    [15, 48],
    [28, 65],
  ],
  'unwritten-star': [
    [11, 15],
    [6, 8],
    [5, 7],
  ],
  'honey-debt': [
    [8, 4],
    [1 / 2, 1 / 2],
    [30, 105],
  ],
  'snails-bargain': [
    [6, 3],
    [125, 1.75],
    [0.6, 6],
  ],
  'remembering-seed': [
    [9, 12],
    [15, 20],
    [4, 6],
  ],
};

test('all 21 stories have three skill-matched challenges with verified added answers', async () => {
  let count = 0;
  for (const world of worlds) {
    const chapter = await loadChapter(world.id);
    for (const encounter of chapter.encounters) {
      count++;
      for (const [i, level] of (['foundations', 'developing', 'stretch'] as const).entries()) {
        const adjusted = levelEncounter(encounter, level);
        const steps = storySteps(adjusted, level);
        assert.equal(steps.length, 3);
        assert.deepEqual(steps[1].challenge, adjusted.challenge);
        for (const [j, step] of [steps[0], steps[2]].entries()) {
          const answer = solutions[encounter.id][i][j];
          assert.equal(
            validateAnswer(step.challenge, { value: String(answer) }),
            true,
            `${encounter.id} ${level} step ${j}`,
          );
          assert.equal(validateAnswer(step.challenge, { value: String(answer + 1) }), false);
          assert.ok(step.lesson.length > 0);
          assert.ok(step.hint[0].length > 30);
        }
      }
    }
  }
  assert.equal(count, 21);
});

test('a story requires three answers and reflection before claiming a discovery', () => {
  let p = normalizeProgress({});
  p = applyStudyAction(p, chapter, 'bridge', { kind: 'submit', step: 0, answer: { value: '5' } });
  assert.deepEqual(p.done, []);
  assert.equal(p.resolve, 9);
  assert.equal(storyLearning(p, 'bridge').reviewing, true);
  assert.equal(
    applyStudyAction(p, chapter, 'bridge', { kind: 'submit', step: 0, answer: { value: '5' } }),
    p,
  );
  p = normalizeProgress(JSON.parse(JSON.stringify(p)));
  p = applyStudyAction(p, chapter, 'bridge', { kind: 'continue', step: 0 });
  assert.equal(applyStudyAction(p, chapter, 'bridge', { kind: 'continue', step: 1 }), p);
  p = applyStudyAction(p, chapter, 'bridge', {
    kind: 'submit',
    step: 1,
    answer: { selected: [3, 4, 5] },
  });
  p = applyStudyAction(p, chapter, 'bridge', { kind: 'continue', step: 1 });
  p = applyStudyAction(p, chapter, 'bridge', { kind: 'submit', step: 2, answer: { value: '9' } });
  assert.deepEqual(p.done, []);
  p = applyStudyAction(p, chapter, 'bridge', { kind: 'continue', step: 2 });
  assert.deepEqual(p.done, ['bridge']);
  assert.equal(p.history.length, 1);
  assert.equal(p.resolve, 13);
  assert.equal(
    applyStudyAction(p, chapter, 'bridge', { kind: 'submit', step: 0, answer: { value: '5' } }),
    p,
  );
});

test('Resolve penalizes unique valid wrong answers and allows one reflection recovery before zero', () => {
  let p = normalizeProgress({ resolve: 3 });
  assert.equal(
    applyStudyAction(p, chapter, 'bridge', { kind: 'submit', step: 0, answer: { value: '' } }),
    p,
  );
  p = applyStudyAction(p, chapter, 'bridge', { kind: 'submit', step: 0, answer: { value: '2' } });
  assert.equal(p.resolve, 2);
  assert.equal(
    applyStudyAction(p, chapter, 'bridge', { kind: 'submit', step: 0, answer: { value: '4/2' } }),
    p,
  );
  p = normalizeProgress(JSON.parse(JSON.stringify(p)));
  p = applyStudyAction(p, chapter, 'bridge', { kind: 'reflect', step: 0 });
  assert.equal(p.resolve, 3);
  assert.equal(applyStudyAction(p, chapter, 'bridge', { kind: 'reflect', step: 0 }), p);
  p = applyStudyAction(p, chapter, 'bridge', { kind: 'submit', step: 0, answer: { value: '3' } });
  assert.equal(p.resolve, 2);
  p = applyStudyAction(p, chapter, 'bridge', { kind: 'submit', step: 0, answer: { value: '5' } });
  assert.equal(p.resolve, 4);
  assert.equal(storyLearning(p, 'bridge').completed, 1);
});

test('in-progress learning retains its level across preferences, travel, and export', async () => {
  let p = normalizeProgress({ skill: 'developing' });
  p = applyStudyAction(p, chapter, 'bridge', { kind: 'submit', step: 0, answer: { value: '1' } });
  p = { ...p, skill: 'stretch' };
  p = switchWorld(p, worlds[1].id);
  p = normalizeProgress(JSON.parse(JSON.stringify(p)));
  p = switchWorld(p, chapter.id);
  assert.equal(storyLearning(p, 'bridge').level, 'developing');
  p = applyStudyAction(p, chapter, 'bridge', { kind: 'submit', step: 0, answer: { value: '20' } });
  assert.equal(storyLearning(p, 'bridge').completed, 1);
  assert.equal(
    applyStudyAction(p, chapter, 'guardian', { kind: 'submit', step: 0, answer: { value: '12' } }),
    p,
  );
  const other = await loadChapter(worlds[1].id);
  assert.equal(
    applyStudyAction(p, other, other.encounters[0].id, {
      kind: 'submit',
      step: 0,
      answer: { value: '6' },
    }),
    p,
  );
});

test('legacy saves retain discoveries without forcing three new challenges', () => {
  const p = normalizeProgress({
    done: ['bridge'],
    resolve: 999,
    study: { invented: { completed: 99 } },
  });
  assert.deepEqual(p.done, ['bridge']);
  assert.equal(p.resolve, 20);
  assert.deepEqual(p.study, {});
  assert.equal(normalizeProgress({ resolve: -99 }).resolve, 0);
  assert.equal(normalizeProgress({ resolve: NaN }).resolve, 7);
});

test('division practice accepts equivalent expressions without a false penalty', () => {
  const guardian = chapter.encounters[2].challenge;
  assert.equal(validateAnswer(guardian, { route: 'pulse', value: '18/3' }), true);
  assert.equal(validateAnswer(guardian, { route: 'pulse', value: '12/2' }), true);
  assert.equal(validateAnswer(guardian, { route: 'pulse', value: '5' }), false);
});

test('Start Fresh resets Resolve and current chapter learning while retaining other worlds and preferences', () => {
  const other = worlds[1];
  let p = normalizeProgress({
    resolve: 19,
    theme: 'light',
    skill: 'developing',
    profile: { name: 'Mira' },
    done: ['bridge'],
    journeys: { [other.id]: { done: [other.encounters[0]] } },
    study: {
      [`${chapter.id}:cistern`]: { level: 'developing', completed: 1, reviewing: true },
      [`${other.id}:${other.encounters[1]}`]: { level: 'stretch', completed: 1, reviewing: true },
    },
  });
  const original = p;
  p = restartCurrentJourney(p);
  assert.equal(p.resolve, 7);
  assert.deepEqual(p.done, []);
  assert.deepEqual(p.levels, {});
  assert.equal(p.ending, null);
  assert.equal(p.started, false);
  assert.equal(p.study[`${chapter.id}:cistern`], undefined);
  assert.deepEqual(
    p.study[`${other.id}:${other.encounters[1]}`],
    original.study[`${other.id}:${other.encounters[1]}`],
  );
  assert.equal(
    p.history.some((r) => r.worldId === chapter.id),
    false,
  );
  assert.deepEqual(p.journeys[other.id], original.journeys[other.id]);
  assert.equal(p.theme, 'light');
  assert.equal(p.skill, 'developing');
  assert.equal(p.profile.name, 'Mira');
  assert.equal(normalizeProgress(JSON.parse(JSON.stringify(p))).resolve, 7);
  assert.equal(restartCurrentJourney({ ...original, resolve: 0 }).resolve, 7);
  assert.equal(original.resolve, 19);
});
