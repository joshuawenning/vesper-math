import type { Encounter, SkillLevel } from './types';

export function levelEncounter(original: Encounter, level: SkillLevel): Encounter {
  const challenge = original.challenge;
  if (challenge.kind === 'number') {
    const variant = challenge.variants?.[level];
    return variant
      ? {
          ...original,
          hint: variant.hint,
          lesson: variant.lesson,
          challenge: { ...challenge, question: variant.question, answer: variant.answer },
        }
      : original;
  }
  if (level === 'foundations') return original;
  if (challenge.kind === 'sum') {
    const planks = level === 'developing' ? [8, 10, 12, 14, 16] : [15, 18, 21, 24, 27];
    const [a, , b, , c] = planks,
      target = a + b + c;
    const text = `The crossing has a ${target}-foot gap. Choose exactly three timbers whose lengths add up to ${target} feet.`;
    return {
      ...original,
      rich: text,
      plain: text,
      challenge: { ...challenge, planks, target },
      hint: [
        `Choose three lengths that total ${target}.`,
        `Try starting with ${a} feet. The other two need to total ${target - a}.`,
        `${a} + ${b} + ${c} = ${target}.`,
      ],
      lesson: `${a} ft + ${b} ft + ${c} ft = ${target} ft.`,
    };
  }
  if (challenge.kind === 'fraction') {
    const denominator = level === 'developing' ? 8 : 12,
      start = level === 'developing' ? 1 : 2,
      target = level === 'developing' ? 5 : 9;
    const text = `The cistern is ${start}/${denominator} full. Fill it to ${target}/${denominator} using equal measures of 1/${denominator}.`;
    return {
      ...original,
      rich: text,
      plain: text,
      challenge: { ...challenge, denominator, start, target },
      hint: [
        `The whole is divided into ${denominator} equal parts.`,
        `Count from ${start} parts to ${target} parts.`,
        `Add ${target - start} measures of 1/${denominator}.`,
      ],
      lesson: `${target}/${denominator} − ${start}/${denominator} = ${target - start}/${denominator}${level === 'developing' ? ' = 1/2' : ''}.`,
    };
  }
  const total = level === 'developing' ? 48 : 84,
    groups = level === 'developing' ? [4, 6] : [6, 7];
  const text = `The stone owl holds ${total} sparks of magic. Split them into equal groups to quiet the ancient ward.`;
  return {
    ...original,
    rich: text,
    plain: text,
    challenge: {
      ...challenge,
      total,
      routes: challenge.routes.map((r, i) => ({
        ...r,
        groups: groups[i],
        label: i === 0 ? `Cast ${groups[i]} equal pulses` : `Use ${groups[i]} grounding crystals`,
      })),
    },
    hint: [
      'Divide the sparks into equal groups.',
      `Ask: ${groups[0]} × what = ${total}?`,
      `${total} ÷ ${groups[0]} = ${total / groups[0]}; ${total} ÷ ${groups[1]} = ${total / groups[1]}.`,
    ],
    lesson: `${total} ÷ ${groups[0]} = ${total / groups[0]}; ${total} ÷ ${groups[1]} = ${total / groups[1]}.`,
  };
}
