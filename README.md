# Vesper

An illustrated math adventure, built with Next.js 16 App Router, React 19, and TypeScript. Exploration comes first; the opening chapter covers addition and measurement, fractions and equivalence, and division with two guardian tactics.

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

If a local Homebrew libvips installation causes sharp to build from source, install with `SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm ci`. This is not needed on Vercel or standard GitHub runners.

## Validation

```sh
npm test
npm run typecheck
npm run build
```

GitHub Actions runs all three checks on pushes and pull requests. The lockfile pins the tested dependency tree.

## Publish with Vercel

1. Import this repository at <https://vercel.com/new>.
2. Select the intended account or team and the **Next.js** framework preset.
3. Keep the repository root as the root directory. Default install and build commands work; no environment variables are needed.
4. Deploy. Vercel can then deploy each push to `main` and create previews for pull requests.

This project uses native Next.js image optimization and does not use `output: export`. No Sites hosting manifest or credentials are included.

## Project structure

| Path | Responsibility |
| --- | --- |
| `src/app` | Server-rendered route, metadata, self-hosted Next fonts, global styles |
| `src/components/game.tsx` | Client game state and navigation boundary |
| `src/components/game-dialog.tsx` | Dialog content, loaded on demand |
| `src/components/encounters` | Focus-preserving React challenge components |
| `src/content/merewood.ts` | Chapter narrative, hints, rewards, artwork references, and challenge configuration |
| `src/content/artwork.ts` | Shared illustrations and accessible descriptions |
| `src/lib` | Typed contracts, answer validation, save normalization |
| `public/art` | Separate optimized WebP artwork, including a distinct preferences scene |
| `tests` | Math validation and legacy/corrupt save handling |

To extend the adventure, add chapter data using the `Chapter` type. Existing challenge configurations accept different quantities without rewriting their React components. Add a new challenge kind and validator only when introducing a new interaction. The Merewood shell and ending are chapter-specific; a second chapter should add its own layout and save namespace. The visual fraction-pouring control currently describes quarters and should receive new fraction wording when introducing other denominators.

## Performance

- The route is statically prerendered; only interactive game controls hydrate.
- The illustrated scene is rendered through a server component and passed into the client shell.
- `next/image` supplies responsive sizes, caching, blur placeholder for the main scene, and lazy loading for secondary images. Source images are capped at 1536 px to avoid oversized variants.
- The main scene is preloaded; the modal interface is split into a separate JavaScript chunk and is requested when opened.
- Artwork is served as separate WebP files, never embedded into the HTML. The six original PNG scenes were reduced from 23.0 MB to 3.35 MB (85% smaller), before adding the new preferences illustration.
- `next/font` self-hosts the two font families with swap behavior; the browser makes no runtime Google Fonts requests.
- No UI framework, animation library, game engine, analytics, account service, or database is required.

The verified production HTML response was about 20 KB, compared with the previous 51.5 MB standalone HTML. This comparison measures HTML only, not total page transfer. JavaScript, fonts, and requested images are separate cached resources.

## Saves and migration

The existing `vesper-save-v1` shape and storage key remain compatible. Saves are validated before use; invalid or out-of-order data cannot unlock later encounters. Hints have no penalty.

Browser storage is specific to an origin. A save from a `file:` URL or a different port/domain cannot automatically appear on the Vercel domain. Preferences supports export/import of a small JSON file for moving between origins and devices. Existing legacy saves already stored at the same origin load automatically. A hosting move is not cross-device synchronization.

## Art

All included scenes are original AI-generated illustrations from the built-in image generation tool. `ART-PROMPTS.json` records the prompts. User-supplied reference images are not bundled. Preferences depicts a wayfarer's outfitting alcove; the journal retains its separate book-and-maps illustration.

## References

- [Next.js installation and App Router](https://nextjs.org/docs/app/getting-started/installation)
- [Next.js image optimization](https://nextjs.org/docs/app/getting-started/images)
- [Next.js lazy loading](https://nextjs.org/docs/app/guides/lazy-loading)
- [Vercel GitHub deployments](https://vercel.com/docs/git/vercel-for-github)
