'use client';
import { useEffect, useRef, useState } from 'react';
import { topics, tutorReply, type TutorSession } from '@/lib/tutor';
import { skillLevels } from '@/content/worlds';
import type { Progress } from '@/lib/types';
import Button from '../ui/button';
import ReadAloud from '../accessibility/read-aloud';
import { Muted } from '../ui/typography';

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
  const [suggestions, setSuggestions] = useState([
    'Explain fractions',
    'Explain division',
    'Quiz me',
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
    setSuggestions(result.suggestions ?? []);
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
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-[0.75rem] text-[#43533e]">
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
        className="mb-4 max-h-[330px] space-y-3 overflow-y-auto overscroll-contain pr-1"
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
        onSubmit={(event) => {
          event.preventDefault();
          send(input);
        }}
      >
        <label className="mb-3 block text-sm text-[#43533e]">
          A little inspiration
          <select
            aria-label="Conversation ideas"
            value=""
            onChange={(event) => setInput(event.target.value)}
            className="mt-1 block min-h-11 w-full border-0 border-b border-[#6b795e] bg-transparent py-2 pr-2 text-base text-ink"
          >
            <option value="" disabled>
              Choose an idea to make your own…
            </option>
            <optgroup label="Keep talking">
              {suggestions
                .filter((p) => p !== 'Quiz me')
                .map((prompt) => (
                  <option key={prompt} value={prompt}>
                    {prompt}
                  </option>
                ))}
            </optgroup>
            <optgroup label="Explore a topic">
              {topics
                .filter((topic) => !suggestions.includes(`Explain ${topic}`))
                .map((topic) => (
                  <option key={topic} value={`Explain ${topic}`}>
                    {topic.charAt(0).toUpperCase() + topic.slice(1)}
                  </option>
                ))}
            </optgroup>
            <optgroup label="Practice together">
              <option value="Quiz me">Invite Elian to quiz you</option>
              {question && <option value="Hint">Ask for a hint</option>}
            </optgroup>
          </select>
        </label>
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
      <Muted>
        This is a focused local tutor, not an AI chat service. It handles supported topics, short
        arithmetic expressions, and simple equations. Chat clears when this window closes; practice
        totals remain in your profile.
      </Muted>
    </>
  );
}
