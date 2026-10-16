'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cleanName, getPersona, personas } from '@/content/personas';
import { artwork } from '@/content/artwork';
import type { PersonaId } from '@/lib/types';
import BrandMark from '../brand-mark';
import Icon from '../icon';
import CharacterPortrait from '../profile/character-portrait';
import Preferences from '../preferences';
import Button from '../ui/button';
import WorldAtmosphere from '../adventure/world-atmosphere';
import { useProgress } from '../use-progress';

function Setup() {
  const { progress, setProgress } = useProgress();
  const router = useRouter();
  const [step, setStep] = useState<'character' | 'preferences'>('character');
  const [name, setName] = useState(progress.profile.name);
  const [persona, setPersona] = useState<PersonaId>(progress.profile.persona);
  const heading = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  useEffect(() => {
    if (moved.current) {
      heading.current?.focus({ preventScroll: true });
      heading.current?.scrollIntoView({ block: 'start' });
    }
    moved.current = true;
  }, [step]);
  return (
    <div className="mx-auto grid max-w-[1160px] items-start gap-8 pb-16 pt-8 tablet:grid-cols-[minmax(0,.8fr)_minmax(0,1fr)] tablet:gap-12 tablet:pt-14">
      <aside className="tablet:sticky tablet:top-8">
        <p className="mb-3 text-xs uppercase tracking-[.18em] text-gold">A story of your own</p>
        <h1
          ref={heading}
          tabIndex={-1}
          className="font-story text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] focus:outline-none focus:shadow-none"
        >
          {step === 'character' ? 'Who walks this road?' : 'Make yourself at home.'}
        </h1>
        <p className="my-5 max-w-md text-base leading-relaxed text-subtle">
          {step === 'character'
            ? 'A name for Elian to remember. A face for the adventures ahead. Every class can follow every path.'
            : 'Start where you feel comfortable. Choose how the story is told, and make the page easy to read. You can change everything later in Settings.'}
        </p>
        <figure className="relative mt-7 hidden aspect-[4/5] overflow-hidden border border-line tablet:block">
          <Image
            src={step === 'character' ? artwork.elian.src : artwork.preferences.src}
            alt={step === 'character' ? artwork.elian.alt : artwork.preferences.alt}
            fill
            sizes="(max-width:750px) 0px, 450px"
            className="object-cover"
          />
        </figure>
      </aside>
      <section
        className="min-w-0 border border-[#b49e70] bg-paper p-5 text-ink tablet:p-8"
        aria-label="Set up your journey"
      >
        <ol className="mb-7 flex flex-wrap gap-x-6 gap-y-2 border-b border-[#909c8350] pb-4 text-sm">
          <li
            aria-current={step === 'character' ? 'step' : undefined}
            className={step === 'character' ? 'font-semibold' : 'text-[#43533e]'}
          >
            01 · Your character
          </li>
          <li
            aria-current={step === 'preferences' ? 'step' : undefined}
            className={step === 'preferences' ? 'font-semibold' : 'text-[#43533e]'}
          >
            02 · Your preferences
          </li>
        </ol>
        {step === 'character' ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setProgress({ ...progress, profile: { name: cleanName(name), persona } });
              setStep('preferences');
            }}
          >
            <label className="block text-sm">
              Your name <span className="text-[#43533e]">(optional)</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                maxLength={24}
                autoComplete="off"
                placeholder="What should Elian call you?"
                className="mb-7 mt-2 block w-full border border-[#6b795e] bg-[#f8f2df] px-3 py-3 text-base"
              />
            </label>
            <fieldset>
              <legend className="mb-3 text-sm">Choose your character</legend>
              <div className="grid grid-cols-3 gap-2">
                {personas.map((character) => (
                  <button
                    key={character.id}
                    type="button"
                    aria-label={`Choose ${character.gender.toLowerCase()} ${character.name}`}
                    aria-pressed={persona === character.id}
                    onClick={() => setPersona(character.id)}
                    className={`relative overflow-hidden border ${persona === character.id ? 'border-forest ring-2 ring-forest ring-offset-2 ring-offset-paper' : 'border-[#909c8370] hover:border-forest'}`}
                  >
                    <CharacterPortrait persona={character.id} className="aspect-[4/5] w-full" />
                    {persona === character.id && (
                      <span className="absolute bottom-1 right-1 grid size-6 place-items-center rounded-full bg-forest text-paper">
                        <Icon name="check" className="size-4" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div
                className="mt-3 grid grid-cols-3 gap-2 text-center font-story text-lg"
                aria-hidden="true"
              >
                <span>Arcanist</span>
                <span>Ranger</span>
                <span>Warden</span>
              </div>
            </fieldset>
            <p className="mb-6 mt-4 text-sm leading-relaxed text-[#43533e]" role="status">
              {getPersona(persona).description}
            </p>
            <Button type="submit">
              Choose my preferences <Icon name="arrow" />
            </Button>
          </form>
        ) : (
          <>
            <Preferences progress={progress} onChange={setProgress} />
            <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-[#909c8350] pt-5">
              <Button variant="secondary" onClick={() => setStep('character')}>
                Back to character
              </Button>
              <Button
                onClick={() => {
                  setProgress((current) => ({ ...current, started: true }));
                  router.push('/adventure');
                }}
              >
                Enter the world <Icon name="arrow" />
              </Button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default function Onboarding() {
  const { loaded, progress } = useProgress();
  return (
    <WorldAtmosphere worldId={progress.worldId}>
      <div className="px-5 tablet:px-8">
        <header className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-4 border-b border-line py-5">
          <Link
            href="/"
            className="flex items-center gap-3 font-story text-2xl font-semibold text-gold"
          >
            <BrandMark />
            Vesper Math
          </Link>
          <Link href="/" className="min-h-11 py-3 text-sm text-subtle">
            Back to the beginning
          </Link>
        </header>
        <main id="adventure" tabIndex={-1}>
          {loaded ? (
            <Setup />
          ) : (
            <p role="status" className="py-20 text-center">
              Preparing your journey…
            </p>
          )}
        </main>
      </div>
    </WorldAtmosphere>
  );
}
