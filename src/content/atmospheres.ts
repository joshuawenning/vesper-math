// Only the paper and its ambient washes change. Reading and control colors stay consistent.
export const worldAtmospheres = {
  'flooded-observatory': {
    dark: { canvas: '#101c1a', glow: '#29443b66', undertone: '#25414a33' },
    light: { canvas: '#f0ebdb', glow: '#cbd8be33', undertone: '#bfd5d71a' },
  },
  'ember-foundry': {
    dark: { canvas: '#1d1714', glow: '#50382255', undertone: '#67342122' },
    light: { canvas: '#f3e9d8', glow: '#dfc6a333', undertone: '#d7ad831a' },
  },
  'tideglass-coast': {
    dark: { canvas: '#111c20', glow: '#24454c55', undertone: '#34496733' },
    light: { canvas: '#eaeedf', glow: '#c1d8d233', undertone: '#b9cedc1a' },
  },
  'glass-desert': {
    dark: { canvas: '#21191b', glow: '#573a4255', undertone: '#5b3c2b33' },
    light: { canvas: '#f3e6db', glow: '#dfc1b933', undertone: '#dfd0ad1a' },
  },
  'winter-archive': {
    dark: { canvas: '#151b23', glow: '#2d405a55', undertone: '#41465d33' },
    light: { canvas: '#eaecef', glow: '#c7d5e233', undertone: '#c9c9df1a' },
  },
  'astral-vault': {
    dark: { canvas: '#1b1724', glow: '#46345c55', undertone: '#34305433' },
    light: { canvas: '#eee8ed', glow: '#d4c4df33', undertone: '#c6c7df1a' },
  },
  'hollow-orchard': {
    dark: { canvas: '#1c191b', glow: '#48374855', undertone: '#34433333' },
    light: { canvas: '#eee7df', glow: '#d9c6cc33', undertone: '#c6d2b61a' },
  },
} as const;

export function getAtmosphere(worldId: string, theme: 'dark' | 'light') {
  const paper = Object.hasOwn(worldAtmospheres, worldId)
    ? worldAtmospheres[worldId as keyof typeof worldAtmospheres]
    : worldAtmospheres['flooded-observatory'];
  return paper[theme];
}
