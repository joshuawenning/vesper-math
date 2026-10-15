import type { Artwork } from '@/lib/types';

export const artwork = {
  observatory: {
    src: '/art/observatory-illustrated.webp',
    alt: 'A moonlit, hand-illustrated observatory above a flooded woodland, with a stone crossing, a silver cistern, and an owl guardian.',
  },
  elian: {
    src: '/art/elian-illustrated.webp',
    alt: 'Elian, a thoughtful woman with wavy chestnut hair, a teal cloak, a compass, and a star chart.',
    portrait: true,
  },
  journal: {
    src: '/art/journal-illustrated.webp',
    alt: 'A candlelit wayfarer’s journal with a compass, moonwater vial, quill, and maps.',
  },
  preferences: {
    src: '/art/preferences-illustrated.webp',
    alt: 'A quiet outfitting alcove with a teal traveling cloak, a brass lantern, spectacles, lenses, and carefully arranged traveling tools.',
  },
} satisfies Record<string, Artwork>;
