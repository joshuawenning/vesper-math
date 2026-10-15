export type SkillLevel = 'foundations' | 'developing' | 'stretch';
export type PersonaId =
  | 'arcanist-female'
  | 'arcanist-male'
  | 'ranger-female'
  | 'ranger-male'
  | 'warden-female'
  | 'warden-male';
export interface PlayerProfile {
  name: string;
  persona: PersonaId;
}
export type Reading = 'rich' | 'plain';
export type Support = 'guided' | 'light';
export type Ending = 'beacon' | 'refuge';
export type IconName =
  'star' | 'moon' | 'bridge' | 'book' | 'map' | 'settings' | 'leaf' | 'arrow' | 'pin' | 'check';
export type Challenge =
  | {
      kind: 'number';
      question: string;
      answer: number;
      unit?: string;
      variants?: Partial<
        Record<SkillLevel, { question: string; answer: number; hint: string[]; lesson: string }>
      >;
    }
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
  number?: number;
  scene?: Artwork;
  subtitle?: string;
  heading?: string;
  completion?: {
    question: string;
    choices: { id: Ending; title: string; description: string; result: string }[];
  };
}
export interface Journey {
  done: string[];
  started: boolean;
  ending: Ending | null;
  levels: Record<string, SkillLevel>;
}
export interface JourneyRecord {
  worldId: string;
  encounterId: string;
  level: SkillLevel;
  at: number | null;
}
export type Theme = 'dark' | 'light';
export interface Progress extends Journey {
  theme: Theme;
  reading: Reading;
  support: Support;
  skill: SkillLevel;
  profile: PlayerProfile;
  worldId: string;
  journeys: Record<string, Journey>;
  history: JourneyRecord[];
  practice: { attempts: number; correct: number };
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
        | 'restart'
        | 'profile';
    }
  | { kind: 'encounter' | 'discovery' | 'locked'; id: string };
export type ChapterStatus = 'done' | 'current' | 'locked';
