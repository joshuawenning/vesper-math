import type { TrainingProblem } from '@/lib/types';
export default function TrainingModel({ problem: p }: { problem: TrainingProblem }) {
  if (p.operation === 'multiply')
    return (
      <figure className="mt-4 border border-[#909c8350] p-3">
        <div aria-hidden="true" className="flex flex-wrap gap-2">
          {Array.from({ length: p.a }, (_, i) => (
            <span
              key={i}
              className="flex min-h-9 min-w-9 items-center justify-center border border-[#6b795e] bg-[#dce3cf] px-2 text-sm text-[#384a3b]"
            >
              {p.b}
            </span>
          ))}
        </div>
        <figcaption className="mt-3 text-sm leading-relaxed">
          {p.a} equal groups, with {p.b} in each. Add the groups, or split them into smaller
          batches.
        </figcaption>
      </figure>
    );
  const count = p.operation === 'add' ? p.a + p.b : p.a;
  return (
    <figure className="mt-4 border border-[#909c8350] p-3">
      <div aria-hidden="true" className="flex flex-wrap gap-2">
        {Array.from({ length: count }, (_, i) => (
          <span
            key={i}
            className={`size-4 rounded-full border border-[#385a48] ${p.operation === 'add' ? (i < p.a ? 'bg-[#385a48]' : 'bg-[#b59655]') : i < p.a - p.b ? 'bg-[#385a48]' : 'bg-transparent opacity-40'}`}
          />
        ))}
      </div>
      <figcaption className="mt-3 text-sm leading-relaxed">
        {p.operation === 'add'
          ? `${p.a} green stones join ${p.b} gold stones. Count the combined collection.`
          : `Begin with ${p.a} stones. Set aside ${p.b} outlined stones. Count the green stones that remain.`}
      </figcaption>
    </figure>
  );
}
