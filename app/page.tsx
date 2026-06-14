import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import FocusAreas from "@/components/sections/FocusAreas";
import VisionSection from "@/components/sections/VisionSection";
import CTASection from "@/components/sections/CTASection";
import ImpactSection from "@/components/sections/ImpactSection";
import SDGSection from "@/components/sections/SDGSection";
import FeaturedInSection from "@/components/sections/FeaturedInSection";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <FocusAreas />
      <VisionSection />
      <SDGSection />
      <ImpactSection />
      <FeaturedInSection />
      <CTASection />
    </>
  );
}