import { useId } from 'react';

export default function PreferenceSwitch({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const id = useId();
  return (
    <label className="my-5 flex min-h-11 cursor-pointer items-center justify-between gap-4">
      <span className="text-sm font-medium">
        {label}
        {description && (
          <small id={id} className="mt-1 block text-xs font-normal leading-relaxed text-[#43533e]">
            {description}
          </small>
        )}
      </span>
      <span className="relative shrink-0">
        <input
          type="checkbox"
          role="switch"
          aria-label={label}
          aria-describedby={description ? id : undefined}
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="peer sr-only"
        />
        <span className="block h-7 w-12 rounded-full border border-[#6b795e] bg-[#d7d9c6] peer-checked:bg-[#243d33] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#775a26]" />
        <span className="pointer-events-none absolute top-1 left-1 size-5 rounded-full bg-[#43533e] transition-transform peer-checked:translate-x-5 peer-checked:bg-[#fff5dc]" />
      </span>
    </label>
  );
}
