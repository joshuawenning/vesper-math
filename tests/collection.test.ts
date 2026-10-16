import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { trainingArt, libraryArt } from '../src/content/training-art';
import TutorChat from '../src/components/tutor/tutor-chat';
import TrainingLibrary from '../src/components/training/training-library';
import { treasureArt } from '../src/content/treasures';
import { worlds, loadChapter } from '../src/content/worlds';
import { levelEncounter } from '../src/lib/difficulty';
import CollectibleCard from '../src/components/journal/collectible-card';
import { initialProgress, normalizeProgress, freshJourney } from '../src/lib/progress';

test('each earned item has its own shipped illustration and an accessible story disclosure', async () => {
  const paths = new Set<string>();
  for (const world of worlds) {
    const chapter = await loadChapter(world.id);
    for (const original of chapter.encounters) {
      const src = treasureArt[original.id];
      assert.ok(src);
      paths.add(src);
      assert.ok(existsSync(new URL(`../public${src}`, import.meta.url)));
      const html = renderToStaticMarkup(
        createElement(CollectibleCard, {
          encounter: levelEncounter(original, 'developing'),
          level: 'developing',
          fullPractice: true,
        }),
      );
      assert.ok(html.includes('<details'));
      assert.ok(html.includes('<summary'));
      assert.ok(html.includes('Open its story'));
      assert.ok(html.includes('Find your footing'));
      assert.ok(html.includes('Carry the idea further'));
    }
  }
  assert.equal(paths.size, 21);
});

test('legacy item cards describe only the original completed challenge', async () => {
  const chapter = await loadChapter(worlds[0].id);
  const html = renderToStaticMarkup(
    createElement(CollectibleCard, { encounter: chapter.encounters[0], level: 'foundations' }),
  );
  assert.ok(!html.includes('Find your footing'));
  assert.ok(!html.includes('Carry the idea further'));
  assert.ok(html.includes('12 feet'));
});

test('Resolve starts and resets at seven while existing balances are retained', () => {
  assert.equal(initialProgress.resolve, 7);
  assert.equal(normalizeProgress({}).resolve, 7);
  assert.equal(normalizeProgress({ resolve: 14 }).resolve, 14);
  assert.equal(freshJourney().resolve, 7);
});

test('all four new Elian locations ship their own artwork', () => {
  const assets = [...Object.values(trainingArt), libraryArt];
  assert.equal(new Set(assets.map((a) => a.src)).size, 4);
  for (const asset of assets)
    assert.ok(existsSync(new URL(`../public${asset.src}`, import.meta.url)), asset.src);
});

test('concept shelves live in the library and chat has no inspiration dropdown', () => {
  const progress = normalizeProgress({});
  const library = renderToStaticMarkup(
    createElement(TrainingLibrary, { progress, onChat: () => {} }),
  );
  for (const name of [
    'The four operations',
    'Parts of a whole',
    'Measures &amp; distances',
    'Parts out of a hundred',
    'Shapes &amp; spaces',
    'The unknown number',
  ])
    assert.ok(library.includes(name));
  const chat = renderToStaticMarkup(createElement(TutorChat, { progress, onChange: () => {} }));
  assert.ok(!chat.includes('<select'));
  assert.ok(!chat.includes('A little inspiration'));
  assert.ok(chat.includes('Message Elian'));
});
