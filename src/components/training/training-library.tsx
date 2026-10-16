'use client';
import { useState } from 'react';
import { lessons } from '@/content/tutor-lessons';
import type { Topic } from '@/lib/tutor';
import type { Progress } from '@/lib/types';
import ReadAloud from '../accessibility/read-aloud';
const names: Record<Topic, string> = {
  arithmetic: 'The four operations',
  fractions: 'Parts of a whole',
  measurement: 'Measures & distances',
  percentages: 'Parts out of a hundred',
  geometry: 'Shapes & spaces',
  variables: 'The unknown number',
};
export default function TrainingLibrary({
  progress,
  onChat,
}: {
  progress: Progress;
  onChat: () => void;
}) {
  const [topic, setTopic] = useState<Topic>('arithmetic');
  const lesson = lessons[topic];
  return (
    <section aria-labelledby="library-title">
      <p className="text-xs uppercase tracking-widest text-[#775a26]">
        The library of small wonders
      </p>
      <h2 id="library-title" className="mt-2 font-story text-3xl">
        An idea worth keeping
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-[#43533e]">
        “Every skill begins with a question,” Elian whispers. Choose a shelf and linger as long as
        you like.
      </p>
      <div className="my-5 grid grid-cols-2 gap-2" role="group" aria-label="Library shelves">
        {(Object.entries(names) as [Topic, string][]).map(([key, label]) => (
          <button
            type="button"
            key={key}
            onClick={() => setTopic(key)}
            aria-pressed={topic === key}
            className={`min-h-12 border p-3 text-left font-story text-lg leading-tight ${topic === key ? 'border-[#243d33] bg-[#243d33] text-[#fff5dc]' : 'border-[#909c83] text-[#43533e]'}`}
          >
            {label}
          </button>
        ))}
      </div>
      <article className="border-t border-[#909c8350] pt-4" aria-live="polite">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-story text-2xl">{names[topic]}</h3>
          <ReadAloud
            compact
            settings={progress.speech}
            text={`${names[topic]}. ${lesson.why} Example: ${lesson.example}`}
            label="Read this library lesson aloud"
          />
        </div>
        <p className="mt-4 text-[0.9375rem] leading-relaxed">{lesson.why}</p>
        <div className="my-5 border-l-2 border-[#a68d55] bg-[#e0e1cf] p-4">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#43533e]">
            Try seeing it this way
          </h4>
          <p className="font-story text-xl leading-relaxed">{lesson.example}</p>
        </div>
        <p className="text-sm leading-relaxed">{lesson.invitation}</p>
        <button
          type="button"
          onClick={onChat}
          className="mt-3 min-h-11 py-2 text-sm text-[#775a26] underline underline-offset-4"
        >
          Talk it through with Elian →
        </button>
      </article>
    </section>
  );
}
