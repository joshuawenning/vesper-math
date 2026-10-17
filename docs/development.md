# Development guide

## Boundaries

| Location                                                 | Responsibility                                                                     |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `src/app`                                                | Welcome, setup, adventure, and training routes, metadata, fonts, and base styling  |
| `src/components/game.tsx`                                | Adventure navigation and orchestration                                             |
| `src/components/use-progress.ts`                         | Shared browser persistence, appearance, and chat visibility                        |
| `src/components/adventure`, `dialogs`, `encounters`      | Feature interfaces; the full dialog is loaded on demand                            |
| `src/components/training`, `tutor`, `journal`, `profile` | Training, the local guide, collection, and player identity                         |
| `src/content`                                            | Authored worlds, lesson pairs, personas, and illustration registries               |
| `src/lib`                                                | Typed math validation, guarded progression, save normalization, and tutor behavior |
| `tests`                                                  | Math, progression, migration, accessibility contracts, and content integrity       |
| `public/art`                                             | Active optimized paintings only                                                    |

Keep mathematical rules and state transitions in pure library functions. Components render those decisions and handle input and focus. Extend existing boundaries before adding abstractions or dependencies.

## Entry and navigation

`/` is the illustrated introduction. `/begin` has three steps: character, math skill level, then storytelling and accessibility (without the Settings keyboard reference). Appearance stays in Settings; Storytelling and Accessibility use matching section headings in setup. It then enters `/adventure`. Returning players can continue directly from the introduction; existing saves require no migration. Setup edits identity and preferences without resetting discoveries or Resolve. The brand inside the game returns to the current adventure.

`/training` returns to `/adventure`, with optional `resume` (an encounter ID) or `panel` (map, journal, settings, profile) query parameters. Keep these links together when changing routes. The welcome page is rendered on the server; only its saved-journey links need browser state. Character creation and preferences load on the separate setup route. Setup suppresses save-success notices; Settings retains them. Storage failures are still reported in both places.

## Adding content

Register lightweight world metadata and encounter IDs in `src/content/worlds.ts`, provide a typed `Chapter` module, and add its lazy loader. Chapter narrative and challenges load only when needed. Reuse the existing challenge kinds; introduce a renderer and validator only for a genuinely new interaction.

Each story has three learning steps at each skill level: preparation, the interactive encounter, and transfer. Add preparation/transfer pairs in `src/content/story-lessons.ts`, along with hints and worked explanations. `levelEncounter` adapts the original encounter; `applyStudyAction` guards scoring and discovery claims. Add a reward image mapping for each new encounter. Follow [the artwork workflow](artwork.md).

Resolve starts at 7, caps at 20, and pauses story actions at zero. A correct story answer restores 2; a distinct incorrect answer costs 1; reflection restores 1 once after a mistake. Training restores 1 for a newly solved round and does not penalize mistakes. Pending training questions survive reloads and cannot be rerolled until solved. Preserve these rules through library tests rather than duplicating scoring in components.

## Saves and privacy

`vesper-save-v1` stores a local character, settings, independent world journeys, learning steps, and practice totals. `normalizeProgress` validates imported and older saves. Keep the key stable and add migration coverage when changing the format. Start Fresh replaces the entire save with first-visit defaults, clears the in-memory chat and quiz session, and returns to `/begin`. It resets all worlds, character, preferences, training, collected items, learning steps, and quiz history; Resolve returns to 7.

Storage belongs to an origin: a different port, domain, browser, or device has a separate journey. Export/import moves progress between them; it is not account synchronization. There is no authenticated or tamper-proof player account.

Elian is a deterministic on-device math tutor. The bounded parser in `lib/math.ts` never evaluates JavaScript. Conversation stays in memory, with at most 24 messages and 400 characters per input; quiz scoring stays in the verified local engine. No hosted model or external chat endpoint is enabled. See [optional language-model boundaries](elian-llm-options.md) before adding one.

## Styling, accessibility, and performance

Use Tailwind utilities beside the component and shared primitives in `components/ui`. Global CSS owns theme tokens, fonts, base focus behavior, wrapping, and reduced motion. Prefer complete literal utility classes; use inline values for data-driven quantities. The `tablet` and `desktop` breakpoints start at 751px and 1101px.

Maintain native keyboard controls, visible keyboard focus, dialog focus restoration, accessible names, and readable contrast. Focused text inputs stay at least 16px to avoid iPhone zoom. Read-aloud is optional and uses available natural on-device English voices. Appearance follows the system unless explicitly overridden. Motion respects reduced-motion preferences.

The initial adventure route is prerendered. Images use responsive `next/image` delivery; fonts are self-hosted by `next/font`. World metadata stays small and chapter data is lazy. Chat and profile interfaces are split into lazy chunks. Paper atmosphere uses a small repeating SVG and static color washes, with no animation loop. Preserve these boundaries; profile measured bottlenecks before adding memoization or dependencies.

## Validation and deployment

`npm test`, `npm run typecheck`, `npm run format:check`, and `npm run build` are the required checks. `npm run format` fixes formatting. GitHub Actions runs these checks on pushes and pull requests. Use `npm start` after a build for a production preview; development and preview default to port 4318.

The repository is a standard Next.js project for GitHub and Vercel. Import it in Vercel with the Next.js preset and the repository root as the project directory. The default app needs no environment variables. Keep credentials out of source and save exports. Review `next.config.ts` when changing headers or image delivery.

Keep the README short and stable: introduction, essential commands, documentation, and reference links. Put durable implementation guidance in these focused docs and explain individual changes in commits or pull requests, not a growing README release log.
