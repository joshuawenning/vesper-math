import type { ReactNode } from 'react';
import Icon from './icon';
import CharacterPortrait from './profile/character-portrait';
import { getPersona } from '@/content/personas';
import type { DialogView, IconName, Progress } from '@/lib/types';

function NavButton({
  onClick,
  icon,
  children,
}: {
  onClick: () => void;
  icon: IconName;
  children: ReactNode;
}) {
  return (
    <button
      className="flex min-h-11 h-full flex-col items-center justify-center gap-1 min-[480px]:flex-row min-[480px]:gap-2 border-0 bg-transparent py-3 text-[0.75rem] text-subtle hover:text-gold tablet:text-xs"
      onClick={onClick}
    >
      <Icon name={icon} className="size-4 tablet:size-5" />
      <span className="inline-flex items-center gap-2">{children}</span>
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
    { title: 'Settings', icon: 'gear', kind: 'settings' },
  ];
  return (
    <header className="mx-[18px] flex min-h-[75px] flex-wrap items-center justify-between border-b border-line tablet:mx-[25px] desktop:min-h-[89px] desktop:flex-nowrap desktop:gap-[25px] desktop:mx-[42px]">
      <a
        href="#adventure"
        onClick={close}
        aria-label="Vesper Math — current adventure"
        className="flex items-center gap-[14px] py-[15px] text-gold tablet:py-0"
      >
        <Icon name="star" className="h-[43px] w-7 tablet:w-[37px]" />
        <div>
          <div className="whitespace-nowrap font-story text-[clamp(1.5rem,5vw,2.3125rem)] font-semibold tracking-[2px]">
            Vesper Math
          </div>
        </div>
      </a>
      <nav
        className="order-3 grid w-full grid-cols-3 gap-x-3 gap-y-1 py-2 min-[480px]:flex min-[480px]:justify-around desktop:flex border-t border-line desktop:order-0 desktop:h-full desktop:w-auto desktop:justify-start desktop:gap-5 desktop:border-t-0 desktop:gap-[30px]"
        aria-label="Main"
      >
        {links.map((link) => (
          <NavButton key={link.kind} onClick={() => open({ kind: link.kind })} icon={link.icon}>
            {link.title}
            {link.kind === 'journal' && progress.done.length > 0 && (
              <small className="text-[0.75rem]">{progress.done.length}</small>
            )}
          </NavButton>
        ))}
      </nav>
      <button
        type="button"
        aria-label="Your character profile"
        className="ml-auto flex items-center gap-3 text-left text-xs desktop:ml-0"
        onClick={() => open({ kind: 'profile' })}
      >
        <CharacterPortrait
          persona={progress.profile.persona}
          className="size-[38px] overflow-hidden rounded-full border border-[#9f8b57]"
        />
        <span className="hidden desktop:block">
          {progress.profile.name || 'Wayfarer'}
          <small className="mt-[3px] block text-[0.75rem] text-muted">
            {getPersona(progress.profile.persona).name} ·{' '}
            {progress.ending ? 'Chapter complete' : 'On the road'}
          </small>
        </span>
      </button>
    </header>
  );
}
