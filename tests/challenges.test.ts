import test from 'node:test';
import assert from 'node:assert/strict';
import { chapter } from '../src/content/merewood';
import { validateAnswer } from '../src/lib/challenges';
import { normalizeProgress, encounterStatus } from '../src/lib/progress';

test('crossing accepts legal planks and rejects duplicates, unknown lengths, and wrong counts', () => {
  const c = chapter.encounters[0].challenge;
  assert.equal(validateAnswer(c, { selected: [3, 4, 5] }), true);
  assert.equal(validateAnswer(c, { selected: [2, 4, 6] }), true);
  for (const selected of [[4, 4, 4], [6, 6], [1, 5, 6], [2, 3, 4]]) assert.equal(validateAnswer(c, { selected }), false);
});
test('moonwater accepts the exact target and both guardian tactics are valid', () => {
  assert.equal(validateAnswer(chapter.encounters[1].challenge, { fill: 3 }), true);
  assert.equal(validateAnswer(chapter.encounters[1].challenge, { fill: 4 }), false);
  const guardian = chapter.encounters[2].challenge;
  assert.equal(validateAnswer(guardian, { route: 'pulse', value: '6' }), true);
  assert.equal(validateAnswer(guardian, { route: 'crystal', value: '3' }), true);
  for (const value of ['', ' ', 'Infinity', 'NaN', '5']) assert.equal(validateAnswer(guardian, { route: 'pulse', value }), false);
  assert.equal(validateAnswer(guardian, { route: 'invented', value: '6' }), false);
});
test('legacy saves keep valid progress, preferences, and endings', () => {
  const progress = normalizeProgress({ done: ['bridge', 'cistern', 'guardian'], reading: 'plain', support: 'light', started: true, ending: 'refuge' }, chapter);
  assert.equal(progress.ending, 'refuge');
  assert.equal(progress.reading, 'plain');
  assert.equal(encounterStatus('guardian', progress, chapter), 'done');
});
test('corrupt and out-of-order saves cannot skip the path or set a premature ending', () => {
  const progress = normalizeProgress({ done: ['bridge', 'guardian', 'invented'], reading: '<script>', support: 5, ending: 'beacon' }, chapter);
  assert.deepEqual(progress.done, ['bridge']);
  assert.equal(progress.ending, null);
  assert.equal(progress.reading, 'rich');
  assert.equal(encounterStatus('cistern', progress, chapter), 'current');
  assert.equal(encounterStatus('guardian', progress, chapter), 'locked');
  assert.deepEqual(normalizeProgress(null, chapter).done, []);
});
