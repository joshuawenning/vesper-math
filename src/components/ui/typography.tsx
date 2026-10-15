import type { HTMLAttributes } from 'react';

export function Eyebrow({
  className = '',
  small = false,
  tone = 'gold',
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  small?: boolean;
  tone?: 'gold' | 'brown' | 'moss' | 'sage';
}) {
  const colors = {
    gold: 'text-gold',
    brown: 'text-[#80703e]',
    moss: 'text-[#718151]',
    sage: 'text-[#7c713f]',
  };
  return (
    <div
      className={`font-semibold uppercase tracking-[2px] ${small ? 'text-[8px]' : 'text-[9px]'} ${colors[tone]} ${className}`}
      {...props}
    />
  );
}

export function Narrative({ className = '', ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`mb-5 font-story text-[19px] leading-[1.5] tablet:text-xl ${className}`}
      {...props}
    />
  );
}

export function Muted({ className = '', ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={`my-3 text-xs leading-[1.6] text-[#647364] ${className}`} {...props} />;
}

export function Tag({ className = '', ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`text-[9px] uppercase tracking-[1px] text-[#6c794e] ${className}`}
      {...props}
    />
  );
}
