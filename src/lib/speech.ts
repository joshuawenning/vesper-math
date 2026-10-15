/** Plain speech text only; never interprets markup or evaluates expressions. */
export function spokenMath(text: string): string {
  return text
    .slice(0, 6000)
    .replace(/([0-9]+)\s*\/\s*([0-9]+)/g, '$1 over $2')
    .replaceAll('¼', ' one quarter ')
    .replaceAll('½', ' one half ')
    .replaceAll('¾', ' three quarters ')
    .replaceAll('×', ' times ')
    .replaceAll('÷', ' divided by ')
    .replaceAll('−', ' minus ')
    .replace(/(?<=\d)\s*-\s*(?=\d)/g, ' minus ')
    .replaceAll('=', ' equals ')
    .replaceAll('%', ' percent ')
    .replaceAll('+', ' plus ')
    .replace(/\s+/g, ' ')
    .trim();
}
