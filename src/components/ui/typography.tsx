import type { HTMLAttributes } from 'react';

export function Eyebrow({
  className = '',
  small = false,
  tone = 'gold',
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  small?: boolean;
  tone?: 'gold' | 'brown' | 'moss' | 'sage' | 'illuminated';
}) {
  const colors = {
    gold: 'text-gold',
    illuminated: 'text-[#ceb47b]',
    brown: 'text-[#65552c]',
    moss: 'text-[#4b5a36]',
    sage: 'text-[#62572d]',
  };
  return (
    <div
      className={`font-semibold uppercase tracking-[2px] ${small ? 'text-[0.75rem]' : 'text-[0.75rem]'} ${colors[tone]} ${className}`}
      {...props}
    />
  );
}

export function Narrative({ className = '', ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`mb-5 font-story text-[1.1875rem] leading-[1.5] tablet:text-xl ${className}`}
      {...props}
    />
  );
}

export function Muted({ className = '', ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={`my-3 text-xs leading-[1.6] text-[#43533e] ${className}`} {...props} />;
}

export function Tag({ className = '', ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`text-[0.75rem] uppercase tracking-[1px] text-[#43533e] ${className}`}
      {...props}
    />
  );
}
