import type { HTMLAttributes } from 'react';

export function Actions({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mt-[19px] flex flex-wrap items-center gap-2.5 ${className}`} {...props} />
  );
}
export function Toolbox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-[18px] border border-[#66735d30] bg-[#d8d3be77] p-[23px]">{children}</div>
  );
}
export function Feedback({
  success = false,
  children,
}: {
  success?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`mt-4 border-l-2 px-[15px] py-3 text-[13px] leading-[1.6] ${success ? 'border-[#4a7450] bg-[#4e7a5322]' : 'border-[#9b773b] bg-[#cba65b22]'}`}
    >
      {children}
    </div>
  );
}
export function Reward({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-[#8c895c55] p-[22px] text-center font-story text-[25px] italic text-[#556244]">
      {children}
    </div>
  );
}
export function Meter({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-5 text-center text-xs text-[#536249]" aria-live="polite">
      {children}
    </p>
  );
}
