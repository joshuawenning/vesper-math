# Vesper Math

> Vesper Math is an illustrated math adventure, built with Next.js. Exploration comes first; three playable chapters cover operations, fractions, measurements, percentages, geometry, and early equations.

## The current adventure

- **The Flooded Observatory:** three illustrated encounters in the Merewood.
- **The Sleeping Foundry:** three encounters in the Ember Peaks.
- **The Lanterns of Low Tide:** three encounters on the Tideglass Coast.
- Three additional regions appear only as spoiler-light, non-playable previews.
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
- Tutor and profile interfaces are separate lazy chunks. New chapter content is imported only when selected. World metadata and teaser text remain small; no future encounter content is shipped for veiled regions.
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
- Artwork is served as separate WebP files, never embedded into the HTML. The six original PNG scenes were reduced from 23.0 MB to 3.35 MB (85% smaller), before adding the new preferences illustration.
- `next/font` self-hosts the two font families with swap behavior; the browser makes no runtime Google Fonts requests.
- No UI framework, animation library, game engine, analytics, account service, or database is required.

The production HTML response with the current expansion is about 34 KB, compared with the previous 51.5 MB standalone HTML. This comparison measures HTML only, not total page transfer. JavaScript, fonts, and requested images are separate cached resources.

## Adding a world

Add lightweight metadata and encounter IDs to `src/content/worlds.ts`, add a typed `Chapter` module, and add its lazy loader. A chapter supplies narrative, artwork, challenges, and completion choices. Existing `number` challenges can supply per-level question/hint/answer variants without introducing a new renderer. `lib/difficulty.ts` adapts the original visual challenges. The world atlas and save validator use the registry.

## Saves and migration

The existing `vesper-save-v1` storage key remains compatible through migration. Legacy discoveries become first-world records with no invented timestamps. Each world has its own progress, ending, and recorded learning levels. Switching worlds preserves the previous path. Resetting a chapter clears only that world’s discoveries and records while retaining the character and other journeys. Saves are validated before use; invalid or out-of-order data cannot unlock later encounters. Hints have no penalty.

Browser storage is specific to an origin. A save from a `file:` URL or a different port/domain cannot automatically appear on the Vercel domain. Preferences supports export/import of a small JSON file for moving between origins and devices. Existing legacy saves already stored at the same origin load automatically. A hosting move is not cross-device synchronization.

## Art

All included scenes are original AI-generated illustrations from the built-in image generation tool. `ART-PROMPTS.json` and `EXPANSION-ART-PROMPTS.json` record the prompts. User-supplied reference images are not bundled. Preferences depicts a wayfarer's outfitting alcove; the journal retains its separate book-and-maps illustration.

## References

- [Next.js image optimization](https://nextjs.org/docs/app/getting-started/images)
- [Next.js installation and App Router](https://nextjs.org/docs/app/getting-started/installation)
- [Next.js lazy loading](https://nextjs.org/docs/app/guides/lazy-loading)
- [Vercel GitHub deployments](https://vercel.com/docs/git/vercel-for-github)
