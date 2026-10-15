import type { Chapter } from '@/lib/types';

export const chapter: Chapter = {
  id: 'glass-desert',
  title: 'The Palace of Reflections',
  region: 'The Glass Desert',
  number: 4,
  heading: 'A thousand borrowed suns',
  scene: {
    src: '/art/glass-desert.webp',
    alt: 'Rose-colored glass dunes surround a ruined mirror palace, with a turquoise serpent winding through the sand.',
  },
  subtitle: 'Not every reflection tells the whole story.',
  intro: {
    rich: 'Beyond the last salt marsh, the dunes ring like crystal. A palace appears in every reflection but never quite ahead of you. At a shaded well, a keeper offers water—and a way through.',
    plain:
      'The desert dunes are made of glass. Mirrors show a hidden palace. A woman at a well knows how to reach it. First, help her save the water.',
  },
  encounters: [
    {
      id: 'mirrors-well',
      title: 'The mirror’s well',
      subtitle: 'The mirror’s well',
      skill: 'Fractions · capacity',
      icon: 'droplet',
      rich: 'Sahirah, keeper of the well, catches water before it vanishes into the glass. Her vessels hold parts of the same measure. Leave enough for the next caravan.',
      plain: 'Sahirah keeps the well safe. Help her measure the water for the next travelers.',
      discovery:
        'Sahirah seals the water jar. Beneath its surface, the reflection of a road appears. “What we keep for others becomes a path,” she says.',
      reward: 'Wellkeeper’s blue vessel',
      artwork: {
        src: '/art/mirrors-well.webp',
        alt: 'A woman in saffron robes pours turquoise water between ceramic vessels beside a desert well, watched by glass lizards.',
      },
      hint: [
        'The water left is the starting amount minus what you use.',
        'Start at 4 and take away 1.',
        '4 − 1 = 3 cups.',
      ],
      lesson: 'Subtraction finds what remains: 4 − 1 = 3 cups.',
      challenge: {
        kind: 'number',
        question: 'A jar holds 4 cups of water. You pour out 1 cup. How many cups remain?',
        answer: 3,
        variants: {
          developing: {
            question:
              'A vessel holds 1/2 liter. You add 1/4 liter. How many liters does it hold now? Enter a fraction or decimal.',
            answer: 0.75,
            hint: [
              'Add fractions using equal-sized parts.',
              '1/2 is 2/4, so add 2/4 and 1/4.',
              '2/4 + 1/4 = 3/4 liter.',
            ],
            lesson: 'A common denominator gives equal parts: 1/2 + 1/4 = 3/4 liter.',
          },
          stretch: {
            question:
              'A cistern holds 2.5 liters. A caravan uses 3/4 liter. How many liters remain?',
            answer: 1.75,
            hint: [
              'Convert to the same form before subtracting.',
              '3/4 = 0.75. Think 2.50 − 0.75.',
              '2.50 − 0.75 = 1.75 liters.',
            ],
            lesson:
              'Fractions and decimals can describe the same quantities: 2.5 − 3/4 = 1.75 liters.',
          },
        },
      },
    },
    {
      id: 'scarab-caravan',
      title: 'The scarab caravan',
      subtitle: 'The scarab caravan',
      skill: 'Equal groups · proportions',
      icon: 'scarab',
      rich: 'A silver-haired caravan keeper named Oren tends a great jewel scarab. Its baskets carry seeds for an oasis that has not yet grown. Divide the cargo fairly among its smaller companions.',
      plain: 'Oren’s giant scarab carries seeds. Share them equally among the smaller scarabs.',
      discovery:
        'The little scarabs lift their baskets together. As they march, green shoots appear in the cracks between the glass dunes.',
      reward: 'Caravan’s seed charm',
      artwork: {
        src: '/art/scarab-caravan.webp',
        alt: 'A silver-haired man in an indigo cloak tends a giant jewel scarab and smaller beetles carrying woven seed baskets.',
      },
      hint: [
        'Division makes equal groups.',
        'Find the number that makes 3 × ? = 12.',
        '3 × 4 = 12, so each carries 4.',
      ],
      lesson: '12 ÷ 3 = 4 packets per scarab. Multiplication checks the equal shares.',
      challenge: {
        kind: 'number',
        question:
          'Share 12 seed packets equally among 3 scarabs. How many packets does each carry?',
        answer: 4,
        variants: {
          developing: {
            question:
              'Five scarabs carry 30 seed packets equally. At the same rate, how many packets can 8 scarabs carry?',
            answer: 48,
            hint: [
              'First find the packets per scarab.',
              '30 ÷ 5 = 6 packets each.',
              '8 × 6 = 48 packets.',
            ],
            lesson: 'A unit rate connects the groups: 30 ÷ 5 = 6; 8 × 6 = 48.',
          },
          stretch: {
            question:
              'A caravan has 60 seed packets. It leaves 35% at the oasis. How many packets remain?',
            answer: 39,
            hint: [
              'Percent means parts out of 100. First find the number left at the oasis.',
              '10% of 60 is 6; 30% is 18 and 5% is 3.',
              '35% is 21 packets. 60 − 21 = 39.',
            ],
            lesson: '35% of 60 = 21. Subtracting the donated share leaves 39 packets.',
          },
        },
      },
    },
    {
      id: 'prism-gate',
      title: 'The many-eyed gate',
      subtitle: 'The many-eyed gate',
      skill: 'Geometry · angles',
      icon: 'prism',
      rich: 'A translucent sphinx sleeps across the palace threshold. Its many eyes follow a broken beam of sunlight. Restore the prism’s measure, and the guardian will let the light—and you—pass.',
      plain: 'A glass sphinx guards the palace. Fix the light puzzle to open the gate.',
      discovery:
        'The last beam finds its place. The sphinx opens one enormous eye, bows, and becomes a flight of transparent birds. The reflected palace is finally real.',
      reward: 'Prism of true bearings',
      artwork: {
        src: '/art/prism-gate.webp',
        alt: 'A many-eyed glass sphinx curls around an amber and teal prism gate amid broken mirrored towers.',
      },
      hint: [
        'Each triangle has 3 edges. The faces are separate, so none are shared.',
        'Add 3 edges for each face.',
        '3 + 3 = 6 edges.',
      ],
      lesson: 'Two separate triangles have 2 × 3 = 6 edges in total.',
      challenge: {
        kind: 'number',
        question:
          'A triangular prism face has 3 edges. How many edges are there around 2 separate triangular faces?',
        answer: 6,
        variants: {
          developing: {
            question:
              'A rectangular mirror is 6 centimeters long and 4 centimeters wide. What is its perimeter?',
            answer: 20,
            hint: [
              'Perimeter is the distance all the way around.',
              'A rectangle has two lengths and two widths.',
              '6 + 4 + 6 + 4 = 20 centimeters.',
            ],
            lesson: 'Perimeter = 2 × (6 + 4) = 20 centimeters.',
          },
          stretch: {
            question:
              'Two angles of a triangle measure 45° and 65°. How many degrees is the third angle?',
            answer: 70,
            hint: [
              'A triangle’s interior angles add to 180°.',
              'The known angles add to 45 + 65 = 110°.',
              '180 − 110 = 70°.',
            ],
            lesson: 'Triangle angles total 180°: 45° + 65° + 70° = 180°.',
          },
        },
      },
    },
  ],
  completion: {
    question: 'The palace is real again. What should its mirrors reveal?',
    choices: [
      {
        id: 'beacon',
        title: 'Chart a road to the oasis',
        description: 'Turn its reflections into guides for lost caravans.',
        result:
          'From dune to dune, the palace mirrors carry a glimmer of blue water. No caravan must wander without a way to the well.',
      },
      {
        id: 'refuge',
        title: 'Make a garden of glass',
        description: 'Shelter the seedlings and the strange creatures of the dunes.',
        result:
          'In the palace courtyard, the scarabs plant their seeds. Glass lizards sleep under green leaves, and Sahirah’s well never stands alone.',
      },
    ],
  },
};
