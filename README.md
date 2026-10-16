# Vesper Math

> Vesper Math is an illustrated math adventure, built with Next.js. Exploration comes first; seven playable chapters cover operations, fractions, measurements, percentages, geometry, and early equations.

## The current adventure

- **The Flooded Observatory:** three illustrated encounters in the Merewood.
- **The Sleeping Foundry:** three encounters in the Ember Peaks.
- **The Lanterns of Low Tide:** three encounters on the Tideglass Coast.
- **The Palace of Reflections:** three discoveries in the Glass Desert.
- **The Book of Borrowed Hours:** three discoveries in the Winter Archive.
- **The Unwritten Constellation:** three discoveries in the Astral Vault.
- **The Orchard of Borrowed Names:** three discoveries in the Hollow Orchard, with a key-bee keeper, a masked snail merchant, and a pomegranate guardian.
- A current-world selector preserves each trail’s progress. The title returns to the adventure; the atlas provides illustrated context for all seven worlds.
- Discovery cards reveal their artwork in sequence: current and completed discoveries are clear, later ones are blurred.
- Three independent math levels: Foundations, Growing fluency, and Further challenges. Narrative reading level and visual support remain separate.
- Six predefined Arcanist, Ranger, and Warden personas (woman/man variants), a custom name, local discovery history, world endings, and practice totals.

## Elian’s on-device tutor

Open “Speak with Elian.” Ask for an explanation, enter a short calculation, or request a topic quiz. The guide supports arithmetic, fractions, measurements, percentages, basic geometry, and early equations. Example requests: `explain fractions`, `(12 + 6) / 3`, `20% of 80`, `x + 3 = 11`, and `quiz me on geometry`.

This is a focused local tutoring engine, not a large language model. No API key, hosted inference, account, telemetry, or server conversation endpoint is involved. Chat is not persisted. Only answer-attempt and correct-answer totals are saved. The visible interface identifies these boundaries instead of implying unrestricted AI understanding.

### Boundaries and performance

- `lib/tutor.ts` is a pure adapter with explicit context, session, quiz, and response types. Extend topic explanations or quiz generators there; presentation stays in `components/tutor`.
- `lib/math.ts` parses a small arithmetic grammar; it never uses `eval`, `Function`, HTML interpretation, property access, or external tools. Inputs, token count, nesting, numeric magnitude, and division by zero are bounded.
- Chat messages are limited to 400 characters; only the latest 24 messages remain in memory. One quiz is active at a time. Hints and skips do not count as attempts. A correct answer closes the quiz so the same pending question cannot be scored again.
- Names, personas, skill levels, world IDs, progress order, history IDs, and practice totals are validated when importing saves. The profile is local and user-owned, not an authenticated or tamper-proof account.
- Tutor and profile interfaces are separate lazy chunks. New chapter content is imported only when selected. World metadata stays small; chapter narrative and challenges are loaded only when that world is selected.
- One optimized portrait atlas serves all six personas. New scenery is delivered as separate responsive WebP assets.
- Response headers prevent framing and object embedding, constrain base/form destinations, and disable unused camera, microphone, and location permissions. The static route remains prerendered.

Any future cloud tutor should be a separate server adapter with explicit data disclosure, authentication, spending limits, cancellation/timeouts, and server-side validation; no such service is enabled by this version.

## Run

Requires Node.js 20.9 or newer (Node 22 recommended).

```sh
npm ci
npm run dev
```

Open <http://127.0.0.1:4318>. For a production preview:

```sh
npm run build
npm start
```

## Validation

```sh
npm run format:check
npm test
npm run typecheck
npm run build
```

GitHub Actions runs all three checks on pushes and pull requests. The lockfile pins the tested dependency tree.

## Project structure

| Path                             | Responsibility                                                                     |
| -------------------------------- | ---------------------------------------------------------------------------------- |
| `src/app`                        | Server-rendered route, metadata, self-hosted Next fonts, global styles             |
| `src/components/game.tsx`        | Client game state and navigation boundary                                          |
| `src/components/game-dialog.tsx` | Dialog content, loaded on demand                                                   |
| `src/components/encounters`      | Focus-preserving React challenge components                                        |
| `src/content/merewood.ts`        | Chapter narrative, hints, rewards, artwork references, and challenge configuration |
| `src/content/artwork.ts`         | Shared illustrations and accessible descriptions                                   |
| `src/lib`                        | Typed contracts, answer validation, save normalization                             |
| `public/art`                     | Separate optimized WebP artwork, including a distinct preferences scene            |
| `tests`                          | Math validation and legacy/corrupt save handling                                   |

To extend the adventure, add chapter data using the `Chapter` type. Existing challenge configurations accept different quantities without rewriting their React components. Add a new challenge kind and validator only when introducing a new interaction. The shared chapter shell accepts chapter artwork and completion choices. Fraction controls now adapt their labels and fill divisions to the selected denominator.

## Styling and component boundaries

Tailwind utilities live with the component they style. `src/app/globals.css` contains only the Tailwind import, shared color/font/breakpoint tokens, body defaults, and base focus/reduced-motion rules. There are no global component selectors or CSS Modules.

Use `components/ui` for repeated visual patterns rather than copying long utility lists. Build feature UI in `components/adventure`, `components/dialogs`, or `components/encounters`; keep game state and navigation in `game.tsx`. Use complete literal class names for conditional states so Tailwind can discover them. Inline style values are reserved for data-driven positions and quantities (hotspots, plank lengths, progress, and water levels).

The existing 750px and 1100px layout boundaries are preserved with the mobile-first `tablet` and `desktop` variants. The `wide` variant adjusts the outer spacing at 1600px. Prettier formats the source; use `npm run format` after edits. Reach for a CSS Module only for a future behavior that cannot be expressed clearly with Tailwind.

## Performance

- The route is statically prerendered; only interactive game controls hydrate.
- The illustrated scene is rendered through a server component and passed into the client shell.
- `next/image` supplies responsive sizes, caching, blur placeholder for the main scene, and lazy loading for secondary images. Source images are capped at 1536 px to avoid oversized variants.
- The main scene is preloaded; the modal interface is split into a separate JavaScript chunk and is requested when opened.
- Artwork is served as separate WebP files, never embedded into the HTML. Earlier PNG scenes and revised paintings are shipped as separate optimized WebP assets, with smaller versions requested for thumbnails.
- `next/font` self-hosts the two font families with swap behavior; the browser makes no runtime Google Fonts requests.
- No UI framework, animation library, game engine, analytics, account service, or database is required.

HTML contains markup rather than embedded artwork. JavaScript, fonts, and requested images are separate cached resources. Discovery thumbnails load lazily and use responsive image sizes. Global text wrapping uses `text-wrap: pretty`, with normal wrapping as the browser fallback.

## Adding a world

Add lightweight metadata and encounter IDs to `src/content/worlds.ts`, add a typed `Chapter` module, and add its lazy loader. A chapter supplies narrative, artwork, challenges, and completion choices. Existing `number` challenges can supply per-level question/hint/answer variants without introducing a new renderer. `lib/difficulty.ts` adapts the original visual challenges. The world atlas and save validator use the registry.

## Saves and migration

The existing `vesper-save-v1` storage key remains compatible through migration. Legacy discoveries become first-world records with no invented timestamps. Each world has its own progress, ending, and recorded learning levels. Switching worlds preserves the previous path. Resetting a chapter clears only that world’s discoveries and records while retaining the character and other journeys. Saves are validated before use; invalid or out-of-order data cannot unlock later encounters. Hints have no penalty.

Browser storage is specific to an origin. A save from a `file:` URL or a different port/domain cannot automatically appear on the Vercel domain. Preferences supports export/import of a small JSON file for moving between origins and devices. Existing legacy saves already stored at the same origin load automatically. A hosting move is not cross-device synchronization.

## Art

All included scenes are original AI-generated illustrations from the built-in image generation tool. `ART-PROMPTS.json`, `EXPANSION-ART-PROMPTS.json`, `STORY-ART-PROMPTS.json`, and `FINAL-WORLDS-ART-PROMPTS.json`, and `ORCHARD-AND-REVISED-ART-PROMPTS.json` record the prompts. The worlds use visibly drawn ink, gouache, and watercolor textures with a mix of people, creatures, landscapes, and magical objects. User-supplied reference images are not bundled. Preferences depicts a wayfarer's outfitting alcove; the journal retains its separate book-and-maps illustration.

## References

- [Next.js image optimization](https://nextjs.org/docs/app/getting-started/images)
- [Next.js installation and App Router](https://nextjs.org/docs/app/getting-started/installation)
- [Next.js lazy loading](https://nextjs.org/docs/app/guides/lazy-loading)
- [Vercel GitHub deployments](https://vercel.com/docs/git/vercel-for-github)

## Optional language model

Elian currently runs entirely on-device. See [the free-LLM options and integration boundaries](docs/ELIAN-LLM-OPTIONS.md) before choosing an optional provider. No LLM service is enabled by this update.

## World atmosphere and preferences

`components/adventure/world-atmosphere.tsx` combines a small cached SVG paper grain with static color washes from `content/atmospheres.ts`. Each world has dark and light paper colors; foreground and control tokens stay consistent. There is no animation loop, canvas renderer, full-screen image download, or texture generation at runtime. The SVG tile repeats across the page and ignores pointer and accessibility input.

Appearance, learning level, storytelling, and reading pace use visible native radio groups. Read-aloud and visual guidance use keyboard-accessible switches. Text size has A−/A+ controls for the existing standard and 125% settings. Only the longer voice list remains a dropdown. All preferences retain the existing save format.

The earlier portraits, companion, first three world landscapes and their discovery art have been repainted with visible pen contours and watercolor/gouache texture while preserving their concepts. Journal and preference artwork use the same treatment. The six-person portrait atlas retains its layout and persona IDs, so existing characters continue to select the same portrait.

### Story learning and Resolve

Every story now has three challenges at each math level: preparation, the original interactive encounter, and a transfer problem. Each correct answer pauses on a worked explanation. Claiming the discovery requires all three answers and the final explanation; existing discoveries remain complete.

`src/content/story-lessons.ts` supplies authored preparation and transfer questions, with concept hints and worked solutions. When adding a story, add its three skill-level pairs there as well as the chapter data. `src/lib/story-learning.ts` owns the guarded transitions and scoring; the React components render this saved state.

Resolve starts at 10 and stays between 0 and 20. A newly solved challenge restores 2, a distinct incorrect answer costs 1, and opening Elian’s explanation after a mistake restores 1 once per challenge. Empty or invalid text is not penalized, equivalent repeated wrong answers are not charged twice, and completed challenges cannot be farmed. At zero Resolve, story challenges pause until a training round restores it. Discoveries and in-progress steps remain saved. Earlier save files default to 10 Resolve. In-progress challenge level, completed steps, explanation review, and scoring state round-trip with journey exports.

### The wayfarer’s training ground

Training is available before exploration from its courtyard invitation and the Training navigation link. Elian guides addition/subtraction, selectable times tables 1–12, and a D20 dice circle. Each die can be rerolled independently; subtraction places the larger roll first. A short transform animation respects reduced motion, while browser cryptographic randomness chooses the faces independently of the animation.

Each newly solved training round restores 3 Resolve, capped at 20; wrong answers and hints cost nothing. Arithmetic explanations, counting stones, and equal-group visual aids support practice. A pending round, attempts, and solved-round totals are saved and exported. A round pays out only once, and a stale answer cannot claim a newer roll’s reward.

At zero Resolve, both the story action reducer and encounter interface pause advancement. A direct recovery action opens training and returns the player to the paused story after they restore Resolve. Maps, journals, and preferences remain accessible. Training code is a separate lazy interface chunk; its three full-body Elian illustrations are optimized WebP assets with image sizing through Next.js.
