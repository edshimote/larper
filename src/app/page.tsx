import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SectionPlaceholder } from "@/components/layout/SectionPlaceholder";
import { Hero } from "@/components/hero/Hero";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { TerminalSection } from "@/components/terminal/TerminalSection";
import { ContactSection } from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServicesSection />
        <ProjectsSection />
        <TerminalSection />
        <SectionPlaceholder id="about" label="About" />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
