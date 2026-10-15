export default function TextSizeControl({
  value,
  onChange,
}: {
  value: 'standard' | 'large';
  onChange: (value: 'standard' | 'large') => void;
}) {
  return (
    <div
      className="my-5 flex flex-wrap items-center justify-between gap-3"
      role="group"
      aria-label="Text size"
    >
      <span className="text-sm font-medium">Text size</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Use standard text size"
          disabled={value === 'standard'}
          onClick={() => onChange('standard')}
          className="grid size-11 place-items-center border border-[#6b795e] font-story text-xl disabled:opacity-40"
        >
          A−
        </button>
        <output aria-live="polite" className="min-w-16 text-center text-sm">
          {value === 'large' ? '125%' : 'Standard'}
        </output>
        <button
          type="button"
          aria-label="Increase text size to 125%"
          disabled={value === 'large'}
          onClick={() => onChange('large')}
          className="grid size-11 place-items-center border border-[#6b795e] font-story text-xl disabled:opacity-40"
        >
          A+
        </button>
      </div>
    </div>
  );
}
