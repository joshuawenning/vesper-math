# Artwork catalogue and workflow

All shipped paintings follow [the art direction](art-direction.md). They were generated with the built-in image-generation tool, then reviewed and optimized as WebP files. User-supplied reference cards are not bundled.

## Active artwork

Content registries select paintings; components should not duplicate those paths. World metadata is in `src/content/worlds.ts`; each chapter supplies its story scenes. Shared images live in `artwork.ts`, training images in `training-art.ts`, and reward images in `treasures.ts`.

### Worlds, stories, and shared scenes

The subjects below are concise generation briefs. Combine them with the reusable brief in [art direction](art-direction.md), retaining the setting’s colors without increasing surface detail.

| Painting                                                                | Subject                                                                                                                                 |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| [observatory](../public/art/observatory-painterly.webp)                 | A moonlit, hand-illustrated observatory above a flooded woodland, with a stone crossing, a silver cistern, and an owl guardian.         |
| [journal](../public/art/journal-painterly.webp)                         | A candlelit wayfarer’s journal with a compass, moonwater vial, quill, and maps.                                                         |
| [preferences](../public/art/preferences-painterly.webp)                 | A quiet outfitting alcove with a teal traveling cloak, a brass lantern, spectacles, lenses, and carefully arranged traveling tools.     |
| [bridge](../public/art/bridge-painterly.webp)                           | A broken mossy crossing over teal water, with oak planks and measuring tools on the bank.                                               |
| [cistern](../public/art/cistern-painterly.webp)                         | A moonlit stone cistern, a brass pitcher, and the observatory’s ancient celestial mechanism.                                            |
| [guardian](../public/art/guardian-painterly.webp)                       | A stone owl unfolds its wings over an ancient star chart, in a large quiet shadow.                                                      |
| [foundry](../public/art/foundry-painterly.webp)                         | A loosely painted mountain foundry with brass wheels and warm furnaces.                                                                 |
| [counterweight](../public/art/counterweight-painterly.webp)             | A copper lift suspended beside a mountain workshop, with a brass balancing arm and hanging stone counterweights.                        |
| [brass-chorus](../public/art/brass-chorus-painterly.webp)               | An elderly dwarf gear keeper arranges brass gear teeth at a workbench as a great wheel glows behind her.                                |
| [makers-mosaic](../public/art/makers-mosaic-painterly.webp)             | A teal, ochre, and ivory foundry floor mosaic with a loose final tile and a brass maker’s compass.                                      |
| [coast](../public/art/coast-painterly.webp)                             | A loosely painted moonlit harbor with sailing ships and lanterns.                                                                       |
| [fair-exchange](../public/art/fair-exchange-painterly.webp)             | A harbor merchant offers a coiled rope across a counter with copper coins and brass scales, against a moonlit harbor.                   |
| [tidekeepers-measure](../public/art/tidekeepers-measure-painterly.webp) | A knotted measuring rope spans a gap beside a weathered tidal marker and a moonlit sea causeway.                                        |
| [glass-desert](../public/art/glass-desert-painterly.webp)               | Rose-colored glass dunes surround a ruined mirror palace, with a turquoise serpent winding through the sand.                            |
| [mirrors-well](../public/art/mirrors-well-painterly.webp)               | A woman in saffron robes pours turquoise water between ceramic vessels beside a desert well, watched by glass lizards.                  |
| [scarab-caravan](../public/art/scarab-caravan-painterly.webp)           | A silver-haired man in an indigo cloak tends a giant jewel scarab and smaller beetles carrying woven seed baskets.                      |
| [prism-gate](../public/art/prism-gate-painterly.webp)                   | A many-eyed glass sphinx curls around an amber and teal prism gate amid broken mirrored towers.                                         |
| [winter-archive](../public/art/winter-archive-painterly.webp)           | A library carved into a frozen cliff glows with amber windows, snowy bridges and antlered owl spirits.                                  |
| [borrowed-hours](../public/art/borrowed-hours-painterly.webp)           | An older woman with white braids and a raven tends floating hourglasses in a frozen library chamber.                                    |
| [frostbound-index](../public/art/frostbound-index-painterly.webp)       | A bearded archivist in moss-green robes opens a huge book as luminous moth spirits rise among frozen scrolls.                           |
| [door-of-thaw](../public/art/door-of-thaw-painterly.webp)               | A skeletal stag spirit made of frost carries tiny candle flames in its antlers before a round wooden door.                              |
| [astral-vault](../public/art/astral-vault-painterly.webp)               | An ancient observatory floats among violet nebulae, orbital bridges and luminous ray-like creatures.                                    |
| [starless-ferry](../public/art/starless-ferry-painterly.webp)           | An auburn-haired woman pilots a crescent boat through a sea of stars beside a luminous silver manta spirit.                             |
| [orrery-keeper](../public/art/orrery-keeper-painterly.webp)             | A dark-haired male elf in a plain midnight robe turns a brass orrery while a tiny winged imp watches.                                   |
| [unwritten-star](../public/art/unwritten-star-painterly.webp)           | Ancient stone hands cradle a living golden star as translucent feathered serpents circle an open obsidian reliquary.                    |
| [hollow-orchard](../public/art/hollow-orchard-painterly.webp)           | A moonlit orchard of hollow trees and translucent fruit holding tiny castles, watched by a pomegranate-antlered creature.               |
| [honey-debt](../public/art/honey-debt-painterly.webp)                   | A silver-haired woman beekeeper in plum robes opens an amber honey jar as tiny winged golden keys circle her veil.                      |
| [snails-bargain](../public/art/snails-bargain-painterly.webp)           | A wooden-masked male merchant in a plain wine-red coat measures ribbon beside a giant snail with a brass spiral shell.                  |
| [remembering-seed](../public/art/remembering-seed-painterly.webp)       | An uncanny deer grown from pomegranate rind and twisted roots bows over an open seedpod, with a lantern-heart glowing inside its chest. |

### Elian

| Painting                                                     | Subject                                                                           |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| [Portrait](../public/art/elian-painterly.webp)               | Elian beside a misty lake, a hand resting on her folded map.                      |
| [Arithmetic](../public/art/elian-counting-painterly.webp)    | Sharing counting stones with a halfling traveler on a wooden crossing.            |
| [Times tables](../public/art/elian-tables-painterly.webp)    | Arranging brass moths in equal groups with an elderly dwarf clockmaker.           |
| [Dice](../public/art/elian-dice-painterly.webp)              | Contemplating a die with a quiet fox-headed traveler at a forest stump.           |
| [Library](../public/art/elian-library-painterly.webp)        | Sharing an open book with a scholarly faun; another reader is suggested beyond.   |
| [Lantern garden](../public/art/elian-lantern-painterly.webp) | Pouring moonwater into a lantern beside a quiet sea, with one distant ship light. |

### Character atlas

[`personas-painterly.webp`](../public/art/personas-painterly.webp) is a three-column, two-row atlas with equal square cells, no gutters, and a centered bust in each cell. `src/content/personas.ts` defines the stable selection IDs and positions.

| Row    | Arcanist                                    | Ranger                          | Warden                                              |
| ------ | ------------------------------------------- | ------------------------------- | --------------------------------------------------- |
| Top    | Dark-skinned woman, curly dark hair, purple | Freckled woman, red hair, green | East Asian woman, dark hair, ivory and brass        |
| Bottom | Man with curly dark hair, purple            | Black man with locs, green      | Brown-skinned man with silver hair, ivory and brass |

Keep these identities and positions when revising the painting so saved character selections remain recognizable.

### Collected objects

`public/art/treasures-painterly/` contains twenty-one individual studies, named by encounter ID. The chapter’s `reward` field supplies the item name and `src/content/treasures.ts` maps it to its image. These are small isolated objects on ivory paper, not miniature landscapes or polished product renders. Only the individual cards are shipped; the intermediate generation atlas is unnecessary at runtime.

## Production workflow

1. Identify the content registry entry, story concept, framing, and an existing style reference before generating.
2. Inspect the output for anatomy, essential story objects, restrained detail, and consistency with neighboring paintings. Do not try to rescue an overly detailed rendering with a texture filter.
3. Optimize the selected painting as WebP. Existing scenery is at most 1280px wide, Elian scenes 960px, character atlas 1536px, and reward studies 320px square. Preserve the aspect ratio unless a deliberate crop is needed. Keep useful margins for portraits and cards.
4. Add the accessible description and update the relevant registry. World metadata and chapter scene references must agree. The first world is also statically imported by `src/app/page.tsx` for its initial image placeholder.
5. Check wide and narrow crops, modal illustrations, hidden discovery previews, and journal cards as applicable. Use `next/image` for responsive sizes; do not embed paintings in source or HTML.
6. Run `npm test` and `npm run build`. The artwork inventory check catches missing or unreferenced public images. Delete superseded paintings and unused atlases in the same change; Git history preserves earlier revisions.

The star mark and interface icons are SVG. Edit their source directly instead of generating raster substitutes. `src/app/icon.svg`, `favicon.ico`, and `apple-icon.png` must share the circular star mark; the header uses `components/brand-mark.tsx`.
