'use client';
import { useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { chapter } from '@/content/merewood';
import { encounterStatus, initialProgress } from '@/lib/progress';
import type { DialogView, Ending } from '@/lib/types';
import { useProgress } from './use-progress';
import GameHeader from './game-header';
import ChapterSidebar from './chapter-sidebar';
import ChapterScene from './adventure/chapter-scene';
import StoryStrip from './adventure/story-strip';
import EncounterGrid from './adventure/encounter-grid';
import { MobileCompanionCard } from './adventure/companion-card';
import AdventureFooter from './adventure/adventure-footer';

// The full dialog and challenge interface is fetched only after an interaction.
const GameDialog = dynamic(() => import('./game-dialog'));

export default function Game({ scene }: { scene: ReactNode }) {
  const { progress, setProgress, loaded, storageOK } = useProgress();
  const [view, setView] = useState<DialogView | null>(null);
  const next = chapter.encounters.find((e) => !progress.done.includes(e.id));
  const close = () => setView(null);
  const companion = () => setView({ kind: 'companion' });

  function openEncounter(id: string) {
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
    setProgress((p) => ({ ...p, done: p.done.includes(id) ? p.done : [...p.done, id] }));
    setView({ kind: 'discovery', id });
  }
  function chooseEnding(ending: Ending) {
    setProgress((p) => ({ ...p, ending }));
    setView({ kind: 'complete' });
  }
  function restart() {
    setProgress((p) => ({ ...initialProgress, done: [], reading: p.reading, support: p.support }));
    close();
  }
  return (
    <>
      <GameHeader progress={progress} open={setView} close={close} />
      <div className="mx-auto block max-w-[1600px] px-[15px] pt-[19px] pb-6 tablet:grid tablet:grid-cols-[175px_minmax(0,1fr)] tablet:gap-[23px] tablet:p-[25px] desktop:grid-cols-[208px_minmax(0,1fr)] desktop:gap-[33px] desktop:px-[42px] desktop:pt-[33px] desktop:pb-6 wide:pt-10">
        <ChapterSidebar progress={progress} onCompanion={companion} />
        <main id="adventure">
          <div className="mb-3 flex items-center justify-between gap-3 tablet:mb-[17px]">
            <div className="text-[10px] text-[#91a296]">
              The Merewood <span className="px-[9px] text-[#657a6d]"> / </span> The observatory
            </div>
            <div className="text-[9px] text-[#8ba38d] before:pr-[6px] before:text-[6px] before:content-['●']">
              {!loaded
                ? 'Preparing your journey'
                : storageOK
                  ? 'Progress saved on this device'
                  : 'Progress available this session'}
            </div>
          </div>
          <ChapterScene artwork={scene} progress={progress} onEncounter={openEncounter} />
          <StoryStrip progress={progress} onContinue={continueJourney} />
          <MobileCompanionCard onSpeak={companion} />
          <EncounterGrid progress={progress} onEncounter={openEncounter} />
          <AdventureFooter />
        </main>
      </div>
      {view && (
        <GameDialog
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
