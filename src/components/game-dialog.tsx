'use client';
import type { ReactNode } from 'react';
import { chapter } from '@/content/merewood';
import { artwork } from '@/content/artwork';
import { encounterStatus, endingText } from '@/lib/progress';
import type { Artwork, DialogView, Ending, Progress } from '@/lib/types';
import Dialog from './dialog';
import Preferences from './preferences';
import Icon from './icon';
import EncounterPanel from './encounters/encounter-panel';

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

export default function GameDialog({ view, progress, onChange, onDismiss, onNavigate, onEncounter, onContinue, onStart, onComplete, onEnding, onRestart }: Props) {
  const next = chapter.encounters.find(e => !progress.done.includes(e.id));
  const encounter = 'id' in view ? chapter.encounters.find(e => e.id === view.id) : undefined;
  let title = chapter.title;
  let label = 'The Flooded Observatory';
  let art: Artwork = artwork.observatory;
  let body: ReactNode;

  switch (view.kind) {
    case 'welcome':
      title = 'Your journey, your pace'; label = 'Welcome to Vesper'; art = artwork.elian;
      body = <><p className="prose">You are a wayfarer with a curious mind. Beside you walks Elian, a cartographer following a light through the trees.</p><p className="muted">Explore the painting or use the encounter cards below it. Work with objects, try ideas, and ask for a hint whenever you need one.</p><Preferences progress={progress} onChange={onChange}/><div className="actions"><button className="primary dark" onClick={onStart}>Enter the Merewood<Icon name="arrow"/></button></div></>;
      break;
    case 'settings':
      title = 'Make yourself at home'; label = 'Preferences'; art = artwork.preferences;
      body = <><Preferences progress={progress} onChange={onChange} transfer/><button className="secondary" onClick={() => onNavigate({ kind: 'restart' })}>Start a fresh journey…</button></>;
      break;
    case 'restart':
      title = 'Begin again?'; label = 'A new beginning'; art = artwork.preferences;
      body = <><p className="prose">Starting again clears this chapter’s discoveries and ending on this device. Your reading preferences will stay.</p><div className="actions"><button className="primary dark" onClick={onRestart}>Start fresh</button><button className="secondary" onClick={onDismiss}>Keep my journey</button></div></>;
      break;
    case 'companion':
      title = 'A word with Elian'; label = 'Elian · Cartographer'; art = artwork.elian;
      body = <><p className="prose">“{next ? 'There is no hurry. Look closely, try an idea, and see what changes. If you get stuck, I will help you find the next step.' : 'You have given this place a future. That is a good day’s work for any traveler.'}”</p><p className="muted">{next ? `Next: ${next.subtitle}. ${next.skill}.` : 'Your discoveries are preserved in the journal.'}</p><button className="primary dark" onClick={onContinue}>{next ? 'Follow the light' : 'Read the journal'}<Icon name="arrow"/></button></>;
      break;
    case 'locked':
      title = 'A path yet to open';
      body = <><p className="prose">{encounter?.id === 'cistern' ? 'Repair the crossing to reach the moonwater cistern.' : 'Wake the moonwater mechanism to reach the chart chamber.'}</p><button className="primary dark" onClick={onContinue}>Follow the path<Icon name="arrow"/></button></>;
      break;
    case 'encounter':
      if (encounter) {
        title = encounter.title; label = encounter.skill; art = encounter.artwork;
        body = <EncounterPanel key={encounter.id} encounter={encounter} progress={progress} onComplete={onComplete}/>;
      }
      break;
    case 'discovery':
      if (encounter) {
        title = encounter.title; label = 'The Merewood · Discovery'; art = encounter.artwork;
        body = <><div className="eyebrow" style={{ color: '#718151' }}>Discovery recorded</div><p className="prose" style={{ marginTop: 14 }}>{encounter.discovery}</p><div className="feedback success">{encounter.lesson}</div><div className="reward"><Icon name={encounter.icon}/> &nbsp; {encounter.reward}</div><p className="muted">Added to your journal. Hints and retries never reduce your rewards.</p><div className="actions"><button className="primary dark" onClick={next ? onDismiss : () => onNavigate({ kind: progress.ending ? 'journal' : 'finale' })}>{next ? 'Continue exploring' : progress.ending ? 'Read your journal' : 'Decide the observatory’s future'}<Icon name="arrow"/></button><button className="secondary" onClick={onDismiss}>Return to the scene</button></div></>;
      }
      break;
    case 'map':
      title = 'The Merewood'; label = 'Your chart · Chapter I';
      body = <><p className="prose">A narrow path follows the light across the water.</p><ol className="map-path">{chapter.encounters.map(e => { const status = encounterStatus(e.id, progress, chapter); return <li key={e.id}><Icon name={e.icon}/><div><strong>{e.title}</strong><p>{status === 'done' ? 'Explored' : status === 'current' ? 'Your next destination' : 'The path opens as you explore'}</p></div><button className="secondary" onClick={() => onEncounter(e.id)}>{status === 'locked' ? 'Inspect' : 'Visit'}</button></li>; })}</ol><p className="muted">Beyond the Merewood lie the foundry, the merchant coast, and the northern archives. These regions await a future chapter.</p></>;
      break;
    case 'journal':
      title = 'The wayfarer’s journal'; label = 'Collected discoveries'; art = artwork.journal;
      body = <><p className="prose">A record of places opened, ideas understood, and things worth keeping.</p>{progress.done.length ? chapter.encounters.filter(e => progress.done.includes(e.id)).map(e => <article className="journal-entry" key={e.id}><span className="tag">{e.skill} · {e.reward}</span><h3>{e.title}</h3><p>{e.lesson}</p></article>) : <p className="muted">Your pages are waiting. Explore the broken crossing to make your first discovery.</p>}{progress.ending && <><article className="journal-entry"><span className="tag">Chapter complete</span><h3>{progress.ending === 'beacon' ? 'A beacon on the mere' : 'A refuge in the wood'}</h3><p>{endingText(progress.ending)}</p></article><p className="muted">This is the end of the first playable chapter. You can revisit your discoveries on the scene, or start a fresh journey in Settings.</p></>}</>;
      break;
    case 'finale':
      title = 'A light for the living'; label = 'Chapter I · The final choice';
      body = <><p className="prose">The chart reveals safe paths through the mere. Elian looks toward the darkening shore. “The observatory is awake. What shall its light become?”</p><div className="ending-choice"><button className="secondary" onClick={() => onEnding('beacon')}>Raise a beacon<small>Guide lost travelers across the water. The light will shine beyond the forest.</small></button><button className="secondary" onClick={() => onEnding('refuge')}>Make a refuge<small>Keep a warm light beneath the dome. This place will shelter those who need rest.</small></button></div><p className="muted">Both choices complete the chapter. Your choice becomes part of its story.</p></>;
      break;
    case 'complete':
      title = 'The chapter is yours'; label = 'Chapter I · Complete';
      body = <><p className="prose">{endingText(progress.ending)}</p><div className="reward"><Icon name="star"/> &nbsp; Keeper of the mere</div><p className="muted">Three discoveries. A crossing restored. An ancient keeper at peace. Your first chapter is complete.</p><button className="primary dark" onClick={() => onNavigate({ kind: 'journal' })}>Open your journal<Icon name="book"/></button></>;
      break;
  }
  return <Dialog title={title} label={label} artwork={art} onDismiss={onDismiss}>{body}</Dialog>;
}
