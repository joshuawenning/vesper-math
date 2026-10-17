# Artwork catalogue and workflow

All shipped paintings follow [the art direction](art-direction.md). They were generated with the built-in image-generation tool, then reviewed and optimized as WebP files. User-supplied reference cards are not bundled.

## Active artwork

Content registries select paintings; components should not duplicate those paths. World metadata is in `src/content/worlds.ts`; each chapter supplies its story scenes. Shared images live in `artwork.ts`, training images in `training-art.ts`, and reward images in `treasures.ts`.

### Welcome page

The homepage uses two original viewpoints, separate from playable scenes: `merewood-arrival-painterly.webp` shows a russet-cloaked wayfarer holding a lantern at a willow-lined mere, facing a distant light; `elian-waystation-painterly.webp` shows Elian with a map, lantern, and heron at a wayside shelter. Both are 1536px-wide WebP panoramas registered in `artwork.ts`, composed with quiet left-hand space for text. The hero crops toward the right on mobile; the footer puts its painting above the text at narrow widths. Keep the game’s observatory reveal out of the welcome hero.

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

### Character setup

[`elian-path-forward-painterly.webp`](../public/art/elian-path-forward-painterly.webp) is the dedicated “Who walks this road?” painting: Elian gestures toward a woodland path with an adult traveling companion. It is registered as `artwork.elianPathForward`, optimized to 960px wide, and used only on the character step. The existing Elian portrait remains in use elsewhere.

Generated with the built-in image tool, using `elian-painterly.webp` as the character and medium reference. Final prompt:

> Use case: illustration-story. Create a NEW portrait-oriented fantasy painting for the 'Who walks this road?' character-creation page. Approximately 4:5 portrait composition. The supplied image is a STYLE AND CHARACTER reference, not an edit target: preserve Elian's identity as an adult woman with chestnut wavy hair, calm thoughtful beautiful face, plain ivory tunic, faded teal cloak. Scene: Elian and an adult male traveling companion stand together at the beginning of a winding woodland path. Elian is three-quarter figure in the foreground, turned toward her companion with a quiet encouraging expression; one natural hand makes a simple open-palmed gesture toward the path ahead, the other holds a loosely folded map at her side. Her companion is a dark-skinned adult man with short curly hair, a plain faded ochre travel cloak and satchel, seen in three-quarter back view, listening and looking in the direction she shows. Their body language is grounded, gentle, mutually respectful. The path curves between softly suggested ancient willows into silver-green mist and a small patch of pale dawn sky. Keep both figures and the gesture comfortably INSIDE a centered 4:5 crop, with breathing space around heads and hands. No recognizable game building or quest object. Medium MUST match the reference: restrained thin watercolor and gouache on warm ivory paper, broad simplified shapes, irregular selective pencil contours, economical faces, softly incomplete edges and uneven pigment; suggest more than describe, an evocative 1990s fantasy book painting. Natural anatomy, simple clothing, muted teal/ochre/sage colors, no elaborate detail. NO polished AI concept art, hyper-detailed leaves, photographic skin, ornate embroidery, glamor lighting, glitter, cartoon expressions, cute quirky creatures, lettering, frame or watermark.

### Math level and experience intros

Both paintings were made with the built-in image tool using `elian-painterly.webp` as the identity and medium reference, then optimized to 960 × 1200 WebP. Each onboarding step declares its own illustration in the step definition.

- [`elian-math-level-painterly.webp`](../public/art/elian-math-level-painterly.webp): Elian arranges counting stones in a cloister garden; registered as `artwork.elianMathLevel`.
- [`elian-experience-painterly.webp`](../public/art/elian-experience-painterly.webp): Elian reads to an elf traveler in a library alcove; registered as `artwork.elianExperience`.

<details>
<summary>Math level — final generation prompt</summary>

> Use case: illustration-story. New original portrait 4:5 fantasy painting for the Math level / Find your footing introduction. Reference image is ONLY Elian's identity and the loose painting medium, not a scene to copy. Elian is an adult woman with chestnut wavy hair, plain ivory tunic and faded teal cloak. In a quiet overgrown cloister garden, she kneels beside a broad low stone table, thoughtfully arranging simple smooth ochre counting stones into small equal groups. A plain wooden measuring rod and a loosely drawn circle on a small slate sit nearby. Her pose should be natural and distinct from the reference portrait: torso slightly leaning forward, face lowered in concentration, one relaxed hand moving a single stone. Keep the math objects readable but sparse; do not draw any words, numerals or equations. Beyond the table, three worn stone steps lead into a pale green wash of garden and sky. Center her face, hands and table comfortably inside a portrait 4:5 crop. Thin watercolor and gouache on warm ivory paper, broad simplified forms, selective irregular pencil lines, uneven restrained pigment, soft unfinished edges, economical natural face and hands. Evocative 1990s fantasy book illustration, muted sage, teal, ochre and stone grey. Suggest more than describe. Avoid photographic realism, glossy rendering, ornate embroidery, excessive leaves or surface detail, glitter, cute quirky characters, dramatic cinematic light, lettering, frames and watermarks.

</details>

<details>
<summary>Your experience — final generation prompt</summary>

> Use case: illustration-story. New original portrait 4:5 fantasy painting for the Your experience / Make yourself at home introduction: storytelling and accessible reading. The reference is ONLY the identity of Elian and the painting medium. Elian is an adult woman with chestnut wavy hair, a plain ivory tunic and faded teal cloak. NEW distinct setting and pose: she sits sideways in a simple wooden chair in a quiet old library alcove, reading an open large book aloud to a thoughtful adult male elf traveler seated nearby, who leans back and listens. Elian's face is turned toward her listener with a calm natural expression; one hand supports the book, the other rests gently on the page. Her companion has short grey hair, a simple muted plum robe and subtle pointed ears, dignified rather than quirky. A small brass reading lamp illuminates the open book; a pair of plain reading spectacles rests on the table. One tall arched window suggests dusk-blue woodland beyond, with loosely blocked-in shelves dissolving into warm paper. Keep faces, natural hands and book well within a centered 4:5 crop, show enough of both seated figures to express the interaction. No legible lettering. Restrained thin watercolor and gouache on warm ivory paper, broad simplified shapes, irregular selective pencil contours, economical faces, uneven washes and softly unfinished edges, evocative old fantasy paperback illustration. Muted teal, plum, ochre, warm grey; quiet lamplight, not cinematic. Suggest more than describe. No photographic skin, glossy digital detail, ornate embroidery, intricate book decoration, cute expressions, glitter, text, frames or watermark.

</details>

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
4. Add the accessible description and update the relevant registry. World metadata and chapter scene references must agree. The first world is also statically imported by `src/app/adventure/page.tsx` for its initial image placeholder; the welcome hero imports its separate arrival painting.
5. Check wide and narrow crops, modal illustrations, hidden discovery previews, and journal cards as applicable. Use `next/image` for responsive sizes; do not embed paintings in source or HTML.
6. Run `npm test` and `npm run build`. The artwork inventory check catches missing or unreferenced public images. Delete superseded paintings and unused atlases in the same change; Git history preserves earlier revisions.

The star mark and interface icons are SVG. Edit their source directly instead of generating raster substitutes. `src/app/icon.svg`, `favicon.ico`, and `apple-icon.png` must share the circular star mark; the header uses `components/brand-mark.tsx`.
