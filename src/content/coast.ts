import type { Chapter } from '@/lib/types';
export const chapter: Chapter = {
  id: 'tideglass-coast',
  title: 'The Lanterns of Low Tide',
  region: 'The Tideglass Coast',
  number: 3,
  heading: 'Where the waters part',
  scene: {
    src: '/art/coast-illustrated.webp',
    alt: 'An intricately illustrated moonlit harbor with sailing ships and lanterns.',
  },
  subtitle: 'A careful measure can light the way.',
  intro: {
    rich: 'At the edge of the sea, the tide reveals an old causeway. Beyond it, a garden of unlit lanterns waits for someone to remember.',
    plain:
      'At the edge of the sea, the tide reveals an old causeway. Beyond it, a garden of unlit lanterns waits for someone to remember.',
  },
  encounters: [
    {
      id: 'harbor-trade',
      title: 'The fair exchange',
      skill: 'Money \u00b7 percentages',
      subtitle: 'The fair exchange',
      icon: 'coins',
      rich: 'A harbor merchant offers the rope needed to reach the old causeway. Work out a fair exchange before setting out.',
      plain:
        'A harbor merchant offers the rope needed to reach the old causeway. Work out a fair exchange before setting out.',
      discovery:
        'The merchant ties your rope with a sailor\u2019s knot and points toward the retreating tide.',
      reward: 'Harbor token',
      artwork: {
        src: '/art/fair-exchange-illustrated.webp',
        alt: 'A harbor merchant offers a coiled rope across a counter with copper coins and brass scales, against a moonlit harbor.',
      },
      hint: [
        'Change is the difference between payment and price.',
        'Subtract 18 from 20.',
        '20 \u2212 18 = 2.',
      ],
      lesson: '20 \u2212 18 = 2 coins.',
      challenge: {
        kind: 'number',
        question: 'The rope costs 18 coins. You pay 20. How much change should you receive?',
        answer: 2,
        unit: 'coins',
        variants: {
          developing: {
            question: 'A rope costs 45 coins before a 20% discount. What is the discounted price?',
            answer: 36,
            hint: ['First find one fifth of 45.', '20% of 45 is 9.', '45 \u2212 9 = 36.'],
            lesson: '45 \u2212 (20% \u00d7 45) = 36 coins.',
          },
          stretch: {
            question: 'A sail costs 80 coins before a 15% discount. What is the discounted price?',
            answer: 68,
            hint: ['Find 10% and 5% separately.', '10% of 80 is 8; 5% is 4.', '80 \u2212 12 = 68.'],
            lesson: '80 \u2212 (15% \u00d7 80) = 68 coins.',
          },
        },
      },
    },
    {
      id: 'tidal-mark',
      title: 'The tidekeeper\u2019s measure',
      skill: 'Measurement \u00b7 conversions',
      subtitle: 'The tidekeeper\u2019s measure',
      icon: 'ruler',
      rich: 'The causeway is visible only at low tide. A stone marker gives the length of rope needed for the crossing.',
      plain:
        'The causeway is visible only at low tide. A stone marker gives the length of rope needed for the crossing.',
      discovery:
        'Your measured rope spans the gap. A line of pale stones leads toward the lantern garden.',
      reward: 'Tidekeeper\u2019s cord',
      artwork: {
        src: '/art/tidekeepers-measure-illustrated.webp',
        alt: 'A knotted measuring rope spans a gap beside a weathered tidal marker and a moonlit sea causeway.',
      },
      hint: [
        'One meter is 100 centimeters.',
        'Two meters contain two groups of 100.',
        '2 \u00d7 100 = 200.',
      ],
      lesson: '2 meters = 200 centimeters.',
      challenge: {
        kind: 'number',
        question: 'You need a rope 2 meters long. How many centimeters is that?',
        answer: 200,
        unit: 'centimeters',
        variants: {
          developing: {
            question: 'You need 3/4 of a meter of rope. How many centimeters is that?',
            answer: 75,
            hint: [
              'One meter is 100 centimeters.',
              'One quarter of 100 is 25.',
              '3 \u00d7 25 = 75.',
            ],
            lesson: '3/4 meter = 75 centimeters.',
          },
          stretch: {
            question: 'The path is 1.25 kilometers long. How many meters is that?',
            answer: 1250,
            hint: [
              'One kilometer is 1,000 meters.',
              'A quarter kilometer is 250 meters.',
              '1,000 + 250 = 1,250.',
            ],
            lesson: '1.25 kilometers = 1,250 meters.',
          },
        },
      },
    },
    {
      id: 'lantern-garden',
      title: 'A harbor of small lights',
      skill: 'Fractions \u00b7 equations',
      subtitle: 'A harbor of small lights',
      icon: 'lantern',
      rich: 'Moonwater fuels the lanterns along the final path. Leave exactly what the garden needs to guide the next traveler.',
      plain:
        'Moonwater fuels the lanterns along the final path. Leave exactly what the garden needs to guide the next traveler.',
      discovery:
        'The garden lanterns glow one by one. Across the dark water, a returning ship answers with a light of its own.',
      reward: 'Tideglass lantern',
      artwork: {
        src: '/art/elian-lantern-painterly.webp',
        alt: 'Elian pours glowing moonwater into a garden lantern while a distant sailing ship carries a small answering light.',
      },
      hint: [
        'Subtract equal-sized parts.',
        '3 quarters minus 1 quarter leaves 2 quarters.',
        '2/4 is the same as 1/2.',
      ],
      lesson: '3/4 \u2212 1/4 = 1/2.',
      challenge: {
        kind: 'number',
        question:
          'A flask holds 3/4 of a measure. You use 1/4. How much remains? Enter a fraction or decimal.',
        answer: 0.5,
        unit: 'measure',
        variants: {
          developing: {
            question: 'You combine 2/3 and 1/6 of a measure. How much is that altogether?',
            answer: 0.8333333333333334,
            hint: ['Use a common denominator of 6.', '2/3 is 4/6. Add 1/6.', '4/6 + 1/6 = 5/6.'],
            lesson: '2/3 + 1/6 = 5/6.',
          },
          stretch: {
            question:
              'A lantern needs x measures of oil. You add 3 more to make 11. Solve x + 3 = 11.',
            answer: 8,
            hint: ['Undo addition with subtraction.', 'Subtract 3 from both sides.', 'x = 8.'],
            lesson: 'x + 3 = 11, so x = 8.',
          },
        },
      },
    },
  ],
  completion: {
    question: 'The causeway is safe again. How will you leave its light?',
    choices: [
      {
        id: 'beacon',
        title: 'Light the harbor beacon',
        description: 'Guide the ships returning across the bay.',
        result:
          'The harbor beacon reaches across the tide. Far out on the water, the returning ships turn toward home.',
      },
      {
        id: 'refuge',
        title: 'Keep the garden quiet',
        description: 'Make a peaceful resting place beside the sea.',
        result:
          'A quiet garden shines above the water. Travelers come to rest, listen to the tide, and find their own way onward.',
      },
    ],
  },
};
