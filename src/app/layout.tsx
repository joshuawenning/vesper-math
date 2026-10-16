import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import { ProgressProvider } from '@/components/use-progress';
import ElianChat from '@/components/tutor/elian-chat';

const literary = Cormorant_Garamond({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-literary',
});
const ui = DM_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-ui' });

export const metadata: Metadata = {
  title: 'Vesper Math · The Flooded Observatory',
  description:
    'A personal, illustrated math adventure with seven worlds to explore, a private on-device tutor, and room to learn at your own pace.',
};
export const viewport: Viewport = { themeColor: '#172323' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${literary.variable} ${ui.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `let p={};try{p=JSON.parse(localStorage.getItem('vesper-save-v1')||'{}')||{}}catch{}document.documentElement.dataset.theme=p.theme==='light'||p.theme==='dark'?p.theme:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.textSize=p.textSize==='large'?'large':'standard';`,
          }}
        />
      </head>
      <body>
        <a
          className="fixed -top-[100px] left-3 z-100 bg-paper p-3 text-ink focus:top-3"
          href="#adventure"
        >
          Skip to adventure
        </a>
        <ProgressProvider>
          {children}
          <ElianChat />
        </ProgressProvider>
      </body>
    </html>
  );
}
