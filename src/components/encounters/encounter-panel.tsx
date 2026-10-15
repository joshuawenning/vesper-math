'use client';
import { useState } from 'react';
import type { Encounter, Progress } from '@/lib/types';
import { validateAnswer, answerFeedback, type Answer } from '@/lib/challenges';
import SumChallenge from './sum-challenge';
import FractionChallenge from './fraction-challenge';
import DivisionChallenge from './division-challenge';
import Icon from '../icon';

export default function EncounterPanel({ encounter, progress, onComplete }: { encounter: Encounter; progress: Progress; onComplete: (id: string) => void }) {
  const c = encounter.challenge;
  const [answer, setAnswer] = useState<Answer>(() => ({ selected: [], fill: c.kind === 'fraction' ? c.start : 0, route: c.kind === 'division' ? c.routes[0].id : '', value: '' }));
  const [hint, setHint] = useState(0);
  const [feedback, setFeedback] = useState('');
  function update(patch: Partial<Answer>) { setAnswer(a => ({ ...a, ...patch })); setFeedback(''); }
  const action = c.kind === 'sum' ? 'Lay the crossing' : c.kind === 'fraction' ? 'Turn the mechanism' : c.routes.find(r => r.id === answer.route)?.action ?? 'Cast the spell';
  return <form onSubmit={event => { event.preventDefault(); if (validateAnswer(c, answer)) onComplete(encounter.id); else setFeedback(answerFeedback(c, answer)); }}>
    <p className="prose">{encounter[progress.reading]}</p>
    {c.kind === 'sum' && <SumChallenge challenge={c} selected={answer.selected ?? []} onChange={selected => update({ selected })}/>}
    {c.kind === 'fraction' && <FractionChallenge challenge={c} fill={answer.fill ?? c.start} support={progress.support} onChange={fill => update({ fill })}/>}
    {c.kind === 'division' && <DivisionChallenge challenge={c} route={answer.route ?? c.routes[0].id} value={answer.value ?? ''} support={progress.support} onRoute={route => update({ route, value: '' })} onValue={value => update({ value })}/>}
    <div role="status" aria-live="polite" className={feedback ? 'feedback' : undefined}>{feedback}</div>
    {hint > 0 && <div className="hint" aria-live="polite">{encounter.hint[hint - 1]}</div>}
    <div className="actions"><button className="primary dark" type="submit">{action}<Icon name="arrow"/></button><button className="secondary" type="button" onClick={() => setHint(n => Math.min(encounter.hint.length, n + 1))}>{hint === encounter.hint.length ? 'Hint shown' : hint > 0 ? 'Another hint' : 'Ask Elian for a hint'}</button></div>
  </form>;
}
