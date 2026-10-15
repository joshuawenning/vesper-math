'use client';
import type { ReactNode } from 'react';
import { chapter } from '@/content/merewood';
import { artwork } from '@/content/artwork';
import type { Artwork, DialogView, Ending, Progress } from '@/lib/types';
import Dialog from './dialog';
import Preferences from './preferences';
import Button from './ui/button';
import EncounterPanel from './encounters/encounter-panel';
import JournalContent from './dialogs/journal-content';
import WorldMapContent from './dialogs/world-map-content';
import DiscoveryContent from './dialogs/discovery-content';
import { EndingChoice, ChapterComplete } from './dialogs/ending-content';
import {
  WelcomeContent,
  CompanionContent,
  LockedContent,
  RestartContent,
} from './dialogs/journey-content';

interface Props {
  view: DialogView;
  progress: Progress;
  onChange: (value: Progress) => void;
  onDismiss: () => void;
  onNavigate: (view: DialogView) => void;
  onEncounter: (id: string) => void;
  onContinue: () => void;
  onStart: () => void;
  onComplete: (id: string) => void;
  onEnding: (ending: Ending) => void;
  onRestart: () => void;
}

interface DialogDefinition {
  title: string;
  label: string;
  artwork: Artwork;
}
const definitions = {
  welcome: { title: 'Your journey, your pace', label: 'Welcome to Vesper', artwork: artwork.elian },
  settings: { title: 'Make yourself at home', label: 'Preferences', artwork: artwork.preferences },
  restart: { title: 'Begin again?', label: 'A new beginning', artwork: artwork.preferences },
  companion: { title: 'A word with Elian', label: 'Elian · Cartographer', artwork: artwork.elian },
  locked: { title: 'A path yet to open', label: chapter.title, artwork: artwork.observatory },
  map: { title: 'The Merewood', label: 'Your chart · Chapter I', artwork: artwork.observatory },
  journal: {
    title: 'The wayfarer’s journal',
    label: 'Collected discoveries',
    artwork: artwork.journal,
  },
  finale: {
    title: 'A light for the living',
    label: 'Chapter I · The final choice',
    artwork: artwork.observatory,
  },
  complete: {
    title: 'The chapter is yours',
    label: 'Chapter I · Complete',
    artwork: artwork.observatory,
  },
} satisfies Record<string, DialogDefinition>;

export default function GameDialog({
  view,
  progress,
  onChange,
  onDismiss,
  onNavigate,
  onEncounter,
  onContinue,
  onStart,
  onComplete,
  onEnding,
  onRestart,
}: Props) {
  const next = chapter.encounters.find((e) => !progress.done.includes(e.id));
  const encounter = 'id' in view ? chapter.encounters.find((e) => e.id === view.id) : undefined;
  const definition =
    view.kind === 'encounter' || view.kind === 'discovery'
      ? encounter
        ? {
            title: encounter.title,
            label: view.kind === 'encounter' ? encounter.skill : 'The Merewood · Discovery',
            artwork: encounter.artwork,
          }
        : definitions.locked
      : definitions[view.kind];
  let content: ReactNode;

  switch (view.kind) {
    case 'welcome':
      content = <WelcomeContent progress={progress} onChange={onChange} onStart={onStart} />;
      break;
    case 'settings':
      content = (
        <>
          <Preferences progress={progress} onChange={onChange} transfer />
          <Button variant="secondary" onClick={() => onNavigate({ kind: 'restart' })}>
            Start a fresh journey…
          </Button>
        </>
      );
      break;
    case 'restart':
      content = <RestartContent onRestart={onRestart} onDismiss={onDismiss} />;
      break;
    case 'companion':
      content = <CompanionContent next={next} onContinue={onContinue} />;
      break;
    case 'locked':
      content = <LockedContent id={view.id} onContinue={onContinue} />;
      break;
    case 'encounter':
      if (encounter)
        content = (
          <EncounterPanel
            key={encounter.id}
            encounter={encounter}
            progress={progress}
            onComplete={onComplete}
          />
        );
      break;
    case 'discovery':
      if (encounter)
        content = (
          <DiscoveryContent
            encounter={encounter}
            action={
              next
                ? 'Continue exploring'
                : progress.ending
                  ? 'Read your journal'
                  : 'Decide the observatory’s future'
            }
            onNext={
              next ? onDismiss : () => onNavigate({ kind: progress.ending ? 'journal' : 'finale' })
            }
            onDismiss={onDismiss}
          />
        );
      break;
    case 'map':
      content = <WorldMapContent progress={progress} onEncounter={onEncounter} />;
      break;
    case 'journal':
      content = <JournalContent progress={progress} />;
      break;
    case 'finale':
      content = <EndingChoice onEnding={onEnding} />;
      break;
    case 'complete':
      content = (
        <ChapterComplete
          ending={progress.ending}
          onJournal={() => onNavigate({ kind: 'journal' })}
        />
      );
      break;
  }
  return (
    <Dialog {...definition} onDismiss={onDismiss}>
      {content}
    </Dialog>
  );
}
