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

const steps = [
  {
    id: 'character',
    illustration: artwork.elianPathForward,
    label: 'Your character',
    title: 'Who walks this road?',
    description:
      'A name for Elian to remember. A face for the adventures ahead. Every class can follow every path.',
  },
  {
    id: 'skill',
    illustration: artwork.elianMathLevel,
    label: 'Math level',
    title: 'Find your footing.',
    description:
      'Choose a comfortable starting point. This shapes the challenges ahead, and you can change it later in Settings.',
  },
  {
    id: 'experience',
    illustration: artwork.elianExperience,
    label: 'Your experience',
    title: 'Make yourself at home.',
    description:
      'Choose how the story is told, and make the page easy to read. You can change everything later in Settings.',
  },
] as const;

function Setup() {
  const { progress, setProgress } = useProgress();
  const router = useRouter();
  const [step, setStep] = useState<(typeof steps)[number]['id']>('character');
  const [name, setName] = useState(progress.profile.name);
  const [persona, setPersona] = useState<PersonaId>(progress.profile.persona);
  const currentStep = steps.find((item) => item.id === step)!;
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
          {currentStep.title}
        </h1>
        <p className="my-5 max-w-md text-base leading-relaxed text-subtle">
          {currentStep.description}
        </p>
        <figure className="relative mt-7 hidden aspect-[4/5] overflow-hidden border border-line tablet:block">
          <Image
            src={currentStep.illustration.src}
            alt={currentStep.illustration.alt}
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
          {steps.map((item, index) => (
            <li
              key={item.id}
              aria-current={step === item.id ? 'step' : undefined}
              className={step === item.id ? 'font-semibold' : 'text-[#43533e]'}
            >
              0{index + 1} · {item.label}
            </li>
          ))}
        </ol>
        {step === 'character' ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setProgress({ ...progress, profile: { name: cleanName(name), persona } });
              setStep('skill');
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
                    <CharacterPortrait persona={character.id} className="aspect-square w-full" />
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
              Choose my math level <Icon name="arrow" />
            </Button>
          </form>
        ) : (
          <>
            <Preferences
              key={step}
              progress={progress}
              onChange={setProgress}
              section={step}
              notifyOnSave={false}
            />
            <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-[#909c8350] pt-5">
              <Button
                variant="secondary"
                onClick={() => setStep(step === 'skill' ? 'character' : 'skill')}
              >
                {step === 'skill' ? 'Back to character' : 'Back to math level'}
              </Button>
              {step === 'skill' ? (
                <Button onClick={() => setStep('experience')}>
                  Story & accessibility <Icon name="arrow" />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setProgress((current) => ({ ...current, started: true }));
                    router.push('/adventure');
                  }}
                >
                  Enter the world <Icon name="arrow" />
                </Button>
              )}
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
