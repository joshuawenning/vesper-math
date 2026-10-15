export type Reading = 'rich' | 'plain';
export type Support = 'guided' | 'light';
export type Ending = 'beacon' | 'refuge';
export type IconName =
  'star' | 'moon' | 'bridge' | 'book' | 'map' | 'settings' | 'leaf' | 'arrow' | 'pin' | 'check';
export type Challenge =
  | { kind: 'sum'; planks: number[]; count: number; target: number; unit: string }
  | { kind: 'fraction'; start: number; target: number; denominator: number }
  | {
      kind: 'division';
      total: number;
      routes: { id: string; label: string; groups: number; action: string; question: string }[];
    };
export interface Artwork {
  src: string;
  alt: string;
  portrait?: boolean;
}
export interface Encounter {
  id: string;
  title: string;
  subtitle: string;
  skill: string;
  icon: IconName;
  artwork: Artwork;
  rich: string;
  plain: string;
  hint: string[];
  lesson: string;
  discovery: string;
  reward: string;
  challenge: Challenge;
}
export interface Chapter {
  id: string;
  title: string;
  region: string;
  intro: Record<Reading, string>;
  encounters: Encounter[];
}
export interface Progress {
  done: string[];
  reading: Reading;
  support: Support;
  started: boolean;
  ending: Ending | null;
}
export type DialogView =
  | {
      kind:
        | 'welcome'
        | 'settings'
        | 'map'
        | 'journal'
        | 'companion'
        | 'finale'
        | 'complete'
        | 'restart';
    }
  | { kind: 'encounter' | 'discovery' | 'locked'; id: string };
export type ChapterStatus = 'done' | 'current' | 'locked';
