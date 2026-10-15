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
    if (result.assessment !== undefined)
      onChange({
        ...progress,
        practice: {
          attempts: Math.min(1e6, progress.practice.attempts + 1),
          correct: Math.min(1e6, progress.practice.correct + (result.assessment ? 1 : 0)),
        },
      });
  }
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
            <strong className="mb-1 block text-[0.75rem] uppercase tracking-[1px] text-[#43533e]">
              {message.role === 'elian' ? 'Elian' : name}
            </strong>
            <p
              className={`whitespace-pre-line leading-[1.5] ${message.role === 'elian' ? 'font-story text-[1.1875rem]' : 'text-[0.8125rem]'}`}
            >
              {message.text}
            </p>
          </div>
        ))}
      </div>
      <ReadAloud
        text={messages.filter((m) => m.role === 'elian').at(-1)?.text ?? ''}
        settings={progress.speech}
        label="Read Elian’s reply aloud"
      />
      <div className="mb-4 flex flex-wrap gap-2" aria-label="Continue the conversation">
        {suggestions.map((prompt) => (
          <Button key={prompt} variant="secondary" onClick={() => send(prompt)}>
            {prompt}
          </Button>
        ))}
      </div>
      <details className="mb-4">
        <summary className="cursor-pointer py-3 text-sm">Explore math topics</summary>
        <div className="mb-4 flex flex-wrap gap-2">
          {topics.map((topic) => (
            <button
              type="button"
              key={topic}
              className="min-h-11 border border-[#909c8360] px-2.5 py-1.5 text-[0.75rem] capitalize hover:bg-[#dce3cf]"
              onClick={() => send(`Explain ${topic}`)}
            >
              {topic}
            </button>
          ))}
        </div>
      </details>
      <form
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
          <Button variant="secondary" onClick={() => send('Quiz me')}>
            Quiz me
          </Button>
          {question && (
            <Button variant="secondary" onClick={() => send('Hint')}>
              A hint
            </Button>
          )}
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
