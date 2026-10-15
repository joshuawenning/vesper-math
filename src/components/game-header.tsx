import type { ReactNode } from 'react';
import Icon from './icon';
import type { DialogView, IconName, Progress } from '@/lib/types';

function NavButton({
  active = false,
  onClick,
  icon,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  icon: IconName;
  children: ReactNode;
}) {
  return (
    <button
      className={`relative flex h-full items-center gap-[9px] border-0 bg-transparent py-3 text-[10px] tablet:text-xs ${active ? 'text-gold after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-gold' : 'text-[#a3afa7]'}`}
      onClick={onClick}
    >
      <Icon name={icon} className="size-4 tablet:size-5" />
      {children}
    </button>
  );
}

export default function GameHeader({
  progress,
  open,
  close,
}: {
  progress: Progress;
  open: (view: DialogView) => void;
  close: () => void;
}) {
  const links: { title: string; icon: IconName; kind: 'map' | 'journal' | 'settings' }[] = [
    { title: 'World map', icon: 'map', kind: 'map' },
    { title: 'Journal', icon: 'book', kind: 'journal' },
    { title: 'Settings', icon: 'settings', kind: 'settings' },
  ];
  return (
    <header className="mx-[18px] flex min-h-[75px] flex-wrap items-center justify-between border-b border-line tablet:mx-[25px] tablet:h-[89px] tablet:flex-nowrap tablet:gap-[25px] desktop:mx-[42px]">
      <div className="flex items-center gap-[14px] py-[15px] text-gold tablet:py-0">
        <Icon name="star" className="h-[43px] w-7 tablet:w-[37px]" />
        <div>
          <div className="font-story text-[31px] font-semibold tracking-[2px] tablet:text-[37px] tablet:tracking-[3px]">
            Vesper
          </div>
          <small className="block text-[6px] tracking-[3.2px] text-[#a9b3a5] tablet:text-[8px]">
            A JOURNEY OF UNDERSTANDING
          </small>
        </div>
      </div>
      <nav
        className="order-3 flex h-[45px] w-full items-center justify-around border-t border-line tablet:order-0 tablet:h-full tablet:w-auto tablet:justify-start tablet:gap-5 tablet:border-t-0 desktop:gap-[30px]"
        aria-label="Main"
      >
        <NavButton active onClick={close} icon="leaf">
          Adventure
        </NavButton>
        {links.map((link) => (
          <NavButton key={link.kind} onClick={() => open({ kind: link.kind })} icon={link.icon}>
            {link.title}
            {link.kind === 'journal' && progress.done.length > 0 && (
              <small className="text-[9px]">{progress.done.length}</small>
            )}
          </NavButton>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-3 text-xs tablet:ml-0">
        <div className="grid size-[35px] place-items-center rounded-full border border-[#9f8b57] bg-[#34433b] text-gold">
          <Icon name="star" />
        </div>
        <div className="hidden desktop:block">
          Wayfarer
          <small className="mt-[3px] block text-[10px] text-muted">
            {progress.ending ? 'Keeper of the mere' : 'Chapter I · The awakening'}
          </small>
        </div>
      </div>
    </header>
  );
}
