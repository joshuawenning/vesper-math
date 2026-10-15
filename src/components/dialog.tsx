'use client';
import { useEffect, useRef, type ReactNode, type KeyboardEvent } from 'react';
import Image from 'next/image';
import type { Artwork } from '@/lib/types';
import { Eyebrow } from './ui/typography';

function keepFocusInside(event: KeyboardEvent<HTMLDialogElement>) {
  if (event.key !== 'Tab') return;
  const controls = Array.from(
    event.currentTarget.querySelectorAll<HTMLElement>(
      'button, a[href], input:not([type="hidden"]), select, textarea, summary, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.matches(':disabled') && element.getClientRects().length > 0);
  const first = controls[0],
    last = controls.at(-1);
  if (!first || !last) {
    event.preventDefault();
    return;
  }
  const active = document.activeElement;
  if (event.shiftKey && (active === first || !controls.includes(active as HTMLElement))) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}

function DialogIllustration({ artwork }: { artwork: Artwork }) {
  return (
    <figure
      className={`relative -mx-[23px] -mt-[19px] mb-5 overflow-hidden border-b border-[#9b855b77] bg-[#263e35] tablet:-mx-8 tablet:-mt-[21px] tablet:mb-[23px] ${artwork.portrait ? 'h-[220px] tablet:h-[260px]' : 'aspect-[3/2]'}`}
    >
      <Image
        className={`object-cover ${artwork.portrait ? 'object-[center_30%]' : 'object-center'}`}
        src={artwork.src}
        alt={artwork.alt}
        fill
        sizes="(max-width: 628px) calc(100vw - 28px), 600px"
        quality={85}
      />
    </figure>
  );
}

export default function Dialog({
  title,
  label,
  artwork,
  onDismiss,
  children,
}: {
  title: string;
  label: string;
  artwork: Artwork;
  onDismiss: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = ref.current;
    const previous = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    element?.showModal();
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      if (previous instanceof HTMLElement && previous.isConnected) previous.focus();
    };
  }, []);

  useEffect(() => {
    ref.current?.scrollTo({ top: 0 });
    ref.current?.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true });
  }, [title, label]);

  return (
    <dialog
      className="m-auto max-h-[90dvh] w-[calc(100%_-_28px)] overscroll-contain max-w-[600px] border border-[#a68d55] bg-paper p-0 text-ink shadow-[0_30px_100px_#0009] backdrop:bg-[#071414ce] backdrop:backdrop-blur-[5px]"
      ref={ref}
      aria-labelledby="dialog-title"
      onKeyDown={keepFocusInside}
      onCancel={(event) => {
        event.preventDefault();
        onDismiss();
      }}
    >
      <div className="sticky top-0 z-10 bg-paper border-b border-[#29382c22] px-[23px] pt-6 pb-[18px] tablet:px-8 tablet:pt-[29px] tablet:pb-[19px]">
        <Eyebrow tone="brown">{label}</Eyebrow>
        <h2
          id="dialog-title"
          tabIndex={-1}
          className="mt-[9px] mr-[50px] font-story text-[1.875rem] font-semibold leading-[1.1] tablet:text-[2.125rem]"
        >
          {title}
        </h2>
        <button
          className="absolute right-5 top-5 size-11 border-0 bg-transparent text-[1.5625rem] text-[#47544b]"
          aria-label="Close dialog"
          onClick={onDismiss}
        >
          ×
        </button>
      </div>
      <div className="px-[23px] pt-[19px] pb-6 tablet:px-8 tablet:pt-[21px] tablet:pb-[29px]">
        <DialogIllustration artwork={artwork} />
        {children}
      </div>
    </dialog>
  );
}
