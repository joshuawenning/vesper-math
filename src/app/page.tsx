import Image from 'next/image';
import Link from 'next/link';
import observatory from '../../public/art/observatory-painterly.webp';
import { artwork } from '@/content/artwork';
import { worlds } from '@/content/worlds';
import BrandMark from '@/components/brand-mark';
import Icon from '@/components/icon';
import WorldAtmosphere from '@/components/adventure/world-atmosphere';
import JourneyLink from '@/components/welcome/journey-link';

export default function Home() {
  return (
    <WorldAtmosphere worldId="flooded-observatory">
      <header className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-5 py-5 tablet:px-10">
        <Link
          href="/"
          aria-label="Vesper Math home"
          className="flex items-center gap-3 font-story text-[1.875rem] font-semibold text-gold"
        >
          <BrandMark />
          Vesper Math
        </Link>
        <a
          href="#the-journey"
          className="inline-flex min-h-11 items-center gap-2 py-2 text-sm text-subtle hover:text-gold"
        >
          Discover the journey <Icon name="arrow" className="size-4" />
        </a>
      </header>
      <main id="adventure" tabIndex={-1}>
        <section className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 pb-12 pt-5 tablet:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] tablet:gap-10 tablet:px-10 tablet:pb-20 tablet:pt-10">
          <div className="relative z-10 py-3">
            <p className="mb-5 text-xs uppercase tracking-[.2em] text-gold">
              An illustrated adventure in mathematics
            </p>
            <h1 className="max-w-[12ch] font-story text-[clamp(3.25rem,7vw,6.5rem)] leading-[.95]">
              A little curiosity.
              <br />
              <em className="font-normal text-gold">A world waiting.</em>
            </h1>
            <p className="mb-7 mt-7 max-w-md text-base leading-relaxed text-subtle">
              Cross forgotten bridges. Wake sleeping wonders. Find your confidence in math, one
              discovery at a time.
            </p>
            <JourneyLink />
            <p className="mt-4 text-xs leading-relaxed text-subtle">
              No account needed. Your journey stays in this browser.
            </p>
          </div>
          <figure className="relative overflow-hidden border border-gold/30 bg-frame aspect-[5/4] tablet:aspect-[4/5]">
            <Image
              src={observatory}
              alt={artwork.observatory.alt}
              fill
              sizes="(max-width:750px) 100vw, 60vw"
              preload
              placeholder="blur"
              quality={85}
              className="object-cover object-[42%_center]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#101d19] via-[#101d19cc] to-transparent px-6 pb-6 pt-20 text-[#f1e8d3]">
              <span className="mb-2 block text-xs uppercase tracking-[.16em] text-[#dfc998]">
                Your first destination · The Merewood
              </span>
              <span className="font-story text-3xl">A light across the mere.</span>
            </figcaption>
          </figure>
        </section>
        <section
          id="the-journey"
          className="border-y border-line bg-surface px-5 py-12 tablet:px-10 tablet:py-16"
        >
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
              <h2 className="max-w-md font-story text-4xl leading-tight tablet:text-5xl">
                The next door opens
                <br />
                <em>with understanding.</em>
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-subtle">
                For the first-time learner and the returning explorer. Start with addition and equal
                groups, or find your footing with fractions, geometry, and early algebra.
              </p>
            </div>
            <ol className="grid gap-8 tablet:grid-cols-3 tablet:gap-12">
              {[
                [
                  '01',
                  'Follow your curiosity',
                  'Step into hand-painted worlds. Meet their strange inhabitants and uncover three stories in each chapter.',
                ],
                [
                  '02',
                  'Think it through',
                  'Use math to help the world move forward. Each story offers three challenges, with hints when you need a hand.',
                ],
                [
                  '03',
                  'Grow along the way',
                  'Collect keepsakes, build Resolve, and practice with Elian. When the path gets difficult, the training ground is always there.',
                ],
              ].map(([number, title, description]) => (
                <li key={number} className="border-t border-line pt-4">
                  <span className="text-xs text-gold">{number}</span>
                  <h3 className="mb-2 mt-2 font-story text-2xl">{title}</h3>
                  <p className="text-sm leading-relaxed text-subtle">{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section
          className="mx-auto max-w-[1360px] px-5 py-14 tablet:px-10 tablet:py-20"
          aria-labelledby="worlds-heading"
        >
          <p className="mb-3 text-xs uppercase tracking-[.18em] text-gold">
            Seven worlds. Twenty-one discoveries.
          </p>
          <h2 id="worlds-heading" className="mb-8 font-story text-4xl tablet:text-5xl">
            There are other roads.
          </h2>
          <div className="grid gap-6 tablet:grid-cols-3">
            {[worlds[1], worlds[3], worlds[5]].map((world) => (
              <figure key={world.id}>
                <div className="relative aspect-[4/3] overflow-hidden border border-line">
                  <Image
                    src={world.image}
                    alt={`A painted glimpse of ${world.title}`}
                    fill
                    sizes="(max-width:750px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="pt-4">
                  <div className="mb-2 flex items-center gap-2 text-gold">
                    <Icon name={world.icon} className="size-4" />
                    <span className="text-xs uppercase tracking-[.1em]">
                      Chapter {world.number}
                    </span>
                  </div>
                  <h3 className="font-story text-2xl">{world.title}</h3>
                  <p className="mt-1 font-story text-xl italic text-subtle">{world.teaser}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
        <section className="mx-auto grid max-w-[1280px] items-center gap-8 border-y border-line px-5 py-10 tablet:grid-cols-[minmax(0,.65fr)_minmax(0,1fr)] tablet:gap-14 tablet:px-10 tablet:py-14">
          <div className="relative aspect-[4/3] overflow-hidden border border-line">
            <Image
              src={artwork.elian.src}
              alt={artwork.elian.alt}
              fill
              sizes="(max-width:750px) 100vw, 450px"
              className="object-cover object-[center_30%]"
            />
          </div>
          <div>
            <p className="mb-3 text-xs uppercase tracking-[.18em] text-gold">
              Meet your math companion
            </p>
            <h2 className="font-story text-4xl tablet:text-5xl">You have good company.</h2>
            <p className="my-5 max-w-xl text-base leading-relaxed text-subtle">
              Elian is a cartographer with a fondness for questions. Ask her about a math idea, work
              through a calculation, or invite her to quiz you. Practice among the books, or see
              what the dice have to teach.
            </p>
            <p className="mb-6 max-w-xl font-story text-2xl italic text-gold">
              “One small idea, then another. That is how we find our way.”
            </p>
            <JourneyLink />
          </div>
        </section>
      </main>
      <footer className="mx-auto flex max-w-[1280px] flex-wrap justify-between gap-3 px-5 py-8 text-xs leading-relaxed text-subtle tablet:px-10">
        <span>Vesper Math · Follow your curiosity.</span>
        <span>Learn at your pace. Keep your own story.</span>
      </footer>
    </WorldAtmosphere>
  );
}
