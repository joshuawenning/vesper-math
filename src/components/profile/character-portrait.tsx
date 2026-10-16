import { getPersona, personaPortraitAtlas } from '@/content/personas';

export default function CharacterPortrait({
  persona,
  className = 'size-16',
}: {
  persona: string;
  className?: string;
}) {
  const character = getPersona(persona);
  return (
    <span
      role="img"
      aria-label={`${character.gender} ${character.name}`}
      className={`block shrink-0 bg-[#23352e] bg-cover ${className}`}
      style={{
        backgroundImage: `url(${personaPortraitAtlas})`,
        backgroundSize: '300% 200%',
        backgroundPosition: `${character.column * 50}% ${character.row * 100}%`,
      }}
    />
  );
}
