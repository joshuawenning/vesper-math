import Image from 'next/image';
import observatory from '../../public/art/observatory-illustrated.webp';
import { artwork } from '@/content/artwork';
import Game from '@/components/game';

export default function Home() {
  return (
    <Game
      scene={
        <Image
          className="absolute inset-0 block size-full object-cover object-center saturate-[.82] tablet:object-[center_53%]"
          src={observatory}
          alt={artwork.observatory.alt}
          fill
          sizes="(max-width: 750px) 100vw, (max-width: 1100px) calc(100vw - 250px), (max-width: 1600px) calc(100vw - 325px), 1200px"
          preload
          quality={85}
          placeholder="blur"
        />
      }
    />
  );
}
