import Image from 'next/image';
import { chapter } from '@/content/merewood';
import { artwork } from '@/content/artwork';
import { encounterStatus } from '@/lib/progress';
import type { Progress } from '@/lib/types';

export default function ChapterSidebar({ progress, onCompanion }: { progress: Progress; onCompanion: () => void }) {
  const complete = progress.done.length === chapter.encounters.length;
  return <aside>
    <div className="chapter-label eyebrow">Chapter one</div><h2>The light<br/>across the mere</h2><p>A forgotten place.<br/>A small beginning.</p>
    <div className="progress" role="progressbar" aria-label="Chapter discoveries" aria-valuenow={progress.done.length} aria-valuemin={0} aria-valuemax={chapter.encounters.length}><span style={{ width: `${progress.done.length / chapter.encounters.length * 100}%` }}/></div>
    <div className="progress-label"><span>Chapter discoveries</span><span>{progress.done.length} / {chapter.encounters.length}</span></div>
    <ol className="steps">{chapter.encounters.map((encounter, index) => { const status = encounterStatus(encounter.id, progress, chapter); return <li key={encounter.id} className={`step ${status}`}><div className="step-num">{status === 'done' ? '✓' : index + 1}</div><div><strong>{encounter.title}</strong><small>{status === 'done' ? 'Discovered' : status === 'current' ? 'Ready to explore' : 'Further along the path'}</small></div></li>; })}</ol>
    <div className="companion"><Image className="companion-portrait" src={artwork.elian.src} alt={artwork.elian.alt} width={300} height={200} sizes="208px"/><div className="eyebrow">Your companion</div><h3>Elian, the cartographer</h3><p>“{complete ? 'Some maps show us where to go. Others show us what we have learned.' : 'Every great journey begins with a little curiosity. Take your time.'}”</p><button className="quiet" onClick={onCompanion}>Speak with Elian &nbsp; →</button></div>
  </aside>;
}
