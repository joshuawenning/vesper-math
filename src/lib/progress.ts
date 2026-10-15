import type { Chapter, ChapterStatus, Ending, Progress } from './types';
export const SAVE_KEY = 'vesper-save-v1';
export const initialProgress: Progress = {
  done: [],
  reading: 'rich',
  support: 'guided',
  started: false,
  ending: null,
};

export function normalizeProgress(value: unknown, chapter: Chapter): Progress {
  if (!value || typeof value !== 'object' || Array.isArray(value))
    return { ...initialProgress, done: [] };
  const raw = value as Record<string, unknown>;
  const ids = Array.isArray(raw.done) ? raw.done : [];
  const done: string[] = [];
  // A save can unlock only the contiguous path that was actually completed.
  for (const encounter of chapter.encounters) {
    if (!ids.includes(encounter.id)) break;
    done.push(encounter.id);
  }
  const ending: Ending | null =
    done.length === chapter.encounters.length &&
    (raw.ending === 'beacon' || raw.ending === 'refuge')
      ? raw.ending
      : null;
  return {
    done,
    reading: raw.reading === 'plain' ? 'plain' : 'rich',
    support: raw.support === 'light' ? 'light' : 'guided',
    started: raw.started === true || done.length > 0,
    ending,
  };
}
export function encounterStatus(id: string, progress: Progress, chapter: Chapter): ChapterStatus {
  if (progress.done.includes(id)) return 'done';
  return chapter.encounters.find((e) => !progress.done.includes(e.id))?.id === id
    ? 'current'
    : 'locked';
}
export function endingText(ending: Ending | null): string {
  return ending === 'beacon'
    ? 'The observatory shines again. Far beyond the mere, a traveler sees your beacon and finds the way home.'
    : 'The light burns low and warm. Beneath its dome, the observatory becomes a refuge for every traveler who needs one.';
}
