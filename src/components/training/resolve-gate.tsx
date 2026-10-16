'use client';
import { useEffect, useRef } from 'react';
import Button from '../ui/button';
import Icon from '../icon';
import { Narrative, Muted } from '../ui/typography';
export default function ResolveGate({ onTrain }: { onTrain: () => void }) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, []);
  return (
    <section aria-label="Recover Resolve">
      <h3
        ref={heading}
        tabIndex={-1}
        className="mb-4 font-story text-2xl focus:outline-none focus:shadow-none"
      >
        Gather your resolve
      </h3>
      <Narrative>
        Elian rests a hand on your shoulder. “Let’s find our footing before we try again.”
      </Narrative>
      <Muted>
        Your Resolve is at zero. Your discoveries and this challenge are saved. Solve a round in the
        training ground to restore 3 Resolve, then return here.
      </Muted>
      <Button onClick={onTrain}>
        Train with Elian
        <Icon name="dice" />
      </Button>
    </section>
  );
}
