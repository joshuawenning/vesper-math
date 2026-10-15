'use client';
import { useEffect } from 'react';
import type { Progress } from '@/lib/types';
import Button from '../ui/button';
import Icon from '../icon';
import { useSpeech } from './use-speech';

function Reader({
  text,
  settings,
  label,
  compact,
}: {
  text: string;
  settings: Progress['speech'];
  label: string;
  compact: boolean;
}) {
  const speech = useSpeech(settings);
  useEffect(() => {
    speech.stop();
  }, [text]);
  return (
    <div className={compact ? 'shrink-0' : 'my-3'}>
      {compact ? (
        <button
          type="button"
          className="grid size-11 place-items-center rounded-full text-[#43533e] hover:bg-[#dce3cf] disabled:opacity-40"
          aria-label={speech.speaking ? 'Stop reading' : label}
          title={speech.speaking ? 'Stop reading' : label}
          disabled={!speech.ready}
          onClick={() => (speech.speaking ? speech.stop() : speech.speak(text))}
        >
          <Icon name={speech.speaking ? 'stop' : 'speaker'} className="size-5" />
        </button>
      ) : (
        <Button
          variant="secondary"
          disabled={!speech.ready}
          onClick={() => (speech.speaking ? speech.stop() : speech.speak(text))}
        >
          {speech.speaking ? 'Stop reading' : label}
        </Button>
      )}
      <p role="status" className={compact ? 'sr-only' : 'mt-2 text-xs text-[#43533e]'}>
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
  compact = false,
}: {
  text: string;
  settings: Progress['speech'];
  label?: string;
  compact?: boolean;
}) {
  return settings.enabled ? (
    <Reader text={text} settings={settings} label={label} compact={compact} />
  ) : null;
}
