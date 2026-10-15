'use client';
import { useState } from 'react';
import { cleanName, personas } from '@/content/personas';
import { getWorld, skillLevels } from '@/content/worlds';
import type { PersonaId, Progress } from '@/lib/types';
import CharacterPortrait from './character-portrait';
import Button from '../ui/button';
import { Eyebrow, Muted, Narrative, Tag } from '../ui/typography';
import { Actions } from '../ui/panels';

export default function ProfileContent({
  progress,
  onChange,
  onDismiss,
}: {
  progress: Progress;
  onChange: (progress: Progress) => void;
  onDismiss: () => void;
}) {
  const [name, setName] = useState(progress.profile.name);
  const [persona, setPersona] = useState<PersonaId>(progress.profile.persona);
  const journeys = { ...progress.journeys, [progress.worldId]: progress };
  const discoveries = Object.values(journeys).reduce((sum, j) => sum + j.done.length, 0);
  return (
    <>
      <Narrative>A name for the road. A face for your story.</Narrative>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onChange({ ...progress, profile: { name: cleanName(name), persona } });
          onDismiss();
        }}
      >
        <label className="mb-5 block text-[0.8125rem]">
          Your name
          <input
            className="mt-2 block w-full border border-[#6b795e] bg-[#f3eddb] px-3 py-2.5 text-ink"
            value={name}
            maxLength={24}
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
            placeholder="How should Elian address you?"
          />
        </label>
        <fieldset>
          <legend className="mb-3 text-[0.8125rem]">Choose your character</legend>
          <div className="grid grid-cols-2 gap-2.5 tablet:grid-cols-3">
            {personas.map((p) => (
              <button
                key={p.id}
                type="button"
                aria-pressed={persona === p.id}
                className={`overflow-hidden border text-left ${persona === p.id ? 'border-forest bg-[#c5cfb8] ring-1 ring-forest' : 'border-[#909c8370] bg-[#e3dcc6]'}`}
                onClick={() => setPersona(p.id)}
              >
                <CharacterPortrait persona={p.id} className="aspect-square w-full" />
                <span className="block px-2 py-2.5 text-center">
                  <strong className="block text-[0.75rem] font-medium uppercase tracking-[1.8px] text-[#43533e]">
                    {p.name}
                  </strong>
                </span>
              </button>
            ))}
          </div>
        </fieldset>
        <Muted>
          Classes shape your character’s identity. Every class can explore every world and learn
          every skill.
        </Muted>
        <Actions>
          <Button type="submit">Save my character</Button>
          <Button variant="secondary" onClick={onDismiss}>
            Cancel
          </Button>
        </Actions>
      </form>
      <div className="mt-7 border-t border-[#909c8350] pt-5">
        <Eyebrow tone="brown">Your chronicle</Eyebrow>
        <div className="my-4 grid grid-cols-3 gap-2 text-center">
          {[
            [discoveries, 'Discoveries'],
            [Object.values(journeys).filter((j) => j.ending).length, 'Worlds restored'],
            [progress.practice.correct, 'Quizzes solved'],
          ].map(([number, label]) => (
            <div key={label} className="border border-[#909c8340] p-2">
              <strong className="block font-story text-[1.875rem]">{number}</strong>
              <span className="text-[0.75rem] text-[#43533e]">{label}</span>
            </div>
          ))}
        </div>
        {progress.history.length ? (
          <ol>
            {progress.history
              .slice(-9)
              .reverse()
              .map((record) => (
                <li
                  key={`${record.worldId}-${record.encounterId}`}
                  className="border-b border-[#909c8330] py-3"
                >
                  <Tag>
                    {getWorld(record.worldId)?.title} ·{' '}
                    {skillLevels.find((l) => l.id === record.level)?.label}
                  </Tag>
                  <p className="mt-1 font-story text-xl capitalize">
                    {record.encounterId.replaceAll('-', ' ')}
                  </p>
                  <small className="text-[0.75rem] text-[#43533e]">
                    {record.at
                      ? new Date(record.at).toLocaleDateString()
                      : 'From an earlier journey'}
                  </small>
                </li>
              ))}
          </ol>
        ) : (
          <Muted>Your first discovery will begin this record.</Muted>
        )}
        <Muted>
          Your character and records stay in this browser. Export your journey in preferences to
          carry them elsewhere.
        </Muted>
      </div>
    </>
  );
}
