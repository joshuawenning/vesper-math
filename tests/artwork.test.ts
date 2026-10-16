import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, statSync } from 'node:fs';
import { join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { referencedArtwork } from './helpers/artwork-inventory';

test('shipped artwork exactly matches the active registries, without missing or obsolete files', async () => {
  const references = await referencedArtwork();
  const directory = fileURLToPath(new URL('../public/art/', import.meta.url));
  const files = readdirSync(directory, { recursive: true })
    .map(String)
    .filter((name) => statSync(join(directory, name)).isFile())
    .map((name) => `/art/${name.split(sep).join('/')}`);
  assert.deepEqual(
    files.sort(),
    [...references].sort(),
    'Every public artwork file must be registered, and every registered painting must ship.',
  );
});
