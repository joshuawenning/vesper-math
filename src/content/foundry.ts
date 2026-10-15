import type { Chapter } from '@/lib/types';
export const chapter: Chapter = {
  id: 'ember-foundry',
  title: 'The Sleeping Foundry',
  region: 'The Ember Peaks',
  number: 2,
  heading: 'The mountain remembers',
  scene: {
    src: '/art/foundry.webp',
    alt: 'An intricately illustrated mountain foundry with brass wheels and warm furnaces.',
  },
  subtitle: 'Every small part has its place.',
  intro: {
    rich: 'High above the mere, a silent foundry rests in the mountain mist. Elian traces a path toward its cold brass gates.',
    plain:
      'High above the mere, a silent foundry rests in the mountain mist. Elian traces a path toward its cold brass gates.',
  },
  encounters: [
    {
      id: 'copper-lift',
      title: 'The counterweight',
      skill: 'Subtraction \u00b7 balance',
      subtitle: 'The counterweight',
      icon: 'balance',
      rich: 'A suspended lift waits above a stream. Add the missing weight to make both sides equal.',
      plain:
        'A suspended lift waits above a stream. Add the missing weight to make both sides equal.',
      discovery:
        'The lift settles level with the workshop door. Elian sketches the old balancing arms.',
      reward: 'Copper balance seal',
      artwork: {
        src: '/art/counterweight.webp',
        alt: 'A copper lift suspended beside a mountain workshop, with a brass balancing arm and hanging stone counterweights.',
      },
      hint: [
        'Find the difference between the two sides.',
        'Count from 5 up to 12.',
        '12 \u2212 5 = 7. Add 7 stones.',
      ],
      lesson: '12 \u2212 5 = 7. Equal weights balance the lift.',
      challenge: {
        kind: 'number',
        question:
          'One side weighs 12 stones. The other weighs 5. How many stones must you add to the lighter side?',
        answer: 7,
        unit: 'stones',
        variants: {
          developing: {
            question: 'One side weighs 84 stones, the other 37. How many stones must you add?',
            answer: 47,
            hint: ['Find 84 minus 37.', '84 \u2212 30 = 54. Subtract 7 more.', '54 \u2212 7 = 47.'],
            lesson: '84 \u2212 37 = 47.',
          },
          stretch: {
            question:
              'A magical balance reads \u221212 on one side. How much must you add to reach +5?',
            answer: 17,
            hint: [
              'Move from \u221212 to zero, then to 5.',
              'It takes 12 to reach zero and another 5.',
              '12 + 5 = 17.',
            ],
            lesson: '\u221212 + 17 = 5.',
          },
        },
      },
    },
    {
      id: 'gearworks',
      title: 'The brass chorus',
      skill: 'Multiplication \u00b7 percentages',
      subtitle: 'The brass chorus',
      icon: 'gear',
      rich: 'The gear keeper has arranged new teeth in equal bundles. Count the parts to wake the first wheel.',
      plain:
        'The gear keeper has arranged new teeth in equal bundles. Count the parts to wake the first wheel.',
      discovery:
        'A deep musical note travels through the mountain. The great wheel turns for the first time in years.',
      reward: 'Brass tuning key',
      artwork: {
        src: '/art/brass-chorus.webp',
        alt: 'An elderly dwarf gear keeper arranges brass gear teeth at a workbench as a great wheel glows behind her.',
      },
      hint: ['Equal groups can be multiplied.', 'Add 3 four times.', '4 \u00d7 3 = 12.'],
      lesson: '4 \u00d7 3 = 12.',
      challenge: {
        kind: 'number',
        question:
          'There are 4 bundles with 3 gear teeth in each. How many teeth are there altogether?',
        answer: 12,
        unit: 'teeth',
        variants: {
          developing: {
            question: 'There are 7 trays with 8 gears each. How many gears are there?',
            answer: 56,
            hint: [
              'Multiply the number of trays by gears per tray.',
              '7 \u00d7 4 = 28. Double it for 7 \u00d7 8.',
              '28 + 28 = 56.',
            ],
            lesson: '7 \u00d7 8 = 56.',
          },
          stretch: {
            question: 'The wheel needs 75% of its 80 teeth replaced. How many teeth is that?',
            answer: 60,
            hint: ['75% is three quarters.', 'One quarter of 80 is 20.', '3 \u00d7 20 = 60.'],
            lesson: '75% of 80 = 60.',
          },
        },
      },
    },
    {
      id: 'forge-floor',
      title: 'The maker\u2019s mosaic',
      skill: 'Geometry \u00b7 early variables',
      subtitle: 'The maker\u2019s mosaic',
      icon: 'mosaic',
      rich: 'A stone mosaic marks the last safe work space beneath the forge. Follow its dimensions to restore the old workshop.',
      plain:
        'A stone mosaic marks the last safe work space beneath the forge. Follow its dimensions to restore the old workshop.',
      discovery:
        'The final stone rests in place. Warm light spreads across the foundry floor, and the work bells answer.',
      reward: 'Maker\u2019s compass',
      artwork: {
        src: '/art/makers-mosaic.webp',
        alt: 'A teal, ochre, and ivory foundry floor mosaic with a loose final tile and a brass maker’s compass.',
      },
      hint: [
        'Perimeter is the distance around the edge.',
        'There are two sides of length 3 and two of length 4.',
        '3 + 4 + 3 + 4 = 14.',
      ],
      lesson: 'Perimeter = 2 \u00d7 (3 + 4) = 14 feet.',
      challenge: {
        kind: 'number',
        question: 'A rectangular mosaic is 3 feet wide and 4 feet long. What is its perimeter?',
        answer: 14,
        unit: 'feet',
        variants: {
          developing: {
            question: 'A rectangular mosaic is 5 feet wide and 8 feet long. What is its area?',
            answer: 40,
            hint: [
              'Area counts the square units inside.',
              'Multiply width by length.',
              '5 \u00d7 8 = 40.',
            ],
            lesson: 'Area = 5 \u00d7 8 = 40 square feet.',
          },
          stretch: {
            question:
              'A mosaic has area 27 square feet. Its width is 3 feet. If its length is x, solve 3 \u00d7 x = 27.',
            answer: 9,
            hint: ['Undo multiplication by dividing.', 'Divide 27 by 3.', 'x = 9.'],
            lesson: '3x = 27, so x = 9 feet.',
          },
        },
      },
    },
  ],
  completion: {
    question: 'The foundry is awake. What should its first work be?',
    choices: [
      {
        id: 'beacon',
        title: 'Reopen the workshop',
        description: 'Let the valley\u2019s makers share its tools again.',
        result:
          'The doors open to the makers of the valley. Every evening, the mountain rings with careful, joyful work.',
      },
      {
        id: 'refuge',
        title: 'Build a meeting hall',
        description: 'Give weary travelers a warm place to gather.',
        result:
          'Beneath the old brass wheels, a meeting hall takes shape. The forge warms every traveler who comes through its doors.',
      },
    ],
  },
};
