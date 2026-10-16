import type { Chapter } from '@/lib/types';

export const chapter: Chapter = {
  id: 'hollow-orchard',
  title: 'The Orchard of Borrowed Names',
  region: 'The Hollow Orchard',
  number: 7,
  heading: 'What grows in the dark',
  scene: {
    src: '/art/hollow-orchard-painterly.webp',
    alt: 'A moonlit orchard of hollow trees and translucent fruit holding tiny castles, watched by a pomegranate-antlered creature.',
  },
  subtitle: 'A small kindness can take a very strange shape.',
  intro: {
    rich: 'A root curls through the last star on Elian’s map. Following it brings you to an orchard beneath an amber moon. Its fruit holds sleeping castles; its gates have forgotten the names of everyone who once passed through.',
    plain:
      'A root on Elian’s map leads to a strange orchard. Tiny castles sleep inside its fruit. The gates have forgotten everyone’s names. Help the orchard remember its visitors.',
  },
  encounters: [
    {
      id: 'honey-debt',
      title: 'The honey debt',
      subtitle: 'The honey debt',
      skill: 'Equal groups · ratios',
      icon: 'hive',
      rich: 'Veyra lifts her golden veil. Around her, bees shaped like little keys gather at a honey jar. “A hive remembers every kindness,” she says. “Shall we leave the right share for those still dreaming?”',
      plain:
        'Veyra’s bees look like tiny keys. Help her measure a fair share of honey for the sleeping hives.',
      discovery:
        'The key-bees hum your name into the wax. A lock hidden in the bark clicks open. Veyra gives you a honeycomb that tastes faintly of a summer you have not yet lived.',
      reward: 'Keykeeper’s honeycomb',
      artwork: {
        src: '/art/honey-debt-painterly.webp',
        alt: 'A silver-haired woman beekeeper in plum robes opens an amber honey jar as tiny winged golden keys circle her veil.',
      },
      hint: [
        'Equal groups can be combined by multiplication.',
        'Add 4 spoonfuls three times.',
        '4 + 4 + 4 = 12 spoonfuls.',
      ],
      lesson: 'Three groups of four give 3 × 4 = 12 spoonfuls.',
      challenge: {
        kind: 'number',
        question:
          'There are 3 honey jars. Each holds 4 spoonfuls. How many spoonfuls are there in all?',
        answer: 12,
        variants: {
          developing: {
            question:
              'The hives receive 1/3 of a jar, then another 1/4 of a jar. What fraction of a jar is that in all?',
            answer: 0.5833333333333334,
            hint: [
              'Fractions must use equal-sized parts before you add them.',
              'Twelfths work for both: 1/3 = 4/12 and 1/4 = 3/12.',
              '4/12 + 3/12 = 7/12.',
            ],
            lesson: 'Use a common denominator: 1/3 + 1/4 = 4/12 + 3/12 = 7/12.',
          },
          stretch: {
            question:
              'Veyra mixes honey and water in a 3:2 ratio. The mixture totals 250 milliliters. How many milliliters are honey?',
            answer: 150,
            hint: [
              'The ratio has 3 honey parts and 2 water parts: 5 equal parts altogether.',
              'Each part is 250 ÷ 5 = 50 milliliters.',
              'Honey uses 3 parts, so 3 × 50 = 150 milliliters.',
            ],
            lesson:
              'A 3:2 ratio splits the total into five parts. Honey is 3/5 of 250 = 150 milliliters.',
          },
        },
      },
    },
    {
      id: 'snails-bargain',
      title: 'The snail’s bargain',
      subtitle: 'The snail’s bargain',
      skill: 'Measurement · unit rates',
      icon: 'snail',
      rich: 'A merchant in a wine-red coat tips his hat. His face is a carved wooden mask, and his shop travels on the back of a vast brass-shelled snail. “No hurried bargains,” he says, unrolling a ribbon that remembers every road.',
      plain:
        'A masked merchant rides a giant snail. He measures the roads with a long ribbon. Help him work out a distance.',
      discovery:
        'The snail extends a very formal eye-stalk. The merchant knots your measured ribbon to a root. The road shortens just enough for the snail to arrive before its tea goes cold.',
      reward: 'Ribbon of unhurried roads',
      artwork: {
        src: '/art/snails-bargain-painterly.webp',
        alt: 'A wooden-masked male merchant in an wine-red coat measures ribbon beside a giant snail with a brass spiral shell.',
      },
      hint: [
        'The total length is the sum of the separate lengths.',
        'Add 2 meters for each ribbon.',
        '2 + 2 + 2 = 6 meters.',
      ],
      lesson: 'Three ribbons of 2 meters make 3 × 2 = 6 meters.',
      challenge: {
        kind: 'number',
        question:
          'You join 3 ribbons, each 2 meters long. How many meters long is the joined ribbon?',
        answer: 6,
        variants: {
          developing: {
            question: 'The merchant needs 1.75 meters of ribbon. How many centimeters is that?',
            answer: 175,
            hint: [
              'One meter equals 100 centimeters.',
              '1 meter is 100 centimeters; 0.75 meter is 75 centimeters.',
              '100 + 75 = 175 centimeters.',
            ],
            lesson: 'Convert meters to centimeters by multiplying by 100: 1.75 × 100 = 175.',
          },
          stretch: {
            question:
              'The snail travels 2.4 meters in 6 minutes. At the same steady pace, how many meters will it travel in 15 minutes?',
            answer: 6,
            hint: [
              'Find the distance traveled in one minute before scaling up.',
              '2.4 ÷ 6 = 0.4 meter per minute.',
              '0.4 × 15 = 6 meters.',
            ],
            lesson: 'The unit rate is 0.4 meter per minute. Over 15 minutes, 0.4 × 15 = 6 meters.',
          },
        },
      },
    },
    {
      id: 'remembering-seed',
      title: 'The seed that remembers',
      subtitle: 'The seed that remembers',
      skill: 'Patterns · early algebra',
      icon: 'seed',
      rich: 'At the oldest tree, a creature grown from pomegranate rind lowers its antlers. A lantern beats inside its wooden ribs. It opens a seedpod at your feet: a small pattern waits to be completed, like the last line of a name.',
      plain:
        'A strange pomegranate deer guards the oldest tree. Its heart glows like a lantern. Finish the seed pattern to help it remember the way home.',
      discovery:
        'The seeds turn in the air. The creature speaks a name older than the orchard, then touches its antlers to the earth. Every sleeping castle opens a tiny window. Elian writes your name beside the root that brought you here.',
      reward: 'Seed of a remembered name',
      artwork: {
        src: '/art/remembering-seed-painterly.webp',
        alt: 'An uncanny deer grown from pomegranate rind and twisted roots bows over an open seedpod, with a lantern-heart glowing inside its chest.',
      },
      hint: [
        'Look for the same change from one number to the next.',
        '4 − 2 = 2 and 6 − 4 = 2. Add 2 again.',
        '6 + 2 = 8.',
      ],
      lesson: 'The pattern adds 2 each time: 2, 4, 6, 8.',
      challenge: {
        kind: 'number',
        question: 'The seeds glow in the pattern 2, 4, 6, __. What number comes next?',
        answer: 8,
        variants: {
          developing: {
            question:
              'A seed tray has 4 equal rows with 7 seeds in each row. How many seeds are in the tray?',
            answer: 28,
            hint: [
              'An array is a set of equal rows. Multiply rows by seeds per row.',
              'Two rows hold 14 seeds. Four rows hold twice that.',
              '14 + 14 = 28 seeds.',
            ],
            lesson: '4 rows × 7 seeds per row = 28 seeds.',
          },
          stretch: {
            question: 'The seed chamber opens when x / 3 + 2 = 7. What value of x opens it?',
            answer: 15,
            hint: [
              'Undo the operations while keeping both sides equal.',
              'Subtract 2 from both sides: x / 3 = 5.',
              'Multiply both sides by 3: x = 15.',
            ],
            lesson: 'x / 3 + 2 = 7 → x / 3 = 5 → x = 15. Check: 15 ÷ 3 + 2 = 7.',
          },
        },
      },
    },
  ],
  completion: {
    question: 'The orchard remembers its names. What shall grow from this remembering?',
    choices: [
      {
        id: 'beacon',
        title: 'Open the wandering gates',
        description: 'Let the orchard offer shelter to those who have lost their way.',
        result:
          'The gates open onto seven familiar roads. Veyra’s key-bees guide travelers between them, and the masked merchant always has time for one more cup of tea.',
      },
      {
        id: 'refuge',
        title: 'Keep a garden of possibilities',
        description: 'Leave the sleeping castles to dream until their people are ready.',
        result:
          'You plant the remembering seed beneath the oldest tree. Its lantern-heart glows through the bark, guarding a garden where every unfinished story has room to grow.',
      },
    ],
  },
};
