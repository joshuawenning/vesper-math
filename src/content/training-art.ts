import type { Artwork, TrainingMode } from '@/lib/types';
export const trainingArt: Record<TrainingMode, Artwork> = {
  arithmetic: {
    src: '/art/elian-counting-painterly.webp',
    alt: 'Elian shares counting stones with a halfling traveler on a wooden bridge in a fern-filled ravine.',
  },
  tables: {
    src: '/art/elian-tables-painterly.webp',
    alt: 'Elian and an elderly dwarf arrange mechanical moths in equal groups inside a clockmaker’s indigo pavilion.',
  },
  dice: {
    src: '/art/elian-dice-painterly.webp',
    alt: 'Elian and a quiet fox-headed traveler contemplate a die on a forest stump beneath a mushroom canopy.',
  },
};

export const libraryArt: Artwork = {
  src: '/art/elian-library-painterly.webp',
  alt: 'Elian shares an open book with a scholarly faun in a shadowy library, with another reader softly suggested beyond.',
};
