'use client';
import { useRef, useState } from 'react';
import { chapter } from '@/content/merewood';
import { normalizeProgress } from '@/lib/progress';
import type { Progress } from '@/lib/types';

export default function Preferences({ progress, onChange, transfer = false }: { progress: Progress; onChange: (value: Progress) => void; transfer?: boolean }) {
  const input = useRef<HTMLInputElement>(null);
  const [notice, setNotice] = useState('');
  function exportSave() {
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url; anchor.download = 'vesper-journey.json'; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice('Your journey has been exported. Import this file when playing at another address.');
  }
  async function importSave(file?: File) {
    if (!file) return;
    try {
      if (file.size > 65536) throw new Error('This file is too large to be a Vesper save.');
      const raw: unknown = JSON.parse(await file.text());
      if (!raw || typeof raw !== 'object' || !('done' in raw) || !Array.isArray(raw.done)) throw new Error('Choose a Vesper journey JSON file.');
      onChange(normalizeProgress(raw, chapter));
      setNotice('Journey imported. Your discoveries and preferences have been restored.');
    } catch (error) { setNotice(error instanceof Error ? error.message : 'The save could not be imported.'); }
    if (input.current) input.current.value = '';
  }
  return <>
    <label className="setting">Storytelling<select value={progress.reading} onChange={e => onChange({ ...progress, reading: e.target.value === 'plain' ? 'plain' : 'rich' })}><option value="rich">Rich & literary</option><option value="plain">Plain & concise</option></select></label>
    <label className="setting">Learning support<select value={progress.support} onChange={e => onChange({ ...progress, support: e.target.value === 'light' ? 'light' : 'guided' })}><option value="guided">Show visual guidance</option><option value="light">Let me explore first</option></select></label>
    <p className="muted">The math stays the same when you change the storytelling. You can change these preferences at any time.</p>
    {transfer && <><p className="muted preference-note">Progress is stored in this browser at this web address. Export a copy to move your journey to another device or hosting address.</p><div className="save-transfer"><button className="secondary" onClick={exportSave}>Export journey</button><button className="secondary" onClick={() => input.current?.click()}>Import journey…</button><input ref={input} type="file" accept=".json,application/json" aria-label="Import a Vesper journey" onChange={e => void importSave(e.target.files?.[0])}/></div><p role="status" className="transfer-notice">{notice}</p></>}
  </>;
}
