'use client';
import { useEffect, useRef, useState } from 'react';
import { tutorReply, type TutorSession } from '@/lib/tutor';
import { skillLevels } from '@/content/worlds';
import type { Progress } from '@/lib/types';
import Button from '../ui/button';
import ReadAloud from '../accessibility/read-aloud';

interface Message {
  id: number;
  role: 'elian' | 'player';
  text: string;
}
export default function TutorChat({
  progress,
  onChange,
}: {
  progress: Progress;
  onChange: (progress: Progress) => void;
}) {
  const name = progress.profile.name || 'wayfarer';
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'elian',
      text: `Welcome, ${name}. Ask me about a math idea, type a calculation, or invite me to quiz you. What would you like to understand today? We can start with a small example and follow your curiosity.`,
    },
  ]);
  const [input, setInput] = useState('');
  const [question, setQuestion] = useState(false);
  const session = useRef<TutorSession>({ question: null, count: 0 });
  const log = useRef<HTMLDivElement>(null);
  const sequence = useRef(0);
  const composer = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [messages]);

  function send(text: string) {
    const value = text.trim();
    if (!value || value.length > 400) return;
    const result = tutorReply(
      value,
      { name: progress.profile.name, skill: progress.skill, reading: progress.reading },
      session.current,
    );
    session.current = result.session;
    setQuestion(Boolean(result.session.question));
    const id = ++sequence.current;
    setMessages((old) =>
      [
        ...old,
        { id: id * 2 - 1, role: 'player' as const, text: value },
        { id: id * 2, role: 'elian' as const, text: result.text },
      ].slice(-24),
    );
    setInput('');
    composer.current?.focus({ preventScroll: true });
    if (result.assessment !== undefined)
      onChange({
        ...progress,
        practice: {
          attempts: Math.min(1e6, progress.practice.attempts + 1),
          correct: Math.min(1e6, progress.practice.correct + (result.assessment ? 1 : 0)),
        },
      });
  }
  const latestReply = messages.filter((m) => m.role === 'elian').at(-1)?.id;
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="mb-3 shrink-0 flex flex-wrap items-center justify-between gap-2 text-[0.75rem] text-[#43533e]">
        <span>On-device math guide · no messages leave this device</span>
        <span>{skillLevels.find((l) => l.id === progress.skill)?.label}</span>
      </div>
      <div
        ref={log}
        role="log"
        tabIndex={0}
        aria-label="Conversation with Elian"
        aria-live="polite"
        aria-relevant="additions"
        className="mb-3 min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain pr-1"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`border px-4 py-3 ${message.role === 'elian' ? 'border-[#909c8340] bg-[#f4edda]' : 'ml-7 border-[#53674a50] bg-[#dce3cf]'}`}
          >
            <div className="mb-1 flex items-center justify-between gap-2">
              <strong className="block text-[0.75rem] uppercase tracking-[1px] text-[#43533e]">
                {message.role === 'elian' ? 'Elian' : name}
              </strong>
              {message.id === latestReply && (
                <ReadAloud
                  text={message.text}
                  settings={progress.speech}
                  label="Read Elian’s reply aloud"
                  compact
                />
              )}
            </div>
            <p
              className={`whitespace-pre-line leading-[1.5] ${message.role === 'elian' ? 'font-story text-[1.1875rem]' : 'text-[0.8125rem]'}`}
            >
              {message.text}
            </p>
          </div>
        ))}
      </div>
      <form
        className="shrink-0"
        onSubmit={(event) => {
          event.preventDefault();
          send(input);
        }}
      >
        <label className="sr-only" htmlFor="elian-message">
          Message Elian
        </label>
        <textarea
          id="elian-message"
          ref={composer}
          className="block min-h-[76px] w-full resize-y border border-[#6b795e] bg-[#f8f2df] px-3 py-2.5 text-base leading-[1.5]"
          value={input}
          maxLength={400}
          onChange={(event) => setInput(event.target.value)}
          placeholder={
            question ? 'Your answer, a fraction, or “hint”…' : 'Ask about math, or type “quiz me”…'
          }
          rows={2}
        />
        <div className="mt-3 flex flex-wrap items-center gap-2.5">
          <Button type="submit" disabled={!input.trim()}>
            Send to Elian
          </Button>
          <span className="ml-auto text-[0.75rem] text-[#43533e]">{input.length}/400</span>
        </div>
      </form>
      <p className="mt-3 text-xs leading-relaxed text-[#43533e]">
        Explore concepts in the training library. This on-device guide supports math topics,
        calculations, and quizzes.
      </p>
    </div>
  );
}
