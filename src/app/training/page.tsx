import type { Metadata } from 'next';
import TrainingScreen from '@/components/training/training-screen';
export const metadata: Metadata = { title: 'Training & Library · Vesper Math' };
export default async function TrainingPage({
  searchParams,
}: {
  searchParams: Promise<{ returnTo?: string }>;
}) {
  const params = await searchParams;
  return (
    <TrainingScreen returnTo={typeof params.returnTo === 'string' ? params.returnTo : undefined} />
  );
}
