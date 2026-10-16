import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import EncounterPanel from '../src/components/encounters/encounter-panel';
import { worlds, loadChapter } from '../src/content/worlds';
import { normalizeProgress } from '../src/lib/progress';
import { levelEncounter } from '../src/lib/difficulty';
import { storySteps } from '../src/content/story-lessons';

const escapeText = (text: string) =>
  renderToStaticMarkup(createElement('span', null, text)).slice(6, -7);

test('each story displays its opening once and only the active challenge at all skill levels', async () => {
  for (const world of worlds) {
    const chapter = await loadChapter(world.id);
    for (const original of chapter.encounters) {
      for (const level of ['foundations', 'developing', 'stretch'] as const) {
        const encounter = levelEncounter(original, level);
        // Difficulty adjusts challenges, never replaces the story with a numerical prompt.
        assert.equal(encounter.rich, original.rich);
        assert.equal(encounter.plain, original.plain);
        const steps = storySteps(encounter, level);
        for (const reading of ['rich', 'plain'] as const) {
          for (let index = 0; index < 3; index++) {
            const progress = normalizeProgress({
              worldId: world.id,
              skill: level,
              reading,
              study: {
                [`${world.id}:${original.id}`]: { level, completed: index, reviewing: false },
              },
            });
            const html = renderToStaticMarkup(
              createElement(EncounterPanel, {
                encounter,
                progress,
                onStudy: () => {},
                onTrain: () => {},
              }),
            );
            assert.equal(
              html.includes(escapeText(encounter[reading])),
              index === 0,
              `${original.id} ${level} ${reading} step ${index}`,
            );
            for (const [i, step] of steps.entries()) {
              if (step.challenge.kind !== 'number') continue;
              const question = escapeText(step.challenge.question);
              assert.equal(
                html.includes(question),
                i === index,
                `${original.id} numerical prompt ${i} on step ${index}`,
              );
              if (i === index) assert.equal(html.split(question).length - 1, 1);
            }
          }
        }
      }
    }
  }
});

test('the 63-foot crossing instructions appear only on its timber challenge', async () => {
  const chapter = await loadChapter(worlds[0].id);
  const encounter = levelEncounter(chapter.encounters[0], 'stretch');
  for (let index = 0; index < 3; index++) {
    const progress = normalizeProgress({
      worldId: chapter.id,
      skill: 'stretch',
      study: { [`${chapter.id}:bridge`]: { level: 'stretch', completed: index } },
    });
    const html = renderToStaticMarkup(
      createElement(EncounterPanel, { encounter, progress, onStudy: () => {}, onTrain: () => {} }),
    );
    const text = html.replace(/<!--.*?-->/g, '').replace(/<[^>]+>/g, ' ');
    assert.equal(text.includes('The crossing has a 63-foot gap.'), index === 1);
  }
});
