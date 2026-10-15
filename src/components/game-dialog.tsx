'use client';
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import { artwork } from '@/content/artwork';
import type { Artwork, Chapter, DialogView, Ending, Progress } from '@/lib/types';
import Dialog from './dialog';
import { levelEncounter } from '@/lib/difficulty';
const TutorChat = dynamic(() => import('./tutor/tutor-chat'));
const ProfileContent = dynamic(() => import('./profile/profile-content'));
import Preferences from './preferences';
import Button from './ui/button';
import EncounterPanel from './encounters/encounter-panel';
import JournalContent from './dialogs/journal-content';
import WorldMapContent from './dialogs/world-map-content';
import DiscoveryContent from './dialogs/discovery-content';
import { EndingChoice, ChapterComplete } from './dialogs/ending-content';
import { WelcomeContent, RestartContent } from './dialogs/journey-content';

interface Props {
  chapter: Chapter;
  onWorld: (id: string) => Promise<void>;
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
  welcome: {
    title: 'Your journey, your pace',
    label: 'Welcome to Vesper Math',
    artwork: artwork.elian,
  },
  settings: { title: 'Make yourself at home', label: 'Preferences', artwork: artwork.preferences },
  restart: { title: 'Begin again?', label: 'A new beginning', artwork: artwork.preferences },
  companion: { title: 'A word with Elian', label: 'Elian · Cartographer', artwork: artwork.elian },
  profile: { title: 'Your wayfarer', label: 'A story of your own', artwork: artwork.preferences },
  locked: {
    title: 'A path yet to open',
    label: 'A trail yet to open',
    artwork: artwork.observatory,
  },
  map: { title: 'The world atlas', label: 'Paths ahead', artwork: artwork.observatory },
  journal: {
    title: 'The wayfarer’s journal',
    label: 'Collected discoveries',
    artwork: artwork.journal,
  },
  finale: {
    title: 'A future of your making',
    label: 'The final choice',
    artwork: artwork.observatory,
  },
  complete: {
    title: 'The chapter is yours',
    label: 'Chapter I · Complete',
    artwork: artwork.observatory,
  },
} satisfies Record<string, DialogDefinition>;

export default function GameDialog({
  chapter,
  onWorld,
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
  const original = 'id' in view ? chapter.encounters.find((e) => e.id === view.id) : undefined;
  const encounter = original
    ? levelEncounter(
        original,
        progress.done.includes(original.id)
          ? (progress.levels[original.id] ?? 'foundations')
          : progress.skill,
      )
    : undefined;
  let definition =
    view.kind === 'encounter' || view.kind === 'discovery'
      ? encounter
        ? {
            title: encounter.title,
            label: view.kind === 'encounter' ? encounter.skill : `${chapter.region} · Discovery`,
            artwork: encounter.artwork,
          }
        : definitions.locked
      : definitions[view.kind];
  if (view.kind === 'locked' || view.kind === 'finale' || view.kind === 'complete')
    definition = {
      ...definition,
      artwork: chapter.scene ?? artwork.observatory,
      label: `Chapter ${chapter.number ?? 1} · ${chapter.region}`,
    };
  let content: ReactNode;

  switch (view.kind) {
    case 'welcome':
      content = (
        <>
          <WelcomeContent
            chapter={chapter}
            progress={progress}
            onChange={onChange}
            onStart={onStart}
          />
          <Button
            variant="secondary"
            className="mt-3"
            onClick={() => onNavigate({ kind: 'profile' })}
          >
            Choose your character
          </Button>
        </>
      );
      break;
    case 'settings':
      content = (
        <Preferences
          progress={progress}
          onChange={onChange}
          transfer
          onRestart={() => onNavigate({ kind: 'restart' })}
        />
      );
      break;
    case 'restart':
      content = <RestartContent onRestart={onRestart} onDismiss={onDismiss} />;
      break;
    case 'profile':
      content = <ProfileContent progress={progress} onChange={onChange} onDismiss={onDismiss} />;
      break;
    case 'companion':
      content = <TutorChat progress={progress} onChange={onChange} />;
      break;
    case 'locked':
      content = (
        <>
          <p className="mb-5 font-story text-xl leading-[1.5]">
            Follow the earlier trail before reaching this place. Your next destination is{' '}
            {next?.title ?? chapter.title}.
          </p>
          <Button onClick={onContinue}>Follow the path →</Button>
        </>
      );
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
                  : 'Decide this place’s future'
            }
            onNext={
              next ? onDismiss : () => onNavigate({ kind: progress.ending ? 'journal' : 'finale' })
            }
            onDismiss={onDismiss}
          />
        );
      break;
    case 'map':
      content = (
        <WorldMapContent
          chapter={chapter}
          progress={progress}
          onEncounter={onEncounter}
          onWorld={onWorld}
        />
      );
      break;
    case 'journal':
      content = (
        <JournalContent
          chapter={chapter}
          progress={progress}
          onWorld={onWorld}
          onFinale={() => onNavigate({ kind: 'finale' })}
          onAtlas={() => onNavigate({ kind: 'map' })}
        />
      );
      break;
    case 'finale':
      content = <EndingChoice chapter={chapter} onEnding={onEnding} />;
      break;
    case 'complete':
      content = (
        <ChapterComplete
          chapter={chapter}
          ending={progress.ending}
          progress={progress}
          onWorld={onWorld}
          onAtlas={() => onNavigate({ kind: 'map' })}
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
