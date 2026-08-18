import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import LogoMarquee from "@/components/LogoMarquee";
import CustomCursor from "@/components/CustomCursor";
import SectionRail from "@/components/SectionRail";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Experience from "@/sections/Experience";
import Education from "@/sections/Education";
import Services from "@/sections/Services";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <div className="noise relative min-h-screen bg-background text-foreground antialiased">
      <CustomCursor />
      <ScrollProgress />
      <SectionRail />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <LogoMarquee />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
