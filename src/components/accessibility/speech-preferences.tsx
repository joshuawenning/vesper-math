'use client';
import { narrationVoiceLabel } from '@/lib/speech';
import type { Progress } from '@/lib/types';
import PreferenceSelect from '../ui/preference-select';
import Button from '../ui/button';
import { Muted } from '../ui/typography';
import { useSpeech } from './use-speech';

export default function SpeechPreferences({
  value,
  onChange,
}: {
  value: Progress['speech'];
  onChange: (value: Progress['speech']) => void;
}) {
  const speech = useSpeech(value);
  return (
    <>
      <PreferenceSelect
        label="Read-aloud controls"
        value={value.enabled ? 'on' : 'off'}
        onChange={(e) => onChange({ ...value, enabled: e.target.value === 'on' })}
      >
        <option value="off">Off</option>
        <option value="on">On</option>
      </PreferenceSelect>
      {value.enabled && (
        <>
          <PreferenceSelect
            label="Spoken voice"
            value={speech.voices.some((v) => v.voiceURI === value.voice) ? value.voice : ''}
            onChange={(e) => onChange({ ...value, voice: e.target.value })}
          >
            <option value="">Default on-device voice</option>
            {speech.voices.map((v) => (
              <option key={v.voiceURI} value={v.voiceURI}>
                {narrationVoiceLabel(v)}
              </option>
            ))}
          </PreferenceSelect>
          <PreferenceSelect
            label="Reading pace"
            value={String(value.rate)}
            onChange={(e) => onChange({ ...value, rate: Number(e.target.value) })}
          >
            <option value="0.8">Slower</option>
            <option value="1">Natural</option>
            <option value="1.15">A little faster</option>
          </PreferenceSelect>
          <Button
            variant="secondary"
            disabled={!speech.ready}
            onClick={() =>
              speech.speaking
                ? speech.stop()
                : speech.speak(
                    'Welcome to Vesper Math. Three quarters minus one quarter equals one half. Take your time; we can explore this together.',
                  )
            }
          >
            {speech.speaking ? 'Stop reading' : 'Preview voice'}
          </Button>
          <p role="status" className="my-3 text-sm text-[#43533e]">
            {speech.notice ||
              (!speech.available
                ? 'Speech is not available in this browser.'
                : !speech.ready
                  ? 'No on-device English voice is available yet. Check your device’s voice settings or try another browser.'
                  : '')}
          </p>
        </>
      )}
      <Muted>
        Reading starts only when you press a read button. Only natural on-device English narrators
        are listed, with one voice per available accent. No audio is sent to a server by Vesper
        Math. Your device supplies the available voices.
      </Muted>
    </>
  );
}
