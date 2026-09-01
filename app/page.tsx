import { Ripple } from "./components/effects/Ripple";
import ComponentGrid from "./components/component-grid";
import FAQ from "./components/faq";
import Footer from "./components/footer";
import Hero from "./components/hero";
import HeroLaser from "./components/hero-laser";
import { getDiscordStats } from "./lib/get-discord-stats";
import { getGithubStars } from "./lib/get-github-stars";
import { getProfileStats } from "./lib/get-profile-stats";
import { getStargazers } from "./lib/get-stargazers";

export default async function Home() {
  const [stats, stargazers, githubStars, discordStats] = await Promise.all([
    getProfileStats(),
    getStargazers(),
    getGithubStars(),
    getDiscordStats(),
  ]);

  return (
    <Ripple
      amplitude={0.5}
      speed={0.65}
      wavelength={80}
      rings={2}
      decay={1}
      refraction={100}
      dispersion={0.5}
      shine={0.5}
      trigger="click"
      interval={0}
      className="min-h-full w-full flex-1 flex flex-col"
    >
      <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <Hero
          stats={stats}
          stargazers={stargazers}
          githubStars={githubStars}
          initialDiscordStats={discordStats}
        />
        <HeroLaser />
        <ComponentGrid />
        <FAQ />
        <Footer stats={stats} />
      </main>
    </Ripple>
  );
}
