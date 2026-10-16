'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useProgress } from '../use-progress';
import { artwork } from '@/content/artwork';
const TutorChat = dynamic(() => import('./tutor-chat'));
export default function ElianChat() {
  const pathname = usePathname();
  const { progress, setProgress, chatOpen, openChat, closeChat } = useProgress();
  const [visited, setVisited] = useState(false);
  const panel = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!chatOpen && visited) trigger.current?.focus({ preventScroll: true });
    if (chatOpen) {
      setVisited(true);
      panel.current?.querySelector<HTMLButtonElement>('button')?.focus({ preventScroll: true });
    }
  }, [chatOpen]);
  function close() {
    closeChat();
    window.speechSynthesis?.cancel();
    trigger.current?.focus({ preventScroll: true });
  }
  if (pathname === '/' || pathname === '/begin') return null;
  return (
    <>
      {!chatOpen && (
        <button
          ref={trigger}
          type="button"
          onClick={openChat}
          aria-haspopup="dialog"
          aria-expanded={false}
          className="fixed bottom-4 right-4 z-40 flex min-h-12 items-center gap-3 rounded-full border border-gold/50 bg-night py-2 pl-2 pr-5 text-body shadow-xl"
        >
          <Image
            src={artwork.elian.src}
            alt=""
            width={36}
            height={36}
            className="size-9 rounded-full object-cover"
          />
          <span className="text-sm">Speak with Elian</span>
        </button>
      )}
      <section
        ref={panel}
        role="dialog"
        aria-modal="false"
        aria-labelledby="elian-chat-title"
        hidden={!chatOpen}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.stopPropagation();
            close();
          }
        }}
        className="fixed bottom-3 right-3 z-80 flex h-[min(680px,calc(100dvh-24px))] w-[min(410px,calc(100vw-24px))] flex-col border border-[#9b855b] bg-paper text-ink shadow-[0_20px_80px_#0008] [&[hidden]]:hidden"
      >
        <header className="flex shrink-0 items-center gap-3 border-b border-[#909c8350] px-4 py-3">
          <Image
            src={artwork.elian.src}
            alt=""
            width={44}
            height={44}
            className="size-11 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 id="elian-chat-title" className="font-story text-2xl leading-tight">
              Elian
            </h2>
            <p className="text-xs text-[#43533e]">Your math companion</p>
          </div>
          <button
            type="button"
            className="grid size-11 place-items-center text-2xl"
            onClick={close}
            aria-label="Close Elian chat"
          >
            ×
          </button>
        </header>
        <div className="flex min-h-0 flex-1 flex-col p-4">
          {visited && <TutorChat progress={progress} onChange={setProgress} />}
        </div>
      </section>
    </>
  );
}
