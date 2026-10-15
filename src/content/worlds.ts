import type { Chapter, SkillLevel } from '@/lib/types';

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
    title: 'The Merewood',
    chapter: 'The Flooded Observatory',
    number: 1,
    playable: true,
    image: '/art/observatory.webp',
    teaser: 'An old light stirs beyond the willows.',
    encounters: ['bridge', 'cistern', 'guardian'],
  },
  {
    id: 'ember-foundry',
    title: 'The Ember Peaks',
    chapter: 'The Sleeping Foundry',
    number: 2,
    playable: true,
    image: '/art/foundry.webp',
    teaser: 'Something beneath the mountain is waiting to turn again.',
    encounters: ['copper-lift', 'gearworks', 'forge-floor'],
  },
  {
    id: 'tideglass-coast',
    title: 'The Tideglass Coast',
    chapter: 'The Lanterns of Low Tide',
    number: 3,
    playable: true,
    image: '/art/coast.webp',
    teaser: 'The tide has drawn back from a path no map remembers.',
    encounters: ['harbor-trade', 'tidal-mark', 'lantern-garden'],
  },
  {
    id: 'glass-desert',
    title: 'The Glass Desert',
    chapter: 'Beyond the veil',
    number: 4,
    playable: false,
    image: null,
    teaser: 'A horizon that changes when you look away.',
    encounters: [],
  },
  {
    id: 'winter-archive',
    title: 'The Winter Archive',
    chapter: 'Beyond the veil',
    number: 5,
    playable: false,
    image: null,
    teaser: 'Behind the frost, a thousand quiet doors.',
    encounters: [],
  },
  {
    id: 'astral-vault',
    title: 'The Astral Vault',
    chapter: 'Beyond the veil',
    number: 6,
    playable: false,
    image: null,
    teaser: 'Some journeys begin where the stars disappear.',
    encounters: [],
  },
] as const;

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
    default:
      throw new Error('This world is still beyond the veil.');
  }
}
