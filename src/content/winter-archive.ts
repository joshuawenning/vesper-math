import type { Chapter } from '@/lib/types';

export const chapter: Chapter = {
  id: 'winter-archive',
  title: 'The Book of Borrowed Hours',
  region: 'The Winter Archive',
  number: 5,
  heading: 'What the frost has kept',
  scene: {
    src: '/art/winter-archive.webp',
    alt: 'A library carved into a frozen cliff glows with amber windows, snowy bridges and antlered owl spirits.',
  },
  subtitle: 'Some things must be understood before they can be kept.',
  intro: {
    rich: 'Snow gathers on a library built into the face of a glacier. Inside, the clocks are running backward. A raven at the window taps three times: the archive has begun to forget its own doors.',
    plain:
      'A library stands inside a glacier. Its clocks run backward, and its doors are freezing shut. The keepers need your help to save their books.',
  },
  encounters: [
    {
      id: 'borrowed-hours',
      title: 'The borrowed hour',
      subtitle: 'The borrowed hour',
      skill: 'Time · rational numbers',
      icon: 'hourglass',
      rich: 'Maelin turns an hourglass without disturbing the raven on her shoulder. “The archive lends time,” she says, “but every borrowed moment must be counted.” Return the missing measure.',
      plain:
        'Maelin looks after the clocks. Help her count the minutes before the next door freezes.',
      discovery:
        'The sand falls forward again. Maelin smiles as a lost afternoon returns to the shelves, smelling faintly of summer rain.',
      reward: 'Hourglass of returning moments',
      artwork: {
        src: '/art/borrowed-hours.webp',
        alt: 'An older woman with white braids and a raven tends floating hourglasses in a frozen library chamber.',
      },
      hint: [
        'Elapsed time is the amount of time between two moments.',
        'Count forward from 2:00 to 2:20.',
        '20 minutes have passed.',
      ],
      lesson: 'Elapsed time from 2:00 to 2:20 is 20 minutes.',
      challenge: {
        kind: 'number',
        question: 'The archive bell rings at 2:00. It is now 2:20. How many minutes have passed?',
        answer: 20,
        variants: {
          developing: {
            question: 'You begin reading at 2:35 and stop at 3:10. How many minutes did you read?',
            answer: 35,
            hint: [
              'Count to the next hour, then count the minutes after it.',
              '2:35 to 3:00 is 25 minutes. 3:00 to 3:10 is 10.',
              '25 + 10 = 35 minutes.',
            ],
            lesson: 'Crossing an hour boundary: 25 minutes + 10 minutes = 35 minutes.',
          },
          stretch: {
            question: 'The archive was −8°C. It warms by 13°C. What is the new temperature in °C?',
            answer: 5,
            hint: [
              'A rise in temperature means add a positive amount.',
              'Adding 8 gets from −8 to zero. There are 5 more degrees to add.',
              '−8 + 13 = 5°C.',
            ],
            lesson: 'On a number line, move 13 steps right from −8: −8 + 13 = 5.',
          },
        },
      },
    },
    {
      id: 'frostbound-index',
      title: 'The frostbound index',
      subtitle: 'The frostbound index',
      skill: 'Fractions · sets',
      icon: 'quill',
      rich: 'Archivist Ivo opens a book whose pages have become pale moths. Each wing carries a fragment of the index. Gather the right share before the creatures settle into winter sleep.',
      plain:
        'Ivo’s book pages have turned into moths. Count the right share to put the book back together.',
      discovery:
        'The moths fold into pages, and Ivo writes your name on a blank leaf. Not as a borrower—as someone who helped a story find its way home.',
      reward: 'Moth-wing bookmark',
      artwork: {
        src: '/art/frostbound-index.webp',
        alt: 'A bearded archivist in moss-green robes opens a huge book as luminous moth spirits rise among frozen scrolls.',
      },
      hint: [
        'Half means one of two equal groups.',
        'Divide 10 pages into 2 equal groups.',
        '10 ÷ 2 = 5 pages.',
      ],
      lesson: 'One half of 10 is 10 ÷ 2 = 5.',
      challenge: {
        kind: 'number',
        question: 'Half of a book’s 10 pages have returned. How many pages have returned?',
        answer: 5,
        variants: {
          developing: {
            question:
              'Three quarters of the archive’s 28 missing pages have returned. How many pages is that?',
            answer: 21,
            hint: [
              'Find one quarter, then take three of those groups.',
              '28 ÷ 4 = 7 pages per quarter.',
              '3 × 7 = 21 pages.',
            ],
            lesson: '3/4 of 28 = (28 ÷ 4) × 3 = 21.',
          },
          stretch: {
            question:
              'The index has 120 entries. 5/8 are restored. How many entries still need restoring?',
            answer: 45,
            hint: [
              'Find the restored share, then subtract it from the whole.',
              '120 ÷ 8 = 15; 5 × 15 = 75 restored entries.',
              '120 − 75 = 45 entries remain.',
            ],
            lesson: '5/8 of 120 = 75 restored; the remaining 3/8 is 45.',
          },
        },
      },
    },
    {
      id: 'door-of-thaw',
      title: 'The door of thaw',
      subtitle: 'The door of thaw',
      skill: 'Geometry · equations',
      icon: 'antlers',
      rich: 'At the deepest door waits a stag of bone-white frost. Candle flames tremble in its antlers. It lowers its head to the tiled threshold: the pattern is a promise, not a threat.',
      plain:
        'A frost stag waits by the last door. Find the missing size in the floor pattern to open it.',
      discovery:
        'The stag steps aside. Its hooves leave little pools of spring water. Behind the door, the archive’s oldest book opens to a page that has never been written.',
      reward: 'Candle of the first thaw',
      artwork: {
        src: '/art/door-of-thaw.webp',
        alt: 'A skeletal stag spirit made of frost carries tiny candle flames in its antlers before a round wooden door.',
      },
      hint: [
        'An array has equal rows. Multiply rows by tiles in each row.',
        'There are 4 + 4 + 4 tiles.',
        '3 × 4 = 12 tiles.',
      ],
      lesson: 'Three rows of four make an array of 12 tiles.',
      challenge: {
        kind: 'number',
        question: 'The threshold has 3 rows of 4 square tiles. How many tiles cover it?',
        answer: 12,
        variants: {
          developing: {
            question:
              'A rectangular reading room has area 42 square meters and width 6 meters. How long is it?',
            answer: 7,
            hint: [
              'Area is width × length. Divide to find a missing side.',
              'Ask: 6 × what = 42?',
              '42 ÷ 6 = 7 meters.',
            ],
            lesson: '42 = 6 × length, so length = 42 ÷ 6 = 7 meters.',
          },
          stretch: {
            question: 'A door’s ward follows 4x + 6 = 30. What value of x opens it?',
            answer: 6,
            hint: [
              'Keep both sides equal as you undo the operations.',
              'Subtract 6 from both sides: 4x = 24.',
              'Divide both sides by 4: x = 6.',
            ],
            lesson: 'Undo addition, then multiplication: 4x + 6 = 30 → 4x = 24 → x = 6.',
          },
        },
      },
    },
  ],
  completion: {
    question: 'The archive remembers its doors. What will you preserve for those who follow?',
    choices: [
      {
        id: 'beacon',
        title: 'Open the living index',
        description: 'Let every visitor find the knowledge they need.',
        result:
          'The moth-wing index travels from shelf to shelf, guiding readers to just the right book. Maelin lends each visitor an unhurried hour.',
      },
      {
        id: 'refuge',
        title: 'Keep a room for unwritten stories',
        description: 'Leave a warm place for new memories to take shape.',
        result:
          'Beside the thawing door, a quiet room waits with fresh paper. Ivo leaves the first page empty. Some knowledge is still waiting to be made.',
      },
    ],
  },
};
