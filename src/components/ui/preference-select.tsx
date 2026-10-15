import type { SelectHTMLAttributes } from 'react';

export default function PreferenceSelect({
  label,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
  return (
    <label className="my-[18px] flex flex-col items-start justify-between gap-[9px] text-[0.8125rem] tablet:flex-row tablet:items-center tablet:gap-5">
      {label}
      <span className="relative block w-full tablet:w-auto tablet:max-w-[280px]">
        <select
          {...props}
          className="w-full appearance-none border border-[#6b795e] bg-[#f3eddb] py-2.5 pl-3 pr-[39px] text-[#23392d]"
        >
          {children}
        </select>
        <svg
          className="pointer-events-none absolute right-[13px] top-1/2 h-[9px] w-3 -translate-y-1/2 fill-none stroke-[#43533d]"
          viewBox="0 0 14 10"
          aria-hidden="true"
        >
          <path d="m2 3 5 5 5-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </label>
  );
}
