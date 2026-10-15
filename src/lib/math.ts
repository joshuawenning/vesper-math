/** Bounded arithmetic grammar. Never evaluates JavaScript or accesses objects. */
export function calculate(input: string): number | null {
  if (input.length > 160) return null;
  const source = input.replaceAll('×', '*').replaceAll('÷', '/').replaceAll('−', '-').trim();
  if (!source || /[^\d.\s+*/()\-]/.test(source)) return null;
  const tokens = source.match(/(?:\d+(?:\.\d*)?|\.\d+)|[+*/()\-]/g) ?? [];
  if (tokens.length > 48 || tokens.join('') !== source.replace(/\s/g, '')) return null;
  let index = 0;
  function factor(depth: number): number {
    if (depth > 8) throw new Error('Too deep');
    const token = tokens[index++];
    if (token === '+') return factor(depth + 1);
    if (token === '-') return -factor(depth + 1);
    if (token === '(') {
      const value = expression(depth + 1);
      if (tokens[index++] !== ')') throw new Error('Unclosed');
      return value;
    }
    if (!token || !/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(token)) throw new Error('Number expected');
    const value = Number(token);
    if (!Number.isFinite(value) || Math.abs(value) > 1e6) throw new Error('Too large');
    return value;
  }
  function term(depth: number): number {
    let value = factor(depth);
    while (tokens[index] === '*' || tokens[index] === '/') {
      const op = tokens[index++],
        right = factor(depth);
      if (op === '/' && right === 0) throw new Error('Zero divisor');
      value = op === '*' ? value * right : value / right;
      if (!Number.isFinite(value) || Math.abs(value) > 1e9) throw new Error('Too large');
    }
    return value;
  }
  function expression(depth: number): number {
    let value = term(depth);
    while (tokens[index] === '+' || tokens[index] === '-') {
      const op = tokens[index++],
        right = term(depth);
      value = op === '+' ? value + right : value - right;
      if (Math.abs(value) > 1e9) throw new Error('Too large');
    }
    return value;
  }
  try {
    const value = expression(0);
    return index === tokens.length && Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}
export const formatNumber = (number: number) =>
  Number(number.toFixed(8)).toLocaleString('en-US', { maximumFractionDigits: 8 });
export const approximatelyEqual = (a: number, b: number) =>
  Math.abs(a - b) <= 1e-8 * Math.max(1, Math.abs(b));
