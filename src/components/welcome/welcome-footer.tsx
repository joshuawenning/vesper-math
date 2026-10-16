import Image from 'next/image';
import { artwork } from '@/content/artwork';
import JourneyLink from './journey-link';
import Copyright from './copyright';

export default function WelcomeFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#10231f] text-[#f3eddc] [--accent:#dfc998]">
      <div className="relative h-[340px] tablet:absolute tablet:inset-0 tablet:-z-20 tablet:h-auto">
        <Image
          src={artwork.elianWaystation.src}
          alt={artwork.elianWaystation.alt}
          fill
          sizes="100vw"
          quality={85}
          className="object-cover object-[80%_35%] tablet:object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,#10231f_100%)] tablet:bg-[linear-gradient(90deg,#10231ff5_0%,#10231fd6_35%,#10231f18_74%,#10231f30_100%)]"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-[#10231fe6] via-transparent to-transparent"
      />
      <div className="relative mx-auto flex max-w-[1360px] items-center px-5 pb-14 pt-2 tablet:min-h-[650px] tablet:px-10 tablet:py-20">
        <div className="max-w-[800px]">
          <p className="mb-4 text-xs uppercase leading-relaxed tracking-[.18em] text-[#dfc998]">
            Meet your math companion
          </p>
          <h2 className="font-story text-[clamp(2.8rem,4.8vw,4.5rem)] leading-[.9] desktop:whitespace-nowrap">
            You have good company.
          </h2>
          <p className="my-6 max-w-[520px] text-lg leading-relaxed text-[#e4e9dd]">
            Elian is a cartographer with a fondness for questions. Ask about an idea, work through a
            calculation, or invite her to quiz you. There is always another way to understand.
          </p>
          <p className="mb-7 max-w-[520px] font-story text-2xl italic leading-tight text-[#dfc998]">
            “One small idea, then another. That is how we find our way.”
          </p>
          <JourneyLink />
        </div>
      </div>
      <div className="relative">
        <div className="mx-auto flex max-w-[1360px] flex-wrap items-center justify-between gap-x-8 gap-y-5 px-5 py-7 tablet:px-10">
          <div className="flex items-center gap-3 text-[#dfc998]">
            <span className="font-story text-2xl">Vesper Math</span>
          </div>
          <p className="text-sm text-[#d2dccd]">Follow your curiosity.</p>
          <div className="text-xs leading-relaxed text-[#d2dccd]">
            <Copyright />
          </div>
        </div>
      </div>
    </footer>
  );
}
