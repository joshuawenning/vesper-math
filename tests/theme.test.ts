import test from 'node:test';
import assert from 'node:assert/strict';
import { initialProgress, normalizeProgress } from '../src/lib/progress';
import { observeAppearance, resolveTheme } from '../src/lib/theme';

test('appearance defaults to system and preserves explicit saved overrides', () => {
  assert.equal(initialProgress.theme, 'system');
  for (const theme of [undefined, 'system', 'invalid']) {
    assert.equal(normalizeProgress({ theme }).theme, 'system');
  }
  for (const theme of ['dark', 'light']) {
    assert.equal(normalizeProgress({ theme }).theme, theme);
    assert.equal(resolveTheme(theme as 'dark' | 'light', true), theme);
    assert.equal(resolveTheme(theme as 'dark' | 'light', false), theme);
  }
  assert.equal(resolveTheme('system', true), 'dark');
  assert.equal(resolveTheme('system', false), 'light');
});

test('system appearance follows live changes and releases its listener', () => {
  let listener: (() => void) | undefined;
  const media = {
    matches: false,
    addEventListener: (_event: string, callback: () => void) => {
      listener = callback;
    },
    removeEventListener: (_event: string, callback: () => void) => {
      assert.equal(callback, listener);
      listener = undefined;
    },
  };
  const applied: string[] = [];
  const stop = observeAppearance('system', media as unknown as MediaQueryList, (theme) =>
    applied.push(theme),
  );
  assert.deepEqual(applied, ['light']);
  media.matches = true;
  listener!();
  assert.deepEqual(applied, ['light', 'dark']);
  stop!();
  assert.equal(listener, undefined);
  observeAppearance('light', media as unknown as MediaQueryList, (theme) => applied.push(theme));
  assert.equal(applied.at(-1), 'light');
  assert.equal(listener, undefined);
});
