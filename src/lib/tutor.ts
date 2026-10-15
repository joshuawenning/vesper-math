import { cleanName } from '@/content/personas';
import type { SkillLevel } from './types';
import { approximatelyEqual, calculate, formatNumber } from './math';

export type Topic =
  'arithmetic' | 'fractions' | 'measurement' | 'percentages' | 'geometry' | 'variables';
export interface Quiz {
  id: number;
  topic: Topic;
  prompt: string;
  answer: number;
  hint: string;
  explanation: string;
}
export interface TutorSession {
  question: Quiz | null;
  count: number;
}
export interface TutorContext {
  name: string;
  skill: SkillLevel;
  reading: 'rich' | 'plain';
}
export interface TutorTurn {
  text: string;
  session: TutorSession;
  assessment?: boolean;
}
export const topics: Topic[] = [
  'arithmetic',
  'fractions',
  'measurement',
  'percentages',
  'geometry',
  'variables',
];
const explanations: Record<Topic, string> = {
  arithmetic:
    'Addition combines quantities; subtraction finds a difference. Multiplication counts equal groups; division shares a total into equal groups. For example, 4 groups of 3 hold 12: 4 × 3 = 12, so 12 ÷ 4 = 3.',
  fractions:
    'A fraction describes equal parts of a whole. In 3/4, the whole has 4 equal parts and we have 3 of them. To add 1/2 + 1/4, write 1/2 as 2/4. Then 2/4 + 1/4 = 3/4. Enter fractions with a slash, such as 1/2.',
  measurement:
    'Keep units consistent before combining measurements. One meter is 100 centimeters; one kilometer is 1,000 meters. So 3/4 of a meter is 3/4 × 100 = 75 centimeters. Area uses square units; perimeter uses units of length.',
  percentages:
    'Percent means “out of 100.” To find 20% of 80, calculate 20/100 × 80 = 16. For a 20% discount, subtract that amount from the original price: 80 − 16 = 64.',
  geometry:
    'Perimeter is the distance around a shape. Area measures the surface inside it. A rectangle 3 units wide and 5 long has perimeter 3 + 5 + 3 + 5 = 16 units and area 3 × 5 = 15 square units.',
  variables:
    'A variable stands for an unknown number. Keep both sides of an equation equal. If x + 3 = 11, subtract 3 from both sides: x = 8. If 4 × x = 20, divide both sides by 4: x = 5.',
};
function detectTopic(text: string): Topic | null {
  if (/fraction|denominator|numerator|halves|quarters/.test(text)) return 'fractions';
  if (/percent|discount|%/.test(text)) return 'percentages';
  if (/geometry|perimeter|area|rectangle|triangle/.test(text)) return 'geometry';
  if (/variable|equation|algebra|unknown/.test(text)) return 'variables';
  if (/measur|meter|metre|centimeter|kilometer|unit|length/.test(text)) return 'measurement';
  if (/add|subtract|multipli|divi|arithmetic|negative|operation/.test(text)) return 'arithmetic';
  return null;
}
export function makeQuiz(topic: Topic, level: SkillLevel, seed: number): Quiz {
  const n = Math.abs(seed % 97),
    a = 2 + (n % 7),
    b = 2 + ((n * 3) % 7),
    advanced = level === 'stretch';
  const base = { id: seed, topic };
  if (topic === 'fractions') {
    const d = level === 'foundations' ? 4 : level === 'developing' ? 6 : 8;
    return {
      ...base,
      prompt: `Combine 1/${d} and ${(a % 3) + 1}/${d} of a measure. How much is that? A fraction or decimal is fine.`,
      answer: ((a % 3) + 2) / d,
      hint: 'The parts already have the same denominator. Add the numerators.',
      explanation: `Add the numerators and keep the denominator: ${(a % 3) + 2}/${d}. Equivalent fractions and decimals are accepted.`,
    };
  }
  if (topic === 'measurement')
    return {
      ...base,
      prompt: `A rope measures ${advanced ? `${a}.5` : a} meters. How many centimeters is that?`,
      answer: (advanced ? a + 0.5 : a) * 100,
      hint: 'There are 100 centimeters in each meter.',
      explanation: `${advanced ? a + 0.5 : a} × 100 = ${(advanced ? a + 0.5 : a) * 100} centimeters.`,
    };
  if (topic === 'percentages') {
    const total = a * 20,
      percent = advanced ? 15 : 25;
    return {
      ...base,
      prompt: `A merchant sets aside ${percent}% of ${total} coins. How many coins is that?`,
      answer: (total * percent) / 100,
      hint: advanced
        ? 'Find 10% and 5%, then add them.'
        : '25% is one quarter. Divide the total by 4.',
      explanation: `${percent}/100 × ${total} = ${(total * percent) / 100} coins.`,
    };
  }
  if (topic === 'geometry')
    return {
      ...base,
      prompt: `A rectangular garden is ${a} meters wide and ${b} meters long. What is its ${advanced ? 'area in square meters' : 'perimeter in meters'}?`,
      answer: advanced ? a * b : 2 * (a + b),
      hint: advanced ? 'Multiply width by length.' : 'Count both widths and both lengths.',
      explanation: advanced
        ? `Area = ${a} × ${b} = ${a * b} square meters.`
        : `Perimeter = 2 × (${a} + ${b}) = ${2 * (a + b)} meters.`,
    };
  if (topic === 'variables')
    return {
      ...base,
      prompt: advanced
        ? `Solve ${b} × x = ${a * b}. What is x?`
        : `Solve x + ${b} = ${a + b}. What is x?`,
      answer: a,
      hint: advanced ? `Divide both sides by ${b}.` : `Subtract ${b} from both sides.`,
      explanation: `x = ${a}. Check by putting ${a} back into the original equation.`,
    };
  const x = level === 'developing' ? a * 10 : a;
  return {
    ...base,
    prompt: advanced
      ? `The temperature is −${a}. It rises by ${a + b}. What is it now?`
      : `There are ${x} packs with ${b} supplies each. How many supplies altogether?`,
    answer: advanced ? b : x * b,
    hint: advanced
      ? 'First reach zero, then count what remains.'
      : 'Multiply the number of packs by the supplies in each pack.',
    explanation: advanced ? `−${a} + ${a + b} = ${b}.` : `${x} × ${b} = ${x * b}.`,
  };
}

/** Pure, replaceable tutoring adapter: no network, tools, HTML, or arbitrary code. */
export function tutorReply(raw: string, context: TutorContext, session: TutorSession): TutorTurn {
  if (raw.length > 400)
    return {
      text: 'Let’s take one short math question at a time. Please keep it under 400 characters.',
      session,
    };
  const text = raw.trim(),
    lower = text.toLowerCase(),
    name = cleanName(context.name) ? `, ${cleanName(context.name)}` : '';
  if (!text) return { text: 'What would you like to explore?', session };
  if (/^(hint|help|i don.t know|not sure)\b/.test(lower) && session.question)
    return { text: session.question.hint, session };
  if (/^(skip|stop quiz|cancel quiz)\b/.test(lower))
    return {
      text: `Of course${name}. We can return to it later. Ask me about a math idea, or start a fresh quiz.`,
      session: { ...session, question: null },
    };
  if (/quiz|test me|practice|another question|ask me/.test(lower)) {
    const topic =
      detectTopic(lower) ??
      (context.skill === 'stretch'
        ? 'percentages'
        : context.skill === 'developing'
          ? 'fractions'
          : 'arithmetic');
    const question = makeQuiz(topic, context.skill, session.count + 1);
    return {
      text: `Let’s try this${name}. ${question.prompt}`,
      session: { question, count: session.count + 1 },
    };
  }
  const expression = text
    .replace(/^(?:what is|what.s|calculate|work out|solve)\s+/i, '')
    .replace(/[?=]\s*$/, '')
    .trim();
  const value = calculate(expression);
  if (session.question && value !== null) {
    const correct = approximatelyEqual(value, session.question.answer);
    return {
      text: correct
        ? `That’s right${name}. ${session.question.explanation} Ask for another quiz whenever you’re ready.`
        : `Let’s take another look${name}. ${session.question.hint} Try again, ask for a hint, or say “skip.”`,
      assessment: correct,
      session: correct ? { ...session, question: null } : session,
    };
  }
  if (value !== null)
    return {
      text: `${expression} = ${Math.abs(value - Number(value.toFixed(8))) > 1e-10 ? 'approximately ' : ''}${formatNumber(value)}. You can change the numbers to explore the pattern, or ask me to explain the operation.`,
      session,
    };
  const percent = expression.match(/^(\d+(?:\.\d+)?)%\s+of\s+(\d+(?:\.\d+)?)$/i);
  if (percent && Number(percent[1]) <= 1e6 && Number(percent[2]) <= 1e6)
    return {
      text: `${percent[1]}% means ${percent[1]}/100. Multiply by ${percent[2]}: ${formatNumber((Number(percent[1]) * Number(percent[2])) / 100)}.`,
      session,
    };
  const equation = expression.match(/^x\s*([+\-])\s*(\d{1,6})\s*=\s*(-?\d{1,6})$/i);
  if (equation) {
    const result = Number(equation[3]) + (equation[1] === '+' ? -1 : 1) * Number(equation[2]);
    return {
      text: `Undo ${equation[1] === '+' ? 'addition with subtraction' : 'subtraction with addition'} on both sides. x = ${result}. Substitute ${result} back into the equation to check.`,
      session,
    };
  }
  const topic = detectTopic(lower);
  if (topic)
    return {
      text: `${context.reading === 'rich' ? `Let’s look closely${name}. ` : ''}${explanations[topic]}`,
      session,
    };
  if (/stupid|bad at|can.t do|frustrat|too hard/.test(lower))
    return {
      text: `You can take this slowly${name}. We can use smaller numbers, work one step at a time, and revisit any idea. Choose Foundations in preferences if you’d like a gentler starting point.`,
      session,
    };
  if (/^(hi|hello|hey|thank)/.test(lower))
    return {
      text: `Hello${name}. I can explain arithmetic, fractions, measurements, percentages, geometry, and early equations. Tell me a topic, type a calculation, or ask me to quiz you.`,
      session,
    };
  return {
    text: `I’m an on-device math guide${name}. I understand supported math topics, arithmetic expressions, simple x + a = b equations, and quiz requests. Try “explain fractions,” “(12 + 6) / 3,” or “quiz me on geometry.”`,
    session,
  };
}
