'use client';
import { useEffect, useState } from 'react';
import { chapter } from '@/content/merewood';
import { initialProgress, normalizeProgress, SAVE_KEY } from '@/lib/progress';
import { observeAppearance } from '@/lib/theme';
import type { Progress } from '@/lib/types';

export function useProgress() {
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
