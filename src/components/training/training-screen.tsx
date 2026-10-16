'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useProgress } from '../use-progress';
import { trainingArt, libraryArt } from '@/content/training-art';
import { applyTrainingAction } from '@/lib/training';
import { getWorld } from '@/content/worlds';
import type { TrainingMode } from '@/lib/types';
import TrainingGround from './training-ground';
import TrainingLibrary from './training-library';
import WorldAtmosphere from '../adventure/world-atmosphere';
import GameHeader from '../game-header';
import ResolveMeter from '../profile/resolve-meter';

export default function TrainingScreen({ returnTo }: { returnTo?: string }) {
  const { progress, setProgress, loaded, openChat } = useProgress();
  const router = useRouter();
  const [section, setSection] = useState<'practice' | 'library'>('practice');
  const [mode, setMode] = useState<TrainingMode>(progress.training.pending?.mode ?? 'arithmetic');
  const illustration = section === 'library' ? libraryArt : trainingArt[mode];
  const resume = () => {
    if (progress.resolve <= 0) return;
    const valid = returnTo && getWorld(progress.worldId)?.encounters.some((id) => id === returnTo);
    router.push(valid ? `/?resume=${encodeURIComponent(returnTo!)}` : '/');
  };
  return (
    <WorldAtmosphere worldId={progress.worldId}>
      <GameHeader
        progress={progress}
        open={(view) => router.push(`/?panel=${view.kind}`)}
        close={() => {}}
      />
      <main
        id="adventure"
        tabIndex={-1}
        className="mx-auto max-w-[1400px] px-4 pb-28 pt-7 tablet:px-8 desktop:px-12"
      >
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs uppercase tracking-widest text-gold">
              Before the next horizon
            </p>
            <h1 className="font-story text-[clamp(2rem,5vw,3.25rem)] leading-tight">
              The wayfarer’s training ground
            </h1>
          </div>
          <div className="flex gap-5 border-b border-line" aria-label="Training ground areas">
            {(['practice', 'library'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setSection(tab)}
                aria-pressed={section === tab}
                className={`min-h-11 border-b-2 px-1 text-sm ${section === tab ? 'border-gold text-gold' : 'border-transparent text-subtle'}`}
              >
                {tab === 'practice' ? 'Practice with Elian' : 'The library'}
              </button>
            ))}
          </div>
        </div>
        <div className="grid items-start gap-5 min-[600px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] desktop:gap-9">
          <aside className="min-[600px]:sticky min-[600px]:top-6">
            <figure className="relative h-[240px] overflow-hidden border border-gold/30 bg-frame min-[600px]:h-auto min-[600px]:aspect-[4/5]">
              <Image
                key={illustration.src}
                src={illustration.src}
                alt={illustration.alt}
                fill
                sizes="(max-width:599px) 100vw, (max-width:1100px) 45vw, 600px"
                quality={85}
                className="object-contain"
              />
            </figure>
            <p className="mt-3 font-story text-lg italic leading-relaxed text-subtle">
              {section === 'library'
                ? '“Some doors open when you find the right question.”'
                : '“One small idea, then another. That is how we find our way.”'}
            </p>
          </aside>
          <section className="min-w-0 border border-[#b49e70] bg-paper p-5 text-ink tablet:p-7">
            {loaded ? (
              <>
                <ResolveMeter value={progress.resolve} context="training" />
                {section === 'library' ? (
                  <TrainingLibrary progress={progress} onChat={openChat} />
                ) : (
                  <TrainingGround
                    progress={progress}
                    onAction={(action) => setProgress((p) => applyTrainingAction(p, action))}
                    onResume={resume}
                    onModeChange={setMode}
                  />
                )}
              </>
            ) : (
              <p role="status">Preparing your training ground…</p>
            )}
          </section>
        </div>
      </main>
    </WorldAtmosphere>
  );
}
