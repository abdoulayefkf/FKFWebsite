import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import FocusAreas from "@/components/sections/FocusAreas";
import VisionSection from "@/components/sections/VisionSection";
import CTASection from "@/components/sections/CTASection";
import ImpactSection from "@/components/sections/ImpactSection";
import SDGSection from "@/components/sections/SDGSection";
import FeaturedInSection from "@/components/sections/FeaturedInSection";
import { getSiteSettings } from "@/lib/cms";

export default async function Home() {
  const settings=await getSiteSettings();
  return (
    <>
      <Hero title={settings.heroTitle} description={settings.heroDescription} videoUrl={settings.heroVideoUrl} />
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
