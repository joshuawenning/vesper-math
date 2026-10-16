export default function ResolveMeter({ value }: { value: number }) {
  return (
    <div className="my-4 border border-[#909c8350] bg-[#e3e3d2] p-3 text-[#384a3b]">
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold">Resolve</span>
        <span aria-live="polite">{value} / 20</span>
      </div>
      <meter
        className="block h-3 w-full accent-[#385a48]"
        min={0}
        max={20}
        value={value}
        aria-label="Resolve"
      />
      <p className="mt-2 text-xs leading-relaxed">
        Correct +2 · New mistake −1 · Reflection +1. At zero, you can still learn and continue.
      </p>
    </div>
  );
}
