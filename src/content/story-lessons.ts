import type { Challenge, Encounter, SkillLevel } from '@/lib/types';

export interface StoryStep {
  title: string;
  challenge: Challenge;
  hint: string[];
  lesson: string;
}
type Problem = { question: string; answer: number; explanation: string; principle: string };
type Pair = [Problem, Problem];
const problem = (
  question: string,
  answer: number,
  explanation: string,
  principle: string,
): Problem => ({ question, answer, explanation, principle });

function add(item: string, a: number, b: number, c: number): Pair {
  const principle =
    'Addition combines quantities in the same unit. You can make a ten or add the largest parts first.';
  return [
    problem(
      `${item}: you join ${a} and ${b}. What is their total?`,
      a + b,
      `${a} + ${b} = ${a + b}.`,
      principle,
    ),
    problem(
      `${item}: a new arrangement joins ${a}, ${b}, and ${c}. What is the total now?`,
      a + b + c,
      `${a} + ${b} + ${c} = ${a + b + c}. Group the first two, then add the third.`,
      principle,
    ),
  ];
}
function subtract(item: string, a: number, b: number, extra: number): Pair {
  const principle =
    'Subtraction finds a difference. Check by adding your answer back to the amount removed.';
  return [
    problem(
      b < 0
        ? `${item}: how far is ${a} above ${b}? Find ${a} − (${b}).`
        : `${item}: start with ${a} and remove ${b}. How much remains?`,
      a - b,
      `${a} − ${b} = ${a - b}. Check: ${a - b} + ${b} = ${a}.`,
      principle,
    ),
    problem(
      b + extra < 0
        ? `${item}: how far is ${a + extra} above ${b + extra}?`
        : `${item}: begin again with ${a + extra}, then remove ${b + extra}. How much remains?`,
      a - b,
      `${a + extra} − ${b + extra} = ${a - b}. Increasing both quantities equally leaves their difference unchanged.`,
      principle,
    ),
  ];
}
function groups(item: string, count: number, each: number): Pair {
  const principle =
    'Multiplication counts equal groups. Division reverses it: total ÷ number of groups = amount in each group.';
  return [
    problem(
      `${item}: ${count} groups each hold ${each}. How many are there altogether?`,
      count * each,
      `${count} × ${each} = ${count * each}. Each group contributes the same amount.`,
      principle,
    ),
    problem(
      `${item}: ${count * each + each} are shared equally among ${count + 1} groups. How many belong in each group?`,
      each,
      `${count * each + each} ÷ ${count + 1} = ${each}. Check: ${count + 1} × ${each} = ${count * each + each}.`,
      principle,
    ),
  ];
}
function fractions(item: string, denominator: number, a: number, b: number): Pair {
  const principle =
    'The denominator names the size of each equal part. With matching denominators, add or subtract the numerators and keep the denominator.';
  return [
    problem(
      `${item}: combine ${a}/${denominator} with ${b}/${denominator}. What fraction do you have?`,
      (a + b) / denominator,
      `${a}/${denominator} + ${b}/${denominator} = ${a + b}/${denominator}. Equivalent simplified fractions are also correct.`,
      principle,
    ),
    problem(
      `${item}: start with ${a + b + 1}/${denominator} and use ${b}/${denominator}. What fraction remains?`,
      (a + 1) / denominator,
      `${a + b + 1}/${denominator} − ${b}/${denominator} = ${a + 1}/${denominator}.`,
      principle,
    ),
  ];
}
function mixedFractions(item: string, a: number, b: number): Pair {
  const principle =
    'Different denominators describe different sized pieces. Rewrite both fractions using a common denominator before combining them.';
  return [
    problem(
      `${item}: combine 1/${a} with 1/${b}. What is the total?`,
      1 / a + 1 / b,
      `1/${a} = ${b}/${a * b}; 1/${b} = ${a}/${a * b}. Their sum is ${a + b}/${a * b}.`,
      principle,
    ),
    problem(
      `${item}: a full measure loses 1/${a} and then 1/${b}. What fraction remains?`,
      1 - 1 / a - 1 / b,
      `1 − ${a + b}/${a * b} = ${a * b - a - b}/${a * b}. Use the same denominator for the whole and both shares.`,
      principle,
    ),
  ];
}
function percent(item: string, total: number, rate: number): Pair {
  const principle =
    'Percent means out of 100. Multiply the whole by the percentage divided by 100; subtract that share to find what remains.';
  const share = (total * rate) / 100;
  return [
    problem(
      `${item}: what is ${rate}% of ${total}?`,
      share,
      `${rate}% = ${rate}/100. ${total} × ${rate}/100 = ${share}.`,
      principle,
    ),
    problem(
      `${item}: begin with ${total + 20}. After ${rate}% is used, how much remains?`,
      ((total + 20) * (100 - rate)) / 100,
      `${100 - rate}% remains. ${total + 20} × ${100 - rate}/100 = ${((total + 20) * (100 - rate)) / 100}.`,
      principle,
    ),
  ];
}
function rectangle(item: string, width: number, length: number): Pair {
  const principle =
    'Area counts unit squares inside a rectangle: width × length. Perimeter measures the boundary: twice the width plus twice the length.';
  return [
    problem(
      `${item}: a rectangle is ${width} units wide and ${length} units long. What is its area in square units?`,
      width * length,
      `${width} × ${length} = ${width * length} square units.`,
      principle,
    ),
    problem(
      `${item}: a new rectangle is ${width + 1} units wide and ${length + 2} units long. What is its perimeter?`,
      2 * (width + length + 3),
      `2 × (${width + 1} + ${length + 2}) = ${2 * (width + length + 3)} units. Count all four sides.`,
      principle,
    ),
  ];
}
function conversion(item: string, amount: number, factor: number, from: string, to: string): Pair {
  const principle = `One ${from.replace(/s$/, '')} contains ${factor} ${to}. Multiply to change to smaller units; divide to change back.`;
  return [
    problem(
      `${item}: convert ${amount} ${from} to ${to}.`,
      amount * factor,
      `${amount} × ${factor} = ${amount * factor} ${to}.`,
      principle,
    ),
    problem(
      `${item}: convert ${(amount + 0.5) * factor} ${to} back to ${from}.`,
      amount + 0.5,
      `${(amount + 0.5) * factor} ÷ ${factor} = ${amount + 0.5} ${from}.`,
      principle,
    ),
  ];
}
function equation(item: string, multiplier: number, offset: number, x: number): Pair {
  const principle =
    'An equation balances two equal quantities. Undo addition or subtraction first, then multiplication, doing the same thing to both sides.';
  return [
    problem(
      `${item}: solve x + ${offset} = ${x + offset}. What is x?`,
      x,
      `Subtract ${offset} from both sides: x = ${x + offset} − ${offset} = ${x}.`,
      principle,
    ),
    problem(
      `${item}: solve ${multiplier} × x + ${offset} = ${multiplier * (x + 2) + offset}. What is x?`,
      x + 2,
      `Subtract ${offset}, then divide by ${multiplier}: x = (${multiplier * (x + 2) + offset} − ${offset}) ÷ ${multiplier} = ${x + 2}.`,
      principle,
    ),
  ];
}
function pattern(item: string, step: number, start: number): Pair {
  const principle =
    'Compare consecutive terms to find the change. If the same amount is added each time, repeat that addition to extend the pattern.';
  return [
    problem(
      `${item}: ${start}, ${start + step}, ${start + 2 * step}, __. What comes next?`,
      start + 3 * step,
      `Each step adds ${step}, so ${start + 2 * step} + ${step} = ${start + 3 * step}.`,
      principle,
    ),
    problem(
      `${item}: a new pattern begins ${start + 1}, ${start + 1 + step}, ${start + 1 + 2 * step}. What is its fifth term?`,
      start + 1 + 4 * step,
      `The fourth term is ${start + 1 + 3 * step}; the fifth is ${start + 1 + 4 * step}. Add ${step} four times to the first term.`,
      principle,
    ),
  ];
}
function rate(item: string, amount: number, count: number, next: number): Pair {
  const principle =
    'Find the amount for one group first: total ÷ groups. Multiply this unit rate by the new number of groups.';
  return [
    problem(
      `${item}: ${amount} are spread equally across ${count} groups. How many per group?`,
      amount / count,
      `${amount} ÷ ${count} = ${amount / count} per group.`,
      principle,
    ),
    problem(
      `${item}: at that same rate, how many are needed for ${next} groups?`,
      (amount / count) * next,
      `${amount / count} per group × ${next} groups = ${(amount / count) * next}.`,
      principle,
    ),
  ];
}
function elapsed(item: string, hour: number, start: number, minutes: number): Pair {
  const end = start + minutes;
  const principle =
    'Elapsed time is the distance between two clock readings. Count to the next hour first, then add the remaining minutes.';
  return [
    problem(
      `${item}: from ${hour}:${String(start).padStart(2, '0')} to ${hour + Math.floor(end / 60)}:${String(end % 60).padStart(2, '0')}, how many minutes pass?`,
      minutes,
      `${60 - start} minutes reach the next hour${end < 60 ? `, but we stop earlier: ${end} − ${start} = ${minutes}.` : `; then ${end % 60} more. Total: ${60 - start} + ${end % 60} = ${minutes}.`}`,
      principle,
    ),
    problem(
      `${item}: two tasks take ${minutes} minutes each, with a 5-minute rest between them. How many minutes pass altogether?`,
      2 * minutes + 5,
      `${minutes} + 5 + ${minutes} = ${2 * minutes + 5} minutes. Include the rest once.`,
      principle,
    ),
  ];
}
function share(item: string, total: number, numerator: number, denominator: number): Pair {
  const principle =
    'To find a fraction of a quantity, divide by the denominator, then multiply by the numerator. Subtract that share to find the remainder.';
  return [
    problem(
      `${item}: what is ${numerator}/${denominator} of ${total}?`,
      (total * numerator) / denominator,
      `${total} ÷ ${denominator} × ${numerator} = ${(total * numerator) / denominator}.`,
      principle,
    ),
    problem(
      `${item}: ${numerator}/${denominator} of ${total + denominator} have returned. How many are still missing?`,
      ((total + denominator) * (denominator - numerator)) / denominator,
      `${denominator - numerator}/${denominator} are missing. ${total + denominator} ÷ ${denominator} × ${denominator - numerator} = ${((total + denominator) * (denominator - numerator)) / denominator}.`,
      principle,
    ),
  ];
}

// Each story has authored, skill-matched preparation and transfer problems.
// Its original interactive challenge stays between these two steps.
const courses: Record<string, Record<SkillLevel, Pair>> = {
  bridge: {
    foundations: add('Elian measures spare timbers in feet', 2, 3, 4),
    developing: add('The river landing needs timber lengths in feet', 8, 12, 10),
    stretch: add('The far bank needs support lengths in feet', 15, 18, 24),
  },
  cistern: {
    foundations: fractions('The smaller moonwater bowl', 4, 1, 1),
    developing: fractions('The moonwater channels', 8, 2, 1),
    stretch: fractions('The silver reservoir', 12, 3, 2),
  },
  guardian: {
    foundations: groups('The owl’s practice sparks', 3, 4),
    developing: groups('The owl’s outer wards', 4, 8),
    stretch: groups('The owl’s crystal rings', 7, 9),
  },
  'copper-lift': {
    foundations: subtract('The lift’s counterweights in stones', 10, 4, 3),
    developing: subtract('The lift’s counterweights in stones', 72, 28, 11),
    stretch: subtract('The lift’s signed charge', 6, -9, 5),
  },
  gearworks: {
    foundations: groups('The keeper’s spare brass gears', 3, 4),
    developing: groups('The keeper’s gear trays', 6, 7),
    stretch: percent('The keeper’s damaged gear teeth', 60, 25),
  },
  'forge-floor': {
    foundations: rectangle('The mosaic’s practice panel', 2, 3),
    developing: rectangle('The mosaic’s copper border', 5, 6),
    stretch: equation('The mason’s missing tile count', 3, 6, 4),
  },
  'harbor-trade': {
    foundations: subtract('A purchase at the rope stall, in coins', 15, 8, 4),
    developing: percent('The rope merchant’s discount', 50, 20),
    stretch: percent('The sailmaker’s discount', 120, 15),
  },
  'tidal-mark': {
    foundations: conversion('Elian’s measuring rope', 3, 100, 'meters', 'centimeters'),
    developing: conversion('The tidal measuring cord', 0.5, 100, 'meters', 'centimeters'),
    stretch: conversion('The lantern path', 0.75, 1000, 'kilometers', 'meters'),
  },
  'lantern-garden': {
    foundations: fractions('The lantern’s oil in liters', 4, 1, 1),
    developing: mixedFractions('The lantern’s oil in liters', 2, 6),
    stretch: equation('The gardener’s lantern oil measure', 2, 3, 5),
  },
  'mirrors-well': {
    foundations: subtract('The well keeper’s water in cups', 6, 2, 2),
    developing: mixedFractions('The well keeper’s water in liters', 3, 6),
    stretch: fractions('The well keeper’s water in liters', 4, 5, 2),
  },
  'scarab-caravan': {
    foundations: groups('The scarabs’ supply packets', 3, 5),
    developing: rate('The caravan’s supply packets', 24, 4, 7),
    stretch: percent('The caravan’s donated supplies', 80, 35),
  },
  'prism-gate': {
    foundations: groups('The gate’s separate triangles, each with 3 edges', 3, 3),
    developing: rectangle('The gate’s rectangular glass inset', 3, 5),
    stretch: equation('The gatekeeper’s angle equation', 2, 30, 25),
  },
  'borrowed-hours': {
    foundations: elapsed('The archive’s reading clock', 2, 5, 15),
    developing: elapsed('The archive’s reading clock', 3, 45, 35),
    stretch: add('The archive’s temperature in degrees Celsius', -6, 10, -3),
  },
  'frostbound-index': {
    foundations: share('The returning book pages', 12, 1, 2),
    developing: share('The returning book pages', 32, 3, 4),
    stretch: share('The returning book pages', 80, 5, 8),
  },
  'door-of-thaw': {
    foundations: groups('The threshold’s rows of tiles', 2, 5),
    developing: rectangle('The thawing threshold', 4, 6),
    stretch: equation('The threshold’s missing dimension', 4, 8, 5),
  },
  'starless-ferry': {
    foundations: add('The ferry route in star-lengths', 6, 4, 3),
    developing: subtract('The ferry’s signed coordinates', 4, -3, 2),
    stretch: subtract('The ferry’s signed coordinates', 2.5, -1.25, 0.5),
  },
  'orrery-keeper': {
    foundations: groups('The orrery’s equal rings of lights', 3, 6),
    developing: share('The orrery’s unlit stars', 60, 1, 4),
    stretch: percent('The orrery’s unlit stars', 80, 35),
  },
  'unwritten-star': {
    foundations: pattern('The star’s pulsing lights', 3, 2),
    developing: equation('The star’s hidden number', 3, 4, 6),
    stretch: equation('The star’s sealed inscription', 4, 7, 5),
  },
  'honey-debt': {
    foundations: groups('The bee queen’s honey spoonfuls', 2, 4),
    developing: mixedFractions('The bee queen’s honey in jars', 3, 6),
    stretch: percent('The bee queen’s honey tithe', 120, 25),
  },
  'snails-bargain': {
    foundations: groups('The snail merchant’s equal ribbons in meters', 2, 3),
    developing: conversion('The snail merchant’s ribbon', 1.25, 100, 'meters', 'centimeters'),
    stretch: rate('The snail merchant’s ribbon in meters', 3, 5, 10),
  },
  'remembering-seed': {
    foundations: pattern('The remembering seeds’ glow', 2, 3),
    developing: pattern('The remembering seeds’ glow', 4, 3),
    stretch: equation('The seed’s buried number', 3, 9, 4),
  },
};

export function storySteps(
  encounter: Encounter,
  level: SkillLevel,
): [StoryStep, StoryStep, StoryStep] {
  const pair = courses[encounter.id]?.[level];
  if (!pair) throw new Error(`Missing story lessons: ${encounter.id} / ${level}`);
  const step = (p: Problem, title: string): StoryStep => ({
    title,
    challenge: { kind: 'number', question: p.question, answer: p.answer },
    hint: [p.principle],
    lesson: p.explanation,
  });
  return [
    step(pair[0], 'Find your footing'),
    {
      title: 'Put it into practice',
      challenge: encounter.challenge,
      hint: encounter.hint,
      lesson: encounter.lesson,
    },
    step(pair[1], 'Carry the idea further'),
  ];
}
