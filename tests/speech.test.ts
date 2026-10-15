import test from 'node:test';
import assert from 'node:assert/strict';
import { spokenMath } from '../src/lib/speech';
import { normalizeProgress } from '../src/lib/progress';

test('speech makes fractions and mathematical symbols speakable without evaluating text', () => {
  assert.equal(spokenMath('3/4 − 1/4 = ½'), '3 over 4 minus 1 over 4 equals one half');
  assert.equal(spokenMath('25% × 80 ÷ 100 + 2'), '25 percent times 80 divided by 100 plus 2');
  assert.equal(spokenMath('8 - 3'), '8 minus 3');
  assert.equal(spokenMath('a'.repeat(7000)).length, 6000);
});
test('old and imported saves safely default accessibility settings', () => {
  assert.deepEqual(normalizeProgress({}).speech, { enabled: false, voice: '', rate: 1 });
  const save = normalizeProgress({
    textSize: 'large',
    speech: { enabled: true, voice: 'a'.repeat(1000), rate: 99 },
  });
  assert.equal(save.textSize, 'large');
  assert.equal(save.speech.rate, 1);
  assert.equal(save.speech.voice.length, 256);
  assert.equal(normalizeProgress(JSON.parse(JSON.stringify(save))).speech.enabled, true);
});
