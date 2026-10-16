'use client';
import { useRef, useState } from 'react';
import { skillLevels } from '@/content/worlds';
import { normalizeProgress } from '@/lib/progress';
import type { Progress } from '@/lib/types';
import Icon from './icon';
import SpeechPreferences from './accessibility/speech-preferences';
import PreferenceChoices from './ui/preference-choices';
import PreferenceSwitch from './ui/preference-switch';
import TextSizeControl from './accessibility/text-size-control';
import { Muted } from './ui/typography';

export default function Preferences({
  progress,
  onChange,
  transfer = false,
  onRestart,
}: {
  progress: Progress;
  onChange: (value: Progress) => void;
  transfer?: boolean;
  onRestart?: () => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [notice, setNotice] = useState('');
  function exportSave() {
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'vesper-math-journey.json';
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice('Your journey has been exported. Import this file when playing at another address.');
  }
  async function importSave(file?: File) {
    if (!file) return;
    try {
      if (file.size > 65536) throw new Error('This file is too large to be a Vesper Math save.');
      const raw: unknown = JSON.parse(await file.text());
      if (!raw || typeof raw !== 'object' || !('done' in raw) || !Array.isArray(raw.done))
        throw new Error('Choose a Vesper Math journey JSON file.');
      onChange(normalizeProgress(raw));
      setNotice('Journey imported. Your discoveries and preferences have been restored.');
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'The save could not be imported.');
    }
    if (input.current) input.current.value = '';
  }
  return (
    <>
      <PreferenceChoices
        label="Appearance"
        value={progress.theme}
        onChange={(theme) => onChange({ ...progress, theme })}
        options={[
          { value: 'system', label: 'System', icon: 'monitor' },
          { value: 'light', label: 'Light', icon: 'sun' },
          { value: 'dark', label: 'Dark', icon: 'moon' },
        ]}
      />
      <fieldset className="my-6 min-w-0 border-y border-[#909c8350] py-2">
        <legend className="px-2 font-story text-2xl">Accessibility</legend>
        <TextSizeControl
          value={progress.textSize}
          onChange={(textSize) => onChange({ ...progress, textSize })}
        />
        <Muted>
          Text also follows your browser’s zoom and font settings. Animations respect your device’s
          reduced-motion preference.
        </Muted>
        <SpeechPreferences
          value={progress.speech}
          onChange={(speech) => onChange({ ...progress, speech })}
        />
        <details className="my-4 text-sm leading-relaxed">
          <summary className="cursor-pointer py-3">Keyboard controls</summary>
          <p>
            Use Tab and Shift+Tab to move between controls, Enter or Space to activate a button, and
            Escape to close a window. Focus stays inside an open window and returns to where you
            opened it. The first Tab on the page offers “Skip to adventure.”
          </p>
        </details>
      </fieldset>
      <PreferenceChoices
        label="Math skill level"
        value={progress.skill}
        onChange={(skill) => onChange({ ...progress, skill })}
        options={skillLevels.map((level) => ({
          value: level.id,
          label: level.label,
          description: level.description,
        }))}
      />
      <Muted>
        Your choice changes new encounters and Elian’s quizzes. Earlier discoveries keep their
        original record.
      </Muted>
      <PreferenceChoices
        label="Storytelling"
        value={progress.reading}
        onChange={(reading) => onChange({ ...progress, reading })}
        options={[
          { value: 'rich', label: 'Rich & literary' },
          { value: 'plain', label: 'Plain & concise' },
        ]}
      />
      <PreferenceSwitch
        label="Visual guidance"
        description="Show visual support while you explore. Hints are always available."
        checked={progress.support === 'guided'}
        onChange={(checked) => onChange({ ...progress, support: checked ? 'guided' : 'light' })}
      />
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
          <div className="mt-5 grid grid-cols-3 gap-2" aria-label="Manage your journey">
            <button
              type="button"
              aria-label="Export journey"
              className="flex min-w-0 flex-col items-center justify-center gap-2 border border-[#7e886b80] px-2 py-3 text-xs text-[#384a3b] hover:bg-[#c4c6ad55] tablet:flex-row"
              onClick={exportSave}
            >
              <Icon name="download" /> <span>Export</span>
            </button>
            <button
              type="button"
              aria-label="Import journey…"
              className="flex min-w-0 flex-col items-center justify-center gap-2 border border-[#7e886b80] px-2 py-3 text-xs text-[#384a3b] hover:bg-[#c4c6ad55] tablet:flex-row"
              onClick={() => input.current?.click()}
            >
              <Icon name="upload" /> <span>Import</span>
            </button>
            <button
              type="button"
              aria-label="Start a fresh journey…"
              className="flex min-w-0 flex-col items-center justify-center gap-2 border border-[#7e886b80] px-2 py-3 text-xs text-[#384a3b] hover:bg-[#c4c6ad55] tablet:flex-row"
              onClick={onRestart}
              disabled={!onRestart}
            >
              <Icon name="restart" /> <span>Start fresh</span>
            </button>
          </div>
          <input
            className="hidden"
            ref={input}
            type="file"
            accept=".json,application/json"
            aria-label="Import a Vesper Math journey"
            onChange={(e) => void importSave(e.target.files?.[0])}
          />
          <p role="status" className="my-3 text-xs leading-[1.5] text-[#465e46]">
            {notice}
          </p>
        </>
      )}
    </>
  );
}
