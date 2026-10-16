import type { Chapter } from '@/lib/types';

export const chapter: Chapter = {
  id: 'flooded-observatory',
  title: 'The Flooded Observatory',
  region: 'The Merewood',
  intro: {
    rich: 'Beyond the willow trees, an abandoned observatory keeps its vigil over the mere. Tonight, for the first time in a hundred years, a light burns within.',
    plain:
      'An old observatory stands across the water. A light shines inside. Your companion, Elian, thinks someone is calling for help.',
  },
  encounters: [
    {
      id: 'bridge',
      title: 'The broken crossing',
      skill: 'Addition · measurement',
      subtitle: 'Make a way across the water',
      reward: 'Wayfarer’s clasp',
      icon: 'bridge',
      rich: 'The river has carried away the bridge’s wooden span. Elian kneels beside the old supports and unrolls her measuring cord. Before you build, she helps you test the spare timbers.',
      plain:
        'The bridge is broken. Elian helps you measure some spare planks before you choose wood for the crossing.',
      hint: [
        'Choose three lengths. Their total needs to be 12 feet.',
        'Try starting with the 5-foot plank. You need two more that total 7.',
        '3 + 4 + 5 = 12. Select those three planks.',
      ],
      lesson: 'Lengths in the same unit can be added: 3 ft + 4 ft + 5 ft = 12 ft.',
      discovery:
        'Your timbers settle into the ancient supports. Beyond the crossing, the observatory door stands open.',
      artwork: {
        src: '/art/bridge-painterly.webp',
        alt: 'A broken mossy crossing over teal water, with oak planks and measuring tools on the bank.',
      },
      challenge: {
        kind: 'sum',
        planks: [2, 3, 4, 5, 6],
        count: 3,
        target: 12,
        unit: 'feet',
      },
    },
    {
      id: 'cistern',
      title: 'A measure of moonlight',
      skill: 'Fractions · equivalence',
      subtitle: 'Wake the sleeping mechanism',
      reward: 'Moonwater vial',
      icon: 'moon',
      rich: 'Silver water gathers in a stone cistern beneath the sleeping brass rings. Elian sets a small bowl beside it. “Let us understand the measure before we wake the heavens.”',
      plain:
        'A stone tank holds silver water. Practice measuring equal parts with Elian before you fill the tank.',
      hint: [
        'Each measure fills one of four equal parts.',
        'Start at ¼ and count up to ¾. How many quarter-measures did you add?',
        'Add two quarter-measures: ¼ + ¼ + ¼ = ¾. The added amount is ²⁄₄, or ½.',
      ],
      lesson: '¾ − ¼ = ²⁄₄ = ½. Two of four equal parts make one half.',
      discovery:
        'The water catches the moon. Brass rings begin to turn overhead, and a sealed stairway opens beneath your feet.',
      artwork: {
        src: '/art/cistern-painterly.webp',
        alt: 'A moonlit stone cistern, a brass pitcher, and the observatory’s ancient celestial mechanism.',
      },
      challenge: {
        kind: 'fraction',
        start: 1,
        target: 3,
        denominator: 4,
      },
    },
    {
      id: 'guardian',
      title: 'The keeper of the stars',
      skill: 'Division · equal groups',
      subtitle: 'Quiet an ancient guardian',
      reward: 'The lost star chart',
      icon: 'owl',
      rich: 'A stone owl unfolds its wings above the chart chamber. Sparks bind it to an old command. Elian gathers a few wandering lights so you can practice sharing their magic.',
      plain:
        'A stone owl guards the star chart. Elian helps you practice making equal groups before you calm its magic.',
      hint: [
        'Division splits a total into equal groups. Nothing should be left over.',
        'For three pulses, ask: 3 × what = 18? For six crystals, ask: 6 × what = 18?',
        'Each of three pulses carries 6 sparks. Each of six crystals holds 3 sparks.',
      ],
      lesson: '18 ÷ 3 = 6 and 18 ÷ 6 = 3. Multiplication checks an equal division.',
      discovery:
        'The last spark settles into silence. The owl bows its weathered head. Behind it, a map of forgotten constellations unfurls.',
      artwork: {
        src: '/art/guardian-painterly.webp',
        alt: 'A stone owl unfolds its wings over an ancient star chart, surrounded by magical sparks.',
      },
      challenge: {
        kind: 'division',
        total: 18,
        routes: [
          {
            id: 'pulse',
            label: 'Cast 3 equal pulses',
            groups: 3,
            action: 'Cast the spell',
            question: 'How many sparks in each pulse?',
          },
          {
            id: 'crystal',
            label: 'Use 6 grounding crystals',
            groups: 6,
            action: 'Ground the ward',
            question: 'How many sparks in each crystal?',
          },
        ],
      },
    },
  ],
};
