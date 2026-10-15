'use client';
import { useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { chapter } from '@/content/merewood';
import { artwork } from '@/content/artwork';
import { encounterStatus, endingText, initialProgress } from '@/lib/progress';
import type { DialogView, Ending } from '@/lib/types';
import { useProgress } from './use-progress';
import GameHeader from './game-header';
import ChapterSidebar from './chapter-sidebar';
import Icon from './icon';

// The full dialog and challenge interface is fetched only after an interaction.
const GameDialog = dynamic(() => import('./game-dialog'));
const hotspotPositions = [{ left: '23%', top: '58%' }, { left: '78%', top: '51%' }, { left: '90%', top: '35%' }];

export default function Game({ scene }: { scene: ReactNode }) {
  const { progress, setProgress, loaded, storageOK } = useProgress();
  const [view, setView] = useState<DialogView | null>(null);
  const next = chapter.encounters.find(e => !progress.done.includes(e.id));
  const close = () => setView(null);
  const companion = () => setView({ kind: 'companion' });

  function openEncounter(id: string) {
    const status = encounterStatus(id, progress, chapter);
    if (status !== 'locked') setProgress(p => ({ ...p, started: true }));
    setView({ kind: status === 'done' ? 'discovery' : status === 'locked' ? 'locked' : 'encounter', id });
  }
  function continueJourney() {
    if (progress.ending) setView({ kind: 'journal' });
    else if (!next) setView({ kind: 'finale' });
    else if (!progress.started) setView({ kind: 'welcome' });
    else openEncounter(next.id);
  }
  function start() {
    setProgress(p => ({ ...p, started: true }));
    if (next) setView({ kind: 'encounter', id: next.id });
    else continueJourney();
  }
  function complete(id: string) {
    setProgress(p => ({ ...p, done: p.done.includes(id) ? p.done : [...p.done, id] }));
    setView({ kind: 'discovery', id });
  }
  function chooseEnding(ending: Ending) {
    setProgress(p => ({ ...p, ending }));
    setView({ kind: 'complete' });
  }
  function restart() {
    setProgress(p => ({ ...initialProgress, done: [], reading: p.reading, support: p.support }));
    close();
  }
  return <>
    <GameHeader progress={progress} open={setView} close={close}/>
    <div className="shell"><ChapterSidebar progress={progress} onCompanion={companion}/><main id="adventure">
      <div className="main-heading"><div className="breadcrumbs">The Merewood <span> / </span> The observatory</div><div className="saved">{!loaded ? 'Preparing your journey' : storageOK ? 'Progress saved on this device' : 'Progress available this session'}</div></div>
      <section className="scene" aria-label="Explore the flooded observatory"><div className="scene-inner">{scene}<div className="location-label"><Icon name="pin"/> THE MEREWOOD · DUSKFALL</div>{chapter.encounters.map((encounter, i) => { const status = encounterStatus(encounter.id, progress, chapter); return <button key={encounter.id} className={`hotspot ${status}`} style={hotspotPositions[i]} onClick={() => openEncounter(encounter.id)} aria-label={`${encounter.title}${status === 'locked' ? ' — explore the earlier path first' : ''}`}><Icon name={status === 'done' ? 'check' : encounter.icon}/><span>{encounter.title}</span></button>; })}<div className="scene-caption"><div className="eyebrow">An adventure in curiosity</div><h1>{chapter.title}</h1><p>Some doors open only to understanding.</p></div><div className="scene-state">{progress.ending ? 'CHAPTER COMPLETE' : 'EXPLORE AT YOUR OWN PACE'}</div></div></section>
      <div className="story-strip"><p>{progress.ending ? endingText(progress.ending) : next ? chapter.intro[progress.reading] : 'The star chart is yours. One decision remains: what will you do with the observatory’s light?'}</p><button className="primary dark" onClick={continueJourney}>{progress.ending ? 'Read your discoveries' : next ? progress.started ? 'Continue the journey' : 'Begin the journey' : 'Choose your ending'}<Icon name="arrow"/></button></div>
      <button className="mobile-companion" onClick={companion}><Image src={artwork.elian.src} alt="Elian, your cartographer companion" width={80} height={80} sizes="53px"/><span><strong>Elian, the cartographer</strong><small>Speak with your companion</small></span><span className="companion-arrow">→</span></button>
      <div className="section-heading"><h2>Follow your curiosity</h2><small>THREE DISCOVERIES. ONE FORGOTTEN STORY.</small></div>
      <div className="encounters">{chapter.encounters.map(encounter => { const status = encounterStatus(encounter.id, progress, chapter); return <button key={encounter.id} className="encounter-card" onClick={() => openEncounter(encounter.id)}><div className="card-top"><Icon name={encounter.icon}/><small>{status === 'done' ? 'Discovered' : status === 'current' ? 'Explore' : 'Beyond the crossing'}</small></div><h3>{encounter.title}</h3><p>{encounter.skill}</p><span className="arrow"><Icon name={status === 'done' ? 'check' : 'arrow'}/></span></button>; })}</div>
      <div className="footer"><span><Icon name="leaf"/> No timers. No lost progress. Room to wonder.</span><span>CHAPTER I &nbsp; · &nbsp; THE FLOODED OBSERVATORY</span></div>
    </main></div>
    {view && <GameDialog view={view} progress={progress} onChange={setProgress} onDismiss={close} onNavigate={setView} onEncounter={openEncounter} onContinue={continueJourney} onStart={start} onComplete={complete} onEnding={chooseEnding} onRestart={restart}/>}
  </>;
}
