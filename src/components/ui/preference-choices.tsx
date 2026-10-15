import { useId } from 'react';
import type { IconName } from '@/lib/types';
import Icon from '../icon';

export default function PreferenceChoices<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly { value: T; label: string; description?: string; icon?: IconName }[];
  onChange: (value: T) => void;
}) {
  const id = useId();
  return (
    <fieldset className="my-5 min-w-0">
      <legend className="mb-2 text-sm font-medium">{label}</legend>
      <div
        className={`grid gap-2 ${options.length === 3 ? 'grid-cols-1 min-[480px]:grid-cols-3' : 'grid-cols-2'}`}
      >
        {options.map((option) => (
          <label key={option.value} className="relative block cursor-pointer">
            <input
              type="radio"
              name={id}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="peer sr-only"
            />
            <span className="flex h-full min-h-12 flex-col justify-center gap-1 border border-[#6b795e] bg-[#f3eddb] px-3 py-3 text-sm leading-snug text-[#43533e] peer-checked:border-[#243d33] peer-checked:bg-[#243d33] peer-checked:text-[#fff5dc] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#775a26]">
              <span className="flex items-center gap-2">
                {option.icon && <Icon name={option.icon} className="size-4" />}
                {option.label}
              </span>
              {option.description && (
                <small className="text-xs leading-relaxed">{option.description}</small>
              )}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
