import Image from 'next/image';
import Link from 'next/link';
import arrival from '../../../public/art/merewood-arrival-painterly.webp';
import { artwork } from '@/content/artwork';
import BrandMark from '../brand-mark';
import Icon from '../icon';
import JourneyLink from './journey-link';

export default function WelcomeHero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#10231f] text-[#f3eddc]"
      aria-labelledby="welcome-title"
    >
      <Image
        src={arrival}
        alt={artwork.merewoodArrival.alt}
        fill
        sizes="100vw"
        preload
        placeholder="blur"
        quality={85}
        className="-z-20 object-cover object-[78%_center] tablet:object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#10231ff5_0%,#10231fe8_44%,#10231f30_80%,#10231f80_100%)] tablet:bg-[linear-gradient(90deg,#10231ff2_0%,#10231fc9_34%,#10231f26_68%,#10231f08_100%)]"
      />
      <header className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-5 py-5 tablet:px-10">
        <Link
          href="/"
          aria-label="Vesper Math home"
          className="flex items-center gap-3 font-story text-[1.875rem] font-semibold text-[#ecd9a8]"
        >
          <BrandMark />
          Vesper Math
        </Link>
        <Link
          href="/adventure"
          className="inline-flex min-h-11 items-center gap-3 border border-[#ddc99a70] bg-[#10231fe6] px-4 py-2 text-sm font-bold text-[#f3eddc] hover:bg-[#243d33]"
        >
          Play now <Icon name="arrow" className="size-4" />
        </Link>
      </header>
      <div className="relative mx-auto min-h-[760px] max-w-[1440px] px-5 pb-48 pt-12 tablet:min-h-[680px] tablet:px-10 tablet:pb-24 tablet:pt-16 desktop:pt-20">
        <div className="max-w-[800px]">
          <p className="mb-6 text-xs text-pretty uppercase leading-relaxed tracking-[.18em] text-[#dfc998]">
            An illustrated adventure in mathematics
          </p>
          <h1
            id="welcome-title"
            className="font-story text-[clamp(3.25rem,5.7vw,5.75rem)] leading-[.9]"
          >
            <span className="block tablet:whitespace-nowrap">A little curiosity.</span>
            <em className="block tablet:whitespace-nowrap font-normal text-[#dfc998]">
              A world waiting.
            </em>
          </h1>
          <p className="mb-7 mt-8 max-w-[520px] text-lg leading-relaxed text-[#e4e9dd]">
            Cross forgotten bridges. Wake sleeping wonders. Find your confidence in math, one
            discovery at a time.
          </p>
          <JourneyLink />
        </div>
        <p className="absolute bottom-7 right-5 hidden w-max whitespace-nowrap border border-[#ddc99a40] bg-[#10231f9c] px-4 py-3 text-left text-xs tablet:block uppercase leading-relaxed tracking-[.14em] text-[#f1e8d3] tablet:bottom-10 tablet:right-10">
          At the edge of the Merewood
          <br />
          <span className="normal-case tracking-normal">Every path begins with a question.</span>
        </p>
      </div>
    </section>
  );
}
