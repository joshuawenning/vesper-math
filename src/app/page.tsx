import WorldAtmosphere from '@/components/adventure/world-atmosphere';
import WelcomeHero from '@/components/welcome/welcome-hero';
import WorldsIntroduction from '@/components/welcome/worlds-introduction';
import WelcomeFooter from '@/components/welcome/welcome-footer';

export default function Home() {
  return (
    <WorldAtmosphere worldId="flooded-observatory">
      <main id="adventure" tabIndex={-1}>
        <WelcomeHero />
        <WorldsIntroduction />
      </main>
      <WelcomeFooter />
    </WorldAtmosphere>
  );
}
