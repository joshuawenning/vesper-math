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

export interface NarrationVoice {
  name: string;
  lang: string;
  voiceURI: string;
  localService: boolean;
  default?: boolean;
}
const novelty =
  /albert|bad news|bahh|bells|boing|bubbles|cellos|good news|hysterical|jester|junior|organ|trinoids|whisper|wobble|zarvox|superstar|deranged/i;
const preferred = /samantha|alex|ava|daniel|karen|moira|rishi|tessa|siri|natural|enhanced|premium/i;
/** One natural on-device English narrator per locale, with US English first. */
export function narrationVoices<T extends NarrationVoice>(voices: readonly T[]): T[] {
  const groups = new Map<string, T>();
  const rank = (voice: T) => (preferred.test(voice.name) ? 10 : 0) + (voice.default ? 1 : 0);
  for (const voice of voices) {
    if (!voice.localService || !/^en(?:-|_)/i.test(voice.lang) || novelty.test(voice.name))
      continue;
    const locale = voice.lang.replace('_', '-').toLowerCase();
    const existing = groups.get(locale);
    if (!existing || rank(voice) > rank(existing)) groups.set(locale, voice);
  }
  const order = ['en-us', 'en-gb', 'en-au', 'en-ca', 'en-ie', 'en-in', 'en-za', 'en-nz'];
  const position = (lang: string) => {
    const i = order.indexOf(lang.replace('_', '-').toLowerCase());
    return i < 0 ? 99 : i;
  };
  return [...groups.values()].sort(
    (a, b) => position(a.lang) - position(b.lang) || a.lang.localeCompare(b.lang),
  );
}
export function narrationVoiceLabel(voice: NarrationVoice): string {
  const region = voice.lang.replace('_', '-').split('-')[1]?.toUpperCase();
  const regions: Record<string, string> = {
    US: 'United States',
    GB: 'United Kingdom',
    AU: 'Australia',
    CA: 'Canada',
    IE: 'Ireland',
    IN: 'India',
    ZA: 'South Africa',
    NZ: 'New Zealand',
    SG: 'Singapore',
  };
  return `${regions[region] ?? voice.lang} · ${voice.name}`;
}
