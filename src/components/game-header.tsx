import type { ReactNode } from 'react';
import Icon from './icon';
import CharacterPortrait from './profile/character-portrait';
import { getPersona } from '@/content/personas';
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
          <div className="whitespace-nowrap font-story text-[31px] font-semibold tracking-[2px] tablet:text-[37px] tablet:tracking-[3px]">
            Vesper Math
          </div>
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
      <button
        type="button"
        aria-label="Your character profile"
        className="ml-auto flex items-center gap-3 text-left text-xs tablet:ml-0"
        onClick={() => open({ kind: 'profile' })}
      >
        <CharacterPortrait
          persona={progress.profile.persona}
          className="size-[38px] overflow-hidden rounded-full border border-[#9f8b57]"
        />
        <span className="hidden desktop:block">
          {progress.profile.name || 'Wayfarer'}
          <small className="mt-[3px] block text-[10px] text-muted">
            {getPersona(progress.profile.persona).name} ·{' '}
            {progress.ending ? 'Chapter complete' : 'On the road'}
          </small>
        </span>
      </button>
    </header>
  );
}
