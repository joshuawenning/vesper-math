'use client';
import { useEffect, useRef, useState } from 'react';
import type { Progress } from '@/lib/types';
import { spokenMath } from '@/lib/speech';

export function useSpeech(settings: Progress['speech']) {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [available, setAvailable] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [notice, setNotice] = useState('');
  const current = useRef<SpeechSynthesisUtterance | null>(null);
  function stop() {
    if (current.current) {
      current.current.onend = null;
      current.current.onerror = null;
      window.speechSynthesis.cancel();
      current.current = null;
    }
    setSpeaking(false);
  }
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;
    setAvailable(true);
    const synth = window.speechSynthesis;
    const update = () =>
      setVoices(synth.getVoices().filter((v) => v.localService && /^en(?:-|_)/i.test(v.lang)));
    update();
    synth.addEventListener('voiceschanged', update);
    return () => {
      synth.removeEventListener('voiceschanged', update);
      if (current.current) {
        current.current.onend = null;
        current.current.onerror = null;
        synth.cancel();
        current.current = null;
      }
    };
  }, []);
  useEffect(() => {
    stop();
  }, [settings.enabled, settings.voice, settings.rate]);
  const voice = voices.find((v) => v.voiceURI === settings.voice) ?? voices[0];
  function speak(text: string) {
    if (!available || !voice) return;
    stop();
    setNotice('');
    const utterance = new SpeechSynthesisUtterance(spokenMath(text));
    utterance.voice = voice;
    utterance.lang = voice.lang;
    utterance.rate = settings.rate;
    utterance.onend = () => {
      setSpeaking(false);
      current.current = null;
    };
    utterance.onerror = () => {
      setSpeaking(false);
      current.current = null;
      setNotice('The voice could not start. Try again or choose another voice in Settings.');
    };
    current.current = utterance;
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  }
  return { voices, available, speaking, notice, speak, stop, ready: Boolean(voice) };
}
