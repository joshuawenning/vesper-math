'use client';
import { useEffect, useState } from 'react';
import { chapter } from '@/content/merewood';
import { initialProgress, normalizeProgress, SAVE_KEY } from '@/lib/progress';
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
    document.documentElement.dataset.theme = progress.theme;
    document.documentElement.dataset.textSize = progress.textSize;
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(progress));
      setStorageOK(true);
    } catch {
      setStorageOK(false);
    }
  }, [progress, loaded]);

  return { progress, setProgress, loaded, storageOK };
}
