'use client';
import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { chapter } from '@/content/merewood';
import { initialProgress, normalizeProgress, SAVE_KEY } from '@/lib/progress';
import { observeAppearance } from '@/lib/theme';
import type { Progress } from '@/lib/types';

function useStoredProgress() {
  const [progress, setProgress] = useState<Progress>(initialProgress);
  const [loaded, setLoaded] = useState(false);
  const [storageOK, setStorageOK] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (raw) setProgress(normalizeProgress(JSON.parse(raw), chapter));
    } catch {
      setStorageOK(false);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    document.documentElement.dataset.textSize = progress.textSize;
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(progress));
      setStorageOK(true);
    } catch {
      setStorageOK(false);
    }
  }, [progress, loaded]);

  useEffect(() => {
    if (!loaded) return;
    return observeAppearance(
      progress.theme,
      window.matchMedia('(prefers-color-scheme: dark)'),
      (theme) => {
        document.documentElement.dataset.theme = theme;
      },
    );
  }, [progress.theme, loaded]);

  return { progress, setProgress, loaded, storageOK };
}

const ProgressContext = createContext<
  | (ReturnType<typeof useStoredProgress> & {
      chatOpen: boolean;
      openChat: () => void;
      closeChat: () => void;
    })
  | null
>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const state = useStoredProgress();
  const [chatOpen, setChatOpen] = useState(false);
  return createElement(
    ProgressContext.Provider,
    {
      value: {
        ...state,
        chatOpen,
        openChat: () => setChatOpen(true),
        closeChat: () => setChatOpen(false),
      },
    },
    children,
  );
}
export function useProgress() {
  const state = useContext(ProgressContext);
  if (!state) throw new Error('ProgressProvider is required');
  return state;
}
