import { worlds } from '@/content/worlds';
import Button from '../ui/button';
import { Eyebrow } from '../ui/typography';
import Icon from '../icon';

export default function WorldHorizon({ onAtlas }: { onAtlas: () => void }) {
  return (
    <section className="mt-7 border-t border-line pt-6" aria-labelledby="horizon-heading">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Eyebrow small>There are other roads</Eyebrow>
          <h2 id="horizon-heading" className="mt-1 font-story text-[26px]">
            Beyond the next horizon
          </h2>
        </div>
        <Button variant="quiet" onClick={onAtlas}>
          Open the world atlas →
        </Button>
      </div>
      <p className="mb-4 text-[11px] leading-[1.6] text-[#9aab9c]">
        Three worlds are ready to explore. Farther places remain veiled, waiting for another
        chapter.
      </p>
      <div className="grid gap-3 tablet:grid-cols-3">
        {worlds
          .filter((w) => !w.playable)
          .map((world) => (
            <article key={world.id} className="relative border border-line bg-[#1b2c26] p-4">
              <Icon name="star" className="mb-4 size-5 text-gold/60" />
              <h3 className="font-story text-[22px] text-[#d8dece]">{world.title}</h3>
              <p className="mt-2 font-story text-base italic leading-[1.5] text-[#8fa095]">
                {world.teaser}
              </p>
            </article>
          ))}
      </div>
    </section>
  );
}
