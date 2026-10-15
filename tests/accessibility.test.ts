import test from 'node:test';
import { worldAtmospheres } from '../src/content/atmospheres';
import { worlds } from '../src/content/worlds';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/app/globals.css', import.meta.url), 'utf8');
function rgb(hex: string) {
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
}
function luminance(color: number[]) {
  return color
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
}
function contrast(a: number[], b: number[]) {
  const [lo, hi] = [luminance(a), luminance(b)].sort((x, y) => x - y);
  return (hi + 0.05) / (lo + 0.05);
}
test('both theme palettes meet 4.5:1 for supporting text and accents on their surfaces', () => {
  for (const [mode, selector] of [
    ['dark', ':root'],
    ['light', ":root[data-theme='light']"],
  ]) {
    const block = css.slice(css.indexOf(selector + ' {')).split('}')[0];
    const palette = Object.fromEntries(
      Array.from(block.matchAll(/--([\w-]+): #([a-f0-9]{6,8});/g), (m) => [m[1], m[2]]),
    );
    for (const surface of ['canvas', 'surface', 'surface-hover']) {
      const base = rgb(palette.canvas);
      const hex = palette[surface];
      const alpha = hex.length === 8 ? parseInt(hex.slice(6), 16) / 255 : 1;
      const background = rgb(hex).map((v, i) => v * alpha + base[i] * (1 - alpha));
      for (const foreground of ['foreground', 'subtle', 'accent'])
        assert.ok(
          contrast(rgb(palette[foreground]), background) >= 4.5,
          `${mode}: ${foreground} on ${surface}`,
        );
    }
  }
});

function overlay(base: number[], hex: string) {
  const value = hex.replace('#', '');
  const alpha = value.length === 8 ? parseInt(value.slice(6), 16) / 255 : 1;
  return rgb(value).map((v, i) => v * alpha + base[i] * (1 - alpha));
}
test('each world has paper palettes that retain readable text in both modes', () => {
  assert.deepEqual(Object.keys(worldAtmospheres).sort(), worlds.map((w) => w.id).sort());
  for (const [world, themes] of Object.entries(worldAtmospheres)) {
    for (const mode of ['dark', 'light'] as const) {
      const selector = mode === 'dark' ? ':root' : ":root[data-theme='light']";
      const block = css.slice(css.indexOf(selector + ' {')).split('}')[0];
      const palette = Object.fromEntries(
        Array.from(block.matchAll(/--([\w-]+): #([a-f0-9]{6,8});/g), (m) => [m[1], m[2]]),
      );
      const paper = themes[mode];
      const canvas = rgb(paper.canvas.slice(1));
      // Include the strongest wash combination as well as the unwashed paper.
      for (const base of [canvas, overlay(overlay(canvas, paper.glow), paper.undertone)]) {
        for (const surface of [
          base,
          overlay(base, palette.surface),
          overlay(base, palette['surface-hover']),
        ]) {
          for (const text of ['foreground', 'subtle', 'accent']) {
            assert.ok(contrast(rgb(palette[text]), surface) >= 4.5, `${world}, ${mode}: ${text}`);
          }
        }
      }
    }
  }
});
