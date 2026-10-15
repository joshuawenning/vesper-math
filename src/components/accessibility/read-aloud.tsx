'use client';
import { useEffect } from 'react';
import type { Progress } from '@/lib/types';
import Button from '../ui/button';
import { useSpeech } from './use-speech';

function Reader({
  text,
  settings,
  label,
}: {
  text: string;
  settings: Progress['speech'];
  label: string;
}) {
  const speech = useSpeech(settings);
  useEffect(() => {
    speech.stop();
  }, [text]);
  return (
    <div className="my-3">
      <Button
        variant="secondary"
        disabled={!speech.ready}
        onClick={() => (speech.speaking ? speech.stop() : speech.speak(text))}
      >
        {speech.speaking ? 'Stop reading' : label}
      </Button>
      <p role="status" className="mt-2 text-xs text-[#43533e]">
        {speech.notice ||
          (!speech.ready
            ? 'An on-device English voice is not available in this browser. You can keep reading the text below.'
            : '')}
      </p>
    </div>
  );
}
export default function ReadAloud({
  text,
  settings,
  label = 'Read problem aloud',
}: {
  text: string;
  settings: Progress['speech'];
  label?: string;
}) {
  return settings.enabled ? <Reader text={text} settings={settings} label={label} /> : null;
}
