import type { Artwork, TrainingMode } from '@/lib/types';
export const trainingArt: Record<TrainingMode, Artwork> = {
  arithmetic: {
    src: '/art/elian-training-counting-v2.webp',
    alt: 'Elian shares counting stones with a halfling traveler on a wooden bridge in a fern-filled ravine.',
  },
  tables: {
    src: '/art/elian-training-tables-v2.webp',
    alt: 'Elian and an elderly dwarf arrange mechanical moths in equal groups inside a clockmaker’s indigo pavilion.',
  },
  dice: {
    src: '/art/elian-training-dice-v2.webp',
    alt: 'Elian plays a dice game with a fox-headed mage beneath a giant mushroom canopy.',
  },
};

export const libraryArt: Artwork = {
  src: '/art/elian-library.webp',
  alt: 'Elian shares a book with a scholarly faun in a mystic tree library, while an elf and magical creatures study nearby.',
};
