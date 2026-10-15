import type { Topic } from '@/lib/tutor';
export const lessons: Record<Topic, { why: string; example: string; invitation: string }> = {
  arithmetic: {
    why: 'Multiplication counts equal groups: the number of groups tells us how many times to use the amount in one group. Division reverses that process. Addition joins amounts; subtraction finds what is missing or how far apart two amounts are.',
    example:
      'Imagine 4 packs with 3 supplies each. Counting 3 + 3 + 3 + 3 gives 12, so 4 × 3 = 12. Sharing those 12 supplies back into 4 equal packs gives 3 in each: 12 ÷ 4 = 3.',
    invitation: 'Would you like to explore adding, subtracting, multiplying, or dividing?',
  },
  fractions: {
    why: 'The denominator names the size of each equal part; the numerator counts those parts. We need equal-sized pieces before we can add them. Changing 1/2 into 2/4 changes the number and size of the pieces together, so the amount stays the same.',
    example:
      'Fold one strip of paper in half, then fold each half in half again. The same half now contains 2 of the 4 equal pieces: 1/2 = 2/4. Adding one more quarter gives 2/4 + 1/4 = 3/4.',
    invitation:
      'Shall we look at why the bottom number stays the same, or try a small fraction puzzle?',
  },
  measurement: {
    why: 'A unit tells us the size of the pieces we are counting. A centimeter is smaller than a meter, so the same length needs more centimeters. Converting units changes the count, not the actual length.',
    example:
      'Lay 100 one-centimeter pieces along a meter of rope. Two meters need 2 × 100 = 200 pieces. Going back, 200 ÷ 100 = 2 meters. Multiplying and dividing undo each other.',
    invitation: 'Would it help to convert a length together, or compare length and area?',
  },
  percentages: {
    why: 'Percent means parts out of 100. One percent is one hundredth of the whole, so dividing the total by 100 finds 1%. Multiplying that amount by the percentage counts how many hundredths we need.',
    example:
      'For 20% of 80 coins, 1% is 80 ÷ 100 = 0.8 coin. Twenty of those parts make 20 × 0.8 = 16 coins. A 20% discount removes those 16, leaving 80 − 16 = 64 coins.',
    invitation: 'Would you like to try a discount, or see a shortcut using 10%?',
  },
  geometry: {
    why: 'Perimeter follows the edge, so we add side lengths and keep length units. Area covers the inside with unit squares. A rectangle has equal-sized rows of squares, which is why width times length counts its area.',
    example:
      'Draw a garden 3 meters wide and 5 meters long. Its border is 3 + 5 + 3 + 5 = 16 meters. Inside, 3 rows of 5 square-meter tiles cover it: 3 × 5 = 15 square meters.',
    invitation: 'Shall we trace a border, or count squares inside a garden?',
  },
  variables: {
    why: 'An equation says two amounts are equal, like balanced scales. Doing the same operation to both sides keeps them equal. Inverse operations undo each other: subtraction undoes addition, and division undoes multiplication.',
    example:
      'If x + 3 = 11, remove 3 from both sides: x + 3 − 3 = 11 − 3, so x = 8. Check by replacing x with 8: 8 + 3 really is 11.',
    invitation: 'Would you like another balanced-scales example, or a missing-number puzzle?',
  },
};
export const operations = {
  addition:
    'Addition joins amounts. Start with 7 stones and add 5: make 10 with 3 of the new stones, then add the remaining 2. So 7 + 5 = 12. Making a group of 10 can make the counting easier.',
  subtraction:
    'Subtraction can find a missing amount. For 12 − 5, count from 5 up to 12: 5 more reaches 10, then 2 more reaches 12. That is 7 altogether. Check the missing amount by adding: 5 + 7 = 12.',
  multiplication:
    'Multiplication counts equal groups. Four groups of 3 are 3 + 3 + 3 + 3 = 12. We write that as 4 × 3 = 12. You can also split a larger group into smaller ones: 7 × 3 = 5 × 3 + 2 × 3 = 15 + 6 = 21.',
  division:
    'Division shares a total into equal groups, or asks how many equal groups fit. With 12 stones shared among 4 people, each gets 3. Check with multiplication: 4 × 3 = 12. Nothing is left over in this example.',
};
