import type { Artwork } from '@/lib/types';

export const artwork = {
  merewoodArrival: {
    src: '/art/merewood-arrival-painterly.webp',
    alt: 'A watercolor of a russet-cloaked wayfarer holding a lantern beneath a willow, looking toward a distant light across the Merewood marsh.',
  },
  elianMathLevel: {
    src: '/art/elian-math-level-painterly.webp',
    alt: 'Elian arranges counting stones on a low table in a quiet cloister garden, beside a measuring rod and slate.',
    portrait: true,
  },
  elianExperience: {
    src: '/art/elian-experience-painterly.webp',
    alt: 'Elian reads from an open book to a listening elf traveler in a lamplit library alcove, with reading spectacles on the table.',
    portrait: true,
  },
  elianPathForward: {
    src: '/art/elian-path-forward-painterly.webp',
    alt: 'Elian holds a folded map and gestures toward a misty woodland path, guiding a fellow traveler in an ochre cloak.',
    portrait: true,
  },
  elianWaystation: {
    src: '/art/elian-waystation-painterly.webp',
    alt: 'Elian studies her map at a quiet wayside shelter, with a heron by the water and a brass lantern at her feet.',
  },
  observatory: {
    src: '/art/observatory-painterly.webp',
    alt: 'A moonlit, hand-illustrated observatory above a flooded woodland, with a stone crossing, a silver cistern, and an owl guardian.',
  },
  elian: {
    src: '/art/elian-painterly.webp',
    alt: 'A loose watercolor portrait of Elian in a faded teal cloak, resting a hand on her map beside a misty lake.',
    portrait: true,
  },
  journal: {
    src: '/art/journal-painterly.webp',
    alt: 'A candlelit wayfarer’s journal with a compass, moonwater vial, quill, and maps.',
  },
  preferences: {
    src: '/art/preferences-painterly.webp',
    alt: 'A quiet outfitting alcove with a teal traveling cloak, a brass lantern, spectacles, lenses, and carefully arranged traveling tools.',
  },
} satisfies Record<string, Artwork>;
