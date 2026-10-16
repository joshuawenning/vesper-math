import type {
  Chapter,
  ChapterStatus,
  Ending,
  Journey,
  JourneyRecord,
  Progress,
  SkillLevel,
  StoryLearning,
} from './types';
import { firstWorldId, getWorld, worlds } from '@/content/worlds';
import { emptyTraining, normalizeTraining } from './training';
import { cleanName, defaultPersona, personas } from '@/content/personas';
export const SAVE_KEY = 'vesper-save-v1';
export const emptyJourney = (): Journey => ({ done: [], started: false, ending: null, levels: {} });
export const initialProgress: Progress = {
  ...emptyJourney(),
  resolve: 10,
  training: emptyTraining(),
  study: {},
  theme: 'system',
  textSize: 'standard',
  speech: { enabled: false, voice: '', rate: 1 },
  reading: 'rich',
  support: 'guided',
  skill: 'foundations',
  profile: { name: '', persona: defaultPersona },
  worldId: firstWorldId,
  journeys: {},
  history: [],
  practice: { attempts: 0, correct: 0 },
};
export function cleanLevel(value: unknown): SkillLevel {
  return value === 'developing' || value === 'stretch' ? value : 'foundations';
}
const object = (value: unknown): Record<string, unknown> =>
  value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
function normalizeJourney(value: unknown, ids: readonly string[]): Journey {
  const raw = object(value),
    input = Array.isArray(raw.done) ? raw.done : [],
    done: string[] = [];
  for (const id of ids) {
    if (!input.includes(id)) break;
    done.push(id);
  }
  const levels = object(raw.levels);
  return {
    done,
    started: raw.started === true || done.length > 0,
    ending: done.length === ids.length ? (raw.ending === 'refuge' ? 'refuge' : 'beacon') : null,
    levels: Object.fromEntries(done.map((id) => [id, cleanLevel(levels[id])])),
  };
}
export function normalizeProgress(value: unknown, _legacyChapter?: Chapter): Progress {
  const raw = object(value),
    speech = object(raw.speech),
    profile = object(raw.profile),
    practice = object(raw.practice);
  const worldId = getWorld(typeof raw.worldId === 'string' ? raw.worldId : '')?.playable
    ? String(raw.worldId)
    : firstWorldId;
  const world = getWorld(worldId)!;
  const journeys: Record<string, Journey> = {};
  const stored = object(raw.journeys);
  for (const item of worlds.filter((w) => w.playable))
    journeys[item.id] = normalizeJourney(stored[item.id], item.encounters);
  const journey = normalizeJourney(raw, world.encounters);
  journeys[worldId] = journey;
  const history: JourneyRecord[] = [];
  const records = Array.isArray(raw.history) ? raw.history.slice(-128) : [];
  for (const candidate of records) {
    const entry = object(candidate),
      region = getWorld(String(entry.worldId));
    if (
      !region?.playable ||
      typeof entry.encounterId !== 'string' ||
      !(region.encounters as readonly string[]).includes(entry.encounterId)
    )
      continue;
    if (
      !journeys[region.id]?.done.includes(entry.encounterId) ||
      history.some((r) => r.worldId === region.id && r.encounterId === entry.encounterId)
    )
      continue;
    history.push({
      worldId: region.id,
      encounterId: entry.encounterId,
      level: cleanLevel(entry.level),
      at:
        typeof entry.at === 'number' &&
        Number.isFinite(entry.at) &&
        entry.at > 0 &&
        entry.at <= Date.now() + 60000
          ? entry.at
          : null,
    });
  }
  for (const [id, saved] of Object.entries(journeys))
    for (const encounterId of saved.done) {
      if (!history.some((r) => r.worldId === id && r.encounterId === encounterId))
        history.push({
          worldId: id,
          encounterId,
          level: saved.levels[encounterId] ?? 'foundations',
          at: null,
        });
    }
  const attempts =
    typeof practice.attempts === 'number' && Number.isSafeInteger(practice.attempts)
      ? Math.max(0, Math.min(1e6, practice.attempts))
      : 0;
  const correct =
    typeof practice.correct === 'number' && Number.isSafeInteger(practice.correct)
      ? Math.max(0, Math.min(attempts, practice.correct))
      : 0;
  const study: Record<string, StoryLearning> = {};
  const savedStudy = object(raw.study);
  for (const region of worlds) {
    for (const encounterId of region.encounters) {
      const key = `${region.id}:${encounterId}`;
      const entry = object(savedStudy[key]);
      if (!Object.keys(entry).length) continue;
      const completed =
        typeof entry.completed === 'number' && Number.isInteger(entry.completed)
          ? Math.max(0, Math.min(3, entry.completed))
          : 0;
      study[key] = {
        level: cleanLevel(entry.level),
        completed,
        reviewing:
          completed > 0 &&
          (entry.reviewing === true ||
            (completed === 3 && !journeys[region.id]?.done.includes(encounterId))),
        attempted: Array.isArray(entry.attempted)
          ? entry.attempted
              .filter((a): a is string => typeof a === 'string' && a.length <= 240)
              .slice(0, 32)
          : [],
        recovered: entry.recovered === true,
      };
    }
  }
  return {
    ...journey,
    training: normalizeTraining(raw.training),
    resolve:
      typeof raw.resolve === 'number' && Number.isInteger(raw.resolve)
        ? Math.max(0, Math.min(20, raw.resolve))
        : 10,
    study,
    worldId,
    journeys,
    history: history.slice(-128),
    theme: raw.theme === 'light' || raw.theme === 'dark' ? raw.theme : 'system',
    textSize: raw.textSize === 'large' ? 'large' : 'standard',
    speech: {
      enabled: speech.enabled === true,
      voice: typeof speech.voice === 'string' ? speech.voice.slice(0, 256) : '',
      rate: speech.rate === 0.8 || speech.rate === 1.15 ? speech.rate : 1,
    },
    reading: raw.reading === 'plain' ? 'plain' : 'rich',
    support: raw.support === 'light' ? 'light' : 'guided',
    skill: cleanLevel(raw.skill),
    profile: {
      name: cleanName(profile.name),
      persona: personas.find((p) => p.id === profile.persona)?.id ?? defaultPersona,
    },
    practice: { attempts, correct },
  };
}
export function switchWorld(progress: Progress, id: string): Progress {
  if (!getWorld(id)?.playable || id === progress.worldId) return progress;
  const journeys = {
    ...progress.journeys,
    [progress.worldId]: {
      done: progress.done,
      started: progress.started,
      ending: progress.ending,
      levels: progress.levels,
    },
  };
  return { ...progress, ...(journeys[id] ?? emptyJourney()), journeys, worldId: id };
}
export function restartCurrentJourney(progress: Progress): Progress {
  return {
    ...progress,
    ...emptyJourney(),
    resolve: initialProgress.resolve,
    study: Object.fromEntries(
      Object.entries(progress.study).filter(([key]) => !key.startsWith(`${progress.worldId}:`)),
    ),
    history: progress.history.filter((record) => record.worldId !== progress.worldId),
    journeys: { ...progress.journeys, [progress.worldId]: emptyJourney() },
  };
}
export function recordDiscovery(progress: Progress, id: string, chapter: Chapter): Progress {
  if (
    chapter.id !== progress.worldId ||
    progress.done.includes(id) ||
    chapter.encounters.find((e) => !progress.done.includes(e.id))?.id !== id
  )
    return progress;
  return {
    ...progress,
    done: [...progress.done, id],
    ending: progress.done.length + 1 === chapter.encounters.length ? 'beacon' : null,
    levels: {
      ...progress.levels,
      [id]: progress.study[`${chapter.id}:${id}`]?.level ?? progress.skill,
    },
    history: [
      ...progress.history,
      {
        worldId: chapter.id,
        encounterId: id,
        level: progress.study[`${chapter.id}:${id}`]?.level ?? progress.skill,
        at: Date.now(),
      },
    ].slice(-128),
  };
}
export function encounterStatus(id: string, progress: Progress, chapter: Chapter): ChapterStatus {
  if (progress.done.includes(id)) return 'done';
  return chapter.encounters.find((e) => !progress.done.includes(e.id))?.id === id
    ? 'current'
    : 'locked';
}
export function endingText(ending: Ending | null, chapter?: Chapter): string {
  if (chapter?.completion)
    return (
      chapter.completion.choices.find((c) => c.id === ending)?.result ??
      chapter.completion.choices[0].result
    );
  return ending !== 'refuge'
    ? 'The observatory shines again. Far beyond the mere, a traveler sees your beacon and finds the way home.'
    : 'The light burns low and warm. Beneath its dome, the observatory becomes a refuge for every traveler who needs one.';
}
