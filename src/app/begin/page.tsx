import type { Metadata } from 'next';
import Onboarding from '@/components/welcome/onboarding';

export const metadata: Metadata = { title: 'Create your wayfarer · Vesper Math' };

export default function Begin() {
  return <Onboarding />;
}
