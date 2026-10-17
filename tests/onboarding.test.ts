import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Preferences from '../src/components/preferences';
import { ProgressProvider } from '../src/components/use-progress';
import { normalizeProgress } from '../src/lib/progress';

function renderPreferences(section: 'all' | 'skill' | 'experience') {
  return renderToStaticMarkup(
    createElement(ProgressProvider, {
      children: createElement(Preferences, {
        progress: normalizeProgress({}),
        onChange: () => {},
        section,
      }),
    }),
  );
}

test('the math setup step contains only skill choices', () => {
  const html = renderPreferences('skill');
  for (const label of ['Math skill level', 'Foundations', 'Growing fluency', 'Further challenges'])
    assert.ok(html.includes(label));
  for (const label of [
    'Storytelling',
    'Accessibility',
    'Appearance',
    'Visual guidance',
    'Keyboard controls',
  ])
    assert.ok(!html.includes(label));
});

test('the experience setup step contains storytelling and accessibility without appearance, math or keyboard reference', () => {
  const html = renderPreferences('experience');
  for (const label of [
    'Storytelling',
    'Accessibility',
    'Text size',
    'Read-aloud controls',
    'Visual guidance',
  ])
    assert.ok(html.includes(label));
  for (const label of ['Appearance', 'Math skill level', 'Keyboard controls'])
    assert.ok(!html.includes(label));
});

test('full Settings retains all preference groups and keyboard instructions', () => {
  const html = renderPreferences('all');
  for (const label of [
    'Math skill level',
    'Storytelling',
    'Accessibility',
    'Appearance',
    'Keyboard controls',
  ])
    assert.ok(html.includes(label));
});
