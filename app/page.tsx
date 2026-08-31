import { HeroSection } from "@/components/sections/HeroSection";
import { ZoomExperience } from "@/components/sections/ZoomExperience";
import { OverviewSection } from "@/components/sections/OverviewSection";
import { AboutSection } from "@/components/sections/AboutSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ZoomExperience />
      <OverviewSection />
      <AboutSection minimal />
    </>
  );
}
