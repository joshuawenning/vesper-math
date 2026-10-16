import Image from 'next/image';
import type { Encounter, SkillLevel } from '@/lib/types';
import { treasureArt } from '@/content/treasures';
import { storySteps } from '@/content/story-lessons';
import { describeChallenge } from '@/lib/challenges';
export default function CollectibleCard({
  encounter,
  level,
  fullPractice = false,
}: {
  encounter: Encounter;
  level: SkillLevel;
  fullPractice?: boolean;
}) {
  const steps = fullPractice
    ? storySteps(encounter, level)
    : [{ title: encounter.title, challenge: encounter.challenge, lesson: encounter.lesson }];
  return (
    <details className="group overflow-hidden border border-[#9a855d80] bg-[#e8dfc7] open:col-span-full">
      <summary
        title={`${encounter.title} — ${describeChallenge(encounter.challenge)}`}
        className="cursor-pointer list-none p-3 focus-visible:outline-2 focus-visible:outline-[#775a26]"
      >
        <div className="relative mx-auto aspect-square w-full max-w-[200px] overflow-hidden border border-[#9a855d40] bg-[#f1e7ce]">
          <Image
            src={treasureArt[encounter.id]}
            alt={`Illustration of ${encounter.reward}`}
            fill
            sizes="(max-width:480px) 38vw, 200px"
            className="object-contain"
          />
        </div>
        <h3 className="mt-3 font-story text-xl leading-tight">{encounter.reward}</h3>
        <p className="mt-2 text-xs leading-relaxed text-[#43533e]">{encounter.title}</p>
        <span className="mt-3 block text-xs text-[#775a26] group-open:hidden">
          Open its story +
        </span>
        <span className="mt-3 hidden text-xs text-[#775a26] group-open:block">
          Close its story −
        </span>
      </summary>
      <div className="border-t border-[#9a855d40] p-4">
        <p className="mb-2 text-xs text-[#43533e]">{encounter.skill}</p>
        <p className="mb-4 font-story text-lg leading-relaxed">{encounter.discovery}</p>
        <ol className="space-y-4">
          {steps.map((step, i) => (
            <li key={step.title}>
              <h4 className="mb-1 text-xs font-semibold text-[#43533e]">
                {i + 1}. {step.title}
              </h4>
              <p className="text-sm leading-relaxed">{describeChallenge(step.challenge)}</p>
              <p className="mt-2 font-story text-lg leading-relaxed">{step.lesson}</p>
            </li>
          ))}
        </ol>
      </div>
    </details>
  );
}
