import type { Artwork, TrainingMode } from '@/lib/types';
export const trainingArt: Record<TrainingMode, Artwork> = {
  arithmetic: {
    src: '/art/elian-training-counting.webp',
    alt: 'Full-body illustration of Elian on a mossy bench, playfully arranging counting stones in a lantern-lit training courtyard.',
  },
  tables: {
    src: '/art/elian-training-tables.webp',
    alt: 'Full-body illustration of Elian conducting rows of floating brass orbs while a small winged lizard watches from an abacus.',
  },
  dice: {
    src: '/art/elian-training-dice.webp',
    alt: 'Full-body illustration of Elian tossing faceted gaming stones in a playful sidestep, with a curious crow beside the training circle.',
  },
};
