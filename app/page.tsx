import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import Hero from "@/components/home/Hero";
import SelectedWork from "@/components/home/SelectedWork";

export default function Home() {
  return (
    <main id="main" className="wrap">
      <Hero />
      <SelectedWork />
      <About />
      <Contact />
    </main>
  );
}
