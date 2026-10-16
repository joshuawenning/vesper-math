'use client';
import Link from 'next/link';
import { useProgress } from '../use-progress';
import Icon from '../icon';

export default function JourneyLink() {
  const { progress, loaded } = useProgress();
  const returning =
    loaded &&
    (progress.started ||
      progress.profile.name ||
      progress.history.length > 0 ||
      progress.training.attempts > 0 ||
      Object.values(progress.journeys).some((journey) => journey.started));
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <Link
        href={returning ? '/adventure' : '/begin'}
        className="inline-flex min-h-12 items-center justify-center gap-5 border border-[#b49e70] bg-[#ddc99a] px-6 py-3 text-sm font-medium text-[#192c25] hover:bg-[#eee0bd]"
      >
        {returning ? 'Continue playing' : 'Play now'} <Icon name="arrow" />
      </Link>
    </div>
  );
}
