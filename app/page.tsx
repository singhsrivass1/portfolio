import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Hackathons from "@/components/sections/Hackathons";
import AIPlayground from "@/components/sections/AIPlayground";
import GitHubActivity from "@/components/sections/GitHubActivity";
import LeetCodeStats from "@/components/sections/LeetCodeStats";
import CurrentlyLearning from "@/components/sections/CurrentlyLearning";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Work />
      <Hackathons />
      <AIPlayground />
      <GitHubActivity />
      <LeetCodeStats />
      <CurrentlyLearning />
      <Experience />
      <Contact />
    </main>
  );
}
