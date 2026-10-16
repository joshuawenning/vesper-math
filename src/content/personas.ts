import type { PersonaId } from '@/lib/types';

export const personaPortraitAtlas = '/art/personas-painterly.webp';

export const personas: {
  id: PersonaId;
  name: string;
  gender: string;
  description: string;
  column: number;
  row: number;
}[] = [
  {
    id: 'arcanist-female',
    name: 'Arcanist',
    gender: 'Woman',
    description: 'A curious student of patterns and quiet magic.',
    column: 0,
    row: 0,
  },
  {
    id: 'ranger-female',
    name: 'Ranger',
    gender: 'Woman',
    description: 'A patient explorer with a watchful eye.',
    column: 1,
    row: 0,
  },
  {
    id: 'warden-female',
    name: 'Warden',
    gender: 'Woman',
    description: 'A steady protector who finds a way forward.',
    column: 2,
    row: 0,
  },
  {
    id: 'arcanist-male',
    name: 'Arcanist',
    gender: 'Man',
    description: 'A curious student of patterns and quiet magic.',
    column: 0,
    row: 1,
  },
  {
    id: 'ranger-male',
    name: 'Ranger',
    gender: 'Man',
    description: 'A patient explorer with a watchful eye.',
    column: 1,
    row: 1,
  },
  {
    id: 'warden-male',
    name: 'Warden',
    gender: 'Man',
    description: 'A steady protector who finds a way forward.',
    column: 2,
    row: 1,
  },
];
export const defaultPersona: PersonaId = 'ranger-female';
export function getPersona(id: string) {
  return personas.find((persona) => persona.id === id) ?? personas[1];
}
export function cleanName(value: unknown): string {
  return typeof value === 'string'
    ? value
        .normalize('NFKC')
        .replace(/[^\p{L}\p{M}\p{N} '\-]/gu, '')
        .slice(0, 24)
        .trim()
    : '';
}
