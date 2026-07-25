import { HeroSection } from "@/components/sections/HeroSection";
import { ZoomExperience } from "@/components/sections/ZoomExperience";
import { OverviewSection } from "@/components/sections/OverviewSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { InnovationsSection } from "@/components/sections/InnovationsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ZoomExperience />
      <OverviewSection />
      <AboutSection />
      <InnovationsSection />
    </>
  );
}
