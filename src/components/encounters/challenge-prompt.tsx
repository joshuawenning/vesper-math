import type { ReactNode } from 'react';

export default function ChallengePrompt({
  children,
  narration,
}: {
  children: ReactNode;
  narration?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-start justify-between gap-2">
      <p className="min-w-0 flex-1 font-story text-xl leading-[1.5]">{children}</p>
      {narration}
    </div>
  );
}
