import type { Metadata } from "next";
import { About } from "./_components/About";
import { Contact } from "./_components/Contact";
import { Footer } from "./_components/Footer";
import { Hero } from "./_components/Hero";
import { Method } from "./_components/Method";
import { Sectors } from "./_components/Sectors";
import { Services } from "./_components/Services";

export const metadata: Metadata = {
  title: { absolute: "Sobre mí | Lucrecia Cornaglia, costos y rentabilidad" },
  description:
    "Contadora Pública. Acompaño a empresas y productores a analizar sus costos, precios y resultados para mejorar su gestión.",
};

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
