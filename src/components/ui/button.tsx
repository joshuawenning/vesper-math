import type { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'quiet';
};

const variants = {
  primary:
    'inline-flex items-center justify-center gap-[13px] border border-[#49634e] bg-forest px-[19px] py-[13px] text-[10px] font-bold uppercase tracking-[1.3px] text-[#eee3c5] hover:bg-[#335443]',
  secondary:
    'border border-[#7e886b80] bg-transparent px-[15px] py-3 text-[11px] text-[#384a3b] hover:bg-[#c4c6ad55]',
  quiet: 'border-0 bg-transparent py-[6px] text-[10px] text-gold',
};

export default function Button({
  variant = 'primary',
  type = 'button',
  className = '',
  ...props
}: Props) {
  return (
    <button
      type={type}
      className={`${variants[variant]} disabled:opacity-45 ${className}`}
      {...props}
    />
  );
}
