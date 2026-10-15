import test from 'node:test';
import { existsSync } from 'node:fs';
import assert from 'node:assert/strict';
import { nextPlayableWorld, worlds, loadChapter } from '../src/content/worlds';
import { chapter as merewood } from '../src/content/merewood';
import { chapter as foundry } from '../src/content/foundry';
import { chapter as coast } from '../src/content/coast';
import { chapter as desert } from '../src/content/glass-desert';
import { chapter as winter } from '../src/content/winter-archive';
import { chapter as astral } from '../src/content/astral-vault';
import { cleanName } from '../src/content/personas';
import { normalizeProgress, recordDiscovery, switchWorld } from '../src/lib/progress';
import { levelEncounter } from '../src/lib/difficulty';
import { validateAnswer } from '../src/lib/challenges';

test('switching worlds and round-tripping a save preserves personal history and independent progress', () => {
  let p = normalizeProgress({
    done: ['bridge'],
    profile: { name: 'Mira', persona: 'arcanist-female' },
    skill: 'stretch',
    theme: 'light',
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
  assert.equal(p.theme, 'light');
  assert.equal(p.history.length, 2);
  p = switchWorld(p, foundry.id);
  assert.deepEqual(p.done, ['copper-lift']);
  assert.equal(p.levels['copper-lift'], 'stretch');
  assert.equal(switchWorld(p, 'invented'), p);
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
  assert.equal(p.theme, 'dark');
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
    [
      desert,
      [
        [3, 3 / 4, 1.75],
        [4, 48, 39],
        [6, 20, 70],
      ],
    ],
    [
      winter,
      [
        [20, 35, 5],
        [5, 21, 45],
        [12, 7, 6],
      ],
    ],
    [
      astral,
      [
        [12, 9, 4.25],
        [20, 20, 42],
        [12, 25, 9],
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

test('chapter continuation traverses all six worlds and ends at the Astral Vault', () => {
  assert.equal(nextPlayableWorld(merewood.id)?.id, foundry.id);
  assert.equal(nextPlayableWorld(foundry.id)?.id, coast.id);
  assert.equal(nextPlayableWorld(coast.id)?.id, desert.id);
  assert.equal(nextPlayableWorld(desert.id)?.id, winter.id);
  assert.equal(nextPlayableWorld(winter.id)?.id, astral.id);
  assert.equal(nextPlayableWorld(astral.id), undefined);
  assert.equal(nextPlayableWorld('invented'), undefined);
  let p = normalizeProgress({ done: ['bridge', 'cistern', 'guardian'], ending: 'beacon' });
  p = switchWorld(p, nextPlayableWorld(merewood.id)!.id);
  assert.equal(p.worldId, foundry.id);
  assert.equal(p.journeys[merewood.id].ending, 'beacon');
  assert.deepEqual(p.done, []);
});

test('all eighteen discoveries have distinct shipped story art, separate from world landscapes', () => {
  const chapters = [merewood, foundry, coast, desert, winter, astral];
  const art = chapters.flatMap((chapter) =>
    chapter.encounters.map((encounter) => encounter.artwork.src),
  );
  assert.equal(new Set(art).size, 18);
  for (const src of art) {
    assert.ok(existsSync(new URL(`../public${src}`, import.meta.url)), src);
    assert.ok(!chapters.some((chapter) => chapter.scene?.src === src));
  }
});

test('world registry, lazy chapter data, and saved discoveries remain aligned throughout the campaign', async () => {
  let p = normalizeProgress({ done: ['bridge'], profile: { name: 'Mira' } });
  for (const world of worlds) {
    const chapter = await loadChapter(world.id);
    assert.deepEqual(
      chapter.encounters.map((e) => e.id),
      [...world.encounters],
    );
    assert.equal(chapter.number ?? 1, world.number);
    if (chapter.scene) assert.equal(chapter.scene.src, world.image);
    assert.ok(existsSync(new URL(`../public${world.image}`, import.meta.url)));
    assert.equal(chapter.completion?.choices.length ?? 2, 2);
    p = switchWorld(p, world.id);
    for (const e of chapter.encounters) p = recordDiscovery(p, e.id, chapter);
    p = { ...p, ending: 'beacon' };
    p = normalizeProgress(JSON.parse(JSON.stringify(p)));
  }
  assert.equal(p.history.length, 18);
  assert.equal(p.profile.name, 'Mira');
  for (const world of worlds) {
    p = switchWorld(p, world.id);
    assert.equal(p.ending, 'beacon');
    assert.deepEqual(p.done, [...world.encounters]);
  }
});
