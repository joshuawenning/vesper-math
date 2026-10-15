'use client';
import { useRef, useState } from 'react';
import { chapter } from '@/content/merewood';
import { normalizeProgress } from '@/lib/progress';
import type { Progress } from '@/lib/types';
import Button from './ui/button';
import PreferenceSelect from './ui/preference-select';
import { Muted } from './ui/typography';

export default function Preferences({
  progress,
  onChange,
  transfer = false,
}: {
  progress: Progress;
  onChange: (value: Progress) => void;
  transfer?: boolean;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [notice, setNotice] = useState('');
  function exportSave() {
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'vesper-journey.json';
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice('Your journey has been exported. Import this file when playing at another address.');
  }
  async function importSave(file?: File) {
    if (!file) return;
    try {
      if (file.size > 65536) throw new Error('This file is too large to be a Vesper save.');
      const raw: unknown = JSON.parse(await file.text());
      if (!raw || typeof raw !== 'object' || !('done' in raw) || !Array.isArray(raw.done))
        throw new Error('Choose a Vesper journey JSON file.');
      onChange(normalizeProgress(raw, chapter));
      setNotice('Journey imported. Your discoveries and preferences have been restored.');
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'The save could not be imported.');
    }
    if (input.current) input.current.value = '';
  }
  return (
    <>
      <PreferenceSelect
        label="Storytelling"
        value={progress.reading}
        onChange={(e) =>
          onChange({ ...progress, reading: e.target.value === 'plain' ? 'plain' : 'rich' })
        }
      >
        <option value="rich">Rich & literary</option>
        <option value="plain">Plain & concise</option>
      </PreferenceSelect>
      <PreferenceSelect
        label="Learning support"
        value={progress.support}
        onChange={(e) =>
          onChange({ ...progress, support: e.target.value === 'light' ? 'light' : 'guided' })
        }
      >
        <option value="guided">Show visual guidance</option>
        <option value="light">Let me explore first</option>
      </PreferenceSelect>
      <Muted>
        The math stays the same when you change the storytelling. You can change these preferences
        at any time.
      </Muted>
      {transfer && (
        <>
          <Muted className="mt-[18px]">
            Progress is stored in this browser at this web address. Export a copy to move your
            journey to another device or hosting address.
          </Muted>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button variant="secondary" onClick={exportSave}>
              Export journey
            </Button>
            <Button variant="secondary" onClick={() => input.current?.click()}>
              Import journey…
            </Button>
            <input
              className="hidden"
              ref={input}
              type="file"
              accept=".json,application/json"
              aria-label="Import a Vesper journey"
              onChange={(e) => void importSave(e.target.files?.[0])}
            />
          </div>
          <p role="status" className="my-3 text-xs leading-[1.5] text-[#465e46]">
            {notice}
          </p>
        </>
      )}
    </>
  );
}
