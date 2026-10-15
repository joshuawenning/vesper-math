import test from 'node:test';
import assert from 'node:assert/strict';
import { chapter as merewood } from '../src/content/merewood';
import { chapter as foundry } from '../src/content/foundry';
import { chapter as coast } from '../src/content/coast';
import { cleanName } from '../src/content/personas';
import { normalizeProgress, recordDiscovery, switchWorld } from '../src/lib/progress';
import { levelEncounter } from '../src/lib/difficulty';
import { validateAnswer } from '../src/lib/challenges';

test('switching worlds and round-tripping a save preserves personal history and independent progress', () => {
  let p = normalizeProgress({
    done: ['bridge'],
    profile: { name: 'Mira', persona: 'arcanist-female' },
    skill: 'stretch',
  });
  assert.equal(p.history.length, 1);
  p = switchWorld(p, foundry.id);
  assert.deepEqual(p.done, []);
  p = recordDiscovery(p, 'copper-lift', foundry);
  assert.equal(p.levels['copper-lift'], 'stretch');
  p = switchWorld(p, merewood.id);
  assert.deepEqual(p.done, ['bridge']);
  p = normalizeProgress(JSON.parse(JSON.stringify(p)));
  assert.equal(p.profile.name, 'Mira');
  assert.equal(p.history.length, 2);
  p = switchWorld(p, foundry.id);
  assert.deepEqual(p.done, ['copper-lift']);
  assert.equal(p.levels['copper-lift'], 'stretch');
  assert.equal(switchWorld(p, 'astral-vault'), p);
});
test('imports cannot forge unknown worlds, personas, skipped discoveries, or unbounded practice totals', () => {
  const p = normalizeProgress({
    worldId: 'invented',
    done: ['guardian'],
    profile: { name: 'x'.repeat(100), persona: 'invented' },
    practice: { attempts: 2, correct: 999 },
    history: [{ worldId: 'invented', encounterId: 'guardian' }],
  });
  assert.equal(p.worldId, merewood.id);
  assert.equal(p.profile.name.length, 24);
  assert.equal(p.profile.persona, 'ranger-female');
  assert.equal(p.practice.correct, 2);
  assert.deepEqual(p.done, []);
  assert.deepEqual(p.history, []);
  assert.equal(cleanName(' Élan O’Rin '), 'Élan ORin');
});
test('new chapter answers have verified solutions across all three levels', () => {
  for (const [chapter, answers] of [
    [
      foundry,
      [
        [7, 47, 17],
        [12, 56, 60],
        [14, 40, 9],
      ],
    ],
    [
      coast,
      [
        [2, 36, 68],
        [200, 75, 1250],
        [0.5, 5 / 6, 8],
      ],
    ],
  ] as const) {
    chapter.encounters.forEach((encounter, i) => {
      (['foundations', 'developing', 'stretch'] as const).forEach((level, j) => {
        const adjusted = levelEncounter(encounter, level);
        assert.equal(
          validateAnswer(adjusted.challenge, { value: String(answers[i][j]) }),
          true,
          `${chapter.id} ${encounter.id} ${level}`,
        );
        assert.equal(validateAnswer(adjusted.challenge, { value: '999999' }), false);
      });
    });
  }
});
test('original encounters scale without changing earlier recorded discoveries', () => {
  assert.equal(
    validateAnswer(levelEncounter(merewood.encounters[0], 'stretch').challenge, {
      selected: [15, 21, 27],
    }),
    true,
  );
  assert.equal(
    validateAnswer(levelEncounter(merewood.encounters[1], 'developing').challenge, { fill: 5 }),
    true,
  );
  assert.equal(
    validateAnswer(levelEncounter(merewood.encounters[2], 'stretch').challenge, {
      route: 'pulse',
      value: '14',
    }),
    true,
  );
});
