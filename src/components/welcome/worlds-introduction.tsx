import Image from 'next/image';
import { worlds } from '@/content/worlds';
import Icon from '../icon';

const glimpses = [
  {
    world: worlds[1],
    title: 'Follow your curiosity',
    description:
      'Step into painted worlds. Meet their strange inhabitants and uncover three stories in every chapter.',
    veil: '',
  },
  {
    world: worlds[3],
    title: 'Think it through',
    description:
      'Help the world move forward through math. Each story offers three challenges, with a hint when you need a hand.',
    veil: 'scale-105 blur-[3px]',
  },
  {
    world: worlds[5],
    title: 'Grow along the way',
    description:
      'Collect keepsakes and build Resolve. Practice with Elian whenever the next path feels a little steep.',
    veil: 'scale-110 blur-[7px]',
  },
];

export default function WorldsIntroduction() {
  return (
    <section
      className="mx-auto max-w-[1360px] px-5 py-14 tablet:px-10 tablet:py-20"
      aria-labelledby="journey-heading"
    >
      <div className="mb-10 grid items-end gap-6 tablet:grid-cols-2 tablet:gap-16">
        <div>
          <p className="mb-4 text-xs uppercase leading-relaxed tracking-[.18em] text-gold">
            Seven worlds. Twenty-one discoveries.
          </p>
          <h2
            id="journey-heading"
            className="font-story text-[clamp(2.6rem,4vw,4rem)] leading-[.9]"
          >
            <span className="block">The next door</span>
            <span className="block desktop:whitespace-nowrap">
              opens <em className="font-normal">with understanding.</em>
            </span>
          </h2>
        </div>
        <p className="max-w-[520px] text-lg leading-relaxed text-subtle">
          Start with addition and equal groups, or find your footing with fractions, geometry, and
          early algebra. There are other roads ahead. Some are still lost in the mist.
        </p>
      </div>
      <ol className="grid gap-9 tablet:grid-cols-3 tablet:gap-6">
        {glimpses.map(({ world, title, description, veil }, index) => (
          <li key={world.id} className="min-w-0">
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden border border-line bg-frame">
                <Image
                  src={world.image}
                  alt={
                    veil
                      ? `A veiled glimpse of ${world.title}`
                      : `A painted glimpse of ${world.title}`
                  }
                  fill
                  sizes="(max-width:750px) 100vw, 33vw"
                  className={`object-cover ${veil}`}
                />
                {veil && <div aria-hidden="true" className="absolute inset-0 bg-night/20" />}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#10231ff2] to-transparent px-4 pb-4 pt-14 text-[#f1e8d3]">
                  <p className="mb-1 flex items-center gap-2 text-xs text-[#dfc998]">
                    <Icon name={world.icon} className="size-4" />
                    {index === 0 ? 'A glimpse of the road ahead' : 'Beyond the next horizon'}
                  </p>
                  <p className="font-story text-2xl">{world.title}</p>
                </div>
              </div>
            </figure>
            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-xs text-gold">0{index + 1}</span>
              <h3 className="font-story text-2xl font-bold leading-tight">{title}</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-subtle">{description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
