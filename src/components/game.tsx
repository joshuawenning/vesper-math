'use client';
import { useEffect, useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { chapter as initialChapter } from '@/content/merewood';
import { loadChapter, getWorld } from '@/content/worlds';
import { encounterStatus, restartCurrentJourney, switchWorld } from '@/lib/progress';
import { applyStudyAction, storyLearning, type StudyAction } from '@/lib/story-learning';
import type { DialogView } from '@/lib/types';
import { useProgress } from './use-progress';
import GameHeader from './game-header';
import ChapterSidebar from './chapter-sidebar';
import ChapterScene from './adventure/chapter-scene';
import StoryStrip from './adventure/story-strip';
import EncounterGrid from './adventure/encounter-grid';
import { MobileCompanionCard } from './adventure/companion-card';
import WorldNavigator from './adventure/world-navigator';
import WorldAtmosphere from './adventure/world-atmosphere';
import AdventureFooter from './adventure/adventure-footer';

// The full dialog and challenge interface is fetched only after an interaction.
const GameDialog = dynamic(() => import('./game-dialog'));

export default function Game({ scene }: { scene: ReactNode }) {
  const { progress, setProgress, loaded, storageOK } = useProgress();
  const [view, setView] = useState<DialogView | null>(null);
  const [chapter, setChapter] = useState(initialChapter);
  const [worldError, setWorldError] = useState('');
  useEffect(() => {
    document.title = `Vesper Math · ${chapter.title}`;
  }, [chapter.title]);
  useEffect(() => {
    let active = true;
    if (progress.worldId !== chapter.id)
      loadChapter(progress.worldId)
        .then((value) => {
          if (active) {
            setChapter(value);
            setWorldError('');
          }
        })
        .catch(() => {
          if (active)
            setWorldError(
              'This world could not be loaded. Open the world map and choose a destination to try again.',
            );
        });
    return () => {
      active = false;
    };
  }, [progress.worldId, chapter.id]);
  async function selectWorld(id: string) {
    const nextChapter = await loadChapter(id);
    setChapter(nextChapter);
    setProgress((p) => switchWorld(p, id));
    setWorldError('');
    setView(null);
  }
  const next = chapter.encounters.find((e) => !progress.done.includes(e.id));
  const close = () => setView(null);
  const companion = () => setView({ kind: 'companion' });

  function openEncounter(id: string) {
    if (chapter.id !== progress.worldId) return;
    const status = encounterStatus(id, progress, chapter);
    if (status !== 'locked') setProgress((p) => ({ ...p, started: true }));
    setView({
      kind: status === 'done' ? 'discovery' : status === 'locked' ? 'locked' : 'encounter',
      id,
    });
  }
  function continueJourney() {
    if (progress.ending) setView({ kind: 'complete' });
    else if (!next) setView({ kind: 'finale' });
    else if (!progress.started) setView({ kind: 'welcome' });
    else openEncounter(next.id);
  }
  function start() {
    setProgress((p) => ({ ...p, started: true }));
    if (next) setView({ kind: 'encounter', id: next.id });
    else continueJourney();
  }
  function study(id: string, action: StudyAction) {
    setProgress((p) => applyStudyAction(p, chapter, id, action));
    const learning = storyLearning(progress, id);
    if (
      action.kind === 'continue' &&
      action.step === 2 &&
      learning.completed === 3 &&
      learning.reviewing
    )
      setView({ kind: 'discovery', id });
  }
  function restart() {
    setProgress(restartCurrentJourney);
    close();
  }
  return (
    <WorldAtmosphere worldId={progress.worldId}>
      <GameHeader progress={progress} open={setView} close={close} />
      <div className="mx-auto block max-w-[1600px] px-[15px] pt-[19px] pb-6 tablet:grid tablet:grid-cols-[200px_minmax(0,1fr)] tablet:gap-[23px] tablet:p-[25px] desktop:grid-cols-[208px_minmax(0,1fr)] desktop:gap-[33px] desktop:px-[42px] desktop:pt-[33px] desktop:pb-6 wide:pt-10">
        <ChapterSidebar chapter={chapter} progress={progress} onCompanion={companion} />
        <main id="adventure" tabIndex={-1}>
          <WorldNavigator chapter={chapter} progress={progress} onWorld={selectWorld} />
          <p className="mb-4 text-[0.75rem] leading-relaxed text-subtle" role="status">
            {!loaded
              ? 'Preparing your journey'
              : storageOK
                ? 'Progress saved on this device'
                : 'Progress available this session'}
          </p>
          {worldError && (
            <p role="alert" className="mb-4 border border-gold/30 p-3 text-gold">
              {worldError}
            </p>
          )}
          {chapter.id !== progress.worldId ? (
            <p role="status" className="p-12 font-story text-2xl text-gold">
              Preparing {getWorld(progress.worldId)?.title}…
            </p>
          ) : (
            <>
              <ChapterScene
                chapter={chapter}
                artwork={
                  chapter.scene ? (
                    <Image
                      className="object-cover object-center saturate-[.82]"
                      src={chapter.scene.src}
                      alt={chapter.scene.alt}
                      fill
                      sizes="(max-width: 750px) 100vw, 1000px"
                      quality={85}
                    />
                  ) : (
                    scene
                  )
                }
                progress={progress}
                onEncounter={openEncounter}
              />
              <StoryStrip chapter={chapter} progress={progress} onContinue={continueJourney} />
              <MobileCompanionCard onSpeak={companion} />
              <EncounterGrid chapter={chapter} progress={progress} onEncounter={openEncounter} />
              <AdventureFooter chapter={chapter} />
            </>
          )}
        </main>
      </div>
      {view && (
        <GameDialog
          chapter={chapter}
          onWorld={selectWorld}
          view={view}
          progress={progress}
          onChange={setProgress}
          onDismiss={close}
          onNavigate={setView}
          onEncounter={openEncounter}
          onContinue={continueJourney}
          onStart={start}
          onStudy={study}
          onRestart={restart}
        />
      )}
    </WorldAtmosphere>
  );
}
