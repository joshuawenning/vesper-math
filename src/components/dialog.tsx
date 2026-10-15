'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import Image from 'next/image';
import type { Artwork } from '@/lib/types';

export default function Dialog({ title, label, artwork, onDismiss, children }: { title: string; label: string; artwork: Artwork; onDismiss: () => void; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = ref.current;
    const previous = document.activeElement;
    element?.showModal();
    return () => {
      element?.close();
      if (previous instanceof HTMLElement && previous.isConnected) previous.focus();
    };
  }, []);

  // A new view starts at the top; changing controls within an encounter keeps its position.
  useEffect(() => { ref.current?.scrollTo({ top: 0 }); }, [title]);

  return <dialog ref={ref} aria-labelledby="dialog-title" onCancel={event => { event.preventDefault(); onDismiss(); }}>
    <div className="modal-head"><div className="eyebrow">{label}</div><h2 id="dialog-title">{title}</h2><button className="close" aria-label="Close dialog" onClick={onDismiss}>×</button></div>
    <div className="modal-body"><figure className={`modal-illustration ${artwork.portrait ? 'portrait-scene' : ''}`}><Image src={artwork.src} alt={artwork.alt} width={1536} height={1024} sizes="(max-width: 628px) calc(100vw - 28px), 600px" quality={85}/></figure>{children}</div>
  </dialog>;
}
