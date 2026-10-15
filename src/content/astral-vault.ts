import type { Chapter } from '@/lib/types';

export const chapter: Chapter = {
  id: 'astral-vault',
  title: 'The Unwritten Constellation',
  region: 'The Astral Vault',
  number: 6,
  heading: 'Where the dark becomes a map',
  scene: {
    src: '/art/astral-vault.webp',
    alt: 'An ancient observatory floats among violet nebulae, orbital bridges and luminous ray-like creatures.',
  },
  subtitle: 'Even an empty sky can hold a possibility.',
  intro: {
    rich: 'Beyond the archive’s final stair, gravity loosens its grip. Stone rings drift around a starless vault. Elian closes her old maps. “From here,” she says, “we draw our own.”',
    plain:
      'The last stair leads into a sky full of floating stone rings. A hidden vault has lost its star. Elian is ready to make a new map with you.',
  },
  encounters: [
    {
      id: 'starless-ferry',
      title: 'The starless ferry',
      subtitle: 'The starless ferry',
      skill: 'Addition · coordinates',
      icon: 'ferry',
      rich: 'Neris ferries travelers across the space between stars. A silver ray follows her crescent boat. To reach the first landing, measure the distance that ordinary maps cannot show.',
      plain:
        'Neris has a boat shaped like a moon. Help her work out the distance to the next landing.',
      discovery:
        'The silver ray lifts the boat across a silent current. On the far bank, Neris ties the mooring to a star that was not there a moment ago.',
      reward: 'Silver ray’s scale',
      artwork: {
        src: '/art/starless-ferry.webp',
        alt: 'An auburn-haired woman pilots a crescent boat through a sea of stars beside a luminous silver manta spirit.',
      },
      hint: [
        'Addition combines distances traveled in the same direction.',
        'You can split 5 into 3 and 2 to make a ten.',
        '7 + 3 + 2 = 12.',
      ],
      lesson: '7 + 5 = 12 star-lengths. Making a ten can make addition easier.',
      challenge: {
        kind: 'number',
        question:
          'The ferry travels 7 star-lengths, then 5 more. How many star-lengths does it travel in all?',
        answer: 12,
        variants: {
          developing: {
            question:
              'On a straight star chart, the ferry starts at −4 and lands at +5. How many units does it travel?',
            answer: 9,
            hint: [
              'Distance counts the steps between the positions.',
              'From −4 to zero is 4 units; from zero to +5 is 5.',
              '4 + 5 = 9 units.',
            ],
            lesson: 'Across zero, add the two distances: 4 + 5 = 9 units.',
          },
          stretch: {
            question:
              'On a straight star chart, the ferry moves from −2.5 to +1.75. How many units does it travel?',
            answer: 4.25,
            hint: [
              'Distance is the positive difference between the endpoints.',
              'From −2.5 to zero is 2.5 units, then another 1.75.',
              '2.5 + 1.75 = 4.25 units.',
            ],
            lesson: 'The distance is 1.75 − (−2.5) = 4.25 units.',
          },
        },
      },
    },
    {
      id: 'orrery-keeper',
      title: 'The keeper’s orbit',
      subtitle: 'The keeper’s orbit',
      skill: 'Multiplication · percentages',
      icon: 'orrery',
      rich: 'The elf astronomer Cael holds a small planet between finger and thumb. A mischievous imp has scattered the orrery’s light. Restore the proper share before the little worlds wander apart.',
      plain:
        'Cael looks after a model of the planets. An imp has scattered its lights. Help him count the lights he needs.',
      discovery:
        'The planets find their paths. The imp produces the last hidden light from behind one ear and solemnly insists that it was helping all along.',
      reward: 'Cael’s orbital ring',
      artwork: {
        src: '/art/orrery-keeper.webp',
        alt: 'A dark-haired male elf in an embroidered midnight robe turns a brass orrery while a tiny winged imp watches.',
      },
      hint: [
        'Equal groups can be counted with multiplication.',
        'Count 5 lights for each of 4 rings: 5, 10, 15, 20.',
        '4 × 5 = 20 lights.',
      ],
      lesson: 'Four equal groups of five contain 20 lights.',
      challenge: {
        kind: 'number',
        question: 'Four orbital rings each need 5 lights. How many lights are needed?',
        answer: 20,
        variants: {
          developing: {
            question:
              'The orrery has 80 lights. One quarter are blue. How many blue lights are there?',
            answer: 20,
            hint: [
              'One quarter means one of four equal groups.',
              'Divide the total number of lights by 4.',
              '80 ÷ 4 = 20 blue lights.',
            ],
            lesson: '1/4 of 80 = 20. A quarter is also 25%.',
          },
          stretch: {
            question:
              'The orrery needs 120 lights. 65% are already lit. How many still need lighting?',
            answer: 42,
            hint: [
              'Find the share still dark: 100% − 65% = 35%.',
              '10% of 120 is 12, so 30% is 36 and 5% is 6.',
              '36 + 6 = 42 lights.',
            ],
            lesson: '35% remains unlit: 0.35 × 120 = 42 lights.',
          },
        },
      },
    },
    {
      id: 'unwritten-star',
      title: 'The unwritten star',
      subtitle: 'The unwritten star',
      skill: 'Patterns · early algebra',
      icon: 'comet',
      rich: 'Within the vault, stone hands cradle an ember of starlight. Feathered serpents circle without sound. A final pattern binds the ember—not to keep you out, but to ask what you have learned.',
      plain:
        'A tiny star rests in two stone hands. Find the missing number in its pattern to set it free.',
      discovery:
        'The ember rises. A new constellation opens above every road you have traveled: the mere, the mountain, the coast, the glass, the frost. Elian leaves room on the map for your next question.',
      reward: 'The unwritten star',
      artwork: {
        src: '/art/unwritten-star.webp',
        alt: 'Ancient stone hands cradle a living golden star as translucent feathered serpents circle an open obsidian reliquary.',
      },
      hint: [
        'Look for the same change between neighboring numbers.',
        '6 − 3 = 3 and 9 − 6 = 3. Add another 3.',
        '9 + 3 = 12.',
      ],
      lesson: 'This pattern adds 3 each time: 3, 6, 9, 12.',
      challenge: {
        kind: 'number',
        question: 'The star’s lights form the pattern 3, 6, 9, __. What number comes next?',
        answer: 12,
        variants: {
          developing: {
            question: 'The star’s ward says x + 17 = 42. What is x?',
            answer: 25,
            hint: [
              'An equation says both sides have equal value.',
              'Undo +17 by subtracting 17 from both sides.',
              'x = 42 − 17 = 25.',
            ],
            lesson: 'x + 17 = 42 → x = 25. Check: 25 + 17 = 42.',
          },
          stretch: {
            question: 'The final ward reads 3(x − 2) = 21. What is x?',
            answer: 9,
            hint: [
              'Undo the outside multiplication first.',
              'Divide both sides by 3: x − 2 = 7.',
              'Add 2 to both sides: x = 9.',
            ],
            lesson: '3(x − 2) = 21 → x − 2 = 7 → x = 9. Check: 3 × (9 − 2) = 21.',
          },
        },
      },
    },
  ],
  completion: {
    question: 'A new star is yours to place. What will it become?',
    choices: [
      {
        id: 'beacon',
        title: 'Draw a constellation for everyone',
        description: 'Connect the charted worlds with a light every traveler can follow.',
        result:
          'Above every road, a new constellation shines. Its shape changes with the viewer, but it always points toward a place where a curious mind is welcome.',
      },
      {
        id: 'refuge',
        title: 'Leave the star unwritten',
        description: 'Give the next wayfarer a possibility of their own.',
        result:
          'You leave the star in its open hands. The vault becomes a quiet invitation. Elian draws one last mark: a small blank circle, waiting for someone else’s question.',
      },
    ],
  },
};
