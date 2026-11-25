import { About } from "./_components/About";
import { Contact } from "./_components/Contact";
import { Footer } from "./_components/Footer";
import { Hero } from "./_components/Hero";
import { Method } from "./_components/Method";
import { Sectors } from "./_components/Sectors";
import { Services } from "./_components/Services";

export default function AboutPage() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Services />
        <Sectors />
        <Method />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
