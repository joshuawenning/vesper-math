'use client';
import { narrationVoiceLabel } from '@/lib/speech';
import type { Progress } from '@/lib/types';
import PreferenceSelect from '../ui/preference-select';
import Button from '../ui/button';
import PreferenceChoices from '../ui/preference-choices';
import PreferenceSwitch from '../ui/preference-switch';
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
      <PreferenceSwitch
        label="Read-aloud controls"
        description="Show a speaker beside problems and Elian’s replies."
        checked={value.enabled}
        onChange={(enabled) => onChange({ ...value, enabled })}
      />
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
          <PreferenceChoices
            label="Reading pace"
            value={value.rate}
            onChange={(rate) => onChange({ ...value, rate })}
            options={[
              { value: 0.8, label: 'Slower' },
              { value: 1, label: 'Natural' },
              { value: 1.15, label: 'A little faster' },
            ]}
          />
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
