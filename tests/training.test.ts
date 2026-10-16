import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { normalizeProgress } from '../src/lib/progress';
import {
  applyTrainingAction,
  trainingAnswer,
  normalizeTraining,
  rollDie,
} from '../src/lib/training';
import { applyStudyAction } from '../src/lib/story-learning';
import { chapter } from '../src/content/merewood';
import EncounterPanel from '../src/components/encounters/encounter-panel';
import TrainingGround from '../src/components/training/training-ground';

test('zero Resolve blocks story actions, preserves progress, and training reopens the same challenge', () => {
  let p = normalizeProgress({ resolve: 1 });
  p = applyStudyAction(p, chapter, 'bridge', { kind: 'submit', step: 0, answer: { value: '1' } });
  assert.equal(p.resolve, 0);
  const paused = JSON.stringify(p.study);
  for (const action of [
    { kind: 'submit', step: 0, answer: { value: '5' } },
    { kind: 'reflect', step: 0 },
    { kind: 'continue', step: 0 },
  ] as const)
    assert.equal(applyStudyAction(p, chapter, 'bridge', action), p);
  const html = renderToStaticMarkup(
    createElement(EncounterPanel, {
      encounter: chapter.encounters[0],
      progress: p,
      onStudy: () => {},
      onTrain: () => {},
    }),
  );
  assert.ok(html.includes('Train with Elian'));
  assert.ok(!html.includes('world-answer'));
  p = applyTrainingAction(p, {
    kind: 'roll',
    mode: 'arithmetic',
    operation: 'add',
    table: 3,
    rolls: [3, 4],
  });
  p = applyTrainingAction(p, { kind: 'submit', id: p.training.pending!.id, value: '7' });
  assert.equal(p.resolve, 1);
  assert.equal(JSON.stringify(p.study), paused);
  p = applyStudyAction(p, chapter, 'bridge', { kind: 'submit', step: 0, answer: { value: '5' } });
  assert.equal(p.resolve, 3);
  assert.equal(p.study[`${chapter.id}:bridge`].completed, 1);
});

test('training verifies all D20 addition, subtraction, and multiplication results and all twelve tables', () => {
  for (const operation of ['add', 'subtract', 'multiply'] as const) {
    for (let a = 1; a <= 20; a++)
      for (let b = 1; b <= 20; b++) {
        let p = normalizeProgress({ resolve: 0 });
        p = applyTrainingAction(p, {
          kind: 'roll',
          mode: 'dice',
          operation,
          table: 1,
          rolls: [a, b],
        });
        const expected =
          operation === 'add' ? a + b : operation === 'subtract' ? Math.abs(a - b) : a * b;
        assert.equal(trainingAnswer(p.training.pending!), expected);
        p = applyTrainingAction(p, {
          kind: 'submit',
          id: p.training.pending!.id,
          value: String(expected),
        });
        assert.equal(p.resolve, 1);
        assert.equal(p.training.solved, 1);
      }
  }
  for (let table = 1; table <= 12; table++)
    for (let multiplier = 1; multiplier <= 12; multiplier++) {
      let p = applyTrainingAction(normalizeProgress({}), {
        kind: 'roll',
        mode: 'tables',
        operation: 'multiply',
        table,
        rolls: [1, multiplier],
      });
      assert.equal(p.training.pending!.a, table);
      assert.equal(p.training.pending!.b, multiplier);
      p = applyTrainingAction(p, {
        kind: 'submit',
        id: p.training.pending!.id,
        value: String(table * multiplier),
      });
      assert.equal(p.training.solved, 1);
    }
});

test('training mistakes are free, rewards apply once, and stale answers cannot solve new rolls', () => {
  let p = applyTrainingAction(normalizeProgress({ resolve: 19 }), {
    kind: 'roll',
    mode: 'arithmetic',
    operation: 'subtract',
    table: 3,
    rolls: [4, 12],
  });
  const id = p.training.pending!.id;
  assert.equal(applyTrainingAction(p, { kind: 'submit', id, value: '' }), p);
  p = applyTrainingAction(p, { kind: 'submit', id, value: '2' });
  assert.equal(p.resolve, 19);
  assert.equal(p.training.attempts, 1);
  assert.equal(applyTrainingAction(p, { kind: 'submit', id, value: '4/2' }), p);
  p = applyTrainingAction(p, { kind: 'submit', id, value: '16/2' });
  assert.equal(p.resolve, 20);
  assert.equal(p.training.solved, 1);
  assert.equal(applyTrainingAction(p, { kind: 'submit', id, value: '8' }), p);
  p = applyTrainingAction(p, {
    kind: 'roll',
    mode: 'dice',
    operation: 'add',
    table: 3,
    rolls: [20, 20],
  });
  assert.equal(applyTrainingAction(p, { kind: 'submit', id, value: '40' }), p);
});

test('training round and score survive export while older and malformed saves normalize safely', () => {
  let p = applyTrainingAction(normalizeProgress({}), {
    kind: 'roll',
    mode: 'tables',
    operation: 'multiply',
    table: 7,
    rolls: [1, 8],
  });
  p = applyTrainingAction(p, { kind: 'submit', id: p.training.pending!.id, value: '50' });
  const restored = normalizeProgress(JSON.parse(JSON.stringify(p)));
  assert.deepEqual(restored.training, p.training);
  assert.equal(restored.resolve, p.resolve);
  assert.deepEqual(normalizeProgress({}).training, {
    sequence: 0,
    solved: 0,
    attempts: 0,
    pending: null,
  });
  assert.equal(
    normalizeTraining({
      sequence: 1,
      pending: { id: 1, mode: 'dice', operation: 'add', a: 21, b: 4 },
    }).pending,
    null,
  );
  assert.equal(
    normalizeTraining({
      sequence: 1,
      pending: { id: 2, mode: 'dice', operation: 'add', a: 20, b: 4 },
    }).pending,
    null,
  );
  assert.equal(
    normalizeTraining({
      sequence: 1,
      pending: { id: 1, mode: 'tables', operation: 'add', a: 7, b: 8 },
    }).pending,
    null,
  );
  assert.equal(normalizeTraining({ solved: 50, attempts: 2 }).solved, 2);
});

test('all dice remain in range and invalid training configuration cannot award Resolve', () => {
  for (let i = 0; i < 100; i++) {
    const roll = rollDie(20);
    assert.ok(Number.isInteger(roll) && roll >= 1 && roll <= 20);
  }
  assert.throws(() => rollDie(0));
  const p = normalizeProgress({});
  for (const action of [
    { kind: 'roll', mode: 'dice', operation: 'add', table: 3, rolls: [0, 20] },
    { kind: 'roll', mode: 'tables', operation: 'multiply', table: 13, rolls: [1, 2] },
    { kind: 'roll', mode: 'arithmetic', operation: 'multiply', table: 3, rolls: [1, 2] },
  ] as const)
    assert.equal(applyTrainingAction(p, { ...action, rolls: [...action.rolls] }), p);
});

test('training stays available at zero with a clear recovery path and accessible controls', () => {
  const p = normalizeProgress({ resolve: 0 });
  const html = renderToStaticMarkup(
    createElement(TrainingGround, { progress: p, onAction: () => {}, onResume: () => {} }),
  );
  assert.ok(html.includes('Begin practice'));
  assert.ok(html.includes('Solve a round'));
  assert.ok(html.includes('Practice restores 1 Resolve'));
  assert.ok(html.includes('type="radio"'));
});

test('an unsolved practice roll cannot be replaced, including after exporting or changing modes', () => {
  let p = applyTrainingAction(normalizeProgress({}), {
    kind: 'roll',
    mode: 'dice',
    operation: 'add',
    table: 3,
    rolls: [6, 8],
  });
  for (const mode of ['arithmetic', 'tables', 'dice'] as const) {
    const attempt = {
      kind: 'roll' as const,
      mode,
      operation: 'multiply' as const,
      table: 5,
      rolls: [1, 2] as [number, number],
    };
    assert.equal(applyTrainingAction(p, attempt), p);
    const restored = normalizeProgress(JSON.parse(JSON.stringify(p)));
    assert.equal(applyTrainingAction(restored, attempt), restored);
  }
  const html = renderToStaticMarkup(
    createElement(TrainingGround, { progress: p, onAction: () => {}, onResume: () => {} }),
  );
  assert.ok(html.includes('D20 showing 6'));
  assert.ok(html.includes('D20 showing 8'));
  assert.ok(!html.includes('Roll left'));
  assert.ok(!html.includes('Roll both'));
  assert.ok(!html.includes('Try a different question'));
  assert.ok(html.includes('Hint'));
  p = applyTrainingAction(p, { kind: 'submit', id: p.training.pending!.id, value: '14' });
  assert.equal(p.resolve, 8);
  const next = applyTrainingAction(p, {
    kind: 'roll',
    mode: 'tables',
    operation: 'multiply',
    table: 5,
    rolls: [1, 2],
  });
  assert.notEqual(next.training.pending!.id, p.training.pending!.id);
});
