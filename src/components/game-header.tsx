import Icon from './icon';
import type { DialogView, IconName, Progress } from '@/lib/types';

export default function GameHeader({ progress, open, close }: { progress: Progress; open: (view: DialogView) => void; close: () => void }) {
  const links: { title: string; icon: IconName; kind: 'map' | 'journal' | 'settings' }[] = [
    { title: 'World map', icon: 'map', kind: 'map' }, { title: 'Journal', icon: 'book', kind: 'journal' }, { title: 'Settings', icon: 'settings', kind: 'settings' },
  ];
  return <header>
    <div className="brand"><Icon name="star"/><div><div className="wordmark">Vesper</div><small>A JOURNEY OF UNDERSTANDING</small></div></div>
    <nav aria-label="Main"><button className="nav-btn active" onClick={close}><Icon name="leaf"/>Adventure</button>{links.map(link => <button key={link.kind} className="nav-btn" onClick={() => open({ kind: link.kind })}><Icon name={link.icon}/>{link.title}{link.kind === 'journal' && progress.done.length > 0 && <small className="header-journal-count">{progress.done.length}</small>}</button>)}</nav>
    <div className="profile"><div className="avatar"><Icon name="star"/></div><div>Wayfarer<small>{progress.ending ? 'Keeper of the mere' : 'Chapter I · The awakening'}</small></div></div>
  </header>;
}
