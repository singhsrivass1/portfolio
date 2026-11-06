import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import Hero from "@/components/home/Hero";
import SelectedWork from "@/components/home/SelectedWork";
import { site } from "@/lib/site";

/** Structured data for search engines: who this site is about. */
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  sameAs: site.profiles.map((p) => p.href),
  alumniOf: { "@type": "CollegeOrUniversity", name: site.education.school },
};

export default function Home() {
  return (
    <main id="main" className="wrap">
      <script
        type="application/ld+json"
        // Escape "<" so the JSON can never close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <SelectedWork />
      <About />
      <Contact />
    </main>
  );
}
