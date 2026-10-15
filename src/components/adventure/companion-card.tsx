import Image from 'next/image';
import { artwork } from '@/content/artwork';
import Button from '../ui/button';
import { Eyebrow } from '../ui/typography';

export function CompanionCard({ complete, onSpeak }: { complete: boolean; onSpeak: () => void }) {
  return (
    <div className="mt-[35px] overflow-hidden border border-line bg-surface px-[15px] pb-[18px]">
      <Image
        className="mx-[-15px] mb-[18px] block h-[155px] w-[calc(100%+30px)] max-w-none border-b border-[#bda36955] object-cover object-[center_28%]"
        src={artwork.elian.src}
        alt={artwork.elian.alt}
        width={300}
        height={200}
        sizes="208px"
      />
      <Eyebrow small>Your companion</Eyebrow>
      <h3 className="mt-2.5 font-story text-[1.375rem] font-medium leading-[1.15]">
        Elian, the cartographer
      </h3>
      <p className="my-[9px] font-story text-[0.9375rem] italic leading-[1.5] text-subtle">
        “
        {complete
          ? 'Some maps show us where to go. Others show us what we have learned.'
          : 'Every great journey begins with a little curiosity. Take your time.'}
        ”
      </p>
      <Button variant="quiet" onClick={onSpeak}>
        Speak with Elian &nbsp; →
      </Button>
    </div>
  );
}

export function MobileCompanionCard({ onSpeak }: { onSpeak: () => void }) {
  return (
    <button
      className="mt-[18px] flex w-full items-center gap-[14px] border border-[#bda36944] bg-surface p-[11px] text-left tablet:hidden"
      onClick={onSpeak}
    >
      <Image
        className="h-[58px] w-[53px] border border-[#b49c6566] object-cover object-[center_25%]"
        src={artwork.elian.src}
        alt="Elian, your cartographer companion"
        width={80}
        height={80}
        sizes="53px"
      />
      <span>
        <strong className="block font-story text-[1.3125rem] font-medium leading-[1.15] text-body">
          Elian, the cartographer
        </strong>
        <small className="mt-1 block text-[0.75rem] text-subtle">Speak with your companion</small>
      </span>
      <span className="ml-auto mr-[7px] text-gold">→</span>
    </button>
  );
}
