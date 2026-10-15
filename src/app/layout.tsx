import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';

const literary = Cormorant_Garamond({ subsets: ['latin'], style: ['normal', 'italic'], display: 'swap', variable: '--font-literary' });
const ui = DM_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-ui' });

export const metadata: Metadata = {
  title: 'Vesper · The Flooded Observatory',
  description: 'An illustrated adventure where curiosity opens the way. Explore the Flooded Observatory through arithmetic, fractions, and discovery.',
};
export const viewport: Viewport = { themeColor: '#172323' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${literary.variable} ${ui.variable}`}><body><a className="skip-link" href="#adventure">Skip to adventure</a>{children}</body></html>;
}
