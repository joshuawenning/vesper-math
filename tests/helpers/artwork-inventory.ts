import { artwork } from '../../src/content/artwork';
import { personaPortraitAtlas } from '../../src/content/personas';
import { trainingArt, libraryArt } from '../../src/content/training-art';
import { treasureArt } from '../../src/content/treasures';
import { loadChapter, worlds } from '../../src/content/worlds';

export async function referencedArtwork(): Promise<Set<string>> {
  const references = new Set([
    ...Object.values(artwork).map((image) => image.src),
    ...Object.values(trainingArt).map((image) => image.src),
    libraryArt.src,
    personaPortraitAtlas,
    ...Object.values(treasureArt),
  ]);
  for (const world of worlds) {
    references.add(world.image);
    const chapter = await loadChapter(world.id);
    if (chapter.scene) references.add(chapter.scene.src);
    for (const encounter of chapter.encounters) references.add(encounter.artwork.src);
  }
  return references;
}
