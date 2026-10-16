// Inventory illustration cells follow the campaign's discovery order.
const ids = [
  'bridge',
  'cistern',
  'guardian',
  'copper-lift',
  'gearworks',
  'forge-floor',
  'harbor-trade',
  'tidal-mark',
  'lantern-garden',
  'mirrors-well',
  'scarab-caravan',
  'prism-gate',
  'borrowed-hours',
  'frostbound-index',
  'door-of-thaw',
  'starless-ferry',
  'orrery-keeper',
  'unwritten-star',
  'honey-debt',
  'snails-bargain',
  'remembering-seed',
] as const;
export const treasureArt: Record<string, string> = Object.fromEntries(
  ids.map((id) => [id, `/art/treasures-painterly/${id}.webp`]),
);
