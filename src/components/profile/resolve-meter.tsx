export default function ResolveMeter({
  value,
  context = 'story',
}: {
  value: number;
  context?: 'story' | 'training';
}) {
  const resolve = Math.max(0, Math.min(20, value));
  return (
    <div className="my-4 border border-[#9a855d80] bg-[#e9dfc5] p-4 text-[#384a3b] shadow-[inset_0_0_0_3px_#f4ecd980]">
      <div className="mb-2.5 flex items-center justify-between gap-3 font-story text-xl leading-none">
        <span>Resolve</span>
        <span aria-live="polite" className="tabular-nums">
          {resolve} <span className="text-base text-[#665737]">/ 20</span>
        </span>
      </div>
      <div
        role="meter"
        className="relative h-3 w-full overflow-hidden border border-[#8d754c] bg-[#cfc2a2] shadow-[inset_0_1px_3px_#57452940]"
        aria-valuemin={0}
        aria-valuemax={20}
        aria-valuenow={resolve}
        aria-label="Resolve"
      >
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 bg-[linear-gradient(90deg,#344c40,#636945)] shadow-[inset_0_1px_0_#f2e5ac55] transition-[width] duration-300"
          style={{ width: `${resolve * 5}%` }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_calc(5%_-_1px),#f2e7ce66_calc(5%_-_1px),#f2e7ce66_5%)]"
        />
      </div>
      <p className="mt-2.5 text-xs leading-relaxed text-[#4a503a]">
        {context === 'training'
          ? 'Practice +1 · Mistakes cost nothing. Train to restore Resolve, up to 20.'
          : 'Correct +2 · New mistake −1 · Reflection +1. At zero, train with Elian to reopen the trail.'}
      </p>
    </div>
  );
}
