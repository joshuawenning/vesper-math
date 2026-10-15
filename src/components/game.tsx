'use client';
import { useEffect, useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { chapter as initialChapter } from '@/content/merewood';
import { loadChapter, getWorld } from '@/content/worlds';
import { encounterStatus, emptyJourney, recordDiscovery, switchWorld } from '@/lib/progress';
import type { DialogView, Ending } from '@/lib/types';
import { useProgress } from './use-progress';
import GameHeader from './game-header';
import ChapterSidebar from './chapter-sidebar';
import ChapterScene from './adventure/chapter-scene';
import StoryStrip from './adventure/story-strip';
import EncounterGrid from './adventure/encounter-grid';
import { MobileCompanionCard } from './adventure/companion-card';
import WorldHorizon from './adventure/world-horizon';
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
    if (progress.ending) setView({ kind: 'journal' });
    else if (!next) setView({ kind: 'finale' });
    else if (!progress.started) setView({ kind: 'welcome' });
    else openEncounter(next.id);
  }
  function start() {
    setProgress((p) => ({ ...p, started: true }));
    if (next) setView({ kind: 'encounter', id: next.id });
    else continueJourney();
  }
  function complete(id: string) {
    setProgress((p) => recordDiscovery(p, id, chapter));
    setView({ kind: 'discovery', id });
  }
  function chooseEnding(ending: Ending) {
    setProgress((p) => ({ ...p, ending }));
    setView({ kind: 'complete' });
  }
  function restart() {
    setProgress((p) => ({
      ...p,
      ...emptyJourney(),
      history: p.history.filter((record) => record.worldId !== p.worldId),
      journeys: { ...p.journeys, [p.worldId]: emptyJourney() },
    }));
    close();
  }
  return (
    <>
      <GameHeader progress={progress} open={setView} close={close} />
      <div className="mx-auto block max-w-[1600px] px-[15px] pt-[19px] pb-6 tablet:grid tablet:grid-cols-[200px_minmax(0,1fr)] tablet:gap-[23px] tablet:p-[25px] desktop:grid-cols-[208px_minmax(0,1fr)] desktop:gap-[33px] desktop:px-[42px] desktop:pt-[33px] desktop:pb-6 wide:pt-10">
        <ChapterSidebar chapter={chapter} progress={progress} onCompanion={companion} />
        <main id="adventure">
          <div className="mb-3 flex flex-col items-start justify-between gap-2 desktop:flex-row desktop:items-center desktop:gap-4 tablet:mb-[17px]">
            <div className="text-[0.875rem] leading-relaxed text-subtle">
              {chapter.region} <span className="px-[9px] text-subtle"> / </span> {chapter.title}
            </div>
            <div className="text-[0.875rem] leading-relaxed text-subtle before:pr-[6px] before:text-[0.75rem] before:content-['●']">
              {!loaded
                ? 'Preparing your journey'
                : storageOK
                  ? 'Progress saved on this device'
                  : 'Progress available this session'}
            </div>
          </div>
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
              <WorldHorizon onAtlas={() => setView({ kind: 'map' })} />
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
          onComplete={complete}
          onEnding={chooseEnding}
          onRestart={restart}
        />
      )}
    </>
  );
}
