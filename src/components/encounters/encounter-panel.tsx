'use client';
import { useEffect, useRef } from 'react';
import type { Encounter, Progress } from '@/lib/types';
import { storySteps } from '@/content/story-lessons';
import { storyLearning, type StudyAction } from '@/lib/story-learning';
import ChallengeStep from './challenge-step';
import ResolveGate from '../training/resolve-gate';
import ResolveMeter from '../profile/resolve-meter';
import ResolveNotice from '../profile/resolve-notice';
import ReadAloud from '../accessibility/read-aloud';
import Icon from '../icon';
import Button from '../ui/button';
import { Narrative } from '../ui/typography';

export default function EncounterPanel({
  encounter,
  progress,
  onStudy,
  onTrain,
}: {
  encounter: Encounter;
  progress: Progress;
  onStudy: (id: string, action: StudyAction) => void;
  onTrain: () => void;
}) {
  const learning = storyLearning(progress, encounter.id);
  const index = Math.min(2, learning.reviewing ? learning.completed - 1 : learning.completed);
  const steps = storySteps(encounter, learning.level);
  const step = steps[index];
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, [index, learning.reviewing]);
  if (progress.resolve <= 0)
    return (
      <>
        <ResolveNotice value={progress.resolve} />
        <ResolveGate onTrain={onTrain} />
      </>
    );
  return (
    <>
      <ResolveNotice value={progress.resolve} />
      <ResolveMeter value={progress.resolve} />
      <ol
        aria-label="Story challenges"
        className="my-5 grid grid-cols-3 gap-2 text-xs leading-relaxed"
      >
        {steps.map((item, i) => (
          <li
            key={item.title}
            aria-current={i === index ? 'step' : undefined}
            className={`border-b-2 pb-2 ${i === index ? 'border-[#775a26] text-[#384a3b] font-semibold' : 'border-[#909c8350] text-[#43533e]'}`}
          >
            <span className="block">
              {i < learning.completed ? '✓ ' : ''}
              {i + 1} of 3
            </span>
            {item.title}
          </li>
        ))}
      </ol>
      {index === 0 && !learning.reviewing && <Narrative>{encounter[progress.reading]}</Narrative>}
      <h3
        ref={heading}
        tabIndex={-1}
        className="mb-4 font-story text-2xl focus:outline-none focus:shadow-none"
      >
        {step.title}
      </h3>
      {learning.reviewing ? (
        <div role="status">
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="flex items-center gap-2 text-sm font-semibold text-[#384a3b]">
              <Icon name="check" className="size-5" /> Correct
            </p>
            <ReadAloud
              compact
              label="Read explanation aloud"
              settings={progress.speech}
              text={`Correct. ${step.lesson}`}
            />
          </div>
          <Narrative>{step.lesson}</Narrative>
          <p className="mb-5 text-sm text-[#43533e]">
            Take a moment to follow the reasoning before you continue.
          </p>
          <Button onClick={() => onStudy(encounter.id, { kind: 'continue', step: index })}>
            {index === 2 ? 'Claim your discovery' : 'Try the next challenge'}
            <Icon name="arrow" />
          </Button>
        </div>
      ) : (
        <ChallengeStep
          key={`${index}-${learning.level}`}
          encounter={encounter}
          step={step}
          index={index}
          progress={progress}
          onStudy={onStudy}
        />
      )}
    </>
  );
}
