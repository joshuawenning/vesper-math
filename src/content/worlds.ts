import type { Chapter, IconName, SkillLevel } from '@/lib/types';

export const skillLevels: { id: SkillLevel; label: string; description: string }[] = [
  {
    id: 'foundations',
    label: 'Foundations',
    description: 'Small numbers, equal groups, and familiar fractions.',
  },
  {
    id: 'developing',
    label: 'Growing fluency',
    description: 'Larger numbers, measurements, and fraction relationships.',
  },
  {
    id: 'stretch',
    label: 'Further challenges',
    description: 'Percentages, geometry, rational numbers, and early equations.',
  },
];
export const worlds = [
  {
    id: 'flooded-observatory',
    icon: 'leaf',
    title: 'The Merewood',
    chapter: 'The Flooded Observatory',
    number: 1,
    playable: true,
    image: '/art/observatory-painterly.webp',
    teaser: 'An old light stirs beyond the willows.',
    encounters: ['bridge', 'cistern', 'guardian'],
  },
  {
    id: 'ember-foundry',
    icon: 'flame',
    title: 'The Ember Peaks',
    chapter: 'The Sleeping Foundry',
    number: 2,
    playable: true,
    image: '/art/foundry-painterly.webp',
    teaser: 'Something beneath the mountain is waiting to turn again.',
    encounters: ['copper-lift', 'gearworks', 'forge-floor'],
  },
  {
    id: 'tideglass-coast',
    icon: 'waves',
    title: 'The Tideglass Coast',
    chapter: 'The Lanterns of Low Tide',
    number: 3,
    playable: true,
    image: '/art/coast-painterly.webp',
    teaser: 'The tide has drawn back from a path no map remembers.',
    encounters: ['harbor-trade', 'tidal-mark', 'lantern-garden'],
  },
  {
    id: 'glass-desert',
    icon: 'crystal',
    title: 'The Glass Desert',
    chapter: 'The Palace of Reflections',
    number: 4,
    playable: true,
    image: '/art/glass-desert-painterly.webp',
    teaser: 'A horizon that changes when you look away.',
    encounters: ['mirrors-well', 'scarab-caravan', 'prism-gate'],
  },
  {
    id: 'winter-archive',
    icon: 'snowflake',
    title: 'The Winter Archive',
    chapter: 'The Book of Borrowed Hours',
    number: 5,
    playable: true,
    image: '/art/winter-archive-painterly.webp',
    teaser: 'Behind the frost, a thousand quiet doors.',
    encounters: ['borrowed-hours', 'frostbound-index', 'door-of-thaw'],
  },
  {
    id: 'astral-vault',
    icon: 'orbit',
    title: 'The Astral Vault',
    chapter: 'The Unwritten Constellation',
    number: 6,
    playable: true,
    image: '/art/astral-vault-painterly.webp',
    teaser: 'Some journeys begin where the stars disappear.',
    encounters: ['starless-ferry', 'orrery-keeper', 'unwritten-star'],
  },
  {
    id: 'hollow-orchard',
    icon: 'orchard',
    title: 'The Hollow Orchard',
    chapter: 'The Orchard of Borrowed Names',
    number: 7,
    playable: true,
    image: '/art/hollow-orchard-painterly.webp',
    teaser: 'Some seeds remember what the stars have forgotten.',
    encounters: ['honey-debt', 'snails-bargain', 'remembering-seed'],
  },
] as const satisfies readonly {
  id: string;
  icon: IconName;
  title: string;
  chapter: string;
  number: number;
  playable: boolean;
  image: string | null;
  teaser: string;
  encounters: readonly string[];
}[];

export const firstWorldId = 'flooded-observatory';
export function getWorld(id: string) {
  return worlds.find((world) => world.id === id);
}
export async function loadChapter(id: string): Promise<Chapter> {
  switch (id) {
    case 'flooded-observatory':
      return (await import('./merewood')).chapter;
    case 'ember-foundry':
      return (await import('./foundry')).chapter;
    case 'tideglass-coast':
      return (await import('./coast')).chapter;
    case 'glass-desert':
      return (await import('./glass-desert')).chapter;
    case 'winter-archive':
      return (await import('./winter-archive')).chapter;
    case 'astral-vault':
      return (await import('./astral-vault')).chapter;
    case 'hollow-orchard':
      return (await import('./hollow-orchard')).chapter;
    default:
      throw new Error('This world could not be found.');
  }
}

export function nextPlayableWorld(id: string) {
  const playable = worlds.filter((world) => world.playable);
  const index = playable.findIndex((world) => world.id === id);
  return index < 0 ? undefined : playable[index + 1];
}
